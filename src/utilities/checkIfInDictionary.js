// for special characters to avoid dictionary mapping

export default function checkIfInDictionary(char, dictionary, charArrayEnd) {
    if (!Array.from(dictionary, x => x.lat).includes(char)) {
        return charArrayEnd.push(char);
    }
}