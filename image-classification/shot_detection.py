import cv2
from utils import manhattan_distance
from keyframe import KeyFrameData
from concept_classifier import ConceptClassifier

KeyFrameDataList = [KeyFrameData]

concept_classifier = ConceptClassifier()


class ShotDetection:

    def __init__(self):
        self._detected_shots: KeyFrameDataList = []

    def get_keyframes(self, video_path: str = None, add_concepts_to_keyframe_list: bool = False) -> KeyFrameDataList:
        print(f'[Capture Video] for video path: {video_path}')
        if video_path is None or video_path == '':
            raise Exception('Video path must be provided!')

        video_frame_list = self._transform_video_to_frame_data_list(video_path)

        self._detected_shots = []
        self._keyframe_detection(video_frame_list)
        if add_concepts_to_keyframe_list:
            self._add_concepts_and_predictions()

        return self._detected_shots

    def _transform_video_to_frame_data_list(self, video_path: str = None) -> KeyFrameDataList:
        print('[Transform Video To Frama Data List]')
        if video_path is None or video_path == '':
            raise Exception('Video path must be provided!')
        frames: KeyFrameDataList = []

        video_capture = cv2.VideoCapture(video_path)

        while video_capture.isOpened():
            valid_frame, frame = video_capture.read()
            if valid_frame:
                frames.append(KeyFrameData(frame, video_path))
            else:
                break

        video_capture.release()

        return frames

    def _keyframe_detection(self, video_frame_list: KeyFrameDataList, threshold_d: int = 550000,
                            threshold_h: int = 200000):
        # old values td 25000, th = 90000 for keyframe_full
        print('[Detecting Keyframes]')
        T_D: int = threshold_d
        T_H: int = threshold_h

        first_frame: int = 0

        cumulative_threshold = 0
        count: int = 0
        for left_idx in range(len(video_frame_list) - 1):
            right_idx = left_idx + 1
            left_histogram = video_frame_list[left_idx].histogram_bin
            right_histogram = video_frame_list[right_idx].histogram_bin

            md = manhattan_distance(left_histogram, right_histogram)
            cumulative_threshold += md

            if md > T_D or cumulative_threshold > T_H:
                detected_shot_idx = first_frame + (right_idx - first_frame) // 2
                video_frame_list[detected_shot_idx].index = count
                self._detected_shots.append(video_frame_list[detected_shot_idx])
                first_frame = right_idx
                cumulative_threshold = 0
                count += 1
                continue

            if count % 1000 == 0:
                print('still detecting keyframes')

    def _add_concepts_and_predictions(self):
        print(f'Adding concepts to keyframe')
        for keyframe in self._detected_shots:
            concept_classifier.add_predictions_to_keyframe(keyframe)
        print('Finished adding concepts to keyframes')

    def __delete__(self, instance):
        cv2.destroyAllWindows()
