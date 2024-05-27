export function showAlternativeOptions(
    entry, index, alternativeOptions, setAlternativeOptions
) {
    if (alternativeOptions.shown && alternativeOptions.index === index) {
        setAlternativeOptions(({ shown: false, geoChar: "", latInit: "", index: null }))
    } else {
        setAlternativeOptions({ shown: true, geoChar: entry.geoChar, latInit: entry.latInit, index: index })
    }
}



{/*
COMMENTS

– showAlternativeOptions
USED IN: mapOutput function.
ARGUMENTS: entry, index, alternativeOptions, setAlternativeOptions.
..- entry: a mapped character;
..- index: the index of the mapped character;
..- activeAlternativeOption: state that contains the latest clicked character's
alternative options;
..- setActiveAlternativeOption: state setter that changed the highlighted character
to the one that's just been clicked.
.
WHAT IT DOES: It's triggered upon a click on a character when the alternative options
are shown.
..- [condition 1] If you click on a letter that you've clicked previously and that is
active right now, you de-highlight that character.
..- [condition 2] If you click on a currently inactive character, you highlight it
and get the data related to its alternative options displayed.

*/}