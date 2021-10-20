import { instantiateStreaming } from "@assemblyscript/loader";
import type * as MyModule from "../../assembly/generatedTypes/MyModule"; // pointing at the generated d.ts
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





export const wasmAverageOfTheTwo = async (): Promise<(leftArray: Uint8ClampedArray,
    rightArray: Uint8ClampedArray,
    _width: number,
    degree: number) => Uint8ClampedArray> => {

    const { averageOfTheTwo, __getUint8ClampedArray, __newArray, Uint8ClampedArray_ID } = (await instantiateStreaming<typeof MyModule>(fetch('./assembly/myModule.release.wasm'), {})).exports

    return (leftArray: Uint8ClampedArray,
        rightArray: Uint8ClampedArray,
        _width: number,
        degree: number = 50) => {

        const arrPtrL = __newArray(Uint8ClampedArray_ID, leftArray)
        const arrPtrR = __newArray(Uint8ClampedArray_ID, rightArray)

        const resp = __getUint8ClampedArray(averageOfTheTwo(arrPtrL, arrPtrR, 0, degree))
        return resp as Uint8ClampedArray
    }
}