import { GenericParms } from './types';

export function closeNuff(
    { array }: GenericParms,
    color1: string,
    color2: string,
    color3: string
) {
    const parsedColor1 = color1.split(',').map(Number);
    const parsedColor2 = color2.split(',').map(Number);
    const parsedColor3 = color3.split(',').map(Number);

    // console.log(lmm * ((205 / 255)))

    // const averageColor = [array[0], array[1], array[2]];

    for (let y = 4; y < array.length; y += 4) {
        //     [averageColor[0], averageColor[1], averageColor[2]] = [array[y], array[y + 1], array[y + 2]];
        // }

        // for (let y = 0; y < array.length; y += 4) {

        const lum = 0.3 * array[y] + 0.59 * array[y + 1] + 0.11 * array[y + 2];

        const colorDistance1 = test(
            array[y],
            array[y + 1],
            array[y + 2],
            parsedColor1[0],
            parsedColor1[1],
            parsedColor1[2]
        );
        const colorDistance2 = test(
            array[y],
            array[y + 1],
            array[y + 2],
            parsedColor2[0],
            parsedColor2[1],
            parsedColor2[2]
        );
        const colorDistance3 = test(
            array[y],
            array[y + 1],
            array[y + 2],
            parsedColor3[0],
            parsedColor3[1],
            parsedColor3[2]
        );

        if (
            colorDistance1 < colorDistance2 &&
            colorDistance1 < colorDistance3
        ) {
            [array[y], array[y + 1], array[y + 2]] = [
                (parsedColor1[0] / 255) * lum,
                (parsedColor1[1] / 255) * lum,
                (parsedColor1[2] / 255) * lum,
            ];
        } else if (
            colorDistance2 < colorDistance1 &&
            colorDistance2 < colorDistance3
        ) {
            [array[y], array[y + 1], array[y + 2]] = [
                (parsedColor2[0] / 255) * lum,
                (parsedColor2[1] / 255) * lum,
                (parsedColor2[2] / 255) * lum,
            ];
        } else if (
            colorDistance3 < colorDistance1 &&
            colorDistance3 < colorDistance2
        ) {
            [array[y], array[y + 1], array[y + 2]] = [
                (parsedColor1[0] / 255) * lum,
                (parsedColor1[1] / 255) * lum,
                (parsedColor1[2] / 255) * lum,
            ];
        }
    }

    return array;
}

function test(
    r: number,
    g: number,
    b: number,
    r2: number,
    g2: number,
    b2: number
) {
    return (r - r2) * (r - r2) + (b - b2) * (b - b2) + (g - g2) * (g - g2);
}
