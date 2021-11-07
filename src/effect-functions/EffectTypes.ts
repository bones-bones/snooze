import { pixelateEffect } from './pixelate';
import { rotate } from './rotate';
import { flashWithInput, Tint } from './flashWithInput';
import FlipEffect, { Directions } from './flip';
import { negaEffect } from './nega';
import LoFiTVEffect from './lofitv';
import XtoYEffect from './xtoy';
import { wasmHardRGB } from './hardRGB';
import WaveEffect from './wave';
import { slideEffect } from './slide';
import { RGBSlideEffect, Color as SlideColors } from './RGBSlide';
import { colorToAlpha } from './colorToAlpha';
import InkStainEffect from './inkStain';
import PictureInPictureEffect from './pictureInPicture';
import GreyscaleEffect from './blackAndWhite';
import { whiteToRainbow } from './whiteToRainbow';
import { pixelateWithInput } from './pixelateGenerator';
import { pixelBlur } from './pixelBlur';
import { rotateGenerator } from './rotateGenerator';
import { waveDistort } from './waveDistort';
import { brightenEffect } from './brighten';
import { closeNuff } from './closeNuff';
import { brightStar } from './brightStar';
import { drip } from './drip';
import { shiver } from './shiver';
import { lineTranspose } from './lineTranspose';
import { smolPicture } from './smolPicture';
import { negaRotate } from './negaRotate';
import { pulseWithSound } from './pulseWithSound';
import { hardLine } from './hardLine';
import { loadWasmCartoon } from './cartoon';
import { bars } from './bars';
import { GenericParms } from './types';

// To add an effect, add it in EffectTypes, EffectTypeProperty, and add a function that transforms an array
export enum EffectTypes {
    Bars = 'Bars',
    Brighten = 'Brighten',
    BrightStar = 'BrightStar',
    CloseEnough = 'CloseEnough',
    Cartoon = 'Cartoon',
    Drip = 'Drip',
    FlashWithInput = 'FlashWithInput',
    Flip = 'Flip',
    Greyscale = 'Greyscale',
    HardRGB = 'HardRGB',
    HardLine = 'HardLine',
    InkStain = 'InkStain',
    LineTranspose = 'LineTranspose',
    LoFiTV = 'LoFiTV',
    Nega = 'Nega',
    NegaRotate = 'NegaRotate',
    PictureInPicture = 'PictureInPicture',
    Pixelate = 'Pixelate',
    PixelateWithInput = 'PixelateWithInput',
    PixelBlur = 'PixelBlur',
    PulseWithSound = 'PulseWithSound',
    RGBSlide = 'RGBSlide',
    Rotate = 'Rotate',
    RotateGenerator = 'RotateGenerator',
    Shiver = 'Shiver',
    Slide = 'Slide',
    TileThePicture = 'TileThePicture',
    ToAlpha = 'ToAlpha',
    Wave = 'Wave',
    XtoY = 'XtoY',
    WaveDistort = 'WaveDistort',
    WhiteToRainbow = 'WhiteToRainbow',
}

let loadedEffects: {
    [key in EffectTypes]: EffectTypeProperty;
};
export const loadEffectTypeProperties = async (): Promise<{
    [key in EffectTypes]: EffectTypeProperty;
}> => {
    if (!loadedEffects) {
        loadedEffects = await loadEffectFilesIntoObject();
    }

    return loadedEffects

}




const loadEffectFilesIntoObject = async (): Promise<{
    [key in EffectTypes]: EffectTypeProperty;
}> => ({
    [EffectTypes.NegaRotate]: {
        generatorFunction: negaRotate,
        parms: [
            { type: 'number', label: 'speed (1-100)', defaultValue: 50 },
            { type: 'number', label: 'rotate degree', defaultValue: -5 },
        ],
    },
    [EffectTypes.Pixelate]: {
        parms: [{ type: 'number', label: 'Pixel count' }],
        func: pixelateEffect,
    },
    [EffectTypes.BrightStar]: {
        func: brightStar,
        parms: [
            { type: 'number', label: 'Threshold sampling: 0-23' },
            { type: 'number', label: 'width sampling: 0-23' },
        ],
    },
    [EffectTypes.Flip]: {
        parms: [
            {
                type: 'enum',
                label: 'dir count',
                values: Object.keys(Directions),
            },
        ],
        func: FlipEffect,
    },
    [EffectTypes.WhiteToRainbow]: { generatorFunction: whiteToRainbow },
    [EffectTypes.Nega]: {
        func: negaEffect,
    },
    [EffectTypes.LoFiTV]: {
        func: LoFiTVEffect,
        parms: [{ type: 'number', label: 'number of lines', defaultValue: 1 }],
    },
    [EffectTypes.XtoY]: {
        func: XtoYEffect,
        parms: [
            {
                type: 'enum',
                label: 'This value',
                values: ['r', 'g', 'b', 'a'],
                defaultValue: 'r',
            },
            {
                type: 'enum',
                label: 'will match this value',
                values: ['r', 'g', 'b', 'a'],
                defaultValue: 'g',
            },
        ],
    },
    [EffectTypes.Greyscale]: {
        func: GreyscaleEffect,
    },
    [EffectTypes.HardLine]: {
        func: hardLine,
        parms: [
            {
                type: 'number',
                label: 'Index Sampling Location',
                defaultValue: 16,
            },
        ],
    },
    [EffectTypes.HardRGB]: {
        func: await wasmHardRGB(),
    },
    [EffectTypes.Rotate]: {
        func: rotate,
        parms: [{ type: 'number', label: 'degree of rotation' }],
    },
    [EffectTypes.Wave]: { generatorFunction: WaveEffect },
    [EffectTypes.Slide]: {
        generatorFunction: slideEffect,
        parms: [{ type: 'number', label: 'speed', defaultValue: 2 }],
    },
    [EffectTypes.ToAlpha]: {
        func: colorToAlpha,
        parms: [
            {
                type: 'enum',
                label: 'color to alpha',
                values: ['w', 'b', 'u', 'r', 'g'],
                defaultValue: 'w',
            },
        ],
    },
    [EffectTypes.InkStain]: { func: InkStainEffect },
    [EffectTypes.PictureInPicture]: {
        generatorFunction: PictureInPictureEffect,
    },
    [EffectTypes.FlashWithInput]: {
        generatorFunction: flashWithInput,
        parms: [
            { type: 'number', label: 'Location to sample from: 0-23' },
            {
                type: 'enum',
                label: 'Ligten or darken',
                values: [Tint.Darken, Tint.Lighten],
                defaultValue: Tint.Darken,
            },
            { type: 'number', label: 'red accent', defaultValue: 1 },
            { type: 'number', label: 'green accent', defaultValue: 1 },
            { type: 'number', label: 'blue accent', defaultValue: 1 },
        ],
    },
    [EffectTypes.PixelateWithInput]: {
        generatorFunction: pixelateWithInput,
        parms: [{ type: 'number', label: 'Location to sample from: 0-23' }],
    },
    [EffectTypes.RGBSlide]: {
        generatorFunction: RGBSlideEffect,
        parms: [
            {
                type: 'enum',
                label: 'Color',
                values: [SlideColors.Red, SlideColors.Blue, SlideColors.Green],
            },
        ],
    },
    [EffectTypes.PixelBlur]: { func: pixelBlur },
    [EffectTypes.RotateGenerator]: {
        generatorFunction: rotateGenerator,
        parms: [{ type: 'number', label: 'speed of rotation' }],
    },
    [EffectTypes.WaveDistort]: { func: waveDistort },
    [EffectTypes.Brighten]: {
        parms: [
            { type: 'number', label: 'color change number', defaultValue: 0 },
        ],
        func: brightenEffect,
    },
    [EffectTypes.Drip]: {
        func: drip,
        parms: [{ type: 'number', label: 'dripThreshold', defaultValue: 100 }],
    },
    [EffectTypes.CloseEnough]: {
        func: closeNuff,
        parms: [
            { type: 'text', label: 'first color', defaultValue: '74,139,235' },
            { type: 'text', label: 'secnd color', defaultValue: '253,253,150' },
            { type: 'text', label: 'third color', defaultValue: '255,187,200' },
        ],
    },
    [EffectTypes.Shiver]: {
        parms: [{ type: 'number', label: 'sample index', defaultValue: 16 }],
        func: shiver,
    },
    [EffectTypes.LineTranspose]: { generatorFunction: lineTranspose },
    [EffectTypes.TileThePicture]: { func: smolPicture },
    [EffectTypes.PulseWithSound]: { func: pulseWithSound },
    [EffectTypes.Cartoon]: { func: (await loadWasmCartoon()) },
    [EffectTypes.Bars]: { func: bars },
})




export interface EffectTypeProperty {
    func?: (array: GenericParms, ...args: any[]) => Uint8ClampedArray | void;
    generatorFunction?: (
        array: GenericGeneratorParms,
        ...args: any[]
    ) => Generator<any, any, number[]> | any;
    parms?: {
        type: 'text' | 'enum' | 'number';
        label: string;
        values?: string[];
        defaultValue?: any;
    }[];
}


export interface GenericGeneratorParms
    extends Pick<GenericParms, 'width' | 'dataArray'> {
    input: number[] | any; // Okay so this any is for the steerable generator bit
}
