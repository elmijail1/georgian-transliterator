import { useOutletContext } from "react-router-dom"

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
                <p>
                    {
                        language === "RUS"
                            ? "Вы можете связаться с нами любым из этих способов. Будем рады получить обратную связь и ответить на ваши вопросы!"
                            : "Feel free to contact us for any questions and suggestions!"
                    }
                </p>

                <div className="Contacts__Box">
                    <div
                        className="Contacts__General"
                        onClick={() => navigator.clipboard.writeText("elmijail1@proton.me")}
                    >
                        <div className="Contacts__BoxImageChannel">
                            <p className="Contacts__Image">✉️</p>
                            <p className="Contacts__Channel">
                                {
                                    language === "RUS"
                                        ? "Эл. почта"
                                        : "Email"
                                }
                            </p>
                        </div>
                        <p className="Contacts__Contact">elmijail1@proton.me</p>
                        <p className="Contacts__Copy">
                            {
                                language === "RUS"
                                    ? "Скопировать"
                                    : "Click to copy"
                            }
                        </p>
                    </div>

                    <div
                        className="Contacts__General"
                        onClick={() => navigator.clipboard.writeText("@elmijail1")}

                    >
                        <div className="Contacts__BoxImageChannel">
                            <p className="Contacts__Image">💬</p>
                            <p className="Contacts__Channel">Telegram</p>
                        </div>
                        <p className="Contacts__Contact">@elmijail1</p>
                        <p className="Contacts__Copy">
                            {
                                language === "RUS"
                                    ? "Скопировать"
                                    : "Click to copy"
                            }
                        </p>
                    </div>

                    <div
                        className="Contacts__General"
                        onClick={() => navigator.clipboard.writeText("elmijail1")}
                    >
                        <div className="Contacts__BoxImageChannel">
                            <p className="Contacts__Image">👾</p>
                            <p className="Contacts__Channel">Discord</p>
                        </div>
                        <p className="Contacts__Contact">elmijail1</p>
                        <p className="Contacts__Copy">
                            {
                                language === "RUS"
                                    ? "Скопировать"
                                    : "Click to copy"
                            }
                        </p>
                    </div>


                    <div
                        onClick={() => navigator.clipboard.writeText("elmijail1")}
                        className="ContactsNew__General"
                    >
                        <div className="ContactsNew__TextHalf">
                            <p
                                className="ContacctsNew__TextHalf__Name"
                            >
                                Discord
                            </p>
                            <p
                                className="ContactsNew__TextHalf__Contact"
                            >
                                elmijail1
                            </p>
                            <p
                                className="ContactNew__TextHalf__CopyButton"
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
                                src="src/images/discord.png"
                                className="ContactsNew__ImageHalf__Image"
                                alt=""
                            />
                        </div>
                    </div>

                </div>
            </div>

        </main>
    )
}