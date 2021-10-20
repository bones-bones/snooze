import Effect from '../EffectClass';
import { SourceMediaType } from '../store';
import { LoopBehavior } from './enums';

export interface Source {
    sourcePath?: string;
    sourceMediaType: SourceMediaType
}

export interface DeckProps {
    videoRef?: React.RefObject<HTMLVideoElement>;
    imageRef?: React.RefObject<HTMLImageElement>;
    canvasRef?: any;
    deckId: 0 | 1;
}
export interface DeckState {
    source: Source;
    effects: Effect[];
    loopBehavior: LoopBehavior;
}
