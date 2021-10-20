import { EffectTypes, GenericParms } from './effect-functions/EffectTypes';
// import { InputSource } from './InputSource';

export default interface Effect {
    label?: string;
    type: EffectTypes;
    parms: any;
    generatorFunctionHolder?: Generator;
    composedFunctionHolder?: (
        input: GenericParms,
        ...args: any
    ) => Uint8ClampedArray | void; //OH BOY LOOK AT THAT ANY
    active?: boolean; // lol why is this a boolean
}
