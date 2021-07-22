import os
from typing import List
import shutil
from glob import glob
import cv2
from keyframe import KeyFrameData


def write_images_to_disk(keyframe_list: List[KeyFrameData],
                         root_folder: str,
                         directory_name: str,
                         video_name: str) -> None:
    path = os.path.join(directory_name, video_name)
    clean_create_directory(root_folder, path)
    path = os.path.join(root_folder, directory_name, video_name)
    os.chdir(path)

    for idx, keyframe_data in enumerate(keyframe_list):
        cv2.imwrite(f'{keyframe_data.keyframe_id}', keyframe_data.image)


def clean_create_directory(root_folder: str, directory_name: str):
    print(f'{clean_create_directory.__name__}')
    path = os.path.join(root_folder, directory_name)

    if os.path.exists(path) and os.path.isdir(path):
        delete_directory_and_contents(root_folder, directory_name)

    os.mkdir(path)


def delete_directory_and_contents(root_folder: str, directory_path: str) -> None:
    print(f'{delete_directory_and_contents.__name__}')
    try:
        path = os.path.join(root_folder, directory_path)
        print(f'Path: {path}')
        shutil.rmtree(path)
    except OSError as err:
        print('Error: {} : {}'.format(directory_path, err.strerror))




def get_folder_elements_paths(folder_path: str = 'videos') -> List[str]:
    # TODO check if folder_path exists
    return [element for element in glob(f'{folder_path}/**')]
