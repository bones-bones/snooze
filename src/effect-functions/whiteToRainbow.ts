import { GenericGeneratorParms } from './EffectTypes';

import { getLuminosity } from './helperFunctions/colorFunctions';

export function* whiteToRainbow({ input: array }: GenericGeneratorParms) {
    let slideDegree = 0;

    while (true) {
        slideDegree += 1;
        slideDegree = slideDegree % (2 * ColorArray.length);

        array = yield transformForMe(
            array,
            ColorArray[Math.floor(slideDegree / 2)]
        );
    }
}

const ColorArray: [number, number, number][] = [
    [240, 0, 0],
    [255, 51, 0],
    [255, 102, 0],
    [255, 204, 0],
    [255, 255, 0],
    [153, 253, 0],
    [47, 249, 0],
    [1, 253, 205],
    [0, 153, 255],
    [51, 0, 255],
    [102, 1, 255],
    [151, 1, 253],
];

// red orange yellow lime green teal aqua blue rich blue purple pink hotpink

// it is actually 12

function transformForMe(array: number[], color: [number, number, number]) {
    for (let y = 0; y < array.length; y += 4) {
        // if (array[y] > 90 && array[y + 1] > 90 && array[y + 2] > 90) {
        const luminosity = getLuminosity(array[y], array[y + 1], array[y + 2]);

        [array[y], array[y + 1], array[y + 2]] = [
            (color[0] * luminosity) << 0,
            (color[1] * luminosity) << 0,
            (color[2] * luminosity) << 0,
        ];
        // }
    }
    return array;
}

// THIS IS WACK
// for (let y = 0; y < height; y++) {
//   for (let x = 0; x < width * 4; x++) {
//     array[((y * width * 4 + x + slideDegree) % (width * 4)) + y * width * 4] =
//       array[y * width * 4 + x];
//   }
// }
