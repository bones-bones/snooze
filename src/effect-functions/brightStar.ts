import { GenericParms } from './EffectTypes';

export function brightStar(
    { array, width, dataArray: dats }: GenericParms,
    thresholdNumber: number = 240,
    rayWidth: number = 50
) {
    const THRESHOLD = 255 - dats![thresholdNumber] + 130;
    const RAY_WIDTH = Math.min(dats![rayWidth] / 4, 35);

    const tArray = new Uint8ClampedArray(array.length);

    let hackStart = undefined;
    let hackEnd = 0;

    const arrayLength = array.length;

    for (let y = 4; y < arrayLength; y += 4) {
        const arrayr = array[y];
        const arrayg = array[y + 1];
        const arrayb = array[y + 2];
        const lmm = 0.3 * arrayr + 0.59 * arrayg + 0.11 * arrayb;

        if (lmm > THRESHOLD) {
            const LOGICAL_WIDTH = (y % (width * 4)) / 4;

            for (let i = 0; i < RAY_WIDTH; i++) {
                const degree = (RAY_WIDTH - i) / RAY_WIDTH;
                const reverseDegree = 1 - degree;

                const position = y + 4 * i;

                tArray[position] =
                    arrayr * degree + array[position] * reverseDegree;
                tArray[position + 1] =
                    arrayg * degree + array[position + 1] * reverseDegree;
                tArray[position + 2] =
                    arrayb * degree + array[position + 2] * reverseDegree;

                if (!(i + 1 < RAY_WIDTH && LOGICAL_WIDTH + i + 1 < width)) {
                    hackEnd = position + 2;
                }
                if (LOGICAL_WIDTH + i >= width) {
                    break;
                }
            }

            // -1 instead of 0 cause this part iwll already be gotten
            const invertWidth = -1 * RAY_WIDTH;

            for (let j = -1; j > invertWidth; j--) {
                const degree = (RAY_WIDTH + j) / RAY_WIDTH;
                const reverseDegree = 1 - degree;
                const position = y + 4 * j;

                tArray[position] =
                    arrayr * degree + array[position] * reverseDegree;
                tArray[position + 1] =
                    arrayg * degree + array[position + 1] * reverseDegree;
                tArray[position + 2] =
                    arrayb * degree + array[position + 2] * reverseDegree;

                if (!hackStart) {
                    hackStart = position;
                }
                if (LOGICAL_WIDTH + j < 0) {
                    break;
                }
            }
        }
    }

    if (!hackStart) {
        return array;
    }

    for (let i = hackStart; i <= hackEnd; i++) {
        if (tArray[i]) {
            array[i] = tArray[i];
        }
    }
    return array;
}
