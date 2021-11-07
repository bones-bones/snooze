import { GenericParms } from './types';

export default function blackAndWhite({ array }: GenericParms) {
    for (let y = 0; y < array.length; y += 4) {
        const val = 0.3 * array[y] + 0.59 * array[y + 1] + 0.11 * array[y + 2];
        array[y] = val;
        array[y + 1] = val;
        array[y + 2] = val;
    }

    return array;
}
