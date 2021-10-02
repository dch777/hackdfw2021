import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
	return (
		<div>
			<Router>
				<Switch>
					<Route path="/" exact>
						<Home/>
					</Route>
					<Route path="/hubs" exact>
						<HubsList/>
					</Route>
					<Route path="/hubs/:id" exact>
						<Hub/>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
