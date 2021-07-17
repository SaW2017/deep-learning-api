from typing import Tuple, List

from utils import get_opencv_histogram_bin
import json
import numpy as np
from mongoengine import Document, fields

# used to convert np.ndarray to mongo_db record
from bson.binary import Binary
import pickle


class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return json.JSONEncoder.default(self, obj)


class KeyFrameMongoDocument(Document):
    keyframe_id: str = fields.StringField(required=True)
    file_path: str = fields.StringField(required=True)
    concept_name: str = fields.StringField(required=True)
    concept_confidence: List[Tuple[str, int]] = fields.ListField(required=True)
    # Image with size, False = dont force the size of the image
    keyframe = fields.ListField(required=True)
    # keyframe = fields.ImageField(thumbnail_size=(500, 450, False))


class KeyFrameData(object):

    def __init__(self, keyframe: np.ndarray = None, file_path: str = None, index: int = 0):
        self.keyframe: np.ndarray = keyframe
        self.file_path = file_path
        self.index = index
        self.keyframe_id = f'{self.file_path}_{str(self.index)}'
        self.histogram_bin = get_opencv_histogram_bin(self.keyframe)
        self.classifier = None  # TODO
        self.concepts: List[Tuple] = []

    def get_mongo_representation(self) -> KeyFrameMongoDocument:
        db_keyframe: KeyFrameMongoDocument = KeyFrameMongoDocument(
            keyframe_id=f'{self.file_path}_image_{str(self.index)}',
            file_path=self.file_path,
            concept_name=self.classifier,
            concept_confidence=self.concepts,
            # keyframe=self.keyframe.tolist()
            keyframe=self.__convert_keyframe_to_mongo_record()
        )

        return db_keyframe

    def __convert_keyframe_to_mongo_record(self) -> Binary:
        # Source: https://stackoverflow.com/questions/6367589/saving-numpy-array-in-mongodb
        record = Binary(pickle.dumps(self.keyframe, protocol=2), subtype=128)
        return record

    def __str__(self):
        return f'''
        KeyFrameData {self.file_path}_{str(self.index)}
            - classifier: {self.classifier}
            - concepts: {self.concepts[:5]}
                    '''
