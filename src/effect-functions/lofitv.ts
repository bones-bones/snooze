import { GenericParms } from './EffectTypes';

export default function lofiTv(
    { array, width }: GenericParms,
    lineCount: number
) {
    for (let i = 0; i < lineCount; i++) {
        const showLine = Math.floor(Math.random() * 5);
        if (showLine === 2) {
            const height = array.length / width;
            const line = Math.floor(Math.random() * (height + 1));

            let degree = 1.5;
            for (let y = 0; y < width * 4; y += 4) {
                const newPosition = line * width + y;
                array[newPosition] = Math.min(255, array[newPosition] * degree);
                array[newPosition + 1] = Math.min(
                    255,
                    array[newPosition + 1] * degree
                );
                array[newPosition + 2] = Math.min(
                    255,
                    array[newPosition + 2] * degree
                );
                if (Math.random() >= 0.5) {
                    degree -= 0.1;
                } else {
                    degree += 0.1;
                }
            }
        }
    }
    return array;
}
