import { Link, useOutletContext } from "react-router-dom"

export default function NotFound() {

    const language = useOutletContext()

    return (
        <main>
            <div className="NotFound__MainDiv">
                <h1 className="NotFound__Header">

                    {
                        language === "RUS"
                            ? "Такой страницы у нас пока нет :-/"
                            : "No such page :-/"
                    }
                </h1>
                <p className="NotFound__Description">
                    {
                        language === "RUS"
                            ? "Но есть такие:"
                            : "Try these pages:"
                    }
                </p>
                <ul className="NotFound__Links">
                    <li>
                        <Link to="/" >
                            {
                                language === "RUS"
                                    ? "Транслитератор"
                                    : "Transliterator"
                            }
                        </Link>
                    </li>
                    <li>
                        <Link to="/knowledge">
                            {
                                language === "RUS"
                                    ? "Полезно знать"
                                    : "Knowledge"
                            }
                        </Link>
                    </li>
                    <li>
                        <Link to="/contacts">
                            {
                                language === "RUS"
                                    ? "Контакты"
                                    : "Contacts"
                            }
                        </Link>
                    </li>
                </ul>
            </div>
        </main>
        // add navigation + styling
    )
}