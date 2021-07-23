import os
from typing import List, Dict
import shutil
from glob import glob
import cv2
from keyframe import KeyFrameData
import platform


def write_images_to_disk(keyframe_list: List[KeyFrameData],
                         root_folder: str,
                         directory_name: str,
                         video_name: str) -> None:
    path = os.path.join(directory_name, video_name)
    clean_create_directory(root_folder, path)
    path = os.path.join(root_folder, directory_name, video_name)
    os.chdir(path)

    print(os.curdir)
    for idx, keyframe_data in enumerate(keyframe_list):
        cv2.imwrite(f'{keyframe_data.index}', keyframe_data.image)


def clean_create_directory(root_folder: str, directory_name: str):
    print(f'{clean_create_directory.__name__}')
    root_folder = get_platform_path(root_folder)
    directory_name = get_platform_path(directory_name)

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
        print(f'Error: {directory_path} : {err.strerror}')


def store_all_keyframes(public_image_folder_path: str, video_dict: Dict[str, List[KeyFrameData]]):
    os.chdir(public_image_folder_path)
    for video_key in video_dict.keys():
        os.chdir(video_key)
        print(f'Storing keyframes in folder: {os.path.join(public_image_folder_path, video_key)}')
        for keyframe_data in video_dict[video_key]:
            cv2.imwrite(f'{keyframe_data.index}.png', keyframe_data.image)
        os.chdir(get_platform_path('../'))


def get_folder_elements_paths(folder_path: str = 'videos') -> List[str]:
    # TODO check if folder_path exists
    return [get_platform_path(element) for element in glob(f'{folder_path}/**')]


def get_platform_path(path: str) -> str:
    win_platform: str = 'wind'
    linux_platform: str = 'linux'
    macos_platform: str = 'darwin'
    current_platform: str = platform.system()
    current_platform = current_platform.lower()
    if win_platform in current_platform:
        path = path.replace('/', '\\')
    elif linux_platform in current_platform or macos_platform in current_platform:
        path = path.replace('\\', '/')
    return path
