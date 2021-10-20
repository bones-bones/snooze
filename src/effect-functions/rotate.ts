import { GenericParms } from './types';

export function rotate({ array, width }: GenericParms, degree: number) {
    const height = array.length / 4 / width;
    const tArray = new Array(array.length);

    for (let y = 0; y < height; y++) {
        const baseRow = y * width * 4;

        for (let x = 0; x < width; x++) {
            const basePoint = baseRow + 4 * x;
            const [xval, yval] = rot(x, y, degree, width, height);

            if (xval >= 0 && xval < width && yval >= 0 && yval < height) {
                const newPlace = yval * 4 * width + xval * 4;
                tArray[newPlace] = array[basePoint];
                tArray[newPlace + 1] = array[basePoint + 1];
                tArray[newPlace + 2] = array[basePoint + 2];

                tArray[newPlace + 3] = array[basePoint + 3];
            }
        }
    }

    let k = array.length;
    while (k--) {
        // there is a bug here
        array[k] = tArray[k] || Math.round((tArray[k + 4] + tArray[k - 4]) / 2);
    }
    return array;
}

function rot(
    xVal: number,
    yVal: number,
    angle: number,
    width: number,
    height: number
) {
    const magicValue = (angle * Math.PI) / 180;
    const magicCosValue = Math.cos(magicValue);
    const magicSinValue = Math.sin(magicValue);

    const adjustedX = xVal - width / 2;
    const adjustedY = yVal - height / 2;
    return [
        Math.round(
            adjustedX * magicCosValue - adjustedY * magicSinValue + width / 2
        ),
        Math.round(
            adjustedY * magicCosValue + adjustedX * magicSinValue + height / 2
        ),
    ];
}
