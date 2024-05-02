import { useContext, useState } from "react"
import { AppContext } from "../App"
import { Link } from "react-router-dom"
import 'bootstrap-icons/font/bootstrap-icons.css'
import '../App.css';
import '../jasphine.css'

export const Header = () => {
    const { navLink, setNavLink, page, setPage, pageText, setPageText} = useContext(AppContext)
    
    const iconStyle = {
        fontSize: '120%',
        color: 'white'
    }

    return (
        <header className="w-full p10 fixed">
            <Link className="no-deco p8 sticky green-bg round flex-center" to={navLink} onClick={() => {
        if (navLink == '/cart') {
            setNavLink('/')
            setPage("bi bi-house")
            setPageText("Home")
        } else {
            setNavLink('/cart')
            setPage("bi bi-cart")
            setPageText("Cart")
        }
        }}>
                <i className={page} style={iconStyle}></i>
                <h3 className="p4 white-fg">{ pageText }<i className="bi bi-caret-right-fill"></i></h3>
            </Link>
        </header>

    )
}
