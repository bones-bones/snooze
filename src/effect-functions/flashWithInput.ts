import { getSongDataArray } from '../InputSource';
import { GenericGeneratorParms } from './EffectTypes';

export enum Tint {
    Lighten = 'Lighten',
    Darken = 'Darken',
}

export function* flashWithInput(
    { input }: GenericGeneratorParms,
    index: number,
    color: Tint,
    redAccent: number,
    greenAccent: number,
    blueAccent: number
) {
    //let val: number = 100;
    const indie = index; //parseInt(index); //Math.floor(Math.random() * 32);

    while (true) {
        //  console.log(getSongDataArray().toString().split(',').map(e => { return e.padStart(3) }).join(', '));
        input = yield transformForMe(
            input as number[],
            getSongDataArray()[indie],
            color === Tint.Lighten,
            redAccent,
            greenAccent,
            blueAccent
        );

        // if ((input as any).newValue) {
        //     val = (input as any).newValue;
        // }
        /*
    this block below is for when you eventually need to change parms midflight
    else if ((input as any).color) {
      //({ (array as any) } = inst);
    } else {
    }*/
    }
}

function transformForMe(
    array: number[],
    value: number,
    up: boolean,
    redAccent: number,
    greenAccent: number,
    blueAccent: number
) {
    // 100 was chosen at random
    const num = Math.max(value - 100, 0);
    //i'm pretty sure the 250 should be 255
    for (let y = 0; y < array.length; y += 4) {
        if (up) {
            array[y] = Math.min(num * redAccent + array[y], 250);
            array[y + 1] = Math.min(num * greenAccent + array[y + 1], 250);
            array[y + 2] = Math.min(num * blueAccent + array[y + 2], 250);
        } else {
            array[y] = Math.max(array[y] - num * redAccent, 0);
            array[y + 1] = Math.max(array[y + 1] - num * greenAccent, 0);
            array[y + 2] = Math.max(array[y + 2] - num * blueAccent, 0);
        }
    }

    return array;
}
