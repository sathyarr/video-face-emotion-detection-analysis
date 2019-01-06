# Video - Face Emotion detection and analysis

<b>Worked Demo:</b>

<a href="http://www.youtube.com/watch?feature=player_embedded&v=C3VNQrfaVwQ
" target="_blank"><img src="http://img.youtube.com/vi/C3VNQrfaVwQ/0.jpg" 
alt="Video Face and Emotion detection and analysis" width="240" height="180" border="10" /></a>

The idea is built on top of <b>face-api.js</b> utilizing serveral key features.

This one page application analyzes the given video/movie to detect multiple faces.

For all the faces, it calculates the possible emotion through various algorithms.

<b>What can you expect:</b>
1. Choose any video file that you want to play with.
2. Upon processing, the faces(yes, mulitple) are tracked and emotions are calculated in real time
3. The cumulative values of all the emotions are modelled in a Graph for extensive analysis
4. Explore the graph further by selecting only the type of emotions that you want to compare
5. Take a look at the Footer any time irrespective of the selection in Graph
6. Every face processed at a given point of time is displayed below the video
7. Those images have a nice border around them matching the calculated emotion
8. Pause anytime to make calculations of yourself too

<b>What else do you want to Configure:</b>
1. Select any of the three Models(SSD Mobilenet V1, Tiny Face Detector, MTCNN)
2. More? Tweak several variables for the choosen algorithm as your wish
3. Show or hide bounding box over the face
4. Show or hide facial landmarks if needed

<b>How to Run:</b>
1. Download the project locally
2. Navigate to <code>/examples/examples-browser/</code>
3. Open Terminal and run <code>npm i</code>, <code>npm start</code>
4. Head over to the browser and click http://localhost:3000/video_face_tracking

[As of now the video could be changed by changing the <code>src</code> attribute of <code>video</code> element]
Place the video file in <code>/examples/media/</code> and assign its name

<b>Resources to look:</b>
1. http://www.paulvangent.com/2016/04/01/emotion-recognition-with-python-opencv-and-a-face-dataset/
2. https://docs.opencv.org/3.4/d7/d8b/tutorial_py_face_detection.html
3. https://github.com/oarriaga/face_classification
4. https://github.com/auduno/clmtrackr

Do contribute if you're curious.

Have fun!
