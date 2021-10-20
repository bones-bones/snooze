import { GenericParms } from './types';
import { instantiateStreaming } from '@assemblyscript/loader';
import type * as MyModule from "../../assembly/generatedTypes/MyModule"; // pointing at the generated d.ts

export const loadWasmCartoon = async (): Promise<({ array: inputArray }: GenericParms,
    threshold: number) => Uint8ClampedArray> => {

    const { cartoon: wasmCartoon, __getUint8ClampedArray, __newArray, Uint8ClampedArray_ID } = (await instantiateStreaming<typeof MyModule>(fetch('./assembly/myModule.release.wasm'), {})).exports

    return function cartoon({ array: inputArray }: GenericParms,
        threshold: number = 9500) {

        const arrPtrL = __newArray(Uint8ClampedArray_ID, inputArray)

        const resp = __getUint8ClampedArray(wasmCartoon(arrPtrL, threshold))
        return resp as Uint8ClampedArray;
    }
}