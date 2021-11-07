import { VIDEO_HEIGHT, VIDEO_WIDTH } from "../constants";
import { GenericParms } from "./types";

let prev: Uint8ClampedArray | undefined;

let dirtyArray: boolean[] | undefined;

export const pixelBlur = ({ array }: GenericParms) => {
    if (!prev) {
        console.log('no prev')
        prev = new Uint8ClampedArray(VIDEO_HEIGHT * VIDEO_WIDTH * 4)
        for (let i = 0; i < array.length; i++) {
            prev[i] = array[i];
        }
        dirtyArray = new Array(array.length / 4);

    }
    return transformForMe(array, prev, dirtyArray!)
}

const transformForMe = (
    array: Uint8ClampedArray,
    prev: Uint8ClampedArray,
    dirtyArray: boolean[]
) => {
    for (let i = 0; i < array.length; i += 4) {
        const mtest = Math.floor(Math.random() * 10);

        if (dirtyArray[i / 4]) {
            if (mtest === 3) {
                // Clear what we had stored
                prev[i] = array[i];
                prev[i + 1] = array[i + 1];
                prev[i + 2] = array[i + 2];
            }
            //load it
            array[i] = prev[i];
            array[i + 1] = prev[i + 1];
            array[i + 2] = prev[i + 2];
        } else {
            if (mtest == 5) {
                dirtyArray[i / 4] = true; //Cache it
                prev[i] = array[i];
                prev[i + 1] = array[i + 1];
                prev[i + 2] = array[i + 2];
            }
        }
    }

    return array;
}
