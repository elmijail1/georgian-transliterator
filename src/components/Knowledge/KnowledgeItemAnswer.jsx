import { splitAnswerIntoDivsAndMap } from "../../utilities/knowledgeUtilities"

export default function KnowledgeItemAnswer({ entry, language }) {

    return (
        <div className="Knowledge__SingleItem--Answer">
            {language === "ENG"
                ? splitAnswerIntoDivsAndMap(entry.answer)
                : splitAnswerIntoDivsAndMap(entry.answerRus)
            }
        </div>
    )
}