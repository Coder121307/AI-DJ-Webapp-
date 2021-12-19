song1 ="";
song2 ="";
leftWristX = 0;
leftWristY = 0;
rightWristX= 0;
rightWristY= 0;
leftWristScore=0;
rightWristScore=0;
songStatus="";
moreSongStatus="";


function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
    
}

function modelLoaded(){
    console.log("Posenet Has been initilized");
}

function draw(){
    image(video, 0, 0, 600, 500);
    fill("FF0000");
    stroke("FF0000");
    songStatus = song1.isPlaying();
    if(songStatus = false){
        song1.play();
        document.getElementById("song").innerHTML = music.mp3; 
    }
    moreSongStatus = song2.isPlaying();
    if(rightWristScore > 0.2){
        fill("FF0000");
        stroke("FF0000");
        circle(rightWristX, rightWristY, 20);
        song1.stop();
        if(moreSongStatus = false){
            song2.play();
            document.getElementById("song").innerHTML = music2.mp3;
        }
    }
}



function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        leftWristScore = results[0].pose.keypoints[9].score;
        rightWristScore = results[0].pose.keypoints[10].score;
        console.log("leftWristScore ="+ leftWristScore + "rightWristScore ="+ rightWristScore);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX "+ leftWristX + "leftWristY"+ leftWristY);
    }
}