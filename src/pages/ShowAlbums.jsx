import './ShowAlbums.css'
function ShowAlbums({ searchResults, theme }) {
    return (
        <div className={`home ${theme}`}>
            {searchResults.length === 0 ? (
                <h2 className={`searchresults-h2 ${theme}`}>Sök efter Artist. Enbart Artist, ingenting annat funkar än.</h2>
            ) : (
                <div className="albums">
                    {searchResults.map((album, index) => (
                        <div key={index} className="album">
                            <img src={album.images[0]?.url} alt={album.name} />
                            <p className={`albumname-p ${theme}`}>{album.name}</p>
                            <p className={`albumyear-p ${theme}`}>{album.year}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ShowAlbums;
