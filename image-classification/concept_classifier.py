import torch
from torchvision import models, transforms
from typing import Tuple, List
from enum import Enum
import numpy as np
from keyframe import KeyFrameData

from PIL import Image


class ModelType(Enum):
    ALEX_NET = models.alexnet(pretrained=True)
    GOOGLE_NET = models.googlenet(pretrained=True)
    VGG = models.vgg11(pretrained=True)
    RES_NET = models.resnet101(pretrained=True)


def get_imagenet_classes() -> List[str]:
    with open('imagenet1000_classes.txt') as image_file:
        ret_val = [line.strip() for line in image_file.readlines()]
    return ret_val


class ConceptClassifier:

    def __init__(self, model_type: ModelType = ModelType.ALEX_NET):
        self.model_type = model_type
        self.imagenet_classes: List[str] = get_imagenet_classes()

    def add_predictions_to_keyframe(self, keyframe_data: KeyFrameData) -> KeyFrameData:
        transformed_image = self.get_transformed_image(keyframe_data.keyframe)
        transformed_batch = torch.unsqueeze(transformed_image, 0)
        # model = self.get_model()
        # model_output = model(transformed_batch)

        # First, load the model
        resnet = models.resnet101(pretrained=True)

        # Second, put the network in eval mode
        resnet.eval()

        # Third, carry out model inference
        out = resnet(transformed_batch)

        # Forth, print the top 5 classes predicted by the model
        _, indices = torch.sort(out, descending=True)
        percentage = torch.nn.functional.softmax(out, dim=1)[0] * 100

        keyframe_data.classifier = 'resnet'

        keyframe_data.concepts = [(self.imagenet_classes[idx], percentage[idx].item()) for idx in indices[0] if
                                  percentage[idx].item() > 0.1]

        return keyframe_data

    def get_prediction_and_percentage(self, image_path: str, model: models) -> Tuple[str, float]:
        image_net_classes: List[str] = get_imagenet_classes()
        image = Image.open(image_path)
        transformed_image = get_transformed_image(image)
        transformed_batch = torch.unsqueeze(transformed_image, 0)
        model_output = model(transformed_batch)

        _, index = torch.max(model_output, 1)
        percentage = torch.nn.functional.softmax(model_output, dim=1)[0] * 100

        return image_net_classes[index], percentage[index].item()

    def get_model(self):
        model = self.model_type.value
        model.eval()
        return model

    def get_transformed_image(self, keyframe_array: np.ndarray):
        transform = self._get_transform()
        pil_image = Image.fromarray(np.uint8(keyframe_array))
        transformed_image = transform(pil_image)
        return transformed_image

    def _get_transform(self) -> transforms:
        """
        [1] -> Transform instance which is a combination of all the image transformations to be carried out on the input image
        [2] -> Rezise the image to 256x256
        [3] -> Crop the image to 224x224 about the center
        [4] -> Convert the image to Pytorch Tensor data type
        [5-7] -> Normalize the image by setting its mean and standard deviation to the specified values
        """
        ret_val = transforms.Compose([  # [1]
            transforms.Resize(256),  # [2]
            transforms.CenterCrop(224),  # [3]
            transforms.ToTensor(),  # [4]
            transforms.Normalize(  # [5]
                mean=[0.485, 0.456, 0.406],  # [6]
                std=[0.229, 0.224, 0.225]  # [7]
            )
        ])
        return ret_val

    def set_model_type(self, model_type: ModelType = None):
        if model_type is not None:
            self.model_type = model_type
