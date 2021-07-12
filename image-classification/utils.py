import cv2
import numpy as np
import matplotlib.pyplot as plt
from functools import wraps
import time
import os
import shutil
from glob import glob
from typing import Tuple, List, Dict


def get_opencv_histogram_bin(frame, bin_size: int = 64, pixel_min_range: int = 0, pixel_max_range: int = 256) -> list:
    blue, green, red = cv2.split(frame)
    hist_blue = cv2.calcHist([blue], [0], None, [bin_size], [pixel_min_range, pixel_max_range])
    hist_green = cv2.calcHist([green], [0], None, [bin_size], [pixel_min_range, pixel_max_range])
    hist_red = cv2.calcHist([red], [0], None, [bin_size], [pixel_min_range, pixel_max_range])
    weight: float = 0.33
    histogram = weight * (hist_blue + hist_green + hist_red)

    return histogram


def manhattan_distance(hist_left: np.ndarray, hist_right: np.ndarray) -> int:
    assert len(hist_left) == len(hist_right), 'Length of histograms does not match!'
    temp_sum: int = 0
    for i in range(len(hist_left)):
        temp_sum += abs(hist_left[i] - hist_right[i])
    return temp_sum


def euclidian_distance(hist_left: np.ndarray, hist_right: np.ndarray) -> float:
    temp_sum: float = 0
    for i in range(len(hist_left)):
        temp_sum += np.sqrt(np.square(hist_left[i] - hist_right[i]))
    return temp_sum


def plot_image_list(image_list: list, cols: int = 5) -> None:
    rows: int = len(image_list) // cols
    if rows % 1 != 0:
        rows += 1

    plt.axis('off')

    image_idx: int = 0
    for i in range(rows):
        for k in range(cols):
            plt.subplot((i + 1), cols, (k + 1))
            current_image = image_list[image_idx]
            plt.imshow(cv2.cvtColor(current_image, cv2.COLOR_BGR2RGB))
            image_idx += 1

    plt.show()


def write_images_to_disk(image_list: list, directory_name: str = 'detected_shots') -> None:
    directory_path: str = os.getcwd()
    path = os.path.join(directory_path, directory_name)
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


def get_folder_elements_paths(folder_path: str = 'videos') -> List[str]:
    # TODO check if folder_path exists

    # element_path_list: List[str] = []
    # for element in glob(folder_path):
    #     element_path_list.append(element)
    return [element for element in glob(folder_path)]


def delete_directory_and_contents(directory_path: str) -> None:
    try:
        shutil.rmtree(directory_path)
    except OSError as err:
        print('Error: {} : {}'.format(directory_path, err.strerror))


def time_decorator(my_func):
    @wraps(my_func)
    def timed(*args, **kw):
        t_start = time.time()
        output = my_func(*args, **kw)
        t_end = time.time()

        print('"{}" took {:.3f} ms to execute\n'.format(my_func.__name__, (t_end - t_start) * 1000))
        return output

    return timed
