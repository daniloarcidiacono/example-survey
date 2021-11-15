export default function roundFilter(value: number | null | undefined) {
    if (value !== null && value !== undefined && !isNaN(value)) {
        return (Math.round(value * 100) / 100).toFixed(2);
    }

    return value;
}
