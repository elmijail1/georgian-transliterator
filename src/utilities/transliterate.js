// functions
import turnStringToArray from "./turnStringToArray.js";
import matchChars from "./matchChars.js";

// data
import {charsData} from "../data/charsData.js"

export default function transliterate (string) {

    const initialArray = turnStringToArray(string) // lat string –> lat array
    const finalArray = matchChars(initialArray, charsData) // lat array -> geo array
    const finalOutput = finalArray.join("") // geo array –> geo string

    return finalOutput
}