// general
import { useOutletContext } from "react-router-dom"
// components
import AlternativeOptionsMobile from "./subcomponents/AlternativeOptionsMobile.jsx";
import AlternativeOptionsDesktop from "./subcomponents/AlternativeOptionsDesktop.jsx";


export default function AlternativeOptions() {

    const { vpWidth } = useOutletContext()

    return (
        vpWidth < 450
        ? <AlternativeOptionsMobile />
        : <AlternativeOptionsDesktop />
    )
}