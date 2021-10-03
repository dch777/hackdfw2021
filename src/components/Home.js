import React from "react";
import { Box, Stack, Button, ButtonGroup, Card, CardContent, CardActionArea, CardMedia, Skeleton, Typography, Grid } from '@mui/material';

const Home = (props) => {
	return (
		<Box height="98vh">
			<Card raised display="flex" style={{ height: "100%" }}>
				<CardActionArea href="/hubs">
					<Stack direction="row">
						<CardMedia
							component="img"
							image="https://cdn.discordapp.com/attachments/668238364700442686/894249163708047420/Screenshot_from_2021-10-02_21-03-46.png"
							sx={{ width: "100vh" }}
						/>
						<CardContent sx={{ flex: "1 0 auto" }}>
							<Grid container display="flex" justifyContent="center" alignItems="center">
								<Grid item>
									<Typography variant="h2">
										<br/>
										<br/>
										<br/>
										<br/>
										<br/>
										Welcome to ProxNet!
									</Typography>
									<Typography>
										The first Hub-based social networking platform created to allow you to meet with people physically.
									</Typography>
								</Grid>
							</Grid>
						</CardContent>
					</Stack>
				</CardActionArea>
			</Card>
		</Box>
	);
}

export default Home;
