export const knowledgeData = [
    {
        question: `What does Georgian Transliterator do?`,
        questionRus: `Что делает этот транслитератор?`,
        answer:
            `It takes a Georgian text written in the Latin script and turns it
        into a Georgian text written in the Georgian script. So if you get
        a message with the word "gamarjoba"* you can turn it into "გამარჯობა"
        with the help of this app.

        *"hello" in Georgian`,
        answerRus:
            `Он меняет латинские буквы в грузинском тексте на грузинские.
            Таким образом, если вы вводите в него слово "gamarjoba"*, вы
            получите его же, написанное грузинскими буквами: გამარჯობა.

            *"привет" по-грузински`,
        open: false,
    },
    {
        question: `Does the transliterator translate Georgian to English?`,
        questionRus: `Переводит ли транслитератор с грузинского на английский?`,
        answer:
            `No, it doesn't. Translation and transliteration are 2 different
        things. However, they often work together and probably some day
        there'll be a translator in this app too.`,
        answerRus:
            `Нет. Переводчик и транслитератор – это 2 разных инструмента.
            Предполагается, впрочем, что они участвуют в процессе перевода
            совместно. Поэтому в будущем мы, возможно, добавим переводчик
            и в это приложение.`,
        open: false,
    },
    {
        question: `Why would anyone need to transliterate?`,
        questionRus: `В каких случаях используется транслитератор?`,
        answer:
            `Sometimes you can come across a Georgian text written in
        Latin and have a hard time translating it to any other
        language. Most online translators can't translate a Georgian
        text in Latin scipt at all. So you have to first transliterate
        the Georgian text in Latin script to the Georgian script.`,
        answerRus:
            `Иногда вам может встретиться грузинский текст, написанный
            латиницей. Перевести такой текст не всегда легко, потому что
            большинство онлайн-переводчиков могут только переводить
            грузинский текст, когда он написан грузинскими буквами. Поэтому
            сперва вам понадобится перевести буквы с латиницы на грузинский
            алфавит и только потом переводить грузинский текст на другой язык.`,
        open: false,
    },
    {
        question: `What is the Georgian script?`,
        questionRus: `Что такое грузинские буквы?`,
        answer:
            `Unlike many other European languages, Georgian doesn't use
        the Latin alphabet. It uses an alphabet of its own. The Georgian
        script is basically the same as the Georgian alphabet.`,
        answerRus:
            `Грузинский язык, в отличие от большинства европейских языков,
        не использует латиницу или кириллицу. У него есть свой собственный
        уникальный алфавит.`,
        open: false,
    },
    {
        question: `Where can I come across Georgian text written in Latin?`,
        questionRus: `Где может встретиться грузинский текст, написанный латиницей?`,
        answer:
            `The most likely source of such texts are mobile messages. If you
        stay in Georgia and have a Georgian mobile number, you likely
        receive advertisement meobile messages from time to time. If you
        use Georgian services (banks, parking, etc), you'll also likely
        receive mobile messages from them. More often than not, those
        messages are written in Georgian but in the Latin script. So to
        understand what the message is about, you'll need a transliterator.

        Also, you can stumble upon Georgian written in Latin on the web.
        Some Facebook users write that way sometimes out of their preference.

        And if you've just started studying Georgian yourself, you might find it
        easier to stick to the Latin alphabet before you're confident with
        Georgian letters. The transliterator might be of use to you in such case too.
        `,
        answerRus:
            `Чаще всего такие тексты можно найти в мобильных сообщениях. Если вы
        живёте в Грузии и у вас есть грузинский мобильный номер, вы наверняка
        периодически получаете СМС. Например, сли вы пользуетесь грузинскими
        сервисами (банки, паркинг, проч.), вы точно получаете сообщения от них.
        Чаще всего эти сообщения написаны на грузинском, но латиницей. Чтобы
        понять, о чём эти сообщения, вам понадобится транслитератор.

        Также такие тексты могут вам встретиться и в сети. Например, некоторые
        грузинские пользователи Facebook используют латиницу в своих сообщениях.

        Если вы только начали изучать грузинский, вам какое-то время тоже может
        быть удобнее писать латиницей, если вы ещё не выучили грузинский
        алфавит. В таких случаях транслитератор тоже может пригодиться.
        `,
        open: false,
    },
    {
        question: `Why can some Latin letters transliterate
        as more than one Georgian letter?`,
        questionRus: `Почему некоторые латинские буквы можно транслитерировать
        несколькими способами?`,
        answer: `While the Georgian alphabet looks nothing like the Latin one, it's
            good news that most its letters represent the same sounds that Latin
            letters do. Some sounds, however, can be written down as several letters.
            Consider the sound "k". In how many ways can you right it down in English?
            "King" has it as "k", "cat" has it as "c", and "quay" has it as "q".
            Georgian has similar situations of its own.

            Here's the list of all such cases in Georgian:

            • c – "ts" as in "cats" – can be written both as ც and წ;

            • ch – "ch" as in "chair" – can be written both as ჩ and ჭ;

            • g – can represent 2 different sounds "g" as in "get" and an
            exotic sound not met in English that is something between "g" and "h" –
            the former is written as გ and the latter is written as ღ

            • h – "h" as in "help" or "x" as in the Scottish "loch"
            or the Spanish "México" – can be written as both ჰ and ხ;

            • j – can represent 2 different sounds: "dj" as in "Joe" and
            "j" as in "measure" – the former is ჯ in Georgian and the
            latter is ჟ;

            • k – "k" as in "king" – can be written as კ, ქ, and ყ.
            Technically, all those letters represent different sounds (especially
            ყ), but that's just how those letters are usually transliterated –
            as k;

            • p – "p" as in "pot" – can be written as პ and ფ;

            • t – "t" as in "tornado" – can be written as თ and ტ.

            There are several more cases when our Transliterator offers alternative options:

            • ts – can be transliterated as a single letter (ც or წ) or a combination of 2
            letters (თს or ტს). They literally sound the same similarly to how the English
            letter "x" sounds the same as the combination of letters "ks";

            • y – it's a very tricky letter to translitearte. Most of the time it's transliterated
            as ყ. The only reason that is so, is because they look similar. But they stand for
            very different sounds. But traditionally the Georgian ყ is transliterated as "y" in
            the Latin script. However, if you want to transliterate a proper noun like "Yellowstone",
            the letter you'll want to use for "Y" at the beginning is "ი". We offer it as an alterantive
            option whenever there's the letter "y" in the input.`,
        answerRus: `Несмотря на то, что грузинский алфавит внешне сильно отличается
        от латинского, на самом деле большинство грузинских букв выражают те же
        звуки, что и латинские. Впрочем, некоторые звуки могут передаваться не одной
        буквой, а несколькими. Например, звук "ц". Сколькими способами можно его
        записать в русском? Как минимум тремя: буквой "ц" (цапля) и комбинациями букв
        "тс" (бутсы) и "тьс" (купаться).

        Вот список похожих ситуаций в грузинском:
        
        • c – похоже на "ц" в "цапля" – может быть записана и как ც, и как წ;

        • ch – похоже на "ч" в "скотч" – может быть записана и как ჩ, и как ჭ;

        • g – может подразумевать 2 разных звука в грузинском: один – "г" как
        в слове "грабли", другой – как украинское / южнорусское "г". Первый из них
        записываеся как გ, а другой – как ღ;

        • h – тоже может подразумевать один из 2 звуков: один похожий на русский
        звук "х" (как в слове "хворост"), другой – похожий на более "лёгкий" "х",
        напоминающий английский звук. Первый из них записывается буквой ხ, второй –
        буквой  ჰ;

        • j – тоже может подразумевать один из 2 звуков: один похожий на русский
        звук "ж" (как в слове "жердь"), другой – комбинацию звуков "дж", в русском
        встречающуюся преимущественно в заимствованных словах (Джон, джонджоли).
        Первый из этих звуков записывается буквой ჟ, второй – буквой ჯ;

        • k – эта латинская буква может подразумевать один из 3 грузинских звуков,
        похожих на звук "к". На письме эти звуки передаются 3 разными буквами: კ, ქ, и ყ.
        Однако транслитерация часто делает невозможным угадать, какая из букв (и,
        соответственно, какой из звуков) имеются в виду в конкретном случае;

        • p – тоже может подразумевать 2 разных звука, похожих на русский звук "п"
        (как в "парус"). В грузинском они записываются буквами პ и ფ;

        • t – тоже может подразумевать 2 разных звука, похожих на русский звук "т"
        (как в "тон"). В грузинском они записываются буквами თ и ტ;
    
        Есть ещё несколько особых ситуаций, когда наш транслитератор предлагает альтернативные
        опции для букв:

        • ts – часто очень сложно сразу понять, что именно имеется в виду. Комбинация букв
        "ts" может подразумевать как одну букву (ც или წ), так и две буквы (თს или ტს).
        Похожие ситуации встречаются и в русском: в слове "исцелиться" звук "ц" передаётся
        в двух разных местах двумя разными способами: третья буква "ц" передаёт этот звук
        почти идентично комбинации букв "тьс" в конце слова;

        • y – с этой буквой при транслитерации надо обходиться очень осторожно. Чаще всего
        её используют для обозначения грузинской буквы ყ. Делают это из-за внешнего сходства,
        хотя звук, который она обозначает (что-то вроде "к"), совсем не похож на тот, который
        можно было бы ожидать от латинской буквы "y" (например, в английском и испанском она
        чаще всего обозначает звук "й", в скандинавских языках она может обозначать мягкий звук
        "у" (кторый в слове "плюш" передан буквой "ю"), в чешском – это чаще всего звук "и",
        и так далее). Однако встречаются ситуации, когда в транслитерируемом тексте попадаются
        имена собственные, содержащие в себе латинскую "y", например: Yellowstone (Йеллоустоун),
        Yucatan (Юкатан), Pyrrhus (Пир) и проч.. В таких случаях в грузинском чаще всего необходимо
        использовать букву "ი", передающую звук "и".`,
        open: false,
    }


]