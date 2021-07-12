from typing import List

import shot_detection
import utils


def get_key_from_folder_path(folder_path: str) -> str:
    stripped_paths: List[str] = folder_path.split('/')

    for path in stripped_paths:
        if '.' in path:
            temp = path.split('.')
            return temp[0]


if __name__ == '__main__':
    # print('start keyframe detection')
    st = shot_detection.ShotDetection()
    #
    # detected_keyframes = st.get_keyframes('everest.mp4')
    # utils.write_images_to_disk(detected_keyframes)
    #
    # print('finished keyframe detection')

    folder_path_list: List[str] = utils.get_folder_elements_paths()

    video_dict: dict = {}

    for folder_path in folder_path_list:
        folder_key: str = get_key_from_folder_path(folder_path)
        video_dict[folder_key] = st.get_keyframes(folder_path)
