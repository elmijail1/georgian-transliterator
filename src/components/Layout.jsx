import { Link, Outlet } from "react-router-dom"
import { MdMenu } from "react-icons/md";

export default function Layout() {
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

                <button
                className="Header__Kebab"
                >
                    <MdMenu />
                </button>


            </div>
            <Outlet />
        </>
    )
}