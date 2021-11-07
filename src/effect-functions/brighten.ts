import { GenericParms } from './types';

export function brightenEffect(
    { array }: GenericParms,
    degreeOfBrightening: string
) {
    const deg = parseInt(degreeOfBrightening);
    for (let y = 0; y < array.length; y += 4) {
        const [r, b, g] = [array[y], array[y + 1], array[y + 2]];

        const colorCenterPoint = (r + b + g) / 3;

        const sumVal = Math.sqrt(
            (r - colorCenterPoint) * (r - colorCenterPoint) +
            (g - colorCenterPoint) * (g - colorCenterPoint) +
            (b - colorCenterPoint) * (b - colorCenterPoint)
        );
        if (sumVal > 15) {
            array[y] = array[y] + ((256 - array[y]) * deg) / 100;
            array[y + 1] = array[y + 1] + ((256 - array[y + 1]) * deg) / 100;

            array[y + 2] = array[y + 2] + ((256 - array[y + 2]) * deg) / 100;
        }
    }
    return array;
}
