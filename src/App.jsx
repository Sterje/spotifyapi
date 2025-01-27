import { useState } from 'react';
import Navbar from './components/Navbar';
import ShowAlbums from './pages/ShowAlbums';
import { Route, Routes } from 'react-router-dom';
import About from './pages/About'

function App() {
    const [searchResults, setSearchResults] = useState([]); // Sökresultat sparas i SearchResults med hjälp av useState
    const [theme, setTheme] = useState('night'); // Tema på sidan sparas i theme, förvalt är night.

    const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID; // ID för spotify API, lagras i en .env fil för säkerhet
    const CLIENT_SECRET = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET; // Secret för Spotify API, lagras i en .env för säkerhet

    const handleSearch = async (query) => { //Funktion för att hantera sökning
        if (!query) return; // Om textfältet inte innehåller något händer ingenting.

        try {
            // Parametrar som behövs för att hämta en token från Spotifys API
            const authParameters = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                // Det här är vad Spotify vill att man ska skriva för att komma åt en token
                body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
            };
            // Här kommer själva API anropet för åtkomst till en token.
            const tokenResult = await fetch(
                'https://accounts.spotify.com/api/token',
                authParameters // Här är parametrarna vi matade in.
            );
            const tokenData = await tokenResult.json();
            const accessToken = tokenData.access_token; // Här sparas token för framtida bruk.

            // Här kommer parametrar för att söka i API
            const searchParameters = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            };
            // Här kommer själva API anropet för att söka efter artist
            const artistResult = await fetch(
                `https://api.spotify.com/v1/search?q=${query}&type=artist`,
                searchParameters
            );
            const artistData = await artistResult.json();
            const artistID = artistData.artists.items[0]?.id; // Artistens ID sparas här. Den tar första resultatet eftersom det är det mest troliga korrekta svaret.

            if (!artistID) {
                alert('Artist not found'); //Felmeddelande om artist inte hittas.
                return;
            }
            // Anrop till APi för att hämta artistens album. Här läggs artistID in i sökningen som vi sparade ovan.
            const albumsResult = await fetch(
                `https://api.spotify.com/v1/artists/${artistID}/albums?include_groups=album&market=US&limit=50`,
                searchParameters
            );
            const albumsData = await albumsResult.json();
            setSearchResults(albumsData.items); // Här uppdaterar setSearchResults searchResults med resultatet från artistens album.
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (

      <div className='App'>
      {/* Navbar ligger högst upp utanför Routes */}
      {/* Skickar props till Navbar  */}
      <Navbar onSearch={handleSearch} theme={theme} setTheme={setTheme} /> 

      {/* Här kommer routes som pekar länkarna i Navbar till rätt page. */}
      <Routes>
       
        <Route path='/about' element={<About />} />
        {/* Skickar props till ShowAlbums */}
        <Route path="/" element={<ShowAlbums searchResults={searchResults} theme={theme} />} />
        
      </Routes>
      
    </div>
     
    );
}

export default App;
