from typing import List, Dict

import shot_detection
import utils
from keyframe import KeyFrameData
from concept_classifier import ConceptClassifier
import FileWriter

import mongo_handler

FRONT_END_PATH: str = '../../deep-learning-frontend/'
IMAGES_PUBLIC_PATH: str = 'public/images/'

if __name__ == '__main__':
    print('start keyframe detection')
    st = shot_detection.ShotDetection()
    cc = ConceptClassifier()

    print('finished keyframe detection')

    folder_path_list: List[str] = FileWriter.get_folder_elements_paths()
    video_dict: Dict[str, List[KeyFrameData]] = {}

    # print(FileWriter.get_folder_elements_paths('../../deep-learning-frontend/public'))

    # FileWriter.clean_create_directory(FRONT_END_PATH, IMAGES_PUBLIC_PATH)

    # get the keyframes for each video and store them
    for folder_path in folder_path_list:
        folder_key: str = utils.get_key_from_folder_path(folder_path)
        video_dict[folder_key] = st.get_keyframes(folder_path)

    mongo_handler.store_all_keyframes(video_dict)

    # store results on disk (with bool condition)
    # TODO store in mongoDB
