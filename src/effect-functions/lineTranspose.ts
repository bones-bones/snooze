import { GenericGeneratorParms } from './EffectTypes';

export function* lineTranspose({ input }: GenericGeneratorParms) {
    let amount = Math.floor(Math.random() * 100000);
    let safetyBracket = input.length - amount;

    let startIndex = Math.floor(Math.random() * safetyBracket);
    let targetIndex = Math.floor(Math.random() * safetyBracket);
    let i = 1;
    while (true) {
        if (i <= 0) {
            //should only ever be =
            amount = Math.floor(Math.random() * 100000);
            safetyBracket = input.length - amount;
            startIndex = Math.floor(Math.random() * safetyBracket);
            targetIndex = Math.floor(Math.random() * safetyBracket);
            i = 2;
        }
        i--;
        input = yield transformForMe(
            input as number[],
            amount,
            startIndex,
            targetIndex
        );
    }
}
function transformForMe(
    array: number[],
    fuckUpAmount: number,
    fuckUpIndex: number,
    fuckUptarget: number
) {
    for (let i = 0; i < fuckUpAmount; i++) {
        array[fuckUptarget + i] = array[i + fuckUpIndex];
    }
    return array;
}
