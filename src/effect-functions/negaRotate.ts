import { GenericGeneratorParms } from './EffectTypes';
import { negaEffect } from './nega';
import { rotate } from './rotate';

export function* negaRotate(
    { input, width }: GenericGeneratorParms,
    speed: number = 40,
    degree: number = -180
) {
    //index: string
    // const val: number = 100;
    //let indie = parseInt(index); //Math.floor(Math.random() * 32);
    let flip = false;
    let count = 0;
    while (true) {
        if (flip) {
            input = yield rotate(
                { array: negaEffect({ array: input, width }), width },
                degree
            );
        } else {
            input = yield input;
        }
        count += speed;
        if (count > 100) {
            flip = !flip;
            count %= 100;
        }
    }
}
