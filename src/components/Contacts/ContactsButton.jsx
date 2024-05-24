export default function ContactsButton({ entry, language }) {
    return (
        <div
            className="ContactsButton__GeneralDiv"            
            onClick={() => navigator.clipboard.writeText(entry.address)}
        >

            {/* texts div */}
            <div className="ContactsButton__TextsDiv">

                {/* title: channel name */}
                <p className="ContactsButton__Title">
                    {entry.channel}
                </p>

                {/* subtitle: address */}
                <p className="ContactsButton__Subtitle">
                    {entry.address}
                </p>

                {/* button */}
                <p className="ContactsButton__Button">
                    {
                        language === "ENG"
                            ? "Click to copy"
                            : "Скопировать"
                    }
                </p>

            </div>

            {/* image */}
            <div>
                <img
                    src={entry.image}
                    className="ContactsButton__Image"
                    alt={entry.image}
                />
            </div>

        </div>
    )
}

{/*
RENDER STRUCTURE
1. Text Div
1.1. Title
1.2. Subtitle
1.3. Button
2. Image
*/}