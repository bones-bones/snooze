


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

/**
 * This function loads a wasm script, then returns a promise of a function invoking of of the scripts functinos. In this case, overlay.
//  */
// export const loadWasmOverlay = async (): Promise<(
//     leftArray: Uint8ClampedArray,
//     rightArray: Uint8ClampedArray,
//     _width: number,
//     degree: number) => Uint8ClampedArray> => {

//     const {
//         overlay: wasmOverlay,       // The name of the imported function
//         __getUint8ClampedArray,     // This is an AS helper that pulls data out of wasm, converting it to a Uint8ClampedArray
//         __newArray,                 // This is also an AS helper that turns a js array into an array that wasm can read. sorta.
//         Uint8ClampedArray_ID } = (
//             await instantiateStreaming<typeof MixerEffects>(    // Stream the module...
//                 fetch('./assembly/MixerEffects.release.wasm'),  // This is where it lives... 
//                 {}                                              // Not doing anthing fancy... yet
//             )
//         ).exports

//     return function overlay(
//         leftArray: Uint8ClampedArray,
//         rightArray: Uint8ClampedArray,
//         _width: number,
//         degree: number = 50) {

//         // pretty much "new UInt8ClampedArray() that i can pass to AS". It's literrally a number
//         const pointerToWhereTheLeftArrayIsStoredInMemory = __newArray(Uint8ClampedArray_ID, leftArray);
//         const pointerToWhereTheRightArrayIsStoredInMemory = __newArray(Uint8ClampedArray_ID, rightArray);

//         return __getUint8ClampedArray(wasmOverlay(pointerToWhereTheLeftArrayIsStoredInMemory, pointerToWhereTheRightArrayIsStoredInMemory, 0, degree));

//     }
// }