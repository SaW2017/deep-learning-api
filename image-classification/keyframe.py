from utils import get_opencv_histogram_bin


class KeyFrameData:

    def __init__(self, keyframe=None, video_path: str = None):
        self.keyframe = keyframe
        self.path = video_path
        self.histogram_bin = get_opencv_histogram_bin(self.keyframe)
        self.classifier = None # TODO
