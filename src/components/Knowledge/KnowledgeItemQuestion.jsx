// utilities
import { showAnswer } from "../../utilities/knowledgeUtilities"

export default function KnowledgeItemQuestion({ entry, index, language, setKnowledgeItems }) {
    return (
        <button
            onClick={() => showAnswer(index, setKnowledgeItems)}
            className={`KnowQuestion__Button ${entry.open && "KnowQuestion__ButtonOpen"}`}>

            {/* question text */}
            <div className="KnowQuestion__Text">
                {
                    language === "ENG"
                        ? entry.question
                        : entry.questionRus
                }
            </div>

            {/* open / close symbol */}
            <div className="KnowQuestion__OpenCloseSymbol">
                {entry.open ? "▲" : "▼"}
            </div>

        </button>
    )
}

{/*
RENDER STRUCTURE
1. Button
1.1. Question text
1.2. Open / close symbol

COMMENTS
1. What this component is
It renders the text from the "question" property of the knowledgeItems array's entry.
Also it can be clicked to show / hide the respective answer.
.
2. Values it accepts
- entry: an object from the knowledgeItems array containing a question-answer pair;
- index: an index of that same entry;
- language: a user-set language controlled by a state in the Layout page component;
- setKnowledgeItems: the knowledgeItems' state setter from the Knowledge page;
*/}