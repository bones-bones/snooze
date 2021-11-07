import { GenericParms } from './types';

export function smolPicture({ array, width }: GenericParms) {
    const nWidth = width * 4;
    const repFactor = 2;
    const halfWidth = nWidth / repFactor;
    const height = array.length / 4 / width;
    const halfHeight = height / 2;

    for (let i = 0; i < array.length; i++) {
        const row = Math.floor(i / nWidth);

        array[i] =
            array[
            (i % halfWidth) * repFactor +
            (row % halfHeight) * repFactor * nWidth
            ];
    }
}

// Glitch tiny tiny tny tiny resameple

/**
 * const nWidth = width * 4;
    const repFactor = 2;
    const halfWidth = nWidth / repFactor;
    const height = array.length / 4 / width;
    const halfHeight = height / 2;
    for (let i = 0; i < array.length; i++) {

        const row = Math.floor(i / nWidth);

        array[i] = array[((i % halfWidth) * 2) + ((row % halfHeight) * 2) * nWidth];
    }
 */

// Glitch nightmare resample
/**
 *     const nWidth = width * 4;
    const repFactor = 2;
    const halfWidth = nWidth / repFactor;
    const height = array.length / 4 / width;
    const halfHeight = height / 2;
    for (let i = 0; i < array.length; i++) {

        const row = Math.floor(i / nWidth);

        array[i] = array[((i % halfWidth) * 2) + (row % halfHeight) * nWidth];
    }
 */
