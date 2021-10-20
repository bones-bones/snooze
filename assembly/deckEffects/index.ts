export function allOnes(): void {
    const rFactor: f32 = 75 / 100;
    const lFactor: f32 = 1 - rFactor

    const total = 640000;

    for (let i = 0; i < total; i++) {

        const left = unchecked(<u8>(load<u8>(i) * lFactor));

        const right = unchecked(<u8>(load<u8>(i + total) * rFactor))
        unchecked(store<u8>(i, left + right));

    }
}
/*    
    for (let i = 0; i < 400 * 400 * 4; i += 4) {
        const r = load<u8>(i)
        const g = load<u8>(i + 1)
        const b = load<u8>(i + 2)


        store<u8>(i, 100)
        store<u8>(i + 1, 100)
        store<u8>(i + 2, 255)
    }*/
export function readWasmMemoryAndReturnIndexOne(): u8 {
    // Read the value at indexOne
    return load<u8>(1);

}


export function add(a: i32, b: i32): i32 { return <i32>Math.abs(<f64>a) + b }



export function getColorDistance(
    r: u32,
    g: u32,
    b: u32,
    r2: u32,
    g2: u32,
    b2: u32
): u32 {
    return (r - r2) * (r - r2) + (b - b2) * (b - b2) + (g - g2) * (g - g2);
}



export function averageOfTheTwo(
    leftArray: Uint8Array,
    rightArray: Uint8Array,
    _width: u32,
    degree: f32 = 50
): Uint8Array {
    const rFactor: f32 = degree / 100;
    const lFactor: f32 = 1 - rFactor

    let i = leftArray.length;

    while (i--) {
        unchecked(leftArray[i] = <u8>(
            unchecked(leftArray[i]) * lFactor
            + unchecked(rightArray[i]) * rFactor
        ));
    }
    return leftArray;
}

export const Uint8ClampedArray_ID = idof<Uint8Array>()


export function cartoon(
    inputArray: Uint8Array,
    threshold: u32
): Uint8Array {
    const screenWidth: u32 = 400;
    for (let i = 0; i < inputArray.length - screenWidth * 2; i += 4) {
        if (i % screenWidth !== screenWidth - 4) {
            const colorDistance = getColorDistance(
                unchecked(inputArray[i]),
                unchecked(inputArray[i + 1]),
                unchecked(inputArray[i + 2]),
                unchecked(inputArray[i + screenWidth]),
                unchecked(inputArray[i + screenWidth + 1]),
                unchecked(inputArray[i + screenWidth + 2])
            );

            const colorDistance2 = getColorDistance(
                unchecked(inputArray[i + screenWidth]),
                unchecked(inputArray[i + screenWidth + 1]),
                unchecked(inputArray[i + screenWidth + 2]),
                unchecked(inputArray[i + screenWidth * 2]),
                unchecked(inputArray[i + screenWidth * 2 + 1]),
                unchecked(inputArray[i + screenWidth * 2 + 2])
            );

            if (colorDistance <= threshold && colorDistance2) {
                unchecked(inputArray[i + screenWidth] = inputArray[i]);
                unchecked(inputArray[i + screenWidth + 1] = inputArray[i + 1]);
                unchecked((inputArray[i + screenWidth + 2]) = inputArray[i + 2]);
            }
        }

        if (i % screenWidth > 1) {
            const secondColorDistance = getColorDistance(
                unchecked(inputArray[i]),
                unchecked(inputArray[i + 1]),
                unchecked(inputArray[i + 2]),
                unchecked(inputArray[i + 4]),
                unchecked(inputArray[i + 5]),
                unchecked(inputArray[i + 6])
            );
            const secondColorDistance2 = getColorDistance(
                unchecked(inputArray[i + 4]),
                unchecked(inputArray[i + 5]),
                unchecked(inputArray[i + 6]),
                unchecked(inputArray[i + 8]),
                unchecked(inputArray[i + 9]),
                unchecked(inputArray[i + 10])
            );
            if (secondColorDistance <= threshold && secondColorDistance2) {
                unchecked(inputArray[i + 4] = inputArray[i]);
                unchecked(inputArray[i + 5] = inputArray[i + 1]);
                (inputArray[i + 6] = inputArray[i + 2]);
            }
        }
    }
    return inputArray;
}



export function hardRGB(array: Uint8Array): Uint8Array {
    let y = array.length;

    while ((y -= 4)) {
        const r = unchecked(array[y])
        const g = unchecked(array[y + 1])
        const b = unchecked(array[y + 2])

        if (r > g && r > b) {
            unchecked(array[y + 2] = 0);
            unchecked(array[y + 1] = 0);
        } else if (g > b) {
            unchecked(array[y + 2] = 0);
            unchecked(array[y] = 0);
        } else if (b > r) {
            // okay this looks weird, but hear me out, this is effectively the check to see if all values are not the same.
            unchecked(array[y] = 0);
            unchecked(array[y + 1] = 0);
        }
    }
    return array;
}
