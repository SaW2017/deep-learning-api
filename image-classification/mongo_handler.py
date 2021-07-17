from typing import Dict, List

from mongoengine import connect, Document, fields
from pprint import pprint
import numpy as np
from keyframe import KeyFrameData, KeyFrameMongoDocument

mongo_url: str = '/usr/local/Homebrew/Library/Taps/homebrew/homebrew-services'

connect(db="video_search", host="localhost", port=27017)

id_count = 0


def store_keyframe(keyframe_data: KeyFrameData) -> KeyFrameMongoDocument:
    global id_count
    db_keyframe: KeyFrameMongoDocument = keyframe_data.get_mongo_representation()
    db_keyframe.save()
    return db_keyframe


def store_all_keyframes(video_dict: Dict[str, List[KeyFrameData]]) -> None:
    for key in video_dict.keys():
        for keyframe_data in video_dict[key]:
            store_keyframe(keyframe_data)
