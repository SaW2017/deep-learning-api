from typing import Tuple, List, Dict

import utils
import json
import numpy as np
from mongoengine import Document, fields


class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


class KeyframeDocuments(Document):
    keyframe_id: str = fields.StringField(required=True)
    file_path: str = fields.StringField(required=True)
    classifier: str = fields.StringField(required=True)
    concept_confidence: List[Dict[str, int]] = fields.ListField(required=True)


class KeyFrameData(object):

    def __init__(self, keyframe: np.ndarray = None, file_path: str = None, index: int = 0):
        self.image: np.ndarray = keyframe
        self.folder_path: str = self.__trunc_file_path(file_path)
        self.index: int = index
        self.keyframe_id: str = None
        self.histogram_bin = utils.get_opencv_histogram_bin(self.image)
        self.classifier: str = 'resnet101'
        self.concepts: List[Dict[str, float]] = []

    def get_mongo_representation(self) -> KeyframeDocuments:
        self.keyframe_id = f'{str(self.index)}.png'
        db_keyframe: KeyframeDocuments = KeyframeDocuments(
            keyframe_id=f'{self.keyframe_id}',
            file_path=self.folder_path,
            classifier=self.classifier,
            concept_confidence=self.concepts
        )
        return db_keyframe

    def __trunc_file_path(self, file_path: str):
        if file_path is None:
            return ''
        temp_paths: list = file_path.split('/')
        trunc_path: str = temp_paths.pop()
        trunc_path = trunc_path.split('.')[0]

        return trunc_path

    def __str__(self):
        return f'''
        KeyFrameData
            - file_path: {self.folder_path}
            - index: {self.index}
            - keyframe_id: {self.keyframe_id}
            - classifier: {self.classifier}
            - concepts: {self.concepts[:5]}
                    '''
