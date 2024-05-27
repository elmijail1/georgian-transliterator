export function closeMenuIfClickedElsewhere(event, reference, stateSetter) {
    if (reference.current && !reference.current.contains(event.target)) {
        stateSetter(false)
    }
}

{/*
- closeMenuIfClickedElsewhere
The function accepts the latest event, then evaluates if the reference's contents
(reference.current) are not empty and, if they are not, compares them with the
event.target's contents. The reference should be targeted by the event for the
function to trigger. What it does is it hides this component by changing the
related state's value to false.
*/}