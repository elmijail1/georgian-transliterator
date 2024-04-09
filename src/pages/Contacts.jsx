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
            Learn how to get in touch with the monster
            who has created this.
        </>
    )
}