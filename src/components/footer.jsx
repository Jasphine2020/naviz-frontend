import { Link } from 'react-router-dom'
import logo from '../logo.png'
import { useContext } from 'react'
import { AppContext } from '../App'


export const Footer = () => {

    const { setNavLink, setPage, setPageText } = useContext(AppContext)

    return (
        <footer className="w-full black-bg white-fg p20">
            <div className="w-full">

                <div className="w-full m20">
                    <img src={logo} alt="logo" width={100} height={70} />
                </div>

                <ul className="w-full m20-w no-marker">
                    <li className="p10-h">Address: Ndeeba, Kampala Uganda</li>
                    <li className="p10-h">Phone: 0759031683</li>
                    <li className="p10-h">Email: jasphinesoftware@gmail.com</li>
                    <Link to={'/admin'} onClick={() => {setNavLink('/'); setPage("bi bi-house"); setPageText("Home")}}>Thanks for your support</Link>
                </ul>

                <div className="flex-center">
                    <p>Copyright &copy;<script>document.write(new Date().getFullYear());</script> All rights reserved | This Website was developed by Jasphine Technologies</p>
                </div>
            </div>
        </footer>
    )
}
