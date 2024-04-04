// functions
import turnStringToArray from "./turnStringToArray.js";
import matchChars from "./matchChars.js";

// data
import {charsData} from "../data/charsData.js"

export default function transliterate (string, setOptionfulChars) {

    const initialArray = turnStringToArray(string) // lat string –> lat array
    const finalArray = matchChars(initialArray, charsData, setOptionfulChars) // lat array -> geo array
    
    return finalArray
}