export const subtract = (
    leftArray: Uint8ClampedArray,
    rightArray: Uint8ClampedArray,
    _width: number,
    degree: number = 50
) => {
    const rFactor = degree / 100;
    const lFactor = (100 - degree) / 100;
    let i = leftArray.length;
    while ((i -= 4)) {
        leftArray[i] =
            Math.abs(leftArray[i] * lFactor - rightArray[i] * rFactor) + 50;
        leftArray[i + 1] =
            Math.abs(leftArray[i + 1] * lFactor - rightArray[i + 1] * rFactor) +
            50;
        leftArray[i + 2] =
            Math.abs(leftArray[i + 2] * lFactor - rightArray[i + 2] * rFactor) +
            50;
    }
    return leftArray;
};

/*
 * okay what am i doing here. middle should be full substraction of B from A
 * A -
 */
