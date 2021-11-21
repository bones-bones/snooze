import { getBPM } from '../AudioPlayer';
import React, { useEffect, useRef } from 'react';
import { EffectPicker } from '../EffectPicker';
import styled from '@emotion/styled';

import { requestInterval } from '../requestInterval';
import { FPS_RATE, VIDEO_HEIGHT, VIDEO_WIDTH } from '../constants';
import { getSongDataArray } from '../InputSource';
import {
    deck0AddEffect,
    deck0NewSource,
    deck1AddEffect,
    deck1NewSource,
    SourceMediaType,
    store,
} from '../store';
import { useDispatch } from 'react-redux';
import { DeckProps } from './types';
import { LoopControls } from '../loopControls';
import { DeckMediaSource } from '../deck-media-source/DeckMediaSource';
import { DeckEffects } from '../deck-effects';
// import { generate as generateGeoPattern } from 'geopattern';
let theArray;

export const Deck = ({ canvasRef, deckId }: DeckProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    let canvasCtx: CanvasRenderingContext2D | undefined;
    const dispatch = useDispatch();

    useEffect(() => {
        canvasCtx = canvasRef.current?.getContext('2d', {
            willReadFrequently: true,
            alpha: true, // The background will be white otherwise
        })! as CanvasRenderingContext2D;
        //canvasCtx!.imageSmoothingEnabled = false;
        requestInterval(() => {
            const {
                source: { sourceMediaType },
                effects,
            } = store.getState()[deckId == 0 ? 'deck0' : 'deck1'];
            if (!canvasCtx) {
                return;
            }
            const srcCurrent = (SourceMediaType.Video == sourceMediaType
                ? videoRef.current
                : imageRef.current)!;

            // huge performance issue, maybe
            canvasCtx.clearRect(0, 0, srcCurrent!.width, srcCurrent!.height);
            // perf issue end
            // const filterArray = [
            //     { turbulence: { frequency: 0.05, numOctaves: 2 } },
            //     { displacementMap: { in: "SourceGraphic", in2: "previous", scale: 30 } },
            //     { colorMatrix: { type } }];
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // canvasCtx.filter = 'hue-rotate(90deg)'

            canvasCtx.drawImage(
                srcCurrent,
                0,
                0,
                srcCurrent!.width,
                srcCurrent!.height
            );

            /*
             * Okay this is weird. I swear that chrome just updated to support willReadFrequently. And in doing so, broke the hack i had here
             * Seems like there is in extra frame shoved in after drawImage. 96.0.4664.55. On the plus side, getImageData takes like zero time now
             */

            // requestAnimationFrame(() => {
            theArray = canvasCtx!.getImageData(0, 0, VIDEO_WIDTH, VIDEO_HEIGHT)
                .data;

            const dataArray = getSongDataArray();

            // Future person, at some point you should pass in the getSongDataArray to the generator function
            for (let i = 0; i < effects.length; i++) {
                if (effects[i].active) {
                    if (effects[i].composedFunctionHolder) {
                        theArray = effects[i].composedFunctionHolder!(
                            {
                                array: theArray,
                                width: VIDEO_WIDTH,
                                dataArray,
                            },
                            ...(effects[i].parms
                                ? Object.values(effects[i].parms)
                                : [])
                        ) as any;
                    } else if (effects[i].generatorFunctionHolder) {
                        theArray = (effects[i].generatorFunctionHolder!.next(
                            theArray
                        ) as any).value;
                        //This code steers as a generator setTimeout(() => { entry.generatorFunctionHolder!.next({ newValue: 2 }) }, 2000);
                    }
                }
            }
            canvasCtx!.putImageData(
                new ImageData(theArray, VIDEO_WIDTH, VIDEO_HEIGHT),
                0,
                0
            );
            theArray = [];
            // });
        }, FPS_RATE);
    }, []);
    return (
        <DeckFrame>
            <Frame>
                <DeckCanvas
                    onWheel={(e) => {
                        if (videoRef.current) {
                            const dir = e.deltaY > 0 ? -1 : 1;
                            const downing =
                                videoRef.current.playbackRate > 1
                                    ? 0.05
                                    : 0.005;
                            const speed =
                                videoRef.current.playbackRate + downing * dir;
                            videoRef.current.playbackRate = Math.max(
                                Math.min(speed, 16),
                                0.063
                            );
                        }
                        // e.preventDefault();
                    }}
                    onClick={() => {
                        videoRef.current?.paused
                            ? videoRef.current?.play()
                            : videoRef.current?.pause();
                    }}
                    ref={canvasRef}
                    height={`${VIDEO_HEIGHT}px`}
                    width={`${VIDEO_WIDTH}px`}
                    onDrop={(e: React.DragEvent) => {
                        e.preventDefault();
                        //let data = '';

                        // https://thumbs.gfycat.com/HospitableFlamboyantLangur-mobile.mp4

                        const item = e.dataTransfer.items[0];
                        // type is MAME type, kind is source

                        if (item.kind == 'string') {
                            switch (item.type) {
                                case 'source': {
                                    //  data = e.dataTransfer.getData('Text');
                                    return;
                                }
                                default: {
                                    item.getAsString((resp) => {
                                        const sourceFunction =
                                            deckId == 0
                                                ? deck0NewSource
                                                : deck1NewSource;
                                        dispatch(
                                            sourceFunction({
                                                sourcePath: resp,
                                                sourceMediaType:
                                                    SourceMediaType.Video,
                                            })
                                            // This is probably broken but I'm too lazy to fix it
                                        );
                                    });
                                    // data = e.dataTransfer.getData('Text');
                                }
                            }
                        } else if (item.kind === 'file') {
                            // const reader = new FileReader();
                            const sourceFunction =
                                deckId == 0 ? deck0NewSource : deck1NewSource;
                            console.log(item.type);
                            dispatch(
                                sourceFunction({
                                    sourcePath: URL.createObjectURL(
                                        e.dataTransfer.items[0].getAsFile()!
                                    ),
                                    sourceMediaType: getSourceMediaTypeForDataTransferType(
                                        item.type
                                    ),
                                })
                            );
                        }
                    }}
                    onDragOver={(e: React.DragEvent) => {
                        e.preventDefault();
                    }}
                />
                <br />
                <button
                    onClick={() => {
                        if (videoRef.current) {
                            const BPM = getBPM();
                            const { duration } = videoRef.current;
                            const preSec = BPM / 60 || 6;

                            videoRef.current.playbackRate = parseInt(
                                (duration / preSec).toFixed(3)
                            );
                        }
                    }}
                >
                    Sync video to bpm
                </button>
                <LoopControls deckId={deckId} />
                <br />
                <button
                    onClick={() => {
                        const sourceFunction =
                            deckId == 0 ? deck0NewSource : deck1NewSource;
                        dispatch(
                            sourceFunction({
                                sourceMediaType: SourceMediaType.GeneratedSVG,
                            })
                        );
                    }}
                >
                    swich to SVG
                </button>
            </Frame>
            <DeckSFrame>
                <EffectPicker
                    addFunc={(effect) => {
                        const addEffect =
                            deckId == 0 ? deck0AddEffect : deck1AddEffect;
                        dispatch(addEffect(effect));
                    }}
                />

                <DeckEffects deckId={deckId} />
            </DeckSFrame>
            <DeckMediaSource
                videoRef={videoRef}
                imageRef={imageRef}
                deckId={deckId}
            />
        </DeckFrame>
    );
};
const DeckFrame = styled.div({ height: '100vh' });
const DeckSFrame = styled.div({ height: '50vh' });

export const getSourceMediaTypeForDataTransferType = (type: string) => {
    const mameType = type.split('/')[0];
    switch (mameType) {
        case 'video': {
            return SourceMediaType.Video;
        }

        case 'image': {
            return SourceMediaType.Image;
        }
        default: {
            return SourceMediaType.Video;
        }
    }
};

const DeckCanvas = styled.canvas({
    border: '1px dashed grey',
    borderRadius: '5px',
    height: '200px',
    width: '200px',
});
const Frame = styled.div({ height: '50vh' });
