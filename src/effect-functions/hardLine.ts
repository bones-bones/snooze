import { VIDEO_WIDTH } from '../constants';
import { GenericParms } from './types';
import { getColorDistance } from './helperFunctions/colorDistance';

const tArray = new Array(VIDEO_WIDTH * 4);

export function hardLine(
    { array: inputArray, dataArray }: GenericParms,
    dataArrayPosition: number = 16
) {
    const newWidth = VIDEO_WIDTH * 4;

    const randomColor1 = Math.floor(Math.random() * 255);
    const randomColor2 = Math.floor(Math.random() * 255);
    const randomColor3 = Math.floor(Math.random() * 255);

    const degree = dataArray![dataArrayPosition];

    const dist = 1300 - degree * 4;

    for (let i = 0; i < inputArray.length - newWidth; i += 4) {
        const colorDistance = getColorDistance(
            inputArray[i],
            inputArray[i + 1],
            inputArray[i + 2],
            inputArray[i + newWidth],
            inputArray[i + newWidth + 1],
            inputArray[i + newWidth + 2]
        );
        if (colorDistance > dist) {
            tArray[i] = randomColor1;
            tArray[i + 1] = randomColor2;
            tArray[i + 2] = randomColor3;
        }
    }
    for (let i = 0; i < inputArray.length; i += 4) {
        if (tArray[i]) {
            inputArray[i] = tArray[i];
            inputArray[i + 1] = tArray[i + 1];
            inputArray[i + 1] = tArray[i + 1];
            //-- now clear it
            tArray[i] = undefined;
            tArray[i + 1] = undefined;
            tArray[i + 2] = undefined;
            tArray[i + 3] = undefined;
        }
    }
}
