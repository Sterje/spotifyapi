import './Navbar.css';
import { useState, useEffect } from 'react';
import logo from '../assets/Spotify_icon.svg.png';
import searchnight from '../assets/search-b.png';
import searchday from '../assets/search-w.png';
import night from '../assets/night.png';
import day from '../assets/day.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';

// Funktion för 
function Navbar({ onSearch, theme, setTheme }) {
    const [searchInput, setSearchInput] = useState(''); // Input från sökningen sparas här
    const navigate = useNavigate(); // Hook för att navigera, används senare i handleSearch funktionen.

    useEffect(() => {
        document.body.className = theme; // Uppdaterar bodyn med aktuellt tema.
    }, [theme]);

    const toggleTheme = () => { // Funktion för att byta tema, används i sedan som onClick längre ner i koden.
        const newTheme = theme === 'day' ? 'night' : 'day'; // För att växla tema mellan nigt och day
        setTheme(newTheme); // Sätter aktuellt tema
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchInput); // Skicka sökinput till föräldern
            navigate('/'); // För att när vi tryckt på sök oavsett vilken sida vi är på ska resultatet visas.
        }
    };

    return (
        // className uppdateras med {theme} så beroende vilket tema som är satt så uppdateras klassen med te.x navbar.day eller navbar.night
        <nav className={`navbar ${theme}`}> 
            <Link to="/">
                <img src={logo} alt="Spotify Logo" className="logo" />
            </Link>
            <section className={`search-box ${theme}`}>
                <input
                    type="text"
                    placeholder="Search Spotify"
                    className={`search-input ${theme}`}
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <img
                    src={theme === 'day' ? searchnight : searchday} //Bilder byts ut beroende på tema. searchnight och searchday ligger deklarerade och importerade längst upp.
                    alt="Search Icon"
                    onClick={handleSearch}
                />
            </section>
            <section className="controls">
                <ul>
                    <li className={`navbar-links ${theme}`}>
                        <NavLink to="/about">About</NavLink>
                    </li>
                </ul>
                <img
                    onClick={toggleTheme} // Temat sätts vid klick på bilden.
                    src={theme === 'day' ? night : day} //Bilden byts ut beroende på tema. Night och Day ligger deklarerade och importerade längst upp.
                    alt="Theme Toggle"
                />
            </section>
        </nav>
    );
}

export default Navbar;
