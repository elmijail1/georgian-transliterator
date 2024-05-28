export default function WindowButton({ className, onClick, language, text, icon }) {
    return (
        <div className={className} onClick={onClick}>
            {language === "ENG" ? text.eng : text.rus}
            {icon}
        </div>
    )
}

{/*
RENDER STRUCTURE
1. Text (in English or Russian)
2. Icon (usually an svg)
*/}