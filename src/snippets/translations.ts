// ITF actualWidth is the width X 4 because a pixel is actually 4 numbers
export function toXandY(
    position: number,
    width: number
): { x: number; y: number } {
    const newPosition = position / 4;
    return { x: newPosition % width, y: (newPosition / width) >> 0 };
}

export function toPositionInArray(
    x: number,
    y: number,
    actualWidth: number
): number {
    return 4 * (y * actualWidth + x);
}
