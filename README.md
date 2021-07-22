# Shot Detection


## Installation Python Environment

This assignment used Anaconda as the Python environment.

To install this environment, please enter the following command in the root directory of this project in your terminal:

` conda env create -f environment.yml`. Then activate the environment using the command: `conda activate video_search_project`.

This should install the dependencies needed for this assignment.

Afterwards, it should be possible to run the code from the project root using the command: `python main.py`.
This will execute the shot detection and saves the detected shots in a folder called `detected_shots`.

Note: OpenCV version `4.5.1.48` was used for this project, but was not specified in the `.yml` file and all OpenCV versions >= `4.2 should probably work just fine.

* `conda install -c pytorch pytorch`

## Content

The first assignment was to apply shot detection for the provided video `"everest.mp4"`.
This was done by calculating a 64-bin histogram for each extracted frame and calculating the difference between the neighbouring frames.

In this version, the selected key frame is simply the frame in the middle of a shot range, 
and it is planned to replace this with a clustering method in future versions.


## Keyframe JSON Structure

```json
{
    "videos/everest.mp4_image_0": {
        "concept_classifier": {
            "classifier": "alex-net",
            "concepts": [
                [
                    "Neufoundland Dog",
                    0.89
                ]
            ]
        },
        "index": 0,
        "keyframe": [
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ]
        ],
        "path": "videos/everest.mp4"
    }
}
```


## Installation Server Environment

First install MongoDB. Explanation is here:
install MongoDB
https://medium.com/@LondonAppBrewery/how-to-download-install-mongodb-on-windows-4ee4b3493514

Afterwards create a Database with the name: video_search and a collection keyframe_documents

-------------------

In Project deep-learning-api:

Change into Server Folder and open terminal.
Run:

```
npm install
```
and to Start Server
run:
```
npm run devStart
```
