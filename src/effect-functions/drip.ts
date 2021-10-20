import { GenericParms } from './EffectTypes';

export function drip({ array, width }: GenericParms, dripThreshold: number) {
    const THRESHOLD = dripThreshold;
    const RAY_WIDTH = 100;

    const tArray = new Uint8ClampedArray(array.length);

    let hackStart = undefined;
    let hackEnd = 0;

    const arrayLength = array.length;

    for (let y = 4; y < arrayLength; y += 4) {
        const arrayr = array[y];
        const arrayg = array[y + 1];
        const arrayb = array[y + 2];
        const lmm = 0.3 * arrayr + 0.59 * arrayg + 0.11 * arrayb;

        if (lmm < THRESHOLD) {
            const LOGICAL_WIDTH = (y % (width * 4)) / 4;

            for (let i = 0; i < lmm; i++) {
                const position = y + 4 * i * width;

                if (!tArray[position]) {
                    if (!hackStart) {
                        hackStart = position;
                    }
                    tArray[position] = arrayr;
                    tArray[position + 1] = arrayg;
                    tArray[position + 2] = arrayb;

                    if (!(i + 1 < RAY_WIDTH && LOGICAL_WIDTH + i + 1 < width)) {
                        hackEnd = position + 2;
                    }

                    if (LOGICAL_WIDTH + i >= width) {
                        break;
                    }
                }
            }
        }
    }

    if (!hackStart) {
        return array;
    }

    for (let i = hackStart; i < hackEnd; i++) {
        if (tArray[i]) {
            array[i] = tArray[i];
        }
    }
    return array;
}
