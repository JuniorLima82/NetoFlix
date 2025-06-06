import "./Header.css"
import logo from "../../assets/logo.svg"
import Button from "../button/Button"

function Header(){
    return (
        <div
            className="header-container">
            <img width="180" src={logo}  />
            <Button name="Em alta"/>
            <Button name="Série de Tv"/>
            <Button name="Shows de Tv"/>
            
        </div>
    )
}

export default Header