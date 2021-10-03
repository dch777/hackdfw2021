import { React, useEffect, useState } from "react";import { useParams } from "react-router-dom";
import { Avatar, Box, Button, TextField, Card, CardContent, CardActions, CardMedia, Typography, Grid, Modal } from '@mui/material';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import useUnload from "./useUnload"
import axios from "axios";

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.substr(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
	if (name.split(' ')[1] !== undefined && name.split(' ')[1][0] !== undefined) {
		return {
			sx: {
				bgcolor: stringToColor(name),
			},
			children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
		};
	}
}

const Hub = (props) => {

	const { id } = useParams();
	const [hub, setHub] = useState({})
	const [users, setUsers] = useState({})
	const [userName, setUserName] = useState("")
	const [formOpen, setFormOpen] = useState(false)

	useEffect(() => {
		axios.get("http://localhost:5000/hubs/" + id).then(res => {
			if (res != null) {
				setHub(res.data);
			}
		});
		axios.get("http://localhost:5000/hubs/users/" + id).then(res => {
			if (res != null) {
				setUsers(res.data);
			}
		});
	}, []);

	useUnload(e => {
    e.preventDefault();
    const exit = window.confirm('Are you sure you want to leave?');
		if (exit) {
			window.close();
		}
  });

	return (
		<Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
			<Modal open={formOpen} onClose={() => {setFormOpen(false)}} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
				<Box sx={modalStyle}>
					<Avatar {...stringAvatar(userName)}/>
          <Typography id="modal-modal-title" variant="h6" component="h2">
						Enter your name
          </Typography>
					<TextField variant="standard" helperText="Your Name" defaultValue={userName} onChange={e => setUserName(e.target.value)}/>
        </Box>
			</Modal>
			<Grid container justifyContent="space-evenly" xs={ 6 } spacing={ 3 }>
				<Grid item xs={12}>
					<Card>
						<CardContent>
							<Typography variant="h4">
								Welcome to {hub[1]}!
							</Typography>
							<Typography>
								{hub[2]}
							</Typography>
						</CardContent>
						<CardActions>
							<Button variant="contained" onClick={() => setFormOpen(true)}>
								Connect
							</Button>
							<Button variant="outlined" href={hub[3]}>
								Website
							</Button>
						</CardActions>
						<CardMedia component="root">
							{hub[4] !== undefined && 
								<MapContainer center={[hub[4], hub[5]]} zoom={13} scrollWheelZoom={false} style={{ height: 400 }}>
									<TileLayer
										attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
										url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
									/>
									<Marker position={[hub[4], hub[5]]}>
										<Popup>
											{hub[1]}
										</Popup>
									</Marker>
								</MapContainer>
							}
						</CardMedia>
					</Card>
				</Grid>
			</Grid>
		</Box>
	);
}

export default Hub;
