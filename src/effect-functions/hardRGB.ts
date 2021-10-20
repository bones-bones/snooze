import { GenericParms } from './EffectTypes';

export default function hardRGB({ array }: GenericParms) {
    let y = array.length;

    while ((y -= 4)) {
        if (array[y] > array[y + 1] && array[y] > array[y + 2]) {
            array[y + 2] = 0;
            array[y + 1] = 0;
        } else if (array[y + 1] > array[y + 2]) {
            array[y + 2] = 0;
            array[y] = 0;
        } else if (array[y + 2] > array[y]) {
            // okay this looks weird, but hear me out, this is effectively the check to see if all values are not the same.
            array[y] = 0;
            array[y + 1] = 0;
        }
    }
    return array;
}
