import { GenericGeneratorParms } from './EffectTypes';
import { rotate } from './rotate';

export function* rotateGenerator(
    { input, width }: GenericGeneratorParms,
    speed: number = 1
) {
    //index: string
    // const val: number = 100;
    //let indie = parseInt(index); //Math.floor(Math.random() * 32);
    let angle = 0;
    while (true) {
        angle += speed;
        if (angle === 360) angle = 0;

        input = yield rotate({ array: input, width }, angle);
    }
}
