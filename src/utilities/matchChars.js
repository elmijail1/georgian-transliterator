import checkIfInDictionary from "./checkIfInDictionary.js";

export default function matchChars(initialArray, dictionary) {
    const finalArray = [] // S1

    initialArray.map((char) => { // S1

        if (!Array.from(dictionary, x => x.lat).includes(char)) { // S2
            return finalArray.push(char);
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


*/}