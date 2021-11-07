
export interface GenericParms {
    array: Uint8ClampedArray;
    width: number;
    /**
     * Returns the greatest integer less than or equal to its numeric argument.
     * [255, 255, 216, 132, 104, 97, 103, 121, 119, 127, 136, 135, 115, 117, 90, 51, 0, 0, 0, 0, 0, 0, 0, 0]
     */
    dataArray?: Uint8Array;
}