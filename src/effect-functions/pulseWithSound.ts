import { getLuminosity } from './helperFunctions/colorFunctions';
import { GenericParms } from './types';

export function pulseWithSound({ array, dataArray }: GenericParms) {
    for (let i = 0; i < array.length; i += 4) {
        const lums = getLuminosity(array[i], array[i + 1], array[i + 2]);
        array[i + 3] = dataArray![Math.floor(lums * 24)];
    }
    return array;
}
