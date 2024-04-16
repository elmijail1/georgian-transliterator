import { Link, NavLink, Outlet } from "react-router-dom"
import { useState, useEffect } from "react"
import { MdMenu } from "react-icons/md";

export default function Layout() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
    const [language, setLanguage] = useState()

    useEffect(() => {
        if (localStorage.getItem("language")) {
            setLanguage(localStorage.getItem("language"))
        } else {
            setLanguage("ENG")
        }
    }, [])

    function HeaderLetteringAndLogo() {
        return (
            <Link
                to="/"
                className="Header__HomeLink"
                style={{
                    textDecoration: "none"
                }}
            >
                <div className="Header__HomeDiv">
                    <div className="Header__Logo">
                        <span className="Header__Logo--tlat">t</span>

                        <span className="Header__Logo--slash">⃕</span>
                        <span className="Header__Logo--tgeo">თ</span>
                    </div>
                    <div className="Header__Title">Georgian Transliterator </div>
                </div>
            </Link>
        )
    }

    function HeaderLanguageMenuMobile() {
        return (
            <div className="Header__Languages">
                <button
                    className="Header__Languagues--Button"
                    onClick={() => {
                        setLanguageMenuOpen(prevOpen => !prevOpen)
                        setMenuOpen(false)
                    }}
                >
                    {
                        language === "RUS"
                            ? "RUS"
                            : "ENG"
                    }
                </button>
                {
                    languageMenuOpen &&
                    <ul className="Header__Languages--Menu">
                        <li
                            className={language === "ENG" ? "Header__Languages--MenuItemActive" : ""}
                            onClick={() => {
                                setLanguage("ENG")
                                setLanguageMenuOpen(false)
                                localStorage.setItem("language", "ENG")
                            }}
                        >
                            {
                                language === "RUS"
                                    ? "Английский"
                                    : "English"
                            }
                        </li>
                        <li
                            className={language === "RUS" ? "Header__Languages--MenuItemActive" : ""}
                            onClick={() => {
                                setLanguage("RUS")
                                setLanguageMenuOpen(false)
                                localStorage.setItem("language", "RUS")
                            }}
                        >
                            {
                                language === "RUS"
                                    ? "Русский"
                                    : "Russian"
                            }
                        </li>
                    </ul>
                }
            </div>
        )
    }

    function HeaderKebabMenuMobile() {
        return (
            <div className="Header__KebabDiv">
                <button
                    className="Header__Kebab"
                    onClick={() => {
                        setMenuOpen(prevMenu => !prevMenu)
                        setLanguageMenuOpen(false)
                    }}
                >
                    <MdMenu />
                </button>

                {
                    menuOpen &&
                    <ul className="Header__Kebab--Menu">
                        {/* home */}
                        <li><NavLink
                            to="/"
                            onClick={() => setMenuOpen(false)}
                            style={({ isActive }) => isActive ? { fontWeight: 700 } : null}
                        >
                            {
                                language === "RUS"
                                    ? "Главная"
                                    : "Home"
                            }
                        </NavLink></li>

                        {/* knowledge */}
                        <li><NavLink
                            to="/knowledge"
                            onClick={() => setMenuOpen(false)}
                            style={({ isActive }) => isActive ? { fontWeight: 700 } : null}
                        >
                            {
                                language === "RUS"
                                    ? "Полезно знать"
                                    : "Knowledge"
                            }
                        </NavLink></li>

                        {/* contacts */}
                        <li><NavLink
                            to="/contacts"
                            onClick={() => setMenuOpen(false)}
                            style={({ isActive }) => isActive ? { fontWeight: 700 } : null}
                        >
                            {
                                language === "RUS"
                                    ? "Контакты"
                                    : "Contacts"
                            }
                        </NavLink></li>
                    </ul>
                }
            </div>
        )
    }

    const [vpWidth, setVPWidth] = useState(window.innerWidth)
    useEffect(() => {
        function handleResize() {
            setVPWidth(window.innerWidth)
        }
        window.addEventListener("resize", handleResize)
    })

    function HeaderLanguageMenuDesktop() {
        return (
            <h1>languages</h1>
        )
    }

    function HeaderKebabMenuDesktop() {
        return (
            <h1>kebab</h1>
        )
    }

    return (
        <>
            <div className="Header">
                <HeaderLetteringAndLogo />
                <div>vpWidth = {vpWidth}</div>
                {
                    vpWidth > 1919
                        ?
                        <>
                            < HeaderLanguageMenuMobile />
                            <HeaderKebabMenuMobile />
                        </>
                        :
                        <>
                        <HeaderLanguageMenuDesktop/>
                        <HeaderKebabMenuDesktop/>
                        </>
                }



            </div >

            <Outlet context={language} />
        </>
    )
}