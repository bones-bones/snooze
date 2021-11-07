import { GenericParms } from './types';

export default function xToYEffect(
    { array }: GenericParms,
    toAndFrom: ('r' | 'b' | 'g' | 'a')[]
) {
    const indexOne = Math.max(['r', 'g', 'b', 'a'].indexOf(toAndFrom[0]), 0);
    const indexTwo = Math.max(['r', 'g', 'b', 'a'].indexOf(toAndFrom[1]), 0);

    for (let y = 0; y < array.length; y += 4) {
        // swampspot = array[y + indexTwo];
        array[y + indexOne] = array[y + indexTwo];
        // array[y + indexOne] = swampspot;
    }

    return array;
}
