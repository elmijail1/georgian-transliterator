export default function DisplayButton({ className, onClick, language, text, icon }) {
    return (
        <div
            className={className}
            onClick={onClick}
        >
            {
                language === "ENG" ? text.eng : text.rus
            }
            {icon}
        </div>
    )
}