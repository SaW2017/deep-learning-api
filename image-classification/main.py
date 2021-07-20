from typing import List, Dict

import shot_detection
import utils
from keyframe import KeyFrameData
from concept_classifier import ConceptClassifier

import mongo_handler


def get_key_from_folder_path(folder_path: str) -> str:
    stripped_paths: List[str] = folder_path.split('/')

    for path in stripped_paths:
        if '.' in path:
            temp = path.split('.')
            return temp[0]


if __name__ == '__main__':
    print('start keyframe detection')
    st = shot_detection.ShotDetection()
    cc = ConceptClassifier()

    print('finished keyframe detection')

    folder_path_list: List[str] = utils.get_folder_elements_paths()
    video_dict: Dict[str, List[KeyFrameData]] = {}

    # get the keyframes for each video and store them
    for folder_path in folder_path_list:
        folder_key: str = get_key_from_folder_path(folder_path)
        video_dict[folder_key] = st.get_keyframes(folder_path)

    mongo_handler.store_all_keyframes(video_dict)

    # store results on disk (with bool condition)
    # TODO store in mongoDB
