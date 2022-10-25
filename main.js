Alan = "Alan-Walker-Force.mp3";
Cartoon = "On And On.mp3";
window.alert("Don't Forget To Maintain *2 to 4 feet* Distance From The Webcam For The Proper Working Of The Website!!!")
window.alert("The circle indicating your left and right wrist may not be at proper cordinates because of different webcam resulution!!!")
leftX = 0;
rightX = 0;
leftY = 0;
rightY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function preload(){
    force = loadSound(Alan);
    onNon = loadSound(Cartoon);
}

function setup(){
    canvas = createCanvas(350,350);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
}

function modelLoaded(){
    console.log("PoseNet Is Initialized!!!");
    poseNet.on('pose', gotResults);
}

function gotResults(results){
    if(results.length > 0){

        leftX = (results[0].pose.leftWrist.x)/1280 * 350;
        leftY = (results[0].pose.leftWrist.y)/720 * 350;

        rightX = (results[0].pose.rightWrist.x)/1280 * 350;
        rightY = (results[0].pose.rightWrist.y)/720 * 350;

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;

        console.log("XL = "  +  leftX + "  || YL = "  + leftY + "   |||| XR = " + rightX + "  || YR = " + rightY);
    }
}

function draw(){
    image(video,0,0,350,350);
    fill("rgb(255,0,0)");
    stroke("rgb(255,255,255)");

    if(scoreLeftWrist > 0.1){
        console.log("Left");
        circle(leftX, leftY, 20);
        if(force.isPlaying() == false){
            onNon.stop();
            force.play();
            document.querySelector("#song_name").innerHTML = "Song Name :- Force By Alan Walker";
         }
    }

    if(scoreRightWrist > 0.1){
        console.log("Right");
        circle(rightX, rightY, 20);
        if(onNon.isPlaying() == false){
            force.stop();
            onNon.play();
            document.querySelector("#song_name").innerHTML = "Song Name :- On and On By Cartoon";
    }
    }
}