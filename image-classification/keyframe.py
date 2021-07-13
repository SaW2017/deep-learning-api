from typing import Tuple, List

from utils import get_opencv_histogram_bin
import json
import numpy as np


class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


class KeyFrameData:

    def __init__(self, keyframe=None, video_path: str = None, index: int = 0):
        self.keyframe = keyframe
        self.path = video_path
        self.index = index
        self.keyframe_path = None  # TODO
        self.histogram_bin = get_opencv_histogram_bin(self.keyframe)
        self.classifier = 'alex-net'  # TODO
        self.concepts: List[Tuple] = [('Neufoundland Dog', 0.89)]

    def keyframe_as_dict(self) -> dict:
        keyframe_dict: dict = {
            f'{self.path}_image_{str(self.index)}':
                {
                    # 'keyframe': self.keyframe,
                    'keyframe': np.array([[0, 0, 0], [0, 0, 0]]),
                    'index': self.index,
                    'path': self.path,
                    'concept_classifier':
                        {
                            'classifier': self.classifier,
                            'concepts': self.concepts
                        }

                }
        }
        return keyframe_dict

    def to_json_object(self):
        return json.dumps(self.keyframe_as_dict(), sort_keys=True, indent=4, cls=NumpyEncoder)
