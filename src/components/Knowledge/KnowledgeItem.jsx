// components
import KnowledgeItemQuestion from "./KnowledgeItemQuestion.jsx"
import KnowledgeItemAnswer from "./KnowledgeItemAnswer.jsx"

export default function KnowledgeItem({ entry, index, language, setKnowledgeItems }) {

    return (
        <div className="KnowItem__GeneralDiv">

            {/* desktop anchor */}
            <div
                id={`item-${index + 1}D`}
                className="KnowItem__DesktopAnchor"
            >
            </div>

            {/* mobile anchor */}
            <div
                id={`item-${index + 1}`}
                className="KnowItem__MobileAnchor"
            >
            </div>

            {/* item body */}
            <div className="KnowItem__ItemBody">

                {/* item question */}
                <KnowledgeItemQuestion
                    entry={entry}
                    index={index}
                    language={language}
                    setKnowledgeItems={setKnowledgeItems}
                />

                {/* item answer */}
                {
                    entry.open &&
                    <KnowledgeItemAnswer
                        entry={entry}
                        language={language}
                    />
                }

            </div>
        </div>
    )
}

{/*
RENDER STRUCTURE
1. Desktop Anchor
2. Mobile Anchor
3. Item Body
3.1. Item Question
3.2. Item Answer

COMMENTS
I used 2 anchors since the header has different heights for mobile / desktop.
The Desktop one is located higher to make up for the extra rem that the header has
in the desktop version.
*/}
