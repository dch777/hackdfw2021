import { React, useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Card, CardContent, CardActions, CardMedia, Skeleton, Typography, Grid } from '@mui/material';
import axios from "axios";

const HubsList = (props) => {
	
	const [hubs, setHubs] = useState({})

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			axios.get(
				"http://localhost:5000/hubs/" + position.coords.latitude + "/" + position.coords.longitude
			)
			.then(res => {
				setHubs(res.data);
				console.log(res.data);
			});
		});
	}, []);

	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="90vh">
			<Grid container justifyContent="space-evenly" xs={8} spacing={3}>
				<Grid item xs={12}>
					<Card>
						<CardContent>
							<Typography variant="h3">
								Please Select a nearby Hub
							</Typography>
						</CardContent>
					</Card>
				</Grid>
				{hubs.length > 0 
					? (Object.keys(hubs).map((i) => (
					<Grid item xs={4}>
						<Card>
							<CardMedia component="img" image={hubs[i][6]} sx={{mt:1}}/>
							<CardContent>
								<Typography variant="h4">
									{hubs[i][1]}
								</Typography>
								<Typography>
									{hubs[i][2]}
								</Typography>
							</CardContent>
							<CardActions>
								<ButtonGroup>
									<Button variant="contained" href={"/hubs/" + hubs[i][0]}>
										Connect
									</Button>
									<Button variant="outlined" href={hubs[i][3]}>
										Website
									</Button>
								</ButtonGroup>
							</CardActions>
						</Card>
					</Grid>
					))) 
					: (<Grid item xs={4}>
						<Card>
							<CardMedia component="img"/>
							<CardContent>
								<Typography variant="h4">
									<Skeleton/>
								</Typography>
								<Typography>
									<Skeleton/>
								</Typography>
							</CardContent>
							<CardActions>
								<ButtonGroup>
									<Button variant="contained">
										<Skeleton/>
									</Button>
									<Button variant="outlined">
										<Skeleton/>
									</Button>
								</ButtonGroup>
							</CardActions>
						</Card>
					</Grid>)
				}
			</Grid>
		</Box>
	);
}

export default HubsList;
