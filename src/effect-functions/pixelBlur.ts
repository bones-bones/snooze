import { GenericGeneratorParms } from './EffectTypes';

export function* pixelBlur({ input }: GenericGeneratorParms) {
    const prev: number[] = new Array(input.length);
    const dirtyArray: boolean[] = new Array(input.length / 4);
    for (let i = 0; i < input.length; i++) {
        prev[i] = input[i];
    }
    while (true) {
        input = yield transformForMe(input as number[], prev, dirtyArray);
    }
}

function transformForMe(
    array: number[],
    prev: number[],
    dirtyArray: boolean[]
) {
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
