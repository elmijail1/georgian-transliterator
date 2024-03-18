// functions
import turnStringToArray from "./turnStringToArray";
import matchChars from "./matchChars";

// data
import {charsData} from "../data/charsData.js"

export default function transliterate (string) {
    const initialArray = turnStringToArray(string)
    const finalArray = matchChars(initialArray, charsData)
    return finalArray
}