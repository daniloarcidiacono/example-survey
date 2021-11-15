export default function optionalFilter(value: any) {
    return value !== null && value !== undefined ? value : "n/a";
}
