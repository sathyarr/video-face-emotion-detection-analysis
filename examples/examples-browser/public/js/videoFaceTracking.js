var app = angular.module('myApp', []);

  app.controller('myCtrl', function($scope) {

    $scope.emotionsCount = {
      neutral: 0,
      surprised: 0,
      angry: 0,
      disguised: 0,
      fearful: 0,
      sad: 0,
      happy: 0
    }

    let graphLabels = ["neutral", "surprised", "angry", "disguised", "fearful", "sad", "happy"];
    let graphData = [0, 0, 0, 0, 0, 0, 0];

    let forwardTimes = []
    let withFaceLandmarks = false
    let withBoxes = true

    onChangeWithFaceLandmarks = function(e) {
      withFaceLandmarks = $(e.target).prop('checked')
    }

    onChangeHideBoundingBoxes = function(e) {
      withBoxes = !$(e.target).prop('checked')
    }

    function updateTimeStats(timeInMs) {
      forwardTimes = [timeInMs].concat(forwardTimes).slice(0, 30)
      const avgTimeInMs = forwardTimes.reduce((total, t) => total + t) / forwardTimes.length
      $('#time').val(`${Math.round(avgTimeInMs)} ms`)
      $('#fps').val(`${faceapi.round(1000 / avgTimeInMs)}`)
    }

    async function onPlay(videoEl) {
      if(!videoEl.currentTime || videoEl.paused || videoEl.ended || !isFaceDetectionModelLoaded())
        return setTimeout(() => onPlay(videoEl))

      const options = getFaceDetectorOptions()

      const ts = Date.now()

      const faceDetectionTask = faceapi.detectAllFaces(videoEl, options)

      const results = withFaceLandmarks
        ? await faceDetectionTask.withFaceExpressions().withFaceLandmarks()
        : await faceDetectionTask.withFaceExpressions()

      var resultExpressions = [];

      if(results) {
        results.forEach(function(result){
          let unsorted = result.expressions;
          let sorted = unsorted.sort((a, b) => b.probability - a.probability);
          $scope.emotionsCount[sorted[0].expression]++;
          resultExpressions.push(sorted[0]);

          // TODO: could be changed as batch update for all faces in the current frame
          $scope.$apply();
          updateGraphData();
        });
      }

      const faceImages = await faceapi.extractFaces(videoEl, results.map(res => res.detection))
      displayExtractedFaces(faceImages, resultExpressions)

      updateTimeStats(Date.now() - ts)

      const drawFunction = withFaceLandmarks
        ? drawLandmarks
        : drawDetections

      if(drawFunction != drawDetections || withBoxes == true) {
        drawFunction(videoEl, $('#overlay').get(0), results, withBoxes)
      }

      setTimeout(() => onPlay(videoEl))
    }

    emotionsColor = {
      neutral: "green",
      surprised: "orange",
      angry: "red",
      disguised: "blue",
      fearful: "purple",
      sad: "gray",
      happy: "deeppink"
    }

    function displayExtractedFaces(faceImages, expressions) {
      canvas = $('#overlay').get(0)
      const { width, height } = $('#inputVideo').get(0)
      canvas.width = width // $('#inputVideo').get(0).offsetWidth;
      canvas.height = height // $('#inputVideo').get(0).offsetHeight;

      $('#facesContainer').empty()

      for(let i = 0; i < faceImages.length; i++){
        faceImages[i].className = "extractedFace";
        faceImages[i].style.borderColor = emotionsColor[expressions[i].expression];
        $('#facesContainer').append(faceImages[i])
      }

      // faceImages.forEach(canvas => $('#facesContainer').append(canvas))
    }

    playVideo = async function(){
      let videoEl = $("#inputVideo").get(0);
      if(videoEl.paused) {
        $('#playPauseBtn').text('Pause');
        await videoEl.play();
      } else {
        $('#playPauseBtn').text('Play');
        await videoEl.pause();
      }
    }

    async function run() {
      // load face detection and face landmark models
      await changeFaceDetector(TINY_FACE_DETECTOR)
      await faceapi.loadFaceExpressionModel('/')
      await faceapi.loadFaceLandmarkModel('/')
      changeInputSize(416)

      // start processing frames
      onPlay($('#inputVideo').get(0))
    }

    updateResults = function() {}

    $(document).ready(function() {
      // renderNavBar('#navbar', 'video_face_tracking')
      $('.modal').modal();
      initFaceDetectionControls()
      run()
    })

    var ctx = document.getElementById("myChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: graphLabels,
            datasets: [{
                label: 'Type of Emotion',
                data: graphData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(255,99,132,1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });

    onChangeGraphLabel = function(e, label) {
      if($(e.target).prop('checked')) {
        graphLabels.push(label);
        graphData.push($scope.emotionsCount[label]);
        // myChart.data.datasets[0].data = graphData;
        myChart.update();
      }
      else {
        removeLabelFromGraph(label);
      }
    }

    function removeLabelFromGraph(label) {
      let index = graphLabels.indexOf(label);
      if (index > -1) {
        graphLabels.splice(index, 1);
        graphData.splice(index, 1);
        // myChart.data.datasets[0].data = graphData;
        myChart.update();
      }
    }

    function updateGraphData() {
      graphData = [];
      //TODO: optimization could be performed
      graphLabels.forEach(function(label) {
        graphData.push($scope.emotionsCount[label]);
      });
      // TODO: only upon explicitly assigning, it works. analyze
      myChart.data.datasets[0].data = graphData;
      myChart.update();
    }
  });