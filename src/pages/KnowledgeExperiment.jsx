import { useOutletContext } from "react-router-dom"
import { useState, useEffect, useRef, useContext } from "react"
import { nanoid } from "nanoid"

import { knowledgeData } from "../data/knowledgeData"
import { KnowledgeContext } from "../App"


export default function KnowledgeExperiment() {

    const { language } = useOutletContext()
    const { knowledgeItems, setKnowledgeItems} = useContext(KnowledgeContext)

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
        <main className="Knowledge__Main">
            <h1 className="Knowledge__Header">
                {
                    language === "RUS"
                        ? "Полезно знать"
                        : "Knowledge"
                }
            </h1>

            <ul>
                <li>
                    <a
                        href="#laplaza"
                    >
                        Take me to la plaza
                    </a>
                </li>

                <li>
                    <a
                        href="#item-5"
                    >
                        Take me to item 5
                    </a>
                </li>

                <li>
                    <a
                        href="#item-5"
                        onClick={() => {
                            setKnowledgeItems(prevItems => {
                                return prevItems.map((item, index) => {
                                    if (index === 4) {
                                        return { ...item, open: true }
                                    } else {
                                        return item
                                    }
                                })
                            })
                        }}
                    >
                        Take me to number 5 & open it
                    </a>
                </li>
            </ul>
            {
                knowledgeItems
                    ?
                    <div style={{ marginBottom: "50rem" }}>
                        <div className="Knowledge__ItemsDisplay">
                            {
                                knowledgeItems.map((entry, index) => {
                                    return (
                                        <div
                                            key={nanoid()}
                                            style={{ position: "relative" }}
                                        >
                                                                                        <div
                                                id={`item-${index + 1}D`}
                                                style={{
                                                    position: "absolute",
                                                    top: "-5rem",
                                                }}
                                            >
                                            </div>
                                            <div
                                                id={`item-${index + 1}`}
                                                style={{
                                                    position: "absolute",
                                                    top: "-4rem",
                                                }}
                                            >
                                            </div>
                                            <KnowledgeSingleItem
                                                entry={entry}
                                                index={index}
                                            />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <ul>
                            <li>coco</li>
                            <li>mococo</li>
                            <li>macondo</li>
                            <li>escondido</li>
                            <li style={{ position: "relative" }}>
                                <div
                                    id="laplaza"
                                    style={{
                                        position: "absolute",
                                        top: "-3.4rem",
                                    }}
                                ></div>
                                la plaza
                            </li>
                        </ul>
                    </div>
                    : <p>Loading...</p>
            }
        </main>
    )
}