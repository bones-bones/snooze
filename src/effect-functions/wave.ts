import { GenericGeneratorParms } from './EffectTypes';

export default function* waveEffect({
    input: array,
    width,
}: GenericGeneratorParms) {
    let row = 0;
    const height = array.length / 4 / width;
    while (true) {
        row++;
        if (row > height) {
            row = 0;
        }
        array = yield transformForMe(array, width, row);
    }
}

function transformForMe(array: number[], width: number, row: number) {
    for (let y = 0; y < width; y++) {
        array[row * width * 4 + y * 4] = 0;
        array[row * width * 4 + y * 4 + 1] = 0;
        array[row * width * 4 + y * 4 + 2] = 0;
    }
    return array;
}

// function* gen() {
//     let curr = 0;
//     let i = 0;
//     while (true) {
//         i++;
//         curr = yield curr + i;
//     }
// }
