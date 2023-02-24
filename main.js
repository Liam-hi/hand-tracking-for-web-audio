/*     checkbox.addEventListener('input', function () {
    console.log("hej");
    }); */

let thumpTip;
let addDist = document.getElementById('dist');
let addReverb = document.getElementById('reverb');
let addPitch = document.getElementById('pitch');
let addAutoWah = document.getElementById('autowah');

let optdist = document.getElementById('optdist');
let optreverb = document.getElementById('optreverb');


function val(thumpTip) {
    document.getElementById("myRange").value =  thumpTip.x; 
    document.getElementById("myRange2").value =  thumpTip.y; 


    

/*     let checkbox = document.getElementById('checkbox');
    console.log(checkbox.checked); */

}


let distVal, reverbVal;


function objectTracking() {
    const player = new Tone.Player("1.mp3");
    player.autostart = true; 

    const dist = new Tone.Distortion(0).toMaster();
    const freeverb = new Tone.Freeverb(0, 0).toMaster();
    const pitchShift = new Tone.PitchShift(0).toMaster();
    const autoWah = new Tone.AutoWah().toMaster();
    player.connect(dist);
    player.connect(freeverb);
    player.connect(pitchShift);
    player.connect(autoWah);

    



    


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
                    drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS,
                    {color: '#3b9cff', lineWidth: 4});
                    drawLandmarks(canvasCtx, landmarks, {color: '#ffffff', lineWidth: 2});



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

                    console.log(distVal);

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

                    /* thumpTip = landmarks[4]; */
                    /* val(thumpTip); */
                    if (addDist.checked) {
                        console.log("Activated")
                        dist.distortion = distFinger * 10;
                    }
                    else {
                        dist.distortion = 0;
                    }
                
                    if (addReverb.checked) {
                        console.log("Activated")
                        freeverb.roomSize.value = 1;
                        freeverb.dampening.value = thumpTip.x * 500;
                        freeverb.wet.value = 1;
                    }
                    else {

                        freeverb.wet.value = 0;
                    }
                
                    if (addPitch.checked) {
                        console.log("Activated")
                        pitchShift.pitch = thumpTip.x * - 12;
                        pitchShift.wet.value = 1;
                
                    }
                    else {
                        pitchShift.wet.value = 0;
                    }
                    if (addAutoWah.checked) {
                        console.log("Activated")
                        autoWah.octaves.value = 4 * thumpTip.x;
                        autoWah.Q.value = thumpTip.x * 100;
                        autoWah.gain.value = 10;
             
                
                    }
                    else {
                        autoWah.wet.value = 0;
                    }




                }
            }
            canvasCtx.restore();
    
        }
    
        const hands = new Hands({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        }});
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

