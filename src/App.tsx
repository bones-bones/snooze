import React from 'react';
// import Pane from './Pane';
import { Deck } from './deck';
import { Screen } from './screen/Screen';
import { MainPane } from './MainPane';

import { AudioPlayer } from './AudioPlayer';

export const App = () => {
    const leftCanvas = React.createRef<HTMLCanvasElement>();
    const rightCanvas = React.createRef<HTMLCanvasElement>();
    const audioRef = React.createRef<HTMLAudioElement>();
    return (
        <MainPane>
            <Deck canvasRef={leftCanvas} deckId={0} />
            <div>
                <Screen L={leftCanvas} R={rightCanvas} audioRef={audioRef} />
                <AudioPlayer audioRef={audioRef} />
            </div>
            <Deck canvasRef={rightCanvas} deckId={1} />
        </MainPane>
    );
};
