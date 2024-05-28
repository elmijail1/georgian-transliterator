import { useEffect } from "react"

export function useElsewhereClick(yourFunction) {
    useEffect(() => {
        document.addEventListener("mousedown", yourFunction)
        return () => {
            document.removeEventListener("mousedown", yourFunction)
        }
    })
}

{/*
COMMENT
This cusom hook accepts a function, attaches it to the document object with the
mousedown trigger, and then removes it at the end of the effect's cycle. It's
triggered upon any change on the page (no dependency array).
.
It's used for elements that have a shown / hidden state. When an element is shown
clicking on it does some thing. Usually the element should disappear after it's
been clicked on. This effect handles situations when the user clicks on something
other than this element when it's shown: the effect makes the element hidden again.
.
FUNCTIONS
Most of them make the related element hidden by changing the value of the respective
state. For example, in the component/Layout/Languages it's the state languageMenuOpen
that has a boolean for a value. It employs another utility (closeMenuIfClickedElsewhere) to handle that
and that utility is passed to the useElsewhereClick as the argument.
.
USED IN
- component/Layout/Languages
- component/Layout/MenuMobile
- component/Home/OutputWindow
*/}