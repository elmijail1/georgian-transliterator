import { nanoid } from "nanoid"

// 1
export function showAnswer(index, setKnowledgeItems) {
    setKnowledgeItems(prevItems => {
        return prevItems.map((en, ind) => {
            if (ind === index) {
                return { ...en, open: !en.open }
            } else {
                return en
            }
        })
    })
}

// 2
export function splitAnswerIntoDivsAndMap(answer) {
    const splitAnswer = answer.split("\n\n")
    return splitAnswer.map(line => <div key={nanoid()}>{line}</div>)
}

{/*
COMMENTS
- 1. showAnswer
..- Purpose: show / hide the answer.
..- Takes: the index of the question clicked & the state setter that will change
the respective entry's "open" property to true / false from its current value.
..- Used in: component/Knowledge/KnowledgeItemQuestion (onClick of the button)
.
- 2. splitAnswerIntoDivsAndMap
..- Purpose: divide the text at the linebreak (\n\n).
..- Takes: the answer's text.
..- Used in: component/Knowledge/KnowledgeItemAnswer (handling of the content)
*/}