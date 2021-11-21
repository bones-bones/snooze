import { getColorDistance } from './helperFunctions/colorDistance';
//import { getLuminosity } from './helperFunctions/colorFunctions';
import { GenericParms } from './types';
const offsetV = 20;
const moveFactor = offsetV - (offsetV % 2);
export const slideBright = ({ array, width }: GenericParms) => {
    const tArray = new Uint8ClampedArray(array.length);

    const leftOffset =
        Math.floor(Math.random() * moveFactor - moveFactor / 2) * 4;

    const topOffset =
        Math.floor(Math.random() * moveFactor - moveFactor / 2) * width * 4;

    const offset = leftOffset + topOffset;

    for (let i = 0; i < array.length; i += 4) {
        const newAv = (array[i] + array[i + 1] + array[i + 2]) / 3;
        const lumvalue = getColorDistance(
            newAv,
            newAv,
            newAv,
            array[i],
            array[i + 1],
            array[i + 2]
        );
        if (lumvalue > 11000) {
            tArray[i] = array[i];
            tArray[i + 1] = array[i + 1];
            tArray[i + 2] = array[i + 2];
        }
    }
    for (let i = 0; i < tArray.length - 4; i += 4) {
        if (tArray[i] !== 0) {
            array[i + offset] = tArray[i];
            array[i + offset + 1] = tArray[i + 1];
            array[i + offset + 2] = tArray[i + 2];
        }
    }
    return array;
};
