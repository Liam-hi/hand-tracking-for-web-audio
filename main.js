let distVal, reverbVal, pitchVal, crusherVal, delayVal;
let addDist = document.getElementById('dist');
let addReverb = document.getElementById('reverb');
let addPitch = document.getElementById('pitch');
let addCrusher = document.getElementById('crusher');
let addDelay = document.getElementById('delay');
let optdist = document.getElementById('optdist');
let optreverb = document.getElementById('optreverb');
let optpitch = document.getElementById('optpitch');
let optcrusher = document.getElementById('optcrusher');
let optdelay = document.getElementById('optdelay');

// Reset sliders
document.getElementById("distrange").value = 0;
document.getElementById("reverbrange").value = 0;
document.getElementById("pitchrange").value = 0;
document.getElementById("bitrange").value = 0;
document.getElementById("delayrange").value = 0;

function objectTracking() {
    const player = new Tone.Player("1.mp3");
    player.autostart = true;
    const dist = new Tone.Distortion(0).toMaster();
    const freeverb = new Tone.Freeverb(0, 0).toMaster();
    const pitchShift = new Tone.PitchShift(0).toMaster();
    const crusher = new Tone.BitCrusher(0).toMaster();
    const feedbackDelay = new Tone.FeedbackDelay().toMaster();

    player.connect(dist);
    player.connect(freeverb);
    player.connect(pitchShift);
    player.connect(crusher);
    player.connect(feedbackDelay);

    // Prevent leaking sound
    dist.wet.value = 0;
    freeverb.wet.value = 0;
    pitchShift.wet.value = 0;
    crusher.wet.value = 0;
    feedbackDelay.wet.value = 0;



    const videoElement = document.getElementsByClassName('input_video')[0];
    const canvasElement = document.getElementsByClassName('output_canvas')[0];
    const canvasCtx = canvasElement.getContext('2d');

    function onResults(results) {
        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
        canvasCtx.drawImage(
            results.image, 0, 0, canvasElement.width, canvasElement.height);

        if (results.multiHandLandmarks) {
            for (const landmarks of results.multiHandLandmarks) {
                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
                    color: '#3b9cff',
                    lineWidth: 4
                });
                drawLandmarks(canvasCtx, landmarks, {
                    color: '#ffffff',
                    lineWidth: 2
                });

                if (optdist.value == "thumb") {
                    distVal = landmarks[4].x;
                }
                if (optdist.value == "index") {
                    distVal = landmarks[8].x;
                }
                if (optdist.value == "middle") {
                    distVal = landmarks[12].x;
                }
                if (optdist.value == "ring") {
                    distVal = landmarks[16].x;
                }
                if (optreverb.value == "thumb") {
                    reverbVal = landmarks[4].x;
                }
                if (optreverb.value == "index") {
                    reverbVal = landmarks[8].x;
                }
                if (optreverb.value == "middle") {
                    reverbVal = landmarks[12].x;
                }
                if (optreverb.value == "ring") {
                    reverbVal = landmarks[16].x;
                }
                if (optreverb.value == "thumb") {
                    reverbVal = landmarks[4].x;
                }
                if (optreverb.value == "index") {
                    reverbVal = landmarks[8].x;
                }
                if (optreverb.value == "middle") {
                    reverbVal = landmarks[12].x;
                }
                if (optreverb.value == "ring") {
                    reverbVal = landmarks[16].x;
                }
                if (optpitch.value == "thumb") {
                    pitchVal = landmarks[4].x;
                }
                if (optpitch.value == "index") {
                    pitchVal = landmarks[8].x;
                }
                if (optpitch.value == "middle") {
                    pitchVal = landmarks[12].x;
                }
                if (optpitch.value == "ring") {
                    pitchVal = landmarks[16].x;
                }
                if (optcrusher.value == "thumb") {
                    crusherVal = landmarks[4].x;
                }
                if (optcrusher.value == "index") {
                    crusherVal = landmarks[8].x;
                }
                if (optcrusher.value == "middle") {
                    crusherVal = landmarks[12].x;
                }
                if (optcrusher.value == "ring") {
                    crusherVal = landmarks[16].x;
                }

                if (optdelay.value == "thumb") {
                    delayVal = landmarks[4].x;
                }
                if (optdelay.value == "index") {
                    delayVal = landmarks[8].y;
                }
                if (optdelay.value == "middle") {
                    delayVal = landmarks[12].x;
                }
                if (optdelay.value == "ring") {
                    delayVal = landmarks[16].y;
                }

                if (addDist.checked) {
                    console.log("Activated")
                    dist.distortion = distVal * 10;
                    document.getElementById("distrange").value = distVal;
                    dist.wet.value = 1;
                } else {
                    dist.distortion = 0;
                    dist.wet.value = 0;
                    document.getElementById("distrange").value = 0;
                }
                if (addReverb.checked) {
                    console.log("Activated")
                    freeverb.roomSize.value = 1;
                    freeverb.dampening.value = reverbVal * 500;
                    freeverb.wet.value = 1;
                    document.getElementById("reverbrange").value = reverbVal;
                } else {

                    freeverb.wet.value = 0;
                    document.getElementById("reverbrange").value = 0;
                }
                if (addPitch.checked) {
                    console.log("Activated")
                    pitchShift.pitch = pitchVal * -12;
                    pitchShift.wet.value = 1;
                    document.getElementById("pitchrange").value = pitchVal;
                } else {
                    pitchShift.wet.value = 0;
                    document.getElementById("pitchrange").value = 0;
                }
                if (addCrusher.checked) {
                    console.log("Activated")
                    crusher.bits = crusherVal * 2;
                    crusher.wet.value = 1;
                    document.getElementById("bitrange").value = crusherVal;
                } else {
                    crusher.wet.value = 0;
                    document.getElementById("bitrange").value = 0;
                }

                if (addDelay.checked) {
                    console.log("Activated")
                    feedbackDelay.delayTime = "4n";
                    feedbackDelay.feedback = delayVal * 100;
                    feedbackDelay.wet.value = 1;
                    document.getElementById("delayrange").value = delayVal;
                
                } else {
                    feedbackDelay.wet.value = 0;
                    document.getElementById("delayrange").value = 0;
                
                }
            }
        }
        canvasCtx.restore();
    }
    const hands = new Hands({
        locateFile: (file) => {
            return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }
    });
    hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });
    hands.onResults(onResults);


    async function onFrame() {
        if (!videoElement.paused && !videoElement.ended) {
            await hands.send({
                image: videoElement
            });
            await new Promise(requestAnimationFrame);
            onFrame();
        } else
            setTimeout(onFrame, 500);
    }

    videoElement.src = "./1.mp4";
    videoElement.onloadeddata = (evt) => {
        let video = evt.target;
        canvasElement.width = video.videoWidth;
        canvasElement.height = video.videoHeight;
        videoElement.play();
        onFrame();
    }


}