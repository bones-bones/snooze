import { getLuminosity } from './helperFunctions/colorFunctions';
import { GenericParms } from './types';
const offset = 50;
export const slideBright = ({ array }: GenericParms) => {
    const tArray = new Uint8ClampedArray(array.length);

    for (let i = 0; i < array.length; i += 4) {
        const lumvalue = getLuminosity(array[i], array[i + 1], array[i + 2]);
        if (lumvalue > 0.7) {
            tArray[i] = array[i];
            tArray[i + 1] = array[i + 1];
            tArray[i + 2] = array[i + 2];
        }
    }
    for (let i = 0; i < tArray.length - 4; i += 4) {
        if (tArray[i] !== 0) {
            array[i + offset * 4] = tArray[i];
            array[i + offset * 4 + 1] = tArray[i + 1];
            array[i + offset * 4 + 2] = tArray[i + 2];
        }
    }
    return array;
};
