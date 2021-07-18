from typing import List, Dict

import shot_detection
import utils
from keyframe import KeyFrameData
import json
from concept_classifier import ConceptClassifier, ModelType

import mongo_handler

import concurrent.futures


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
    #
    # detected_keyframes = st.get_keyframes('everest.mp4')
    # utils.write_images_to_disk(detected_keyframes)
    #
    print('finished keyframe detection')

    folder_path_list: List[str] = utils.get_folder_elements_paths()
    video_dict: Dict[str, List[KeyFrameData]] = {}

    # get the keyframes for each video and store them
    # for folder_path in folder_path_list:
    #     folder_key: str = get_key_from_folder_path(folder_path)
    #     video_dict[folder_key] = st.get_keyframes(folder_path)

    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as executor:
        future_to_video_list = {executor.submit(st.get_keyframes, folder_path): folder_path for folder_path in
                                utils.get_folder_elements_paths()}
        for future in concurrent.futures.as_completed(future_to_video_list):
            video_list = future_to_video_list[future]
            print(video_list[0])

    # add the classification to each keyframe

    # mongo_handler.store_all_keyframes(video_dict)

    print('done')
    # store results on disk (with bool condition)
    # TODO store in mongoDB
