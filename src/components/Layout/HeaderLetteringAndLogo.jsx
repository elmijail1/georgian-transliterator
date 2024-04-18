import { Link } from "react-router-dom"

export default function HeaderLetteringAndLogo() {
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