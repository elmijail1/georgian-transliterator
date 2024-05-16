import { useOutletContext, useSearchParams } from "react-router-dom"
import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"

import { knowledgeData } from "../data/knowledgeData"


export default function Knowledge() {

    const [searchParams, setSearchParams] = useSearchParams()

    const { language } = useOutletContext()

    function prepareKnowledgeData() {
        if (searchParams && searchParams.get("preopen")) {
            return knowledgeData.map((item, ind) => {
                if (ind.toString() === searchParams.get("preopen")) {
                    return ({ ...item, open: true, id: searchParams.get("preopen") })
                } else {
                    return item
                }
            })
        } else {
            return knowledgeData
        }
    }

    const [knowledgeItems, setKnowledgeItems] = useState(prepareKnowledgeData())

    // SCROLL ISSUE
    const idRef = useRef(null)

    // SCROLL ISSUE
    useEffect(() => {
        if (searchParams.get("preopen") && idRef.current) {
            idRef.current.scrollIntoView()
        }
    }, [])

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
            >
                <div
                    onClick={() => showAnswer(index)}
                    className={`Knowledge__SingleItem--QuestionButton ${entry.open && "Knowledge__SingleItem--QuestionButtonOpen"}`}>
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
                            ? <div className="Knowledge__SingleItem--QuestionButton--Button">▲</div>
                            : <div className="Knowledge__SingleItem--QuestionButton--Button">▼</div>
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
        <main>
            <h1 className="Knowledge__Header">
                {
                    language === "RUS"
                        ? "Полезно знать"
                        : "Knowledge"
                }
            </h1>

            {
                knowledgeItems
                    ?
                    <div className="Knowledge__ItemsDisplay">
                        {
                            knowledgeItems.map((entry, index) => {
                                if (entry.id) { // SCROLL ISSUE
                                    return (
                                        <KnowledgeSingleItem entry={entry} index={index} key={nanoid()}
                                        // SCROLL ISSUE ref={idRef} 
                                        />
                                    )
                                }

                                return (
                                    <KnowledgeSingleItem entry={entry} index={index} key={nanoid()} />
                                )
                            })
                        }
                    </div>
                    : <p>Loading...</p>
            }
        </main>
    )
}