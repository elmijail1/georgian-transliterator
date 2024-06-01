// data
import { charsData } from "../../data/charsData.js"

function turnStringToArray(string) {
    const charArray = []
    for (let i = 0; i < string.length; i++) {
        charArray.push(string[i].toLowerCase());
    }
    return charArray
}

function matchChars(initialArray, dictionary) {

    // 1. Preparations
    const finalArray = []

    const digraphs = {
        total: ["c", "d", "g", "k", "p", "s", "t", "z"],
        h_Digraphs: ["c", "g", "k", "p", "s", "z"],
        z_Digraphs: "d",
        s_Digraphs: "t",
    }

    let latestChar = "" // S4

    initialArray.map((char, charIndex) => {

        // 2. Condition 1: Is latestChar regular or not?
        if (latestChar.length > 1) {
            if (latestChar.length === 3 && latestChar[1] === char) {
                return
            }
            latestChar = char;
            return
        }

        // 3. Condition 2: Does the dictionary have an entry with this character?
        if (!Array.from(dictionary, x => x.lat).includes(char)) {
            latestChar = char;
            return finalArray.push({ geoChar: char, latInit: char });
        }

        // 4. Condition 3: Is this character a digraph?
        if (digraphs.total.includes(char)) {
            if (digraphs.h_Digraphs.includes(char) && initialArray[charIndex + 1] === "h") {
                char = char + "h"
            } else if (char === digraphs.z_Digraphs && initialArray[charIndex + 1] === "z") {
                char = char + "z"
            } else if (char === digraphs.s_Digraphs && initialArray[charIndex + 1] === "s") {
                if (initialArray[charIndex + 2] === "h") {
                    char = char + "sh"
                } else {
                    char = char + "s"
                }
            }
        }

        // 5. Get the corresponding Georgian character
        dictionary.map((entry) => {
            if (entry.lat === char) {
                latestChar = char;
                finalArray.push({ geoChar: entry.geo, latInit: char })
            }
        })
    })

    return finalArray
}

export default function transliterate(string) {
    const initialArray = turnStringToArray(string) // lat string –> lat array
    return matchChars(initialArray, charsData) // lat array -> geo array
}


{/*
COMMENTS

While the transliterare function itself isn't large, one of its child functions, matchChars,
is. I'll start the description of the functions in this file with the main one, then
proceed to the smaller child function, and finish with the matchChars function.

transliterate
USED IN: components/Home/InputWindow inside the handleInputChange function.
WHAT IT DOES: accepts a text in Latin and turns it into a text in the Georgian script.
Technically, it receives a string in Latin (event.target.value of the textarea in the
InputWindow component), turns it into an array of Latin strings, and then creates another
array, this time containing objects with the Latin characters from the previous array as
well as corresponding Georgian characters.
ARGUMENTS (1): string.
DESCRIPTION: it consists of 2 parts: turn the passed string into an array of strings,
then turn that array of strings into an array of objects containing both Latin and
Georgian characters for further use in page/OutputWindow (to be more precise, in its
mapOutput function). The former is done by turnStringToArray, the latter – by matchChars.
Both those functions can be found in the same file here.


turnStringToArray
USED IN: the transliterate function's first step.
WHAT IT DOES: receives a string and returns an array of its characters.
ARGUMENTS (1): string.
DESCRIPTION: the received string is the same that the transliterator function receives.
The string is mapped: each of its characters is turned to lower case and pushed to a
new array. After all the characters of the string have been pushed to the array, the
array is returned.


matchChars
USED IN: the transliterate function's second step.
WHAT IT DOES: receives an array of Latin characters and returns an array with
corresponding Georgian characters. Technically, the returned array contains not only
Georgian characters but also the same Latin ones that have been initially passed to the
function.
ARGUMENTS (2): initialArray, dictionary.
DESCRIPTION: the description of this function will take a lot of space since it has several
important parts and conditions. That's why I'll add a table of contents for it first:
CONTENTS:
1. PREPARATIONS
2. CONDITION 1: IS latestChar REGULAR OR NOT?
3. CONDITION 2: DOES THE DICTIONARY HAVE AN ENTRY WITH THIS CHARACTER?
4. CONDITION 3: IS THIS CHARACTER A DIGRAPH?
5. GET THE CORRESPONDING GEORGIAN CHARACTER
.
Also, before moving on to the steps' description, I'll add that there's another
description of this function where it's shown via stages of its development how exactly
it works. To find it, refer to utilities/Home/matchCharsWithStages.
.
1. PREPARATIONS
The heart of this function is the mapping of the initialArray, the received array of
Latin characters. But before the function starts mapping of that array, it does some
preparation. To be more precise, there are 3 things it does: it makes an empty array,
it creates a digraphs object, and it creates the latestChar variable. Let's take a
look at each of those steps:
- i. Making an empty array. The finalArray array is initially empty. It will be later
used inside the mapping loop to store the return of each loop. Finally, it's what will
be returned at the end of the function and the bigger transliterate function.
- ii. Making a digraph object. The digraph object contains initial letters of digraphs.
The total property contains them all, while the 3 others contain particular ones:
..- h_Digraphs: they contain the first character of digraphs the second character of which
is "h". That includes ch, gh, kh,ph, sh, and zh;
..- z_Digraphs: they contain the first character of digraphs the second character of which
is "z". That oncludes just dz;
..- s_Digraphs: they contain the first character of digraphs the second character of which
is "s". That oncludes just ts.
How exactly it's used will be described later (step 4).
- iii. Creating the latestChar variable. It's an empty string that will be filled at the
end of each mapping loop with the current character. While in most cases it's going to
contain one character ("o", "m", etc), in some cases it can contain more than that:
2 for digraphs ("ch", "dz", etc) and 3 for trigraphs (so far there's just one: "tsh").
If latestChar's length is bigger than 1, the current character will be treated differently.
More about that in step 2.
.
.
2. CONDITION 1: IS latestChar REGULAR OR NOT?
First of all, the mapping of the initialArray has started at this point. The extracted
values are char & charIndex. Whatever happens further is applied to an entry of the
initialArray which is a string representing one character.
.
A "regular" latestChar's value has the length of 1 or 0. If the entry's latestChar doesn't
satisfy that condition, the checker applies the following logic to it:
..- first it runs another check: if the length of the latestChar is as much as 3 and if
the second character of the latestChar's value is the current mapped entry, the loop ends
right there without any further actions. The mapping goes to the next character. The
reason for that is that if the length of the latestChar is 3, it's a trigtaph we're dealing
with. If the current character is in the middle of it (being the 2nd of 3 characters that
comprise the trigraph), there's nothing else we can do with this character, since the
trigraphs is handled at the 1st character of it (during the 1st trigrap character mapping);
..- if neither condition is true, the latestChar is assigned to the value of the current
entry (char) and the loop ends – the mapping goes to the next character if there is any.
This situation can happen in 2 cases: we're dealing with either a digraph's 2nd character
or a trigraph's 3rd character. At that point we just need to pave the road for whatever
comes next after the current character cluster (digraph / trigraph) and set the
latestChar to a regular value which is 1-character long. Here's an example: the word
"khidi" has the digraph "kh" at the beginning. By the moment we get to its 2nd character
"h" we'll have our latestChar set to "kh". It's an anomaly that triggers thigs checker
and it makes sense for the 2nd character of the digraph. But what follows it is just "i",
a single character that doesn't need special treatment. So to avoid triggering this
checker, we set the latestChar to 1 character "h".
.
.
3. CONDITION 2: DOES THE DICTIONARY HAVE AN ENTRY WITH THIS CHARACTER?
We do this check to make sure that we're dealing with a proper Latin letter, not a special
symbol of any sort. All the Latin letters have respective entries in the dictionary and if
there's none for the currently mapped character, then it's not a Latin letter. It can be
a number, a special symbol, a Cyrillic letter – anything, but not a Latin letter. Hence,
there's no need to transliterate it. We just set the latestChar to it and push it to
the finalArray with the same character passed as the value to both properties: geoChar and
latInit.
.
e.g.: "/" is the currently mapped character. There's no entry in the dictionary the "lat"
propety of which equals it. Hence, this condition checker gets triggered. latestChar is
assigned to "/" and this character-related entry is pushed to the finalArray as
{geoChar: "/", latInit: "/"}. What's rendered is "/".
.
.
4. CONDITION 3: IS THIS CHARACTER A DIGRAPH?
Now it's necessary to check if the currently mapped character is a part of a digraph /
trigraph. To do that we'll need to use the digraphs object that we defined in step 1.
First, we check if the total array contains the current character. If it doesn't, the
further checks are skipped. If it does, a couple more checks are made: whether the
character belongs to the h-digraph array, then the z-digraph array, and finally the
s-digraph array. If it does belong to any of them, the "char" variable that represents
the currently mapped character is reassigned to the full digraph.
.
To determine that we're dealing with a digraph we need the character to meet 2 conditions:
- it belongs to one of the digraph arrays: it's straightforward;
- the next character is the character that forms a digraph / trigraph with the currently
mapped character. e.g. If the currently mapped character is "d", we first make sure that
it belongs to one of the digraph arrays (it does belong to the z-digraph array), then we
check the next character: if it's "z", we have a digraph here. If it's not, we don't and
the char variable isn't reassigned (it remains equal to "d").
.
e.g. The same word "khidi" as we've already mentioned in previous steps' examples. The
first character to be mapped is "k". It successfully goes through the previous steps to
this one. The first check is successful: "k" belongs to the total array of the digraphs
object. The first second-level check is successful too: "k" belongs to the h-digraph
array. The second second-level check is also successful: "h" is the character that goes
after "k", hence there's a sequence "kh" in the word which is a digraph. So now the char
variable doesn't carry just "k" as its value – it now carries the full digraph: "kh".
We need that for the next mapped character ("h" which is a part of the same digraph) to
succeed at the first condition check (step 2) to handle the digraph the right way.
.
You might've noticed that one of the sub-array checkers – namely the third one – has
another checker inside it. It's necessary to have it to be able to detect the only
Georgian trigraph: tsh. To do that we need to not only check the character that goes right
after the currently mapped one but also the one that goes after that.
.
.
5. GET THE CORRESPONDING GEORGIAN CHARACTER
Finally, after all the checks we do the most important part: matching the currently
mapped Latin character with the corresponding Georgian one. It's important to note that
most characters will fail all the previous checks and ignore the related logic, coming
straight to this step. Digraphs / trigraphs and non-Latin symbols will have to stop at
any of those steps though.
.
Anyway, what happens here is simple: we map the dictionary and compare its entries'
"lat" value with the currently mapped char. The dictionary contains both regular
characters & digraphs / trigraphs, so it doesn't matter if "char" contains a 1-character
string or if it's 2- or 3-character long. When the match is found, we push a new object
to the finalArray: it contains the "char" value for its latInit property and the just
found matching Georgian letter for the geoChar value. 
.
Finally, when all the input's characters have been mapped and there are no more loops,
the finalArray is returned. It contains objects with all the characters of the initial
input – note that the length of the array can be different from the length of the initial
input string since some of its characters are digraphs / trigraphs. e.g. "khidi" has 5
characters but its finalArray will have 4 objects: the reasons for that is that "kh" will
be added to finalArray as a single character {geoChar: "ხ", latInit: "kh"}.
*/}