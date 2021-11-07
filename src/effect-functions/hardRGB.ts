import { instantiateStreaming } from '@assemblyscript/loader';
import { GenericParms } from './types';
import type * as MyModule from "../../assembly/generatedTypes/MyModule"; // pointing at the generated d.ts




export const wasmHardRGB = async (): Promise<({ array: inputArray }: GenericParms,
    threshold: number) => Uint8ClampedArray> => {

    const { hardRGB: hardRGBWasm, __getUint8ClampedArray, __newArray, Uint8ClampedArray_ID } = (await instantiateStreaming<typeof MyModule>(fetch('./assembly/myModule.release.wasm'), {})).exports

    return function hardRGB({ array: inputArray }: GenericParms,
    ) {

        const arrPtrL = __newArray(Uint8ClampedArray_ID, inputArray)

        const resp = __getUint8ClampedArray(hardRGBWasm(arrPtrL,))
        return resp as Uint8ClampedArray;
    }
}