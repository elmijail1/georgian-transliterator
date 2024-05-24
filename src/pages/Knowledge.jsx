// general
import { useContext, useEffect } from "react"
import { useOutletContext, useLocation } from "react-router-dom"
import { nanoid } from "nanoid"
// context
import { KnowledgeContext } from "../App"
//data
import { knowledgeData } from "../data/knowledgeData.js"
// components
import KnowledgeItem from "../components/Knowledge/KnowledgeItem.jsx"


export default function Knowledge() {

    const { language } = useOutletContext()
    const { knowledgeItems, setKnowledgeItems } = useContext(KnowledgeContext)

    // this is needed to reset the knowledgeItems when you go to another page
    const location = useLocation()
    useEffect(() => {
        if (
            location.hash
            && ["#item-5", "#item-5D"].includes(location.hash)
        ) {
            setKnowledgeItems(
                knowledgeData.map((item, index) => {
                    if (index === 4) {
                        return { ...item, open: true }
                    } else {
                        return { ...item, open: false } // perhaps there's a little bug with scrolling too much here when there was another answer opened on a previous render
                    }
                })
            )
        } else {
            setKnowledgeItems(knowledgeData)
        }
    }, [])

    if (!knowledgeItems) {
        return <div>Loading...</div>
    }

    return (
        <main className="Knowledge__Main">

            <h1 className="Knowledge__Header">
                {
                    language === "ENG"
                        ? "Knowledge"
                        : "Полезно знать"
                }
            </h1>

            <div style={{ marginBottom: "40rem" }}>

                <div className="Knowledge__ItemsDisplay">
                    {
                        knowledgeItems.map((entry, index) => {
                            return (
                                <KnowledgeItem
                                    entry={entry}
                                    index={index}
                                    language={language}
                                    setKnowledgeItems={setKnowledgeItems}
                                    key={nanoid()}
                                />
                            )
                        })
                    }
                </div>

            </div>
        </main>
    )
}