/* eslint-disable react/prop-types */
// import { useState } from "react";

function Search({query, setQuery}) {

	return (
		<input
			className="search"
			type="text"
			placeholder="Search movies..."
			value={query}
			onChange={(e)=> setQuery(e.target.value)}
			/>
			// onChange={handleSetQuery}
			);
}

export default Search;