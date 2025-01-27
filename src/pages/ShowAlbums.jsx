import './ShowAlbums.css'
function ShowAlbums({ searchResults, theme }) {
    return (
        <div className={`home ${theme}`}>
          
                <div className="albums">
                    {searchResults.map((album, index) => (
                        <div key={index} className="album">
                            <img src={album.images[0]?.url} alt={album.name} />
                            <p className={`albumname-p ${theme}`}>{album.name}</p>
                            
                        </div>
                    ))}
                </div>
            
        </div>
    );
}

export default ShowAlbums;
