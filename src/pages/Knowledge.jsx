import { useOutletContext } from "react-router-dom"

export default function Knowledge() {

    const language = useOutletContext()

    /*
    STYLE IT UP
    */

    return (
        <div>
            <h1>
                {
                    language === "RU"
                        ? "Полезно знать"
                        : "Knowledge"
                }
            </h1>

            <div>
                <p>
                    What does Georgian Transliterator do?
                </p>
                <p>
                    It takes a Georgian text written in the Latin script and
                    turns it into a Georgian text written in the Georgian script.
                    So if you get a message with the word "gamarjoba"* you can
                    turn it into "გამარჯობა" with the help of this app.
                    *"hello" in Georgian
                </p>
            </div>

            <div>
                <p>Does the transliterator translate Georgian to English?</p>
                <p>
                    No, it doesn't. Translation and transliteration are 2 different
                    things. However, they often work together and probably some day
                    there'll be a translator in this app too.
                </p>
            </div>

            <div>
                <p>
                    Why would anyone need to transliterate?
                </p>
                <p>
                    Sometimes you can come across a Georgian text written in
                    Latin and have a hard time translating it to any other
                    language. Most online translators can't translate a Georgian
                    text in Latin scipt at all. So you have to first transliterate
                    the Georgian text in Latin script to the Georgian script.
                </p>
            </div>

            <div>
                <p>
                    What is the Georgian script?
                </p>
                <p>
                    Unlike many other European languages, Georgian doesn't use
                    the Latin alphabet. It uses an alphabet of its own. The Georgian
                    script is basically the same as the Georgian alphabet.
                </p>
            </div>

            <div>
                <p>
                    Where can I come across Georgian text written in Latin?
                </p>
                <p>
                    The most likely source of such texts are mobile messages. If you
                    stay in Georgia and have a Georgian mobile number, you likely
                    receive advertisement meobile messages from time to time. If you
                    use Georgian services (banks, parking, etc), you'll also likely
                    receive mobile messages from them. More often than not, those
                    messages are written in Georgian but in the Latin script. So to
                    understand what the message is about, you'll need a transliterator.
                </p>
                <p>
                    Also, you can stumble upon Georgian written in Latin on the web.
                    Some Facebook users write that way sometimes out of their preference.
                </p>
                <p>
                    And if you've just started studying Georgian yourself, you might find it
                    easier to stick to the Latin alphabet before you're confident with
                    Georgian letters. The transliterator might be of use to you in such case too.
                </p>

                <div>
                    <p>
                        Why can some Latin letters transliterate as more than one Georgian letter?
                    </p>
                    <p>
                        While the Georgian alphabet looks nothing like the Latin one, it's
                        good news that most its letters represent the same sounds that Latin
                        letters do. Some sounds, however, can be written down as several letters.
                        Consider the sound "k". In how many ways can you right it down in English?
                        "King" has it as "k", "cat" has it as "c", and "quay" has it as "q".
                        Georgian has similar situations of its own.
                    </p>
                    <p>
                        Here's the list of all such cases in Georgian:
                    </p>
                    <ul>
                        <li>
                            c – "ts" as in "ca<b>ts</b>" – can be written both as ც and წ;
                        </li>
                        <li>
                            ch – "ch" as in "<b>ch</b>air" – can be written both as ჩ and ჭ;
                        </li>
                        <li>
                            g – can represent 2 different sounds "g" as in "<b>g</b>et" and an
                            exotic sound not met in English that is something between "g" and "h" –
                            the former is written as გ and the latter is written as ღ; 
                        </li>
                        <li>
                            h – "h" as in "<b>h</b>elp" or "x" as in the Scottish "lo<b>ch</b>"
                            or the Spanish "Mé<b>x</b>ico" – can be written as both ჰ and ხ;
                        </li>
                        <li>
                            j – can represent 2 different sounds: "dj" as in "<b>J</b>oe" and
                            "j" as in "mea<b>su</b>re" – the former is ჯ in Georgian and the
                            latter is ჟ;
                        </li>
                        <li>
                            k – "k" as in "<b>k</b>ing" – can be written as კ, ქ, and ყ.
                            Technically, all those letters represent different sounds (especially
                            ყ), but that's just how those letters are usually transliterated –
                            as k;
                        </li>
                        <li>
                            p – "p" as in "<b>p</b>ot" – can be written as პ and ფ;
                        </li>
                        <li>
                            t – "t" as in "<b>t</b>ornado" – can be written as თ and ტ.
                        </li>
                    </ul>
                    <p>
                        There are several more cases when our Transliterator offers alternative options:
                    </p>
                    <ul>
                        <li>
                            ts – can be transliterated as a single letter (ც or წ) or a combination of 2
                            letters (თს or ტს). They literally sound the same similarly to how the English
                            letter "x" sounds the same as the combination of letters "ks";
                        </li>
                        <li>
                            y – it's a very tricky letter to translitearte. Most of the time it's transliterated
                            as ყ. The only reason that is so, is because they look similar. But they stand for
                            very different sounds. But traditionally the Georgian ყ is transliterated as "y" in
                            the Latin script. However, if you want to transliterate a proper noun like "Yellowstone",
                            the letter you'll want to use for "Y" at the beginning is "ი". We offer it as an alterantive
                            option whenever there's the letter "y" in the input.
                        </li>
                    </ul>

                </div>

            </div>



        </div>
    )
}