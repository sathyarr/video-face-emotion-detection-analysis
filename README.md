The idea is built on top of face-api.js utilizing serveral key features.

This one page application analyzes the given video/movie to detect multiple faces.

For all the faces, it calculates the possible emotion through various algorithms.

What can you expect:
1. Choose any video file that you want to play with.
2. Upon processing, the faces(yes, mulitple) are tracked and emotions are calculated in real time
3. The cumulative values of all the emotions are modelled in a Graph for extensive analysis
4. Explore the graph further by selecting only the type of emotions that you want to compare
5. Take a look at the Footer any time irrespective of the selection in Graph
6. Every face processed at a given point of time is displayed below the video
7. Those images have a nice border around them matching the calculated emotion
8. Pause anytime to make calculations of yourself too

What else do you want to Configure:
1. Select any of the three Models(SSD Mobilenet V1, Tiny Face Detector, MTCNN)
2. More? Tweak several variables for the choosen algorithm as your wish
3. Show or hide bounding box over the face
4. Show or hide facial landmarks if needed

How to Run:
1. Download the project locally
2. Navigate to /examples/examples-browser/
3. Open Terminal and run npm i, npm start
4. Head over to the browser and click http://localhost:3000/video_face_tracking

[As of now the video could be changed by changing the src attribute of video element]
Place the video file in /examples/media/ and give its name

Resources to look:
1. http://www.paulvangent.com/2016/04/01/emotion-recognition-with-python-opencv-and-a-face-dataset/
2. https://docs.opencv.org/3.4/d7/d8b/tutorial_py_face_detection.html
3. https://github.com/oarriaga/face_classification
4. https://github.com/auduno/clmtrackr

Contribute if you're curious.
Have fun!
