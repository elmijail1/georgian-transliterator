export default function turnStringToArray (string) {
    const charArray = []
    for (let i = 0; i < string.length; i++) {
        charArray.push(string[i].toLowerCase());
    }
    return charArray
}