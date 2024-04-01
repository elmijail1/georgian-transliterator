import { Link, Outlet } from "react-router-dom"

export default function Layout() {
    return (
        <>
            <div className="Header">
                <div className="Header__Logo">
                    <span className="Header__Logo--tlat">t</span>
                    <span className="Header__Logo--slash">⃕</span>
                    <span className="Header__Logo--tgeo">თ</span>
                </div>

                <Link // N1
                    to="/"
                    className="Header__Title"
                    style={{
                        textDecoration:"none"
                    }}
                >
                    Georgian Transliterator
                </Link>

            </div>
            <Outlet />
        </>
    )
}

{/*
N1. Link around the header title.
It's a temporary solution. Later I'll wrap it around both the logo
and the header saving the current styles. Also, the layout of the
header is likely to change since I'll need to place the link to
Knowledge somewhere (About too, perhaps).
*/}