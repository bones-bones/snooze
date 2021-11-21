import { GenericParms } from './types';

let numb = 0;

export const sideStripes = ({ array, width }: GenericParms) => {
    const tArray = new Uint8ClampedArray(array.length);

    for (let i = 0; i < width; i++) {
        for (let j = 0; j < width * 4; j += 4) {
            // if (i % 10 === 0) {

            const pos = i * width * 4;
            tArray[pos + j] = array[pos + j - numb];
            tArray[pos + j + 1] = array[pos + j - numb + 1];
            tArray[pos + j + 2] = array[pos + j - numb + 2];
            tArray[pos + j + 3] = 255;
            // }
        }
    }
    numb++;
    if (numb > 100) {
        numb = 0;
    }

    return tArray;
};
