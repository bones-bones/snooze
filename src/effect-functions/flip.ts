import { GenericParms } from './EffectTypes';

export enum Directions {
    'L to R' = 'L to R',
    'R to L' = 'R to L',
    'T to B (not mirror)' = 'T to B (not mirror)',
    'T to B (mirror)' = 'T to B (mirror)',
    'B to T (not mirror)' = 'B to T (not mirror)',
    'B to T (mirror)' = 'B to T (mirror)',
}

export default function flipEffect(
    { array, width }: GenericParms,
    direction: Directions
) {
    const height = array.length / 4 / width;
    switch (direction) {
        case Directions['B to T (mirror)']: {
            //   console.log('t to b');
            for (let y = 0; y < height / 2; y++) {
                const baseRow = y * width * 4;
                for (let x = 0; x < width; x++) {
                    const newBase = baseRow + 4 * x;

                    const newPlace = array.length - newBase;
                    //baseRow + (width - x) * 4;
                    array[newBase] = array[newPlace];
                    array[newBase + 1] = array[newPlace + 1];
                    array[newBase + 2] = array[newPlace + 2];
                    array[newBase + 3] = array[newPlace + 3];
                }
            }
            return array;
        }

        case Directions['T to B (mirror)']: {
            //   console.log('t to b');
            for (let y = 0; y < height / 2; y++) {
                const baseRow = y * width * 4;
                for (let x = 0; x < width; x++) {
                    const newBase = baseRow + 4 * x;

                    const newPlace = array.length - newBase;
                    //baseRow + (width - x) * 4;

                    array[newPlace] = array[newBase];
                    array[newPlace + 1] = array[newBase + 1];
                    array[newPlace + 2] = array[newBase + 2];
                    array[newPlace + 3] = array[newBase + 3];
                }
            }
            return array;
        }

        case Directions['B to T (not mirror)']: {
            //   console.log('t to b');
            for (let y = height / 2; y <= height; y++) {
                const baseRow = y * width * 4;
                for (let x = 0; x < width; x++) {
                    const newBase = baseRow + 4 * x;

                    const newPlace = array.length - newBase;
                    //baseRow + (width - x) * 4;

                    array[newPlace] = array[newBase];
                    array[newPlace + 1] = array[newBase + 1];
                    array[newPlace + 2] = array[newBase + 2];
                    array[newPlace + 3] = array[newBase + 3];
                }
            }
            return array;
        }
        case Directions['T to B (not mirror)']: {
            //   console.log('t to b');
            for (let y = 0; y < height / 2; y++) {
                const baseRow = y * width * 4;
                for (let x = 0; x < width; x++) {
                    const newBase = baseRow + 4 * x;

                    const newPlace = array.length - newBase;
                    //baseRow + (width - x) * 4;

                    array[newPlace] = array[newBase];
                    array[newPlace + 1] = array[newBase + 1];
                    array[newPlace + 2] = array[newBase + 2];
                    array[newPlace + 3] = array[newBase + 3];
                }
            }
            return array;
        }
        case Directions['R to L']: {
            for (let y = 0; y < height; y++) {
                const baseRow = y * width * 4;

                for (let x = 0; x < width / 2; x++) {
                    const newBase = baseRow + 4 * x;
                    const newPlace = baseRow + (width - x) * 4;

                    array[newBase] = array[newPlace];
                    array[newBase + 1] = array[newPlace + 1];
                    array[newBase + 2] = array[newPlace + 2];
                    array[newBase + 3] = array[newPlace + 3];
                }
            }
            return array;
        }
        case Directions['L to R']:
        default: {
            for (let y = 0; y < height; y++) {
                const baseLocation = y * width * 4;

                for (let x = 0; x < width / 2; x++) {
                    const newBase = baseLocation + 4 * x;
                    const newPlace = baseLocation + (width - x) * 4;

                    array[newPlace] = array[newBase];
                    array[newPlace + 1] = array[newBase + 1];
                    array[newPlace + 2] = array[newBase + 2];
                    array[newPlace + 3] = array[newBase + 3];
                }
            }
            return array;
        }
    }
}
