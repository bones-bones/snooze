import { subtract, loadSubtract } from './subtract';
import { averageOfTheTwo, wasmAverageOfTheTwo } from './merge';
import { loadWasmOverlay, overlay } from './str8Overlay';
import { fadeOverlay } from './fadeOverlay';

export interface MixEffect {
    type: MixTypes;
    parms?: any;
    generatorFunctionHolder?: Generator;
    inputSource?: () => number;
}

export enum MixTypes {
    Str8tOverlay = 'Str8tOverlay',
    Merge = 'Merge',
    Subtract = 'Subtract',
    // Slide = 'Slide',
    FadeOverlay = 'FadeOverlay',
}

export const asyncMixLoader = async (): Promise<{
    [key in MixTypes]: MixTypeProperty;
}> => {
    return {
        [MixTypes.Merge]: {
            func: (await wasmAverageOfTheTwo()),
        },
        [MixTypes.Subtract]: { func: await loadSubtract() },
        [MixTypes.Str8tOverlay]: { func: await loadWasmOverlay() },
        [MixTypes.FadeOverlay]: { func: fadeOverlay },
    }
}

export const MixTypeProperties: {
    [key in MixTypes]: MixTypeProperty;
} = {
    [MixTypes.Merge]: {
        func: averageOfTheTwo,
    },
    [MixTypes.Subtract]: { func: subtract },
    //  [MixTypes.Slide]: {},
    [MixTypes.Str8tOverlay]: { func: overlay },
    [MixTypes.FadeOverlay]: { func: fadeOverlay },
};

interface MixTypeProperty {
    func?: (
        leftArray: Uint8ClampedArray,
        rightArray: Uint8ClampedArray,
        width: number,
        degree: number,
        ...args: any[]
    ) => Uint8ClampedArray;
    generatorFunction?: (
        leftArray: Uint8ClampedArray,
        rightArray: Uint8ClampedArray,
        width: number,
        dagree: number,
        ...args: any[]
    ) => Generator<any, any, number[]>;
    parms?: { type: 'text' | 'enum'; label: string; values?: string[] }[];
}
