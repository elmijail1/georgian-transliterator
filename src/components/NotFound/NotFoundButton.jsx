import { Link } from "react-router-dom"

export default function NotFoundButton({ entry, language }) {
    return (
        <Link
            to={entry.path}
            className="NFButton__General"
        >
            {
                language === "ENG"
                    ? entry.textEng
                    : entry.textRus
            }
        </Link>
    )
}