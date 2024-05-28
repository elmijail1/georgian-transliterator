import { useEffect } from "react"

export function useElsewhereClick(yourFunction) {
    useEffect(() => {
        document.addEventListener("mousedown", yourFunction)
        return () => {
            document.removeEventListener("mousedown", yourFunction)
        }
    })
}