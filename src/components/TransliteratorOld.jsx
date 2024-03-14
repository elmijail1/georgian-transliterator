// general imports
import { useState } from "react";
import { nanoid } from "nanoid";

// data import
import { charsData } from "../data/charsData";


// TO DO (* = estimated difficulty)
// - * make Georgian to Latin transliterator
// - * how to auto detect which writing system the string belongs to?
// - * save history in localStorage
// - * add proper styles
// - *** see how you can handle multioptional letters & digraphs (k, t, ch, etc) (maybe we can return several strings as various guesses?)



export default function TransliteratorOld() {
    // latest pair: input + result of the transliteration
    const [texts, setTexts] = useState(
        {
            lat: "",
            geo: "",
        }
    )

    // controlling the input
    function handleTextInput(event) {
        const { name, value } = event.target;
        setTexts((prevTexts) => ({ ...prevTexts, [name]: value }));
    }

    // array of all the transliterations
    const [history, setHistory] = useState([])


    // TRANSLITERATION LOGIC

    // Break the input string into an array of single chars.
    // Returns an array of Latin chars & special symbols.
    function turnStringToArray(string) {
        const charArray = [];
        for (let i = 0; i < string.length; i++) {
            charArray.push(string[i].toLowerCase());
        }
        return charArray
    }


    // for special characters to avoid dictionary mapping
    function checkIfInDictionary(char, dictionary, charArrayEnd) {
        if (!Array.from(dictionary, x => x.lat).includes(char)) {
            return charArrayEnd.push(char);
        }
    }

    // Compare each char of an array that we got after breaking an initial string
    // with latin chars in charsData entries. Matching chars' georgian counterparts
    // are added to a new array. Returns an array of Georgian chars & special symbols.
    function matchLetters(charArrayStart, dictionary) {
        const charArrayEnd = [];
        const digraphs = {
            total: ["c", "d", "g", "k", "p", "s", "t", "z"],
            hDigraphs: ["c", "g", "k", "p", "s", "z"],
            zDigraphs: "d",
            sDigraphs: "t",
        }
        let prevChar = ""; // used to distinguish digraphs from single chars

        charArrayStart.map((char, indexChar) => {

            // used to not transliterate second characters of digraphs (to avoid ch => ჩჰ)
            // to make it a function: find a way to skip an iteration without a return
            if (prevChar.length > 1) {  // when a previus char was a digraph, it's saved to prevChar (e.g. "kh") and it's length is 2
                prevChar = char;  // if prevChar is a digraph, we assign the current char to prevChar
                return  // and end its iteration, skipping to the next one
            }

            // for special characters to avoid dictionary mapping
            checkIfInDictionary(char, dictionary, charArrayEnd);

            // checkIfADigraph
            // can we make it a separate function?
            if (digraphs.total.includes(char)){
                if (digraphs.hDigraphs.includes(char) && charArrayStart[indexChar+1] === "h") {
                    char = char + "h"
                } else if (digraphs.zDigraphs === char && charArrayStart[indexChar+1] === "z") {
                    char = char + "z"
                } else if (digraphs.sDigraphs === char && charArrayStart[indexChar+1] === "s") {
                    char = char + "s"
                }
            }

            dictionary.map(entry => {

                if (char === entry.lat) {
                    prevChar = char
                    return charArrayEnd.push(entry.geo)
                }

            })
        })

        return charArrayEnd;
    }


    // Full-cycle transliteration function.
    // Break an input string into a Latin array. Turn the Latin array into a Georgian array.
    // Then join the Georgian array and assign the value to texts' property "georgianText". 
    function transliterateLatinToGeorgian(event, string) {
        event.preventDefault()
        const charArrayStart = turnStringToArray(string)
        const charArrayEnd = matchLetters(charArrayStart, charsData)
        setTexts((prevTexts) => {
            return { ...prevTexts, geo: charArrayEnd.join("") }
        })
        const result = { latinText: texts.lat, georgianText: texts.geo }

        // to display the latest transliteration in the history
        setHistory((prevHistory) => {
            return [...prevHistory, { latinText: string, georgianText: charArrayEnd.join("") }]
        })

    }


    return (
        <div>
            <h1>Georgian Transliterator</h1>

            <form method="get" onSubmit={(event) => transliterateLatinToGeorgian(event, texts.lat)}>
                <input
                    type="text"
                    name="lat"
                    id="text-input"
                    placeholder="Enter Latin text"
                    value={texts.lat}
                    onChange={handleTextInput}
                />
                <button>Transliterate</button>
            </form>
            <h2>Results:</h2>
            <ul>
                {
                    history.slice(0).reverse().map((entry) => {
                        return (
                            <li key={nanoid()}>{entry.georgianText} ← {entry.latinText}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}