import { GenericGeneratorParms } from './EffectTypes';

export default function* shrinkPictureInPicture({
    input,
    width,
}: GenericGeneratorParms) {
    let time = 0;

    while (true) {
        time++;
        time %= width / 2;

        input = yield transformForMe(input, width, time);
    }
}

function transformForMe(array: number[], width: number, time: number) {
    const newWidth = width * 4;
    const tArray: number[] = new Array(newWidth);

    const height = array.length / newWidth;

    for (let y = time; y < height - time; y++) {
        const pos = y * newWidth;
        for (let x = time * 4; x < newWidth - time * 4; x += 4) {
            tArray[x] = array[x + pos];
            tArray[x + 1] = array[x + pos + 1];
            tArray[x + 2] = array[x + pos + 2];
            tArray[x + 3] = array[x + pos + 3];
        }

        for (let k = 0; k < tArray.length; k++) {
            array[pos + k + time] = tArray[k] || array[pos + k + time];
        }
    }

    return array;
}
