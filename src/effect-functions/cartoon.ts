import { VIDEO_WIDTH } from '../constants';
import { GenericParms } from './EffectTypes';
import { getColorDistance } from './helperFunctions/colorDistance';

// const tArray = new Array(VIDEO_WIDTH * 4);

export function cartoon(
    { array: inputArray }: GenericParms,
    threshold: number = 9500
) {
    const newWidth = VIDEO_WIDTH * 4;

    for (let i = 0; i < inputArray.length - newWidth; i += 4) {
        if (i % newWidth !== newWidth - 4) {
            const colorDistance = getColorDistance(
                inputArray[i],
                inputArray[i + 1],
                inputArray[i + 2],
                inputArray[i + newWidth],
                inputArray[i + newWidth + 1],
                inputArray[i + newWidth + 2]
            );

            const colorDistance2 = getColorDistance(
                inputArray[i + newWidth],
                inputArray[i + newWidth + 1],
                inputArray[i + newWidth + 2],
                inputArray[i + newWidth * 2],
                inputArray[i + newWidth * 2 + 1],
                inputArray[i + newWidth * 2 + 2]
            );

            if (colorDistance <= threshold && colorDistance2) {
                inputArray[i + newWidth] = inputArray[i];
                inputArray[i + newWidth + 1] = inputArray[i + 1];
                inputArray[i + newWidth + 2] = inputArray[i + 2];
            }
        }

        if (i % newWidth !== 0 && i % newWidth !== 1) {
            const secondColorDistance = getColorDistance(
                inputArray[i],
                inputArray[i + 1],
                inputArray[i + 2],
                inputArray[i + 4],
                inputArray[i + 5],
                inputArray[i + 6]
            );
            const secondColorDistance2 = getColorDistance(
                inputArray[i + 4],
                inputArray[i + 5],
                inputArray[i + 6],
                inputArray[i + 8],
                inputArray[i + 9],
                inputArray[i + 10]
            );
            if (secondColorDistance <= threshold && secondColorDistance2) {
                inputArray[i + 4] = inputArray[i];
                inputArray[i + 5] = inputArray[i + 1];
                inputArray[i + 6] = inputArray[i + 2];
            }
        }
    }
}
