import React from 'react';
import { VIDEO_HEIGHT, VIDEO_WIDTH } from '../constants';
import { LoopBehavior } from '../deck/enums';
import { clearRequestInterval, requestInterval } from '../requestInterval';
export const MediaSourceVideo = ({ videoRef, sourcePath, loopBehavior }: { loopBehavior: LoopBehavior, videoRef: React.RefObject<HTMLVideoElement>, sourcePath: string }) =>
    <video
        ref={videoRef}
        src={sourcePath}
        crossOrigin="anonymous"
        height={`${VIDEO_HEIGHT}px`}
        width={`${VIDEO_WIDTH}px`}
        controls
        disablePictureInPicture
        muted
        autoPlay
        onCanPlayThrough={() => {
            // so there's something not ideal here. Currently chrome doesn't autoplay videos that are hidden
            //but to save on processing we do hide the media sources. This is a hacky autoplay code.

            // console.log('i can do this');
            // if (loopBehavior != LoopBehavior.Rewind) {

            if (LoopBehavior.Rewind != loopBehavior) {
                videoRef.current?.play();
            }
            //}
        }}
        onEnded={() => {
            switch (loopBehavior) {
                case LoopBehavior.Loop: {
                    videoRef.current!.play();
                    break;
                }
                case LoopBehavior.Rewind: {
                    const temRate = 20;
                    // this.videoRef.current!.pause();
                    let theTime = videoRef.current!.currentTime;
                    const bobble = requestInterval(() => {
                        theTime = videoRef.current!.currentTime;
                        if (theTime <= 0.25) {
                            videoRef.current?.play();
                            clearRequestInterval(bobble.value!);
                        } else {
                            videoRef.current!.currentTime = Math.max(
                                theTime -
                                videoRef.current!.playbackRate /
                                temRate,
                                0
                            );
                        }
                    }, temRate);
                    // first one is free
                    videoRef.current!.currentTime = Math.max(
                        theTime -
                        videoRef.current!.playbackRate /
                        temRate,
                        0.1
                    );
                    break;
                }
                case LoopBehavior.None: {
                    break;
                }
            }
        }}
    />
