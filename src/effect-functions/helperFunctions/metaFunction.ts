import { getSongDataArray } from "../../InputSource";
import { GenericParms } from "../types";

export const metaFunk = (
    theFunction: (args: GenericParms, inputAbleNumber: number) => number[],
    indexForDataArray: number
): ((test: GenericParms) => number[]) => (test: GenericParms) => {
    const data = getSongDataArray();
    return theFunction(test, (data[indexForDataArray || 0] || 0) - 240);
};
