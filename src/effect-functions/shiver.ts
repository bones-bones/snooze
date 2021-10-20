import { GenericParms } from './EffectTypes';

export function shiver(
    { array, width, dataArray }: GenericParms,
    sampleIndex: number = 16
): Uint8ClampedArray {
    const tArray = new Uint8ClampedArray(array.length);

    let moveFactor = dataArray![sampleIndex] / 3 || 10;
    moveFactor = moveFactor - (moveFactor % 2);

    const leftOffset =
        (Math.floor(Math.random() * moveFactor) - moveFactor / 2) * 4;

    const topOffset =
        (Math.floor(Math.random() * moveFactor) - moveFactor / 2) * width * 4;

    const offsetTotal = leftOffset + topOffset;

    let i = array.length;
    while ((i -= 4)) {
        tArray[i + offsetTotal] = array[i];
        tArray[i + 1 + offsetTotal] = array[i + 1];
        tArray[i + 2 + offsetTotal] = array[i + 2];
        tArray[i + 3 + offsetTotal] = array[i + 3];
    }

    let k = array.length;
    while (k--) {
        array[k] = tArray[k];
    }

    return array;
}
