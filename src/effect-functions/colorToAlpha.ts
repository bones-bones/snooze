import { GenericParms } from './types';

export function colorToAlpha(
    { array }: GenericParms,
    toAndFrom: 'w' | 'u' | 'b' | 'r' | 'g'
) {
    // the || is a hack because i didn't want to initialize state
    const indexOne = Math.max(
        ['w', 'u', 'b', 'r', 'g'].indexOf(toAndFrom[0]),
        0
    );
    //let swampspot: number;
    let y = array.length;

    while ((y -= 4)) {
        if (
            indexOne == 3 &&
            array[y] > array[y + 1] &&
            array[y] > array[y + 2]
        ) {
            array[y + 3] = 0;
        } else if (
            indexOne == 4 &&
            array[y + 1] > array[y] &&
            array[y + 1] > array[y + 2]
        ) {
            array[y + 3] = 0;
        } else if (
            indexOne == 1 &&
            array[y + 2] > array[y] &&
            array[y + 2] > array[y + 1]
        ) {
            array[y + 3] = 0;
        } else {
            const brighness = Math.sqrt(
                array[y] * array[y] +
                array[y + 1] * array[y + 1] +
                array[y + 2] * array[y + 2]
            );
            if (indexOne == 0 && brighness > 400) {
                array[y + 3] = 0;
            } else if (indexOne === 2 && brighness < 150) {
                array[y + 3] = 0;
            }
        }
    }

    return array;
}
