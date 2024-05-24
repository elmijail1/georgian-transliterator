// general
import { useOutletContext } from "react-router-dom"
import { nanoid } from "nanoid"
// data
import { notFoundData } from "../data/notFoundData.js"
// components
import NotFoundButton from "../components/NotFound/NotFoundButton.jsx"


export default function NotFound() {
    const { language } = useOutletContext() // *1

    return (
        <main>

            <div className="NF__GeneralDiv">

                {/* main title */}
                <h1 className="NF__Title">
                    {
                        language === "ENG"
                            ? "No such page :-/"
                            : "Такой страницы у нас пока нет :-/"
                    }
                </h1>

                {/* description */}
                <p className="NF__Description">
                    {
                        language === "ENG"
                            ? "Try these pages:"
                            : "Но есть такие:"
                    }
                </p>

                {/* buttons */}
                <ul className="NF__Buttons">
                    {
                        notFoundData.map(entry => (
                            <NotFoundButton
                                entry={entry}
                                language={language}
                                key={nanoid()}
                            />
                        ))
                    }
                </ul>

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