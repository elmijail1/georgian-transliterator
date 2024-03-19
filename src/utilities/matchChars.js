import checkIfInDictionary from "./checkIfInDictionary.js";

export default function matchChars(initialArray, dictionary) {
    const finalArray = [] // S1

    const digraphs = { // S3
        total: ["c", "d", "g", "k", "p", "s", "t", "z"],
        h_Digraphs: ["c", "g", "k", "p", "s", "z"],
        z_Digraphs: "d",
        s_Digraphs: "t",
    }

    initialArray.map((char, charIndex) => { // S1; S3 for charIndex

        if (!Array.from(dictionary, x => x.lat).includes(char)) { // S2
            return finalArray.push(char);
        }

        if (digraphs.total.includes(char)) { // S3
            if (digraphs.h_Digraphs.includes(char) && initialArray[charIndex+1] === "h") {
                char = char + "h"
            } else if (char === digraphs.z_Digraphs && initialArray[charIndex+1] === "z") {
                char = char + "z"
            } else if (char === digraphs.s_Digraphs && initialArray[charIndex+1] === "s") {
                char = char + "s"
            }
        }

        dictionary.map((entry) => { // S1
            if (entry.lat === char) { // S1
                finalArray.push(entry.geo)
            }
        })
    })

    return finalArray // S1
}


{/*
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
- S3. DIGRAPHS HANDLING
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
- S4. DIGRAPHS HANDLING CLEAN
The previous step is very important since it lets us match digraphs. But it fails to return a
clean output that avoids things like "შჰ" for "sh". Here we get შ instead of s which is what
we'd love since, s is followed by h, and sh = შ. But it also keeps ჰ. This should be avoided
at all costs and there is a way to do that. We'll need to use a separate variable for that though.
...



*/}