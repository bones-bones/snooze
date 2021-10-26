import { instantiateStreaming } from "@assemblyscript/loader";
import type * as MixerEffects from "../../assembly/generatedTypes/MixerEffects"; // pointing at the generated d.ts


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



/**
 * This function loads a wasm script, then returns a promise of a function invoking of of the scripts functinos. In this case, overlay.
 */
export const loadSubtract = async (): Promise<(
    leftArray: Uint8ClampedArray,
    rightArray: Uint8ClampedArray,
    _width: number,
    degree: number) => Uint8ClampedArray> => {

    const {
        subtract: wasmSubtract,       // The name of the imported function
        __getUint8ClampedArray,     // This is an AS helper that pulls data out of wasm, converting it to a Uint8ClampedArray
        __newArray,                 // This is also an AS helper that turns a js array into an array that wasm can read. sorta.
        Uint8ClampedArray_ID } = (
            await instantiateStreaming<typeof MixerEffects>(    // Stream the module...
                fetch('./assembly/MixerEffects.release.wasm'),  // This is where it lives... 
                {}                                              // Not doing anthing fancy... yet
            )
        ).exports

    return function subtract(
        leftArray: Uint8ClampedArray,
        rightArray: Uint8ClampedArray,
        _width: number,
        degree: number = 50) {

        // pretty much "new UInt8ClampedArray() that i can pass to AS". It's literrally a number
        const pointerToWhereTheLeftArrayIsStoredInMemory = __newArray(Uint8ClampedArray_ID, leftArray);
        const pointerToWhereTheRightArrayIsStoredInMemory = __newArray(Uint8ClampedArray_ID, rightArray);

        return __getUint8ClampedArray(wasmSubtract(pointerToWhereTheLeftArrayIsStoredInMemory, pointerToWhereTheRightArrayIsStoredInMemory, 0, degree));

    }
}