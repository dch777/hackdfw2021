import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, Card, CardContent, Skeleton, Typography, Grid } from '@mui/material';
import axios from "axios";

const Hub = (props) => {

	const { id } = useParams();
	const [hub, setHub] = useState({})

	useEffect(() => {
		axios.get("http://localhost:5000/hubs/" + id).then(res => {
			if (res != null) {
				setHub(res.data);
			}
		});
	}, []);

	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Grid container justifyContent="space-evenly" xs={ 6 } spacing={ 3 }>
				<Grid item xs={12}>
					<Card>
						<CardContent>
							{hub != null
								? (<Typography>
										Welcome to {hub[1]}!
									</Typography>)
								: <Skeleton/>
							}
						</CardContent>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Hub;
