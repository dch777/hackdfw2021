import { React, useEffect, useState } from "react";
import { Box, Button, Card, CardContent, CardActions, Paper, Typography, Grid } from '@mui/material';
import axios from "axios";

const HubsList = (props) => {
	
	const [hubs, setHubs] = useState({})

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const form = new FormData();
			form.append("lat", position.coords.latitude);
			form.append("long", position.coords.longitude);
			axios.post(
				"http://localhost:5000/hubs/",
				form
			)
			.then(res => {
				setHubs(res.data);
				console.log(res.data);
			});
		});
	}, []);

	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Grid container justifyContent="space-evenly" xs={6} spacing={ 3 }>
				{Object.keys(hubs).map((i) => (
					<Grid item xs={4}>
						<Card>
							<CardContent>
								<Typography variant="h4">
									{hubs[i][1]}
								</Typography>
								<Typography>
									{hubs[i][2]}
								</Typography>
								<Typography>
									{hubs[i][3]}
								</Typography>
							</CardContent>
							<CardActions>
								<Button variant="contained" href={"/hubs/" + hubs[i][0]}>
									Connect
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Box>
	);
}

export default HubsList;
