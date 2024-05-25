// general
import { useState, useEffect } from "react"
import { useOutletContext, useLocation } from "react-router-dom"
import { nanoid } from "nanoid"
//data
import { knowledgeData } from "../data/knowledgeData.js"
// components
import KnowledgeItem from "../components/Knowledge/KnowledgeItem.jsx"


export default function Knowledge() {

    const { language } = useOutletContext() // *1 related to language settings
    const [knowledgeItems, setKnowledgeItems] = useState() // *2.1 related to knowledge items array

    const location = useLocation() // *2.2 related to knowledge items array
    useEffect(() => { // *2.1 related to knowledge items array
        if (
            location.hash
            && ["#item-5", "#item-5D"].includes(location.hash) // *2.2 related to knowledge items array
        ) {
            setKnowledgeItems(
                knowledgeData.map((item, index) => {
                    if (index === 4) {
                        return { ...item, open: true }
                    } else {
                        return { ...item, open: false }
                    }
                })
            )
        } else {
            setKnowledgeItems(knowledgeData)
        }
    }, [])

    if (!knowledgeItems) { // *2.3 related to knowledge items array
        return <div>Loading...</div>
    }

    return (
        <main>

            {/* title */}
            <h1 className="Know__Title">
                {language === "ENG" ? "Knowledge" : "Информация"}
            </h1>

            {/* items display */}
            <div className="Know__ItemsDisplay">
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

        </main>
    )
}

{/*
RENDER STRUCTURE:
1. Title
2. Items display (it's a div in which the knowledgeItems array is mapped
as KnowledgeItem components)

COMMENTS
- 1*. The Language settings:
"language" is a state passed from the Layout page. It represents the user's choice
of the interface language that affects the texts rendered (ENG or RUS).
.
- 2*. The Knowledge Items array:
The Knowledge Items array contains objects representing question-answer pairs
rendered on the Knowledge page through the KnowledgeItem component & its children.
There are several things about it that one should know:
..- 2.1. The declaration doesn't involve assigning a value to the knowledgeItems sets.
It happens later in the effect below. Upon the page load the effect checks if the
location object (2.2) contains particular values in its hash property (2.3). If it does,
the knowledgeData array is set as a value to the knowledgeItems state with certain changes.
If it doesn't, the array is assigned to the state without any changes.
..- 2.2. The location object comes from the "react-router-dom" library and it contains
data related to the current page's URL. Its hash property contains segments starting
with #. In our case such a segment can be added to the /knowledge path if a user comes
from the Home page upon clicking the "here" anchor in the tooltip near the switch toggler.
Clicking it brings the user to a particular question item that must automatically scrolled
down to and have its answer shown. There are 2 anchor divs used to help the scrolling part:
you can find them both inside the KnowledgeItem component. They have the following IDs:
#item-5 for the mobile version and #item-5D for the dekstop one. If location's hash propety
contains either of them, the 5th knowledge item must have its answer shown upon the page load.
..- 2.3. Initially the knowledgeItems state is empty, hence it's impossible to render it.
To not raise an error, it's necessary to have a backup rendering function that just shows
"Loading..." or whatever else. As soon as the knowledgeItems array gets a value (and it happens
very soon after the initial page load), the knowledgeItems array's contents will be rendered.
*/}