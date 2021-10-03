import { React, useState } from "react";
import Home from "./components/Home"
import Hub from "./components/Hub"
import HubsList from "./components/HubsList"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const App = (props) => {
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
