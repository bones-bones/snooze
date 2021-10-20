import { GenericParms } from './types';

export function pixelateEffect(
    { array, width }: GenericParms,
    degreeOfPixelation: number
) {
    if (degreeOfPixelation < 2) {
        return array;
    }
    const newDegree = Math.min(width, degreeOfPixelation);
    const height = array.length / 4 / width || 0;
    const cols = Math.ceil(width / newDegree);
    const rows = Math.ceil(height / newDegree);
    for (let x = 0; x < cols; x++) {
        for (let y = 0; y < rows; y++) {
            const baseLoc = (x + y * width) * newDegree * 4;

            const r = array[baseLoc];
            const g = array[baseLoc + 1];
            const b = array[baseLoc + 2];
            const a = array[baseLoc + 3];
            for (let k = 0; k < newDegree && k + x * newDegree < width; k++) {
                for (let l = 0; l < newDegree; l++) {
                    // Hey future person, there is absolutely a bug here where it writes to more in the array. Sorry
                    const pixelLoc = baseLoc + (k + l * width) * 4;
                    array[pixelLoc] = r;
                    array[pixelLoc + 1] = g;
                    array[pixelLoc + 2] = b;
                    array[pixelLoc + 3] = a;
                }
            }
        }
    }
}
