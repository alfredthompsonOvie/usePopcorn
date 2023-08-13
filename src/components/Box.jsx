/* eslint-disable react/prop-types */
import { useState } from "react";


function Box({children}) { 
	const [isOpen, setIsOpen] = useState(true);

  return <div className="box">
  <button
    className="btn-toggle"
    onClick={() => setIsOpen((open) => !open)}
  >
    {isOpen ? "–" : "+"}
    </button>
    {/* {isOpen && <ul className="list">
      {movies.map(movie => <Movie movie={movie} key={movie.imdbID}/>)}
    </ul> } */}
  
    {isOpen && children}
</div>
}

export default Box;