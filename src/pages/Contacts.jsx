import { useOutletContext } from "react-router-dom"

export default function Contacts() {

    const language = useOutletContext()

    return (
        <main>
            <h1 className="Contacts__Header">
                {
                    language === "RUS"
                        ? "Контакты"
                        : "Contacts"
                }
            </h1>
            <div className="Contacts__Main">
                <p>
                    {
                        language === "RUS"
                            ? "Вы можете связаться с нами любым из этих способов. Будем рады получить обратную связь и ответить на ваши вопросы!"
                            : "Feel free to contact us for any questions and suggestions!"
                    }
                </p>
                <ul>
                    <li>
                        <b>
                            {
                                language == "RUS"
                                    ? "Эл. почта"
                                    : "Email"
                            }
                            :</b> elmijail1@proton.me
                    </li>
                    <li>
                        <b>Discord:</b> elmijail1
                    </li>
                    <li>
                        <b>Telegram:</b> @elmijail1
                    </li>
                </ul>
            </div>
        </main>
    )
}