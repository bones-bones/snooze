import { GenericParms } from './EffectTypes';

const barWidth = 5;
export const bars = ({ array, width, dataArray }: GenericParms) => {
    const height = array.length / 4 / width;
    let source = 0;
    let target = 0;
    let verticalOffset = 20; //Math.floor(Math.random() * 30);

    for (let i = 0; i < width; i++) {
        const iteration = Math.floor(i / barWidth);
        // verticalOffset = dataArray![iteration]

        if (iteration % barWidth == 0) {
            if (i < width / 2) {
                verticalOffset = Math.floor(
                    Math.sqrt(dataArray![Math.floor((i / width) * 12)])
                );
            } else {
                verticalOffset = Math.floor(
                    Math.sqrt(
                        dataArray![
                            dataArray!.length - Math.floor((i / width) * 12)
                        ]
                    )
                );
            }
            verticalOffset = Math.floor(verticalOffset / 4);
        }

        const widthOffset = i * 4;

        if (iteration % 2 === 1) {
            for (let h = 0; h < height; h++) {
                source = widthOffset + h * width * 4;
                target = source - verticalOffset * width * 4;
                array[target] = array[source];
                array[target + 1] = array[source + 1];
                array[target + 2] = array[source + 2];
                array[target + 3] = array[source + 3];
            }
        } else {
            for (let h = height; h >= 0; h--) {
                source = widthOffset + h * width * 4;
                target = source + verticalOffset * width * 4;

                array[target] = array[source];
                array[target + 1] = array[source + 1];
                array[target + 2] = array[source + 2];
                array[target + 3] = array[source + 3];
            }
        }
    }
    return array;
};
