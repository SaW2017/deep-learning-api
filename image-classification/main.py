from typing import List, Dict

import shot_detection
import utils
from keyframe import KeyFrameData
from concept_classifier import ConceptClassifier
import FileWriter

import os
import platform

import mongo_handler

FRONT_END_PATH: str = '../../deep-learning-frontend/'
IMAGES_PUBLIC_PATH: str = 'public/images/'

if __name__ == '__main__':
    st = shot_detection.ShotDetection()
    folder_path_list: List[str] = FileWriter.get_folder_elements_paths()
    video_dict: Dict[str, List[KeyFrameData]] = {}

    # Create root folder for images
    FileWriter.clean_create_directory(FRONT_END_PATH, IMAGES_PUBLIC_PATH)

    # Used for sub folders of image root folders
    frontend_image_path: str = os.path.join(FRONT_END_PATH, IMAGES_PUBLIC_PATH)

    print('start keyframe detection')
    # get the keyframes for each video and store them
    # also creating folder for images
    for folder_path in folder_path_list:
        folder_key: str = utils.get_key_from_folder_path(folder_path)
        video_dict[folder_key] = st.get_keyframes(folder_path, True)
        path = utils.get_key_from_folder_path(folder_path)
        FileWriter.clean_create_directory(frontend_image_path, path)

    print('storing all keyframes on disk')
    FileWriter.store_all_keyframes(frontend_image_path, video_dict)

    print('storing keyframe data in mongoDB')
    mongo_handler.store_all_keyframes(video_dict)


