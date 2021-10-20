import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { asyncMixLoader } from './mixer/MixerEffects';
import { beginProjection } from './projectionWindow';
import { FPS, FPS_RATE, VIDEO_HEIGHT, VIDEO_WIDTH } from './constants';
import { store } from './store';
import { useRequestInterval } from './useRequestInterval';
import { useTimeout } from './useTimeout';
import { Slider } from './Slider';
import { EffectSelector } from './EffectSelector';



// const memory = new WebAssembly.Memory({
//     initial: 24,
//     maximum: 24,
//     shared: true
// } as WebAssembly.MemoryDescriptor & { shared: boolean });

// const i8 = new Uint8ClampedArray(memory.buffer);

//import falter from './svgFilters/test.svg';

interface ScreenProps {
    L: React.RefObject<HTMLCanvasElement>;
    R: React.RefObject<HTMLCanvasElement>;
    audioRef: React.RefObject<HTMLAudioElement>;
}
export const Screen = (props: ScreenProps) => {
    const mixEffects = useRef<any | null>(null)
    asyncMixLoader().then(a => { mixEffects.current = a })
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let lCanvasCtx: CanvasRenderingContext2D | undefined;
    let rCanvasCtx: CanvasRenderingContext2D | undefined;

    let canvasCtx: CanvasRenderingContext2D | undefined;

    const initializedScreensAndModules = () => {
        const canvasContextConfig = {
            willReadFrequently: true,
            alpha: true,
            //  desynchronized: true unsure if this does anything atm
        }
        canvasCtx = canvasRef.current!.getContext('2d', canvasContextConfig)! as CanvasRenderingContext2D;
        lCanvasCtx = props.L.current!.getContext('2d', canvasContextConfig)! as CanvasRenderingContext2D;
        rCanvasCtx = props.R.current!.getContext('2d', canvasContextConfig)! as CanvasRenderingContext2D;
    }

    useTimeout(initializedScreensAndModules, 500);
    // const mutateFunctionRef = useRef<() => void | null>()

    // useEffect(() => {
    //     instantiateStreaming<typeof MyModule>(fetch('./assembly/myModule.release.wasm'), { env: { memory } }).then(({ exports: { allOnes, readWasmMemoryAndReturnIndexOne } }) => {
    //         // arrayData.current = __getArrayView(__pin(allOnes()))
    //         //console.log(arrayData.current, memory.buffer)
    //         console.log(readWasmMemoryAndReturnIndexOne());
    //         mutateFunctionRef.current = allOnes
    //         allOnes()
    //         console.log(readWasmMemoryAndReturnIndexOne())
    //     });
    // }, [])

    // maybe move to requestInterval
    useRequestInterval(function renderScreenContent() {
        if (lCanvasCtx && rCanvasCtx) {
            const {
                mixEffect: { type },
                slider,
            } = store.getState().screenState;


            if (mixEffects.current?.[type].func) {
                // let dataHolder = lCanvasCtx!.getImageData(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT)
                //     .data;
                // const dlLength = dataHolder.length;

                // for (let i = 0; i < dlLength; i++) {
                //     i8[i] = dataHolder[i];
                // }
                // dataHolder = rCanvasCtx!.getImageData(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT)
                //     .data;
                // const targetLength = dlLength * 2;

                // for (let i = dlLength; i < targetLength; i++) {
                //     i8[i] = dataHolder[i - dlLength];
                // }

                // mutateFunctionRef.current?.()
                const leftImage = lCanvasCtx!.getImageData(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT).data

                const response = mixEffects.current?.[type].func!(
                    leftImage,
                    rCanvasCtx!.getImageData(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT)
                        .data,
                    VIDEO_WIDTH,
                    slider
                );
                // for (let i = 0; i < dataHolder.length; i++) {
                //     dataHolder[i] = i8[i];
                // }
                canvasCtx!.putImageData(new ImageData(response, VIDEO_WIDTH, VIDEO_HEIGHT), 0, 0);
            }

        }
    }, FPS_RATE);

    return (
        <div>
            <button
                onClick={async () => {
                    const channel = await beginProjection();
                    const stream: MediaStream = (canvasRef.current as any).captureStream(
                        FPS
                    );
                    //  stream.addTrack((this.props.audioRef.current as HTMLMediaElement).captureStream(30).getAudioTracks())
                    // too lazy to capture media atm
                    if (stream) {
                        setTimeout(() => {
                            stream
                                .getTracks()
                                .forEach((entryTrack: MediaStreamTrack) => {
                                    channel.addTrack(entryTrack, stream);
                                });
                        }, 3000);
                    }
                    // this.setState({
                    //   ...this.state,
                    //   outboundstream: channel as any
                    // })
                }}
            >
                Launch casting screen
            </button>
            <VideoFrame>
                <canvas
                    ref={canvasRef}
                    height={`${VIDEO_HEIGHT}px`}
                    width={`${VIDEO_WIDTH}px`}
                    style={{ width: `${VIDEO_WIDTH}px` }}
                />
            </VideoFrame>
            <br />
            <Slider />
            <br />
            <EffectSelector />
        </div>
    );
};

// So this can do some fancy shit
// createImageBitmap(leftImage).then(e => {
//     this.canvasCtx?.drawImage(e, 0, 0);
// })
//     const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     svg.setAttribute('style', 'border: 1px solid black');
//     svg.setAttribute('width', '600');
//     svg.setAttribute('height', '250');
//     svg.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");

//     const ohHeySVG = `<svg width="130" height="30" xmlns="http://www.w3.org/2000/svg">
//     <g>
//      <text stroke="#000" xml:space="preserve" text-anchor="start" font-family="Helvetica, Arial, sans-serif" font-size="24" id="svg_2" y="23.15103" x="0.83346" fill-opacity="null" stroke-opacity="null" stroke-width="0" fill="#000000">Fishsticks</text>
//     </g>
//    </svg>`;
//     const timage = `data:image/svg+xml;charset=utf-8,${(escape(ohHeySVG))}`
//     const zimage = new Image();
//     zimage.src = timage;

// HEY PUT THIS BACKERINO
// const trackName = this.props.audioRef.current!.getAttribute(
//     'trackName'
// );
// if (trackName) {
//     this.canvasCtx!.font = '15px Arial';
//     this.canvasCtx!.fillStyle = '#CCC';
//     this.canvasCtx!.fillText(trackName, 30, VIDEO_HEIGHT - 10, VIDEO_WIDTH);
// }

// this.streamRef.current.srcObject = stream;
// this.streamRef.current.play();
// const videoStream = this.streamRef.current.captureStream(30);

const VideoFrame = styled.div({
    border: '1px solid black',
    height: `${VIDEO_HEIGHT}px`,
});
