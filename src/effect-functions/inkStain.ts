import { GenericParms } from './types';

let meltDegree = 100;
let flip = true;

export default function inkStainEffect({ array }: GenericParms) {
    if (meltDegree < 0) {
        flip = true;
    }
    if (meltDegree > 100) {
        flip = false;
    }
    meltDegree += flip ? 1 : -1;

    for (let y = 0; y < array.length; y += 4) {
        if (
            ((array[y] + array[y + 1] + array[y + 2]) / 3 / 255) * 100 >
            meltDegree
        ) {
            array[y] = 0;
            array[y + 1] = 0;
            array[y + 2] = 0;
        }
    }
    return array;
}
