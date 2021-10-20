import { getSongDataArray } from '../InputSource';
import { GenericGeneratorParms } from './EffectTypes';
import { pixelateEffect } from './pixelate';

export function* pixelateWithInput(
    { input, width }: GenericGeneratorParms,
    index: string
) {
    //   let val: number = 100;
    const indie = parseInt(index); //Math.floor(Math.random() * 32);
    while (true) {
        input = yield pixelateEffect(
            {
                array: input,
                width,
            },
            getSongDataArray()[indie] - 125
        );
    }
}
