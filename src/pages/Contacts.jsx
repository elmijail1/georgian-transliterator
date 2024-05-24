// general
import { useOutletContext } from "react-router-dom"
import { nanoid } from "nanoid"
// data
import { contactsData } from "../data/contactsData.js"
// components
import ContactsButton from "../components/Contacts/ContactsButton.jsx"


export default function Contacts() {
    const { language } = useOutletContext() // *1

    return (
        <main>

            <div className="Contacts__GeneralDiv">

                {/* title */}
                <h1 className="Contacts__Title">
                    {
                        language === "ENG"
                            ? "Contacts"
                            : "Контакты"
                    }
                </h1>

                {/* description */}
                <p className="Contacts__Description">
                    {
                        language === "ENG"
                            ? "Feel free to contact us for any questions and suggestions!"
                            : "Вы можете связаться с нами любым из этих способов. Будем рады получить обратную связь и ответить на ваши вопросы!"
                    }
                </p>

                {/* buttons */}
                <div className="Contacts__Buttons">
                    {
                        contactsData.map(entry => {
                            return (
                                <ContactsButton
                                    entry={entry}
                                    language={language}
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

{/*
BASIC RENDER STRUCTURE
[0. Header (handled by the Layout page)]
1. Title
2. Description
3. Buttons

COMMENTS
- 1*. "language" defines the language of the UI (as chosen by user)
and comes from the outlet context set in the Layout page.

*/}