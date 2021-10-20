declare module '*.webm';
declare module '*.jpg';
declare module '*.mp4';
declare module '*.mp3';
declare module '*.svg';

//not sure this next bit works
declare global {
    interface HTMLCanvasElement {
        captureStream(frameRate?: number): MediaStream;
    }
}
