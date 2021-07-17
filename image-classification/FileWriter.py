import os
from typing import List
import shutil

import cv2
from keyframe import KeyFrameData


def write_images_to_disk(image_list: List[KeyFrameData], directory_name: str = 'detected_shots', video_name: str = None) -> None:
    directory_path: str = os.getcwd()
    path = os.path.join(directory_path, directory_name, video_name)
    clean_create_directory(directory_name)
    os.chdir(path)

    for idx, image in enumerate(image_list):
        cv2.imwrite('image_{}.jpg'.format(idx), image)
    os.chdir(directory_path)


def clean_create_directory(directory_name: str = None):
    current_directory: str = os.getcwd()
    path = os.path.join(current_directory, directory_name)

    if os.path.exists(directory_name) and os.path.isdir(directory_name):
        delete_directory_and_contents(directory_name)

    os.mkdir(path)


def delete_directory_and_contents(directory_path: str) -> None:
    try:
        shutil.rmtree(directory_path)
    except OSError as err:
        print('Error: {} : {}'.format(directory_path, err.strerror))
