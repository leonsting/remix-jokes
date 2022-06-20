import { Outlet } from "@remix-run/react";

export default function JokesRoute() {
	return (
		<div>
			<h1>J🤪kes</h1>
			<main>
				<Outlet />
			</main>
		</div>
	);
}
