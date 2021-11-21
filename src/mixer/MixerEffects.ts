

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
