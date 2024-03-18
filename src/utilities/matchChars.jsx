import checkIfInDictionary from "./checkIfInDictionary.js";

export default function matchChars(initialArray, dictionary) {
    // It will be populated with matched chars & returned at the end.
    const finalArray = [];

    // We need this to check whether the character is a part of a digraph,
    // that is, a 2-character entity as opposed to a regular character.
    // It it is a digraph, the character should be treated differently.
    const digraphs = {
        total: ["c", "d", "g", "k", "p", "s", "t", "z"],
        hDigraphs: ["c", "g", "k", "p", "s", "z"],
        zDigraphs: "d",
        sDigraphs: "t",
    }

    // If we deal with digraphs, we should have our previous character
    // memorized somehow for 1 more iteration. This variable is the way
    // to do it.
    let prevChar = "";

    initialArray.map((char, indexChar) => {

        // Used to not transliterate second characters of digraphs (to avoid ch => ჩჰ)
        if (prevChar.length > 1) { // when a previous char is a digraph, it's saved to prevChar and its length is 2
            prevChar = char; // if prevChar is a digraph, we assign the current char to prevChar
            return // and end its iteration, skipping to the next one
        }

        // For special characters to avoid dictionary mapping
        checkIfInDictionary(char, dictionary, finalArray);

        // Check if the char is the first char in a digraph.


    })


    return finalArray
}