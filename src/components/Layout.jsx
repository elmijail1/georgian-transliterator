import { Link, NavLink, Outlet } from "react-router-dom"
import { useState } from "react"
import { MdMenu } from "react-icons/md";

export default function Layout() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [language, setLanguage] = useState("EN")

    return (
        <>
            <div className="Header">
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

                <div className="Header__KebabDiv">
                    <button
                        className="Header__Kebab"
                        onClick={() => setMenuOpen(prevMenu => !prevMenu)}
                    >
                        <MdMenu />
                    </button>

                    {
                        menuOpen &&
                        <ul className="Header__Kebab--Menu">
                            {/* languages */}
                            <li className="Header__Kebab--Menu--Languages">
                                {/* ENglish */}
                                <div
                                    onClick={() => setLanguage("EN")}
                                    style={language === "EN" ? { fontWeight: 700 } : null}
                                >
                                    EN
                                </div>
                                {/* RUssian */}
                                <div
                                    onClick={() => setLanguage("RU")}
                                    style={language === "RU" ? { fontWeight: 700 } : null}
                                >
                                    RU
                                </div>
                            </li>

                            {/* home */}
                            <li><NavLink
                                to="/"
                                onClick={() => setMenuOpen(false)}
                                style={({ isActive }) => isActive ? { fontWeight: 700 } : null}
                            >
                                {
                                    language === "RU"
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
                                    language === "RU"
                                    ? "Полезно знать"
                                    : "Knowledge"
                                }
                            </NavLink></li>
                        </ul>
                    }
                </div>


            </div>

            <Outlet context={language}/>
        </>
    )
}