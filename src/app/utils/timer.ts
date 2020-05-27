export function start(): Date {
    return new Date()
};
/**
 * 
 * @param start Start Time
 * @param end End Time
 * @returns Time elapse in seconds
 */
export function counter(start): number {
    const end: any = new Date();
    let timeElapse = end - start;
    return (Math.round(timeElapse /= 1000));
}