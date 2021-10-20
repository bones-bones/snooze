import { GenericGeneratorParms } from './EffectTypes';

export function* slideEffect(
    { input: array, width }: GenericGeneratorParms,
    slideDegreeTemp: string = '2'
) {
    let slideOffset = 0;
    const slideDegree = parseInt(slideDegreeTemp);
    while (true) {
        slideOffset += slideDegree;

        if (slideOffset > width) {
            slideOffset = 0;
        }
        array = yield transformForMe(array, width, slideOffset);
    }
}

function transformForMe(array: number[], width: number, slideOffset: number) {
    const newWidth = 4 * width;
    const height = array.length / newWidth;
    const tArray = new Array(newWidth);
    for (let y = 0; y < height; y++) {
        const pos = y * newWidth;
        for (let x = 0; x < newWidth; x++) {
            tArray[(x + slideOffset * 4) % newWidth] = array[pos + x];
        }
        for (let k = 0; k < tArray.length; k++) {
            array[pos + k] = tArray[k];
        }
    }
    return array;
}

// THIS IS WACK
// for (let y = 0; y < height; y++) {
//   for (let x = 0; x < width * 4; x++) {
//     array[((y * width * 4 + x + slideOffset) % (width * 4)) + y * width * 4] =
//       array[y * width * 4 + x];
//   }
// }
