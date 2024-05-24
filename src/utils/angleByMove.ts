export function angleByMove(r1: number, r2: number, move: number) {
    return Math.acos((r1 * r1 + r2 * r2 - move * move) / (2 * r1 * r2))
}