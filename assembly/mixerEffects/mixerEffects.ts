export const Uint8ClampedArray_ID = idof<Uint8ClampedArray>();


export function overlay(
    leftArray: Uint8ClampedArray,
    rightArray: Uint8ClampedArray,
    _width: number,
    degree: number = 50
): Uint8ClampedArray {
    const rFactor = degree / 100;
    const lFactor = (100 - degree) / 100;
    let finRed = 0;
    let finBlue = 0;
    let finGreen = 0;
    let i = leftArray.length;

    if (lFactor >= rFactor) {
        while (i -= 4) {
            const lAlphaFactor = unchecked(leftArray[i + 3]) / 255;
            const inverseAlpha = 1 - lAlphaFactor;
            finRed = unchecked(leftArray[i]) * lAlphaFactor + unchecked(rightArray[i]) * inverseAlpha;
            finGreen =
                unchecked(leftArray[i + 1]) * lAlphaFactor +
                (rightArray[i + 1]) * inverseAlpha;
            finBlue =
                unchecked(leftArray[i + 2]) * lAlphaFactor +
                unchecked(rightArray[i + 2]) * inverseAlpha;

            // persist
            unchecked(leftArray[i] = finRed);
            unchecked(leftArray[i + 1] = finGreen);
            unchecked(leftArray[i + 2] = finBlue);
            unchecked(leftArray[i + 3] = 255);
        }

    } else {
        while (i -= 4) {
            const rAlphaFactor = unchecked(rightArray[i + 3]) / 255;
            const inverseAlpha = 1 - rAlphaFactor;
            finRed = unchecked(rightArray[i]) * rAlphaFactor + unchecked(leftArray[i]) * inverseAlpha;
            finGreen =
                unchecked(rightArray[i + 1]) * rAlphaFactor +
                unchecked(leftArray[i + 1]) * inverseAlpha;
            finBlue =
                unchecked(rightArray[i + 2]) * rAlphaFactor +
                unchecked(leftArray[i + 2]) * inverseAlpha;

            // persist
            unchecked(leftArray[i] = finRed);
            unchecked(leftArray[i + 1] = finGreen);
            unchecked(leftArray[i + 2] = finBlue);
            unchecked(leftArray[i + 3] = 255);
        }
    }
    return leftArray;
}



export function mergeAverage(
    leftArray: Uint8ClampedArray,
    rightArray: Uint8ClampedArray,
    _width: u32,
    degree: f32 = 50
): Uint8ClampedArray {
    const rFactor: f32 = degree / 100;
    const lFactor: f32 = 1 - rFactor

    let i = leftArray.length;

    while (i--) {
        unchecked(leftArray[i] = <u8>(
            unchecked(leftArray[i]) * lFactor
            + unchecked(rightArray[i]) * rFactor
        ));
    }
    return leftArray;
}


export function subtract(
    leftArray: Uint8Array,
    rightArray: Uint8Array,
    _width: number,
    degree: number = 50
): Uint8Array {
    const rFactor = degree / 100;
    const lFactor = (100 - degree) / 100;
    let i = leftArray.length;

    while ((i -= 4)) {
        let computed = <u32>Math.abs(unchecked(leftArray[i]) * lFactor - unchecked(rightArray[i]) * rFactor) + 50
        unchecked(leftArray[i] = computed);
        computed = <u32>Math.abs(unchecked(leftArray[i + 1]) * lFactor - unchecked(rightArray[i + 1]) * rFactor) +
            50
        unchecked(leftArray[i + 1] = computed);
        computed = <u32>Math.abs(unchecked(leftArray[i + 2]) * lFactor - unchecked(rightArray[i + 2]) * rFactor) + 50
        unchecked(leftArray[i + 2] = computed);

    }
    return leftArray;
}
