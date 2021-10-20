export const overlay = (
    leftArray: Uint8ClampedArray,
    rightArray: Uint8ClampedArray,
    _width: number,
    degree: number = 50
) => {
    const rFactor = degree / 100;
    const lFactor = (100 - degree) / 100;
    let finRed = 0;
    let finBlue = 0;
    let finGreen = 0;
    let i = leftArray.length;
    while ((i -= 4)) {
        if (lFactor >= rFactor) {
            const lAlphaFactor = leftArray[i + 3] / 255;
            const inverseAlpha = 1 - lAlphaFactor;
            finRed = leftArray[i] * lAlphaFactor + rightArray[i] * inverseAlpha;
            finGreen =
                leftArray[i + 1] * lAlphaFactor +
                rightArray[i + 1] * inverseAlpha;
            finBlue =
                leftArray[i + 2] * lAlphaFactor +
                rightArray[i + 2] * inverseAlpha;
        } else {
            const rAlphaFactor = rightArray[i + 3] / 255;
            const inverseAlpha = 1 - rAlphaFactor;
            finRed = rightArray[i] * rAlphaFactor + leftArray[i] * inverseAlpha;
            finGreen =
                rightArray[i + 1] * rAlphaFactor +
                leftArray[i + 1] * inverseAlpha;
            finBlue =
                rightArray[i + 2] * rAlphaFactor +
                leftArray[i + 2] * inverseAlpha;
        }
        leftArray[i] = finRed;
        leftArray[i + 1] = finGreen;
        leftArray[i + 2] = finBlue;
        leftArray[i + 3] = 255;
    }
    return leftArray;
};

/*
* okay what am i doing here. middle should be full substraction of B from A
* A -

*/
