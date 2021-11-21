//0 - 195075
/**
 * Returns a value 0 - 195,075
 */

export function getColorDistance(
    r: number,
    g: number,
    b: number,
    r2: number,
    g2: number,
    b2: number
) {
    return (r - r2) * (r - r2) + (b - b2) * (b - b2) + (g - g2) * (g - g2);
}
