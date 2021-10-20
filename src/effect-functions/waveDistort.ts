import { GenericParms } from './EffectTypes';

export function waveDistort({ array, width }: GenericParms) {
    const newWidth = 4 * width;
    const height = array.length / newWidth;
    const tArray = new Array(newWidth);

    for (let y = 0; y < height; y++) {
        const waveDistribution = 45;

        const maxOffsetWidth = 100;

        const slideOffset = Math.floor(
            Math.sin(y / waveDistribution) * maxOffsetWidth
        );

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
