// general
import { Link } from "react-router-dom"

export default function LetteringAndLogo() {
    return (
        // link + container
        <Link to="/" className="LAL__Link">
            <div className="LAL__GeneralDiv">

                {/* image */}
                <img
                    className="LAL__Image"
                    src="transliterator-logo.png"
                    alt="georgian transliterator logo"
                />

                {/* title */}
                <div className="LAL__Title">Georgian Transliterator</div>

            </div>
        </Link>

    )
}

{/*
RENDER STRUCTURE:
1. Link + Container
1.1. Image
1.2. Title
*/}