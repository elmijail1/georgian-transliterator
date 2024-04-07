import { Link, Outlet } from "react-router-dom"
import { useState } from "react"
import { MdMenu } from "react-icons/md";

export default function Layout() {
    const [menuOpen, setMenuOpen] = useState(false)

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
                            <li><Link to="/" onClick={() => setMenuOpen(false)}>
                                Home
                            </Link></li>
                            <li><Link to="/knowledge" onClick={() => setMenuOpen(false)}>
                                Knowledge
                            </Link></li>
                        </ul>
                    }
                </div>


            </div>
            <Outlet />
        </>
    )
}