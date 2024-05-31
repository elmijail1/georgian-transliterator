// data
import {charsData} from "../../data/charsData.js"

function turnStringToArray (string) {
    const charArray = []
    for (let i = 0; i < string.length; i++) {
        charArray.push(string[i].toLowerCase());
    }
    return charArray
}

function matchChars(initialArray, dictionary) {

    // 1. Preparations
    const finalArray = [] // S1

    const digraphs = { // S3
        total: ["c", "d", "g", "k", "p", "s", "t", "z"],
        h_Digraphs: ["c", "g", "k", "p", "s", "z"],
        z_Digraphs: "d",
        s_Digraphs: "t",
    }

    let latestChar = "" // S4

    initialArray.map((char, charIndex) => { // S1; S3 for charIndex

        // 2. Condition 1: Is latestChar regular or not?
        if (latestChar.length > 1) { // S4
            if (latestChar.length === 3 && latestChar[1] === char) { // S5
                return
            }
            latestChar = char;
            return
        }

        // 3. Condition 2: Does the dictionary have an entry with this character?
        if (!Array.from(dictionary, x => x.lat).includes(char)) { // S2
            latestChar = char; // S4
            return finalArray.push({ geoChar: char, latInit: char });
        }

        // 4. Condition 3: Is this character a digraph?
        if (digraphs.total.includes(char)) { // S3
            if (digraphs.h_Digraphs.includes(char) && initialArray[charIndex + 1] === "h") {
                char = char + "h"
            } else if (char === digraphs.z_Digraphs && initialArray[charIndex + 1] === "z") {
                char = char + "z"
            } else if (char === digraphs.s_Digraphs && initialArray[charIndex + 1] === "s") {
                if (initialArray[charIndex + 2] === "h") { // S5
                    char = char + "sh"
                } else {
                    char = char + "s"
                }
            }
        }

        // 5. Get the corresponding Georgian character
        dictionary.map((entry) => { // S1
            if (entry.lat === char) { // S1
                latestChar = char; // S4
                finalArray.push({ geoChar: entry.geo, latInit: char })
            }
        })
    })

    return finalArray // S1
}

export default function transliterate (string) {
    const initialArray = turnStringToArray(string) // lat string –> lat array
    return matchChars(initialArray, charsData) // lat array -> geo array
}


{/*
COMMENTS

TRANSLITERATE
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
2. CONDITION 1: IS latestChar REGULAR OR NOT?
...



3. CONDITION 2: DOES THE DICTIONARY HAVE AN ENTRY WITH THIS CHARACTER?
4. CONDITION 3: IS THIS CHARACTER A DIGRAPH?
5. GET THE CORRESPONDING GEORGIAN CHARACTER






MATCHCHATRACTERS
To make the code easier to read, I've added several markers:
- S1. BAREBONES
The barebones code that turns latin characters into georgian. It does just that: finds
a match between a passed char and a dictionary entry and returns a georgian counterpart. It
doesn't however handle special symbols and digraphs.
.
.
- S2. SPECIAL CHARACTERS HANDLING
The transliterator is expected to turn only Latin characters to Georgian (at this point
at least). So we need to let all other symbols, including other scripts & punctuation, to be
passed to the output intact. The related function is a bit tricky, so here's an explanation:
.. - 1. The position. The check must be done before mapping dictionary since we don't have
to do the check every time we compare the current character and the current entry. That would
result in multiplication of the current symbol by the number of entries. Say, if the dictionary
has 3 entries, we'll get "///" as a n output by passing just a single "/". That will happen
because the dictionary-presence check will happen every time a comparison of the character and
entry occurs.
.. - 2. Array.from(dictionary, x => x.lat). This method creates an array from the given data.
In our case it's the dictionary which is already an array. We specify the function for creation
of it: x => x.lat. x here is an entry in the dictionary. x.lat is what should be passed which
is the latin symbol from an entry. So it returns a new array, consisting of latin symbols from
all the dictionary's entries.
.. - 3. .includes(char). The includes method is attached to the new latin-char-containing
array that we've received in the previous step. So we explore it to see if it has a character
identical to the current one.
.. - 4. !Array... . Before the "Array" there's an exclamation mark which negates what follows
it. So here's what we get in total: !Array.from(dictionary, x => x.lat).includes(char). It reads
as follows:
.. .. - not
.. .. - a new array consisting of x.lat from dictionary's entries
.. .. - contains char
Which translates as "the new array of latin chars doesn't contain the current char".
.. - 5. return. If the current char hasn't been found in the newly made latin-char array, we
just pass the current character further to the finalArray and carry on to the next one.
.
.
- S3. DIGRAPHS HANDLING – THE INITIAL CHAR
Digraphs are genuinely evil. Using 2 different characters to represent one sound is irrational
and stupid but that's what we have to deal with. So after we've checked if the character present
in the dictionary (i.e. not a special symbol, see S2 for more info) but before we start comparing
it with dictionary entries, we need to make a digraph check: whether the char belongs to it.
Digraphs are not hard to spot since we know exactly what they can be and I've made a special
dictionary with them (digraphs).
.
The digraphs object contains 4 properties. The total property stores an array. It contains all
the letters that can be digraph initials (i.e. the first of the 2 letters comprising a digraph).
First we should run a check of whether the current character belongs to that array.
.
If the character belongs to the total array, we need to see what type of a digraph it is. For
that we'll have to take a look at what the following character is. That will require the index
of the current character which should be passed at the initialArray mapping. The next letter
is accessed with "initialArray[charIndex+1]". So we check which group of the digraphs the current
char belongs to and what char follows it. If there's a match, we make the current char a digraph:
char = char + particular char.
.
.
- S4. DIGRAPHS HANDLING – THE ULTIMATE CHAR
The previous step is very important since it lets us match digraphs. But it fails to return a
clean output that avoids things like "შჰ" for "sh". Here we get შ instead of s which is what
we'd love since, s is followed by h, and sh = შ. But it also keeps ჰ. This should be avoided
at all costs and there is a way to do that. We'll need to use a separate variable for that though.
.
That variable is latestChar. We use it to store the latest char, i.e. the char that has been
mapped previously. If we deal with a digraph initial, we assign it to a full digraph. Say, if
we determine that we have a digraph initial as a current char (s from sh, for example), we
assign latestChar to "sh".
.
To avoid "h" being transliterated too, we look at the latestChar's length. If it's longer than 1
(digraphs are always longer than 1 character), it's clear that the current letter is the second
char of the digraph, hence we just skip mapping all together (with return).
.
.
- S5. TRIGRAPHS – SOMETHING THAT I DIDN'T EXPECT
I thought that by this point I was prepared for anything but I was wrong. I've encountered the
peculiar case of the word "paketshi" that got transliterated as პაკეცჰი which is obviously wrong.
The transliterator didn't do anything wrong: it saw the dograph "ts", it turned it into ც. And the
following "h" got transliterated as ჰ. So good job there but actually this set of letters should be
treated differently: not as ts-h but as t-sh. The reason for that is a very frequent pattern in
Georgian at the end of nouns: ...-shi (...-ში) which is the postposition "in". It's not rare for it
to follow a stem ending with -t (-თ or -ტ). It occurs much more often than ცჰ (ts-h) that I personally
haven't ever seen, albeit my experience with Georgian is not very extensive. Hence, I believe it's
essential to make this set of letters work differently.
.
Of course, it's not a trigraph per se. It doesn't give one sound with 3 characters similarly to how
the German "sh" is represented: sch. It's the regular character t and the digraph sh. But for the sake
of simplicity we'll treat is a trigraph.
.
The first thing I changed to take it into account, was adding a condition inside the larger trigraph
condition. I put it inside the "s" condition and it checks what the index+2 character is. If it's "h",
it's safe to asume that we're not looking at "ts", we're looking at "t-sh". Hence, our char variable
should take that value: "tsh". Later it will be found in the dictionary where I've added it to.
.
There's one more thing to change. The very first part of the map-code: digraph-checker. We have a condition
there that checks the length of the latestChar variable that contains the previous char. If it was a digraph,
the length is more than 1. If that's the case, the latestChar is updated to hold the value of the current char
and the mapping ends (return). But that's not what we want. We need to skip the second char of the trigraph
completely. So we add an extra condition: if (latestChar.length === 3 && latestChar[1] === char) {return}. So
the second character of the trigraph should not be registered as latestChar. Is it a perfect solution? It
doesn't look so since it lacks elegance and flexibility. It will work for trigraphs 100% but what if I'll have
to deal with 4-character combinations in the future? Another solution will be needed and just adding more
conditions might not be the best way to go about it. But since this thing works and I don't have other ideas
at the moment, it should be good for the time being. 
*/}