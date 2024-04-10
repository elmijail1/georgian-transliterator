import { useOutletContext } from "react-router-dom"

export default function Contacts() {

    const language = useOutletContext()

    return (
        <>
            <h1>
                {
                    language === "RU"
                        ? "Контакты"
                        : "Contacts"
                }
            </h1>
            <p>
                Feel free to contact me for any questions and suggestions!
            </p>
            <ul>
                <li>
                    <b>Email:</b> elmijail1@proton.me
                </li>
                <li>
                    <b>Discord:</b> something#something
                </li>
                <li>
                    <b>Telegram:</b> @something
                </li>
            </ul>
        </>
    )
}