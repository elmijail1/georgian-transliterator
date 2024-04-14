import { useOutletContext } from "react-router-dom"
import { useState } from "react"
import { nanoid } from "nanoid"

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

import { knowledgeData } from "../data/knowledgeData"


export default function Knowledge() {

    const language = useOutletContext()

    /*
    - style data the right way (especially those lists)
    */

    const [knowledgeItems, setKnowledgeItems] = useState(knowledgeData)
    function showAnswer(index) {
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

    function splitAnswerIntoDivsAndMap(answer) {
        const splitAnswer = answer.split("\n\n")
        return splitAnswer.map(line => <div key={nanoid()}>{line}</div>)
    }

    function KnowledgeSingleItem({ entry, index }) {
        return (
            <div
                className="Knowledge__SingleItem"
                onClick={() => showAnswer(index)}
            >
                <div className="Knowledge__SingleItem--QuestionButton">
                    <button
                        className="Knowledge__SingleItem--QuestionButton--Question"
                    >
                        {
                            language === "RUS"
                                ? entry.questionRus
                                : entry.question
                        }
                    </button>
                    {
                        entry.open
                            ? <MdKeyboardArrowUp className="Knowledge__SingleItem--QuestionButton--Button" />
                            : <MdKeyboardArrowDown className="Knowledge__SingleItem--QuestionButton--Button" />
                    }

                </div>
                {
                    entry.open &&
                    <div className="Knowledge__SingleItem--Answer">
                        {language === "RUS"
                            ? splitAnswerIntoDivsAndMap(entry.answerRus)
                            : splitAnswerIntoDivsAndMap(entry.answer)
                        }
                    </div>
                }
            </div>
        )
    }

    return (
        <div>
            <h1 className="Knowledge__Header">
                {
                    language === "RUS"
                        ? "Полезно знать"
                        : "Knowledge"
                }
            </h1>

            <div className="Knowledge__ItemsDisplay">
                {
                    knowledgeItems.map((entry, index) => {
                        return (
                            <KnowledgeSingleItem entry={entry} index={index} key={nanoid()} />
                        )
                    })
                }
            </div>
        </div>
    )
}