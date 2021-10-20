import React, { useState } from 'react';
import styled from '@emotion/styled';
import { go } from './InputSource';

let bpm = 0;
export const getBPM = () => bpm;

export const AudioPlayer = ({
    audioRef,
}: {
    audioRef: React.RefObject<HTMLAudioElement>;
}) => {
    const [trackInfo, setTrackInfo] = useState({ trackSrc: '', trackName: '' });

    return (
        <Wrapper
            onDrop={(e: React.DragEvent) => {
                e.preventDefault();
                go();
                const wasPlaying = !audioRef.current?.paused;
                setTrackInfo({
                    trackSrc: URL.createObjectURL(
                        e.dataTransfer.items[0].getAsFile()!
                    ),
                    trackName: e.dataTransfer.files[0].name,
                });
                const reader = new FileReader();
                const audioCTX = new AudioContext();
                reader.onload = function () {
                    audioCTX.decodeAudioData(
                        reader.result as ArrayBuffer,
                        function (buffer) {
                            prepare(buffer);
                        }
                    );
                };

                reader.readAsArrayBuffer(e.dataTransfer.items[0].getAsFile()!);

                const closurer = (entry?: HTMLMediaElement) => () => {
                    if (entry) {
                        entry.play();
                        // entry.oncanplaythrough = () => { };
                    }
                };

                if (wasPlaying && audioRef.current) {
                    audioRef.current.oncanplaythrough = closurer(
                        audioRef.current
                    );
                }
            }}
            onDragOver={(e) => {
                e.preventDefault();
            }}
        >
            <audio
                ref={audioRef}
                src={trackInfo.trackSrc}
                controls
                {...{ trackName: trackInfo.trackName }}
            />
        </Wrapper>
    );
};

const Wrapper = styled.div({
    minHeight: '40px',
    minWidth: '40px ',
    backgroundColor: '#AFAFAF',
    border: '2px dashed GREY',
    borderRadius: '10px',
});

// pretty much stolen from https://stackoverflow.com/questions/30110701/how-can-i-use-js-webaudioapi-for-beat-detection
function prepare(buffer: AudioBuffer) {
    const offlineContext = new OfflineAudioContext(
        1,
        buffer.length,
        buffer.sampleRate
    );
    const source = offlineContext.createBufferSource();
    source.buffer = buffer;
    const filter = offlineContext.createBiquadFilter();
    filter.type = 'peaking';
    source.connect(filter);
    filter.connect(offlineContext.destination);
    source.start(0);
    offlineContext.startRendering();
    offlineContext.oncomplete = function (e) {
        process(e);
    };
}

function process(e: OfflineAudioCompletionEvent) {
    const filteredBuffer = e.renderedBuffer;
    //If you want to analyze both channels, use the other channel later
    const data = filteredBuffer.getChannelData(0);
    const max = arrayMax(data);
    const min = arrayMin(data);
    const threshold = min + (max - min) * 0.98;
    const peaks = getPeaksAtThreshold(data, threshold);
    const intervalCounts = countIntervalsBetweenNearbyPeaks(peaks);
    const tempoCounts = groupNeighborsByTempo(intervalCounts);
    bpm = 0;
    tempoCounts.sort(function (a, b) {
        return b.count - a.count;
    });
    if (tempoCounts.length) {
        bpm = tempoCounts[0].tempo;
        console.log(bpm);
    } else {
        console.log('p', peaks, 'ic', intervalCounts, 'tc', tempoCounts);
    }
}

// http://tech.beatport.com/2014/web-audio/beat-detection-using-web-audio/
function getPeaksAtThreshold(data: Float32Array, threshold: number) {
    const peaksArray = [];
    const { length } = data;
    for (let i = 0; i < length;) {
        if (data[i] > threshold) {
            peaksArray.push(i);
            // Skip forward ~ 1/4s to get past this peak.
            i += 5000;
        }
        i++;
    }
    return peaksArray;
}

function countIntervalsBetweenNearbyPeaks(peaks: number[]) {
    const intervalCounts: IntervalCount[] = [];
    peaks.forEach(function (peak, index) {
        for (let i = 0; i < 10; i++) {
            const interval = peaks[index + i] - peak;
            const foundInterval = intervalCounts.some(function (intervalCount) {
                if (intervalCount.interval === interval)
                    return intervalCount.count++;
            });
            //Additional checks to avoid infinite loops in later processing
            if (!isNaN(interval) && interval !== 0 && !foundInterval) {
                intervalCounts.push({
                    interval: interval,
                    count: 1,
                });
            }
        }
    });
    return intervalCounts;
}

function groupNeighborsByTempo(intervalCounts: IntervalCount[]) {
    const tempoCounts: TempoCount[] = [];
    intervalCounts.forEach(function (intervalCount) {
        //Convert an interval to tempo
        let theoreticalTempo = 60 / (intervalCount.interval / 44100);
        theoreticalTempo = Math.round(theoreticalTempo);
        if (theoreticalTempo === 0) {
            return;
        }

        // Adjust the tempo to fit within the 90-180 BPM range
        while (theoreticalTempo < 90) {
            theoreticalTempo *= 2;
        }
        while (theoreticalTempo > 180) {
            theoreticalTempo /= 2;
        }

        const foundTempo = tempoCounts.some(function (tempoCount) {
            if (tempoCount.tempo === theoreticalTempo)
                return (tempoCount.count += intervalCount.count);
        });
        if (!foundTempo) {
            tempoCounts.push({
                tempo: theoreticalTempo,
                count: intervalCount.count,
            });
        }
    });
    return tempoCounts;
}

// http://stackoverflow.com/questions/1669190/javascript-min-max-array-values
function arrayMin(arr: Float32Array) {
    let len = arr.length,
        min = Infinity;
    while (len--) {
        if (arr[len] < min) {
            min = arr[len];
        }
    }
    return min;
}

function arrayMax(arr: Float32Array) {
    let len = arr.length,
        max = -Infinity;
    while (len--) {
        if (arr[len] > max) {
            max = arr[len];
        }
    }
    return max;
}
type TempoCount = { tempo: number; count: number };
type IntervalCount = { interval: number; count: number };
