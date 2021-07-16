from typing import List, Dict

import shot_detection
import utils
from keyframe import KeyFrameData
import json
from concept_classifier import ConceptClassifier, ModelType


def get_key_from_folder_path(folder_path: str) -> str:
    stripped_paths: List[str] = folder_path.split('/')

    for path in stripped_paths:
        if '.' in path:
            temp = path.split('.')
            return temp[0]


@utils.time_decorator
def time_measure(video_dict_keys, video_dict):
    for key in video_dict_keys:
        for keyframe in video_dict[key]:
            cc.add_predictions_to_keyframe(keyframe)


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
    for folder_path in folder_path_list:
        folder_key: str = get_key_from_folder_path(folder_path)
        video_dict[folder_key] = st.get_keyframes(folder_path)

    # add the classification to each keyframe

    video_dict_keys = video_dict.keys()

    kf: KeyFrameData = None

    time_measure(video_dict_keys, video_dict)

    print('done')
    # store results on disk (with bool condition)
    # TODO store in mongoDB
