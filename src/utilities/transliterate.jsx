import turnStringToArray from "./turnStringToArray";
import transliterateArray from "./transliterateArray";

export default function transliterate (string, dictionary) {
    const initialArray = turnStringToArray(string)
    const finalArray = transliterateArray(initialArray, dictionary)
    return finalArray
}