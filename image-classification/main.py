from typing import List, Dict

import shot_detection
import utils
from keyframe import KeyFrameData
import json


def get_key_from_folder_path(folder_path: str) -> str:
    stripped_paths: List[str] = folder_path.split('/')

    for path in stripped_paths:
        if '.' in path:
            temp = path.split('.')
            return temp[0]


if __name__ == '__main__':
    print('start keyframe detection')
    st = shot_detection.ShotDetection()
    #
    # detected_keyframes = st.get_keyframes('everest.mp4')
    # utils.write_images_to_disk(detected_keyframes)
    #
    print('finished keyframe detection')

    folder_path_list: List[str] = utils.get_folder_elements_paths()

    video_dict: Dict[str, List[KeyFrameData]] = {}

    for folder_path in folder_path_list:
        folder_key: str = get_key_from_folder_path(folder_path)
        video_dict[folder_key] = st.get_keyframes(folder_path)

    for key, value in video_dict.items():
        print(key, len(value))
        for elem in value[:1]:
            print(elem.to_json_object())
    # store results on disk (with bool condition)
    # TODO store in mongoDB
