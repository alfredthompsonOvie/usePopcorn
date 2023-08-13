/* eslint-disable react/prop-types */
// import { NumResults } from "./NumResults";
// import { Search } from "./Search";
// import { Logo } from "./Logo";

function NavBAr({ children }) {
	return (
		<nav className="nav-bar">
			{children}
		</nav>
	);
}
// export function NavBAr({ movies }) {
// 	return (
// 		<nav className="nav-bar">
// 			<Logo />
// 			<Search />
// 			<NumResults movies={movies} />
// 		</nav>
// 	);
// }

export default NavBAr;