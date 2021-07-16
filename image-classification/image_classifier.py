import torch
from torchvision import models, transforms
from typing import Tuple, List, Dict
from PIL import Image
from enum import Enum
from glob import glob
import matplotlib.pyplot as plt


class ModelType(Enum):
    ALEX_NET = models.alexnet(pretrained=True)
    GOOGLE_NET = models.googlenet(pretrained=True)
    VGG = models.vgg11(pretrained=True)
    RES_NET = models.resnet101(pretrained=True)


def get_classes() -> list:
    with open('imagenet1000_classes.txt') as image_file:
        ret_val = [line.strip() for line in image_file.readlines()]
    return ret_val


def get_transform() -> transforms:
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


def get_model(model_type: ModelType = ModelType.ALEX_NET) -> models:
    model = model_type.value
    model.eval()
    return model


def get_prediction_and_percentage(image_path: str, model: models) -> Tuple[str, float]:
    global classes
    image = Image.open(image_path)
    transformed_image = get_transformed_image(image)
    transformed_batch = torch.unsqueeze(transformed_image, 0)
    model_output = model(transformed_batch)

    _, index = torch.max(model_output, 1)
    percentage = torch.nn.functional.softmax(model_output, dim=1)[0] * 100

    return classes[index], percentage[index].item()


def get_transformed_image(image):
    transform = get_transform()
    transformed_image = transform(image)
    return transformed_image


def get_image_paths() -> List[str]:
    folder_path: str = 'testimages/*/*'
    image_path_list: List[str] = []
    for image in glob(folder_path):
        image_path_list.append(image)

    return image_path_list


def get_all_predictions(image_path: str) -> Dict[str, Tuple[str, float]]:
    predictions_map: Dict[str, Tuple[str, float]] = {}

    enum_list: list = [(m.name, m.value) for m in ModelType]

    for model_tuple in enum_list:
        current_model = model_tuple[1]
        current_model.eval()
        current_prediction = get_prediction_and_percentage(image_path, current_model)
        # print(f'{model_tuple[0]} -- {current_prediction}')
        predictions_map[model_tuple[0]] = current_prediction

    return predictions_map


def get_prediction_string(all_predictions_map: Dict[str, Tuple[str, float]]) -> str:
    model_keys = all_predictions_map.keys()

    ret_string: str = ''
    for idx, key in enumerate(model_keys):
        prediction = all_predictions_map[key][0]
        prediction = prediction.split(':')[1]
        percentage = all_predictions_map[key][1]
        ret_string += f'{key}--{percentage:.2f}% {prediction}'
        if (idx + 1) < len(model_keys):
            ret_string += '\n'

    return ret_string


if __name__ == '__main__':
    classes = get_classes()

    image_paths: List[str] = get_image_paths()

    fig = plt.figure(figsize=(25, 16))

    print('----------------------------------')
    for idx, image_path in enumerate(image_paths):
        current_image = Image.open(image_path)
        prediction_map = get_all_predictions(image_path)
        xlabel_text: str = get_prediction_string(prediction_map)
        print(xlabel_text)

        nrows = len(image_paths) // 2
        ncols = nrows

        subplot = fig.add_subplot(nrows, ncols, (idx + 1))
        subplot.axes.get_xaxis().set_ticks([])
        subplot.axes.get_yaxis().set_ticks([])

        subplot.set_xlabel(xlabel_text, fontsize=9)
        img_plt = plt.imshow(current_image)

        print('----------------------------------')

    plt.show()
