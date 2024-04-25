import { useOutletContext } from "react-router-dom"
import { nanoid } from "nanoid"

import { contactsData } from "../data/contactsData.js"

export default function Contacts() {

    const language = useOutletContext()

    return (
        <main>
            <div className="Contacts__Main">

                <h1 className="Contacts__Header">
                    {
                        language === "RUS"
                            ? "Контакты"
                            : "Contacts"
                    }
                </h1>
                <p className="Contacts__Description">
                    {
                        language === "RUS"
                            ? "Вы можете связаться с нами любым из этих способов. Будем рады получить обратную связь и ответить на ваши вопросы!"
                            : "Feel free to contact us for any questions and suggestions!"
                    }
                </p>

                <div className="Contacts__Box">
                    {
                        contactsData.map(contact => {
                            return (
                                <div
                                    className="Contacts__General"
                                    onClick={() => navigator.clipboard.writeText(contact.address)}
                                    key={nanoid()}
                                >
                                    <div className="Contacts__TextHalf">
                                        <p
                                            className="Contacts__TextHalf__Name"
                                        >
                                            {contact.channel}
                                        </p>
                                        <p
                                            className="Contacts__TextHalf__Contact"
                                        >
                                            {contact.address}
                                        </p>
                                        <p
                                            className="Contact__TextHalf__CopyButton"
                                        >
                                            {
                                                language === "RUS"
                                                    ? "Скопировать"
                                                    : "Click to copy"
                                            }
                                        </p>
                                    </div>

                                    <div>
                                        <img
                                            src={contact.image}
                                            className="Contacts__ImageHalf__Image"
                                            alt={contact.image}
                                        />
                                    </div>
                                </div>
                            )
                        })
                    }

                </div>

            </div>

        </main>
    )
}