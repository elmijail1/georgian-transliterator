// functions
import turnStringToArray from "./turnStringToArray.js";
import matchChars from "./matchChars.js";

// data
import {charsData} from "../data/charsData.js"

export default function transliterate (string) {
    const initialArray = turnStringToArray(string)
    const finalArray = matchChars(initialArray, charsData)
    return finalArray
}