import { GenericGeneratorParms } from './EffectTypes';

export enum Color {
    Red = 'Red',
    Green = 'Green',
    Blue = 'Blue',
}

export function* RGBSlideEffect(
    { input: array, width }: GenericGeneratorParms,
    color: Color
) {
    let slideDegree = 0;

    let shift = 0;
    switch (color) {
        case Color.Green: {
            shift = 1;
            break;
        }
        case Color.Blue: {
            shift = 2;
            break;
        }
        case Color.Red:
        default: {
            shift = 0;
        }
    }

    while (true) {
        slideDegree = Math.floor(Math.random() * 30);
        array = yield transformForMe(array, width, slideDegree, shift);
    }
}

function transformForMe(
    array: number[],
    width: number,
    slideDegree: number,
    shift: number
) {
    const newWidth = 4 * width;
    const height = array.length / newWidth;
    const tArray = new Array(newWidth);

    for (let y = 0; y < height; y++) {
        const pos = y * newWidth;

        for (let x = 0; x < newWidth; x += 4) {
            tArray[(x + shift + slideDegree * 4) % newWidth] =
                array[pos + shift + x];
        }

        for (let k = 0; k < tArray.length; k++) {
            if (tArray[k] && tArray[k] !== array[pos + k]) {
                array[pos + k] = tArray[k];
            }
        }
    }
    return array;
}

// Weird waves
// const newWidth = 4 * width;
// const height = array.length / newWidth;
// const tArray = new Array(newWidth);

// for (let y = 0; y < height; y++) {
//   const pos = y * newWidth;

//   for (let x = 0; x < newWidth; x += 3) {
//     tArray[(x + slideDegree * 4) % newWidth] = array[pos + x];
//   }

//   for (let k = 0; k < tArray.length; k++) {

//     if (tArray[k] && tArray[k] !== array[pos + k]) {
//       array[pos + k] = tArray[k];
//     }
//   }
// }
// return array;
