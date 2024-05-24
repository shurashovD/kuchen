export function moveByAngle(r1: number, r2: number, angle: number) {
    return Math.sqrt(r1 * r1 + r2 * r2 - 2 * r1 * r2 * Math.cos(angle))
}