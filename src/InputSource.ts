let audioctx: AudioContext;
let analyser: AnalyserNode;
let audioSrc: MediaStreamAudioSourceNode;

//[255, 255, 235, 163, 152, 128, 131, 144, 160, 158, 133, 146, 165, 168, 172, 175, 137, 147, 126, 121, 136, 135, 117, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

const FFT_SIZE = 64;
export function go() {
    /*eslint-disable-next-line no-constant-condition*/
    if ('localtrack') {
        const localTrack = document.querySelector('audio');
        if (localTrack) {
            audioctx = new AudioContext();

            if (!audioSrc) {
                (audioSrc as any) = audioctx.createMediaElementSource(
                    localTrack
                );

                const gainNode = audioctx.createGain();
                gainNode.gain.value = 0;

                analyser = audioctx.createAnalyser();
                (audioSrc as any).connect(analyser);

                // analyser.connect(gainNode);
                // I think this line below was routing the mic to the speakers
                (audioSrc as any).connect(audioctx.destination);

                analyser.fftSize = FFT_SIZE; // because i am not a fancy man

                // const bufferLength = analyser.fftSize;
                // dataArray = new Uint8Array(bufferLength);
                // analyser.getByteFrequencyData(dataArray);
            }
        }
    } else {
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: false })
            .then(function (stream) {
                // const test = stream.getAudioTracks();
                //stream.getTracks()[0].

                audioctx = new AudioContext();
                audioSrc = audioctx.createMediaStreamSource(stream);

                const gainNode = audioctx.createGain();
                gainNode.gain.value = 0;

                analyser = audioctx.createAnalyser();
                audioSrc.connect(analyser);

                // analyser.connect(gainNode);
                // I think this line below was routing the mic to the speakers
                // audioSrc.connect(audioctx.destination);

                analyser.fftSize = FFT_SIZE; // because i am not a fancy man

                // const bufferLength = analyser.fftSize;
                // dataArray = new Uint8Array(bufferLength);
                // analyser.getByteFrequencyData(dataArray);
            })
            .catch(function () {
                console.error('too quiet');
            });
    }
}

/**
 *returns an array of length 24, values 0 - 255
 * [255, 255, 216, 132, 104, 97, 103, 121, 119, 127, 136, 135, 115, 117, 90, 51, 0, 0, 0, 0, 0, 0, 0, 0,0]
 */
export function getSongDataArray() {
    if (analyser) {
        analyser.smoothingTimeConstant = 0;
        const dataArray: Uint8Array = new Uint8Array(FFT_SIZE);
        analyser?.getByteFrequencyData(dataArray);
        return dataArray.slice(0, 24); // 24 just happens to be the magic number where getByteFrequencyData only has values upto the 24th place
    } else {
        return new Uint8Array(24);
    }
}
