export const averageOfTheTwo = (
    leftArray: Uint8ClampedArray,
    rightArray: Uint8ClampedArray,
    _width: number,
    degree: number = 50
) => {
    const rFactor = degree / 100;
    const lFactor = 1 - rFactor;

    let i = leftArray.length;
    while (--i) {
        leftArray[i] =
            leftArray[i] * lFactor + rightArray[i] * rFactor

    }

    return leftArray;
};

