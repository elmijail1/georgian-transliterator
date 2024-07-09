import { nanoid } from "nanoid"
import { charsData } from "../../data/charsData"

function showAlternativeOptions( // Separate Options 1*
    entry, index, activeAlternativeOption, setActiveAlternativeOption
) {
    if (activeAlternativeOption.shown && activeAlternativeOption.index === index) {
        setActiveAlternativeOption(({ shown: false, geoChar: "", latInit: "", index: null }))
    } else {
        setActiveAlternativeOption({ shown: true, geoChar: entry.geoChar, latInit: entry.latInit, index: index })
    }
}


function determineIfOptionsShouldBeShown( // Separate Options 2*
    charIndex, activeAlternativeOption
) {
    if (activeAlternativeOption.shown && activeAlternativeOption.index === charIndex) {
        return true
    }
}


function useAlternativeOption( // Separate Options 3*
    char, setLatestOutput, activeAlternativeOption, setActiveAlternativeOption
) {
    setLatestOutput(previousOutput => {
        return (
            [
                ...previousOutput,
                previousOutput[activeAlternativeOption.index].geoChar = char,
                previousOutput[activeAlternativeOption.index].modified = true,
            ]
        )
    })
    setActiveAlternativeOption(prevOptions => ({ ...prevOptions, geoChar: char }))
}


function mapAlternativeOptions( // Separate Options 4*
    activeAlternativeOption, charsData, setActiveAlternativeOption, setLatestOutput
) {
    const matchingCharsDataEntry = charsData.filter(char => char.lat === activeAlternativeOption.latInit)[0]
    return matchingCharsDataEntry.options.map(char => {
        if (char !== activeAlternativeOption.geoChar) {
            return (
                <div
                    key={nanoid()}
                    className="TriggerLetter__SingleOption"
                    onClick={() => useAlternativeOption(char, setLatestOutput, activeAlternativeOption, setActiveAlternativeOption)}
                >
                    {char}
                </div>
            )
        }
    })
}



export function mapOutput({ // 1. Arguments
    activeAlternativeOption,
    charsData,
    latestOutput,
    letterOptionRef,
    optionsDisplay,
    setActiveAlternativeOption,
    setLatestOutput,
}) {

    // 2. Trigger letters
    const triggerLetters = charsData.map(x => {
        if (x.options) {
            return x.lat
        } else {
            return
        }
    }).filter(x => x !== undefined)
    
    // 3. Condition 1: Are alternative options on?
    if (optionsDisplay) {

        // 4. latestOutput mapping
        return latestOutput.map((entry, index) => {

            // 5. Condition 2: Is the mapped entry's latChar a trigger letter?
            if (triggerLetters.includes(entry.latInit)) {

                const triggerLetterClassName = `TriggerLetter
                    ${activeAlternativeOption.index === index
                    && "TriggerLetterActive"}
                `

                return (

                    // 6. The special trigger letter span
                    <div
                        className={triggerLetterClassName}
                        onClick={() => {
                            showAlternativeOptions(
                                entry,
                                index,
                                activeAlternativeOption,
                                setActiveAlternativeOption
                            )
                        }}
                        key={nanoid()}
                    >

                        {entry.geoChar}

                        {
                            // 7. Are options shown?
                            determineIfOptionsShouldBeShown(index, activeAlternativeOption) &&
                            <div
                                className="TriggerLetter__Options"
                                ref={letterOptionRef}
                            >

                                {/* 8. Mapping of alternative options */}
                                {
                                    mapAlternativeOptions(
                                        activeAlternativeOption,
                                        charsData,
                                        setActiveAlternativeOption,
                                        setLatestOutput,
                                    )
                                }

                            </div>
                        }

                    </div>
                )
            }

            // 5. Condition 2: Is the mapped entry's latChar a trigger letter?
            else {
                return <span key={nanoid()}>{entry.geoChar}</span>
            }
        })
    }

    // 3. Condition 1: Are alternative options on?
    else {
        const outputArray = []
        latestOutput.map(entry => outputArray.push(entry.geoChar))
        return outputArray.join("")
    }
}



{/*
COMMENTS

MAPOUTPUT
It's a huge complex function that fully handles output display in the OutputWindow
component. Let's see how it works step by step.
CONTENTS:
0. WHERE IT'S USED
1. ARGUMENTS
2. TRIGGER LETTERS
3. CONDITION 1: ARE ALTERNATIVE OPTIONS ON?
4. LATESTOUTPUT MAPPING
5. CONDITION 2: IS THE MAPPED ENTRY'S LATCHAR A TRIGGER LETTER?
6. THE SPECIAL TRIGGER LETTER DIV
7. ARE OPTIONS SHOWN?
8. MAPPING OF ALTERNATIVE OPTIONS
.
0. WHERE IT'S USED. This function is only used once in component/OutputWindow. It's
been moved to a separate file to save space in the component file, not because it
can be reused elsewhere.
.
1. ARGUMENTS. The function accepts plenty of them. Right now it's necessary to
understand what all those arguments are – it'll be easier to understand what they
do exactly inside the function later. So here are the arguments;
- i. activeAlternativeOption: defined in pages/Home, it contains the data related
to the latest clicked highlighted character. That data contains the character
itself, its index, and its alternative options;
- ii. charsData: defined in data/charsData, it contains a long array of objects
with information about each Latin letter and how it should be transliterated into
Georgian;
- iii. latestOutput: defined in pages/Home, it controlls the OutputWindow's display
and contains an array of Georgian characters which represent the transltierated
text from the currentInput array (see component/Home/InputWindow) defined by what
the user types into the input textarea;
- iv. letterOptionRef: defined in component/Home/OutputWindow, it's used to refer to
the latest clicked highlighted letter. While it doesn't do much for the mapOutput
function, it's instrumental in making the useElsewhereClick effect hook work for
Georgian characters' alternative options (see utilities/useElsewhereClick to learn
more about how it works);
- v. optionsDisplay: defined in pages/Home, it contains the boolean determining if
alternative options should be shown. When it's true, characters that have alterantive
options get highlighted. When it's false, nothijng is highlighted;
- vi. setActiveAlternativeOption: the setter for activeAlternativeOption (see i);
- vii. setLatestOutput: the setter for latestOutput (see iii).
.
2. TRIGGER LETTERS
It's an array of Latin characters that will trigger certain condition checkers
later down in the function. The basic idea is that those characters have more than
1 way of being transliterated from Latin to Georgian and they will get highlighted
if the alternative options are turned on (controlled by the optionsDisplay state).
.
3. CONDITION 1: ARE ALTERNATIVE OPTIONS ON?
The first condition checker evaluates if alternative options are on. It's controlled
by the state optionsDisplay and if it's true, alternrative options are on; if it's
false, they aren't. So outputDisplay can be:
- true: another check will be made to see if the output array (latestOutput) contains
any trigger character (triggerLetters – see point 2 above) to further handle them
respectively. All further steps only take place if this condition is true.
- false: no further checks are made. latestOutput's content is pushed into another
array and turned into a string with the join method. It's important to note that
latestOutput contains not just strings – it contains objects with 2 properties:
geoChar & latChar. For the output in this case we only need geoChar's to be pushed
into another array and then turned into a string. (to learn more about the contents
of latestOutput, check out the utilities/Home/transliterate). No further steps take
place if the condition is true.
.
4. LATESTOUTPUT MAPPING
If 3. is true, the latestOutput array gets mapped. Each mapping retrieves 2 values:
entry & its index. An entry of the latestOutput is an object with 2 properties: geoChar
& latChar. From now on whatever logic takes place is applied to an entry of latestOutput. 
.
5. CONDITION 2: IS THE MAPPED ENTRY'S LATCHAR A TRIGGER LETTER?
The second condition checker detrmines if the mapped entry's latChar value can be found
among the triggerLetters (see point 2) array's items. If it is...
- true: the related Georgian character from the same entry is rendered in the output
window as a special div with styles that make it highlighted and with a special
onClick effect that make its alternative options visible. The structure of that special
span will be explained later. All further steps only take place if this condition is true.
- false: the related Georgian character from the same entry is rendered in the output
window as a regular span with no special styles or onClick effects. However, since it's
a mapped item, it has a unique ID (provided by the nanoid utility).
.
6. THE SPECIAL TRIGGER LETTER DIV
It consists of 3 parts: a container, a Georgian character, and an alternative options list.
- i. Container:
..- className: it has 2 class names one of which is only applied when the character is the
latest clicked highlighted character;
..- onClick: when a highlighted character is clicked, its data is assigned as a value to
the state activeAlternativeOption. It has these properties: geoChar, latChar, index, shown.
Upon clicking on a letter the user sets geoChar & latChar of that state identical to those
of the entry. The index gets copied too (we've extracted it for evrey entry during the
mapping of latestOutput). The shown is set to true. Upon a repeated click the data is
removed from the state and its shown property is set to false – the letter gets un-clicked.
It's all handled by the function showAdditionalOptions;
- ii. Georgian character: it's the value of the geoChar property of the mapped entry;
- iii. Alternative options list: it only gets displayed if activeAlternativeOption has its
property shown set to "true" and its index identical to that of the entry. The function that
deterines whether those conditions are met is determineIfOptionsShouldBeShown.
.
7. ARE OPTIONS SHOWN?
- true: the list is visible. It's a div inside which other divs are rendered (all the 
alternative options that are these in the charsData array for the given Latin character).
That div has a reference set to it: letterOptionsRef. It's used in component/OutputWindow
in a function passed to useElsewhereClick. The reference points to the area that is
considered the element. Clicking elsewhere will result in that element getting hidden.
The further step only take place if this condition is true.
- false: nothing is rendered and the list is hidden.
.
8. MAPPING OF ALTERNATIVE OPTIONS
- i. charsData filtering: first we need to find the entry in charsData that has the same
latChar as our entry (and the activeAlternativeOption since our entry has been clicked on).
When such an entry object is found it's placed to a new array with the help of the filter
method. We don't really need that array since we only have 1 object there (our entry),
hence we extract it right away with the [0];
- ii. options mapping: inside the charsData entry that we've extracted there's the property
options containing an array of characters (strings) representing those very alternative
options. All of them that are not the current character (that's identical to geoChar in
the activeAlternativeOption state) get rendered.
- iii. rendering options: each option is rendered as a div with a special class name &
a special onClick effect that replaces the current character with the clicked option. It
works through resetting activeAlternativeOption and remapping latestOutput (it's all done
with the useAlternativeOption function).


SEPARATE FUNCTIONS
Gears of the greater mapOutput function.
CONTENTS:
1. showAlternativeOptions
2. determineIfOptionsShouldBeShown
3. useAlternativeOption
4. mapAlternativeOptions
.
1. showAlternativeOptions
USED IN: step 6 (onClick effect of the special trigger letter div)
WHAT IT DOES: makes the list of alternative options visible / hidden.
ARGUMENTS (4): entry, index (both from latestOutput mapping), alternativeOptions, setAlternativeOptions
DESCRIPTION: it has 1 condition checker: are alternative options shown and if they are,
is their index identical to that of the mapped entry?
- true: it means that this character has been clicked latest and we currently have its
data assigned to activeAlternativeOption. The repeated click on it will reset the state
and its properties will be: shown: false (options are hidden), geoChar: "", latInit: "",
and index: null;
- false: it means that this letter hasn't been clicked latest. Clicking it will set the
activeAlternativeOption state's value to those of the clicked character. The properties
will be: shown: true (option are visible), geoChar: entry.geoChar, latInit: entry.latChar,
and index: index. 
. 
2. determineIfOptionsShouldBeShown
USED IN: step 7 (determines if the option list should be visible)
WHAT IT DOES: checks if 2 conditions are true.
ARGUMENTS (2): charIndex (index of a highlighted character), activeAlternativeOption.
DESCRIPTION: if activeAlternativeOption.shown is true (i.e. some highlighter letter
has been clicked) and activeAlternativeOption.index is the same as this letter's index
(i.e. the clicked letter is this), the option list should be visible.
.
3. useAlternativeOption
USED IN: inside the mapAlternativeOptions function (separate function 4)
WHAT IT DOES: replaces the current letter with the clicked option.
ARGUMENTS (4): char, setLatestOutput, activeAlternativeOption, setActiveAlternativeOption 
DESCRIPTION: when an alternative option from the visible option list has been clicked,
2 states change:
- latestOutput. The latestOutput array is now re-mapped with the current letter replaced
with the clicked option. Now geoChar of that entry is the just clicked option. Also, this
entry gets the "modified: true" property that will later automatically add it to the
modifiedOutput state array (see pages/Home for more details about that state);
- activeAlternativeOption: the geoChar property of the active alternative option is now
the just clicked option.

.
4. mapAlternativeOptions
USED IN:  step 8 (determines how alternative option list is rendered)
WHAT IT DOES: sets rules for rendering an alternative option list.
ARGUMENTS (4): activeAlternativeOption, charsData, setActiveAlternativeOption, setLatestOutput. 
DESCRIPTION: first a matching entry in the charsData array is found with the help of the
filter method: if latin characters of the entries match, it's a match. The result of the
filter method is an array containing one object (the matching entry). We extract the entry
with [0] to get rid of the array.
- That entry object has the property options that contains an array of strings (characters)
that represent alternative options. We map all of them that aren't the current letter.
- Each option is rendered as a div with the special class and an onClick effect carried
out by the useAlternativeOption function (see Separate functions 3 above)

*/}