import logo from '../logo.png'
import { useContext } from 'react';
import { AppContext } from '../App';

import 'bootstrap-icons/font/bootstrap-icons.css'

function toggleChooser() {
    const chooser = document.getElementById('chooser');
    if (chooser.style.display == 'block') {
        chooser.style.display = 'none';
    } else {
        chooser.style.display = 'block';
    }
    
}

export const Navigation = () => {

    const { setCategory } = useContext(AppContext);

    return (
        <nav className="flex-center w-min300 wrap">
            <div className="m20-w w-quater">
                <img className='w-full'
                    src={logo}
                    alt="logo"
                ></img>
            </div>
            <div className="w3-4 m10-w w-min300">
                <div className="green-bg white-fg p10 center pointer" onClick={toggleChooser}>
                    <i className="bi bi-list f11     bold p6">Choose Category</i>
                </div>
                <div className="menu-items">
                    <ul className='no-marker p10 hide' id='chooser'>
                        <li className='m5-h p5-h' onClick={() => { toggleChooser(); setCategory('all')}}>All</li>
                        <li className='m5-h p5-h' onClick={() => { toggleChooser(); setCategory('soda') }}>Soda</li>
                        <li className='m5-h p5-h' onClick={() => { toggleChooser(); setCategory('water') }}>Water</li>
                        <li className='m5-h p5-h' onClick={() => { toggleChooser(); setCategory('other')}}>Other</li>
                    </ul>
                    
                </div>
            </div>
        </nav>
    )
}
