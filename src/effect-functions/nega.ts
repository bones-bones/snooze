import { GenericParms } from './types';

export const negaEffect = ({ array }: GenericParms) => {
    for (let y = 0; y < array.length; y += 4) {
        array[y] = Math.abs(255 - array[y]);
        array[y + 1] = Math.abs(255 - array[y + 1]);
        array[y + 2] = Math.abs(255 - array[y + 2]);
    }
    return array;
}
