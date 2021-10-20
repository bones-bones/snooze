export const fadeOverlay = (
    leftArray: Uint8ClampedArray,
    rightArray: Uint8ClampedArray,
    _width: number,
    degree: number = 50
) => {
    const rFactor = degree / 50; // shortcutting here by not dividing by 100 so i can skip multiplying on line 18 etc
    const lFactor = (100 - degree) / 50;
    let finRed = 0;
    let finBlue = 0;
    let finGreen = 0;

    let i = leftArray.length;
    while ((i -= 4)) {
        if (lFactor >= rFactor) {
            const lAlphaFactor = leftArray[i + 3] / 255;
            const inverseAlphaFactor = (1 - lAlphaFactor) * rFactor;
            finRed =
                leftArray[i] * lAlphaFactor +
                rightArray[i] * inverseAlphaFactor;
            finGreen =
                leftArray[i + 1] * lAlphaFactor +
                rightArray[i + 1] * inverseAlphaFactor;
            finBlue =
                leftArray[i + 2] * lAlphaFactor +
                rightArray[i + 2] * inverseAlphaFactor;
        } else {
            const rAlphaFactor = rightArray[i + 3] / 255;
            const inverseAlphaFactor = (1 - rAlphaFactor) * lFactor;
            finRed =
                rightArray[i] * rAlphaFactor +
                leftArray[i] * inverseAlphaFactor;
            finGreen =
                rightArray[i + 1] * rAlphaFactor +
                leftArray[i + 1] * inverseAlphaFactor;
            finBlue =
                rightArray[i + 2] * rAlphaFactor +
                leftArray[i + 2] * inverseAlphaFactor;
        }
        leftArray[i] = finRed;
        leftArray[i + 1] = finGreen;
        leftArray[i + 2] = finBlue;
        leftArray[i + 3] = 255;
    }

    return leftArray;
};
