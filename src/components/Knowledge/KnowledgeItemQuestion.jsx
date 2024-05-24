import { showAnswer } from "../../utilities/knowledgeUtilities"

export default function KnowledgeItemQuestion({ entry, index, language, setKnowledgeItems }) {

    return (
        <div
            onClick={() => showAnswer(index, setKnowledgeItems)}
            className={`Knowledge__SingleItem--QuestionButton ${entry.open && "Knowledge__SingleItem--QuestionButtonOpen"}`}>
            <button
                className="Knowledge__SingleItem--QuestionButton--Question"
            >
                {
                    language === "ENG"
                        ? entry.question
                        : entry.questionRus
                }
            </button>
            {
                entry.open
                    ? <div className="Knowledge__SingleItem--QuestionButton--Button">▲</div>
                    : <div className="Knowledge__SingleItem--QuestionButton--Button">▼</div>
            }

        </div>
    )
}