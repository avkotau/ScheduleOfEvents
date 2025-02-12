export function flattenObject(obj: Record<string, any>, prefix = ''): Record<string, string> {
    let result: Record<string, string> = {};

    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;

            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
                result = { ...result, ...flattenObject(obj[key], newKey) };
            } else {
                result[newKey] = obj[key];
            }
        }
    }

    return result;
}
