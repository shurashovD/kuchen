import React, { FC } from "react"
import { styled } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import MuiDrawer from "@mui/material/Drawer"
import Box from "@mui/material/Box"
import DashboardIcon from "@mui/icons-material/Dashboard"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import ArchitectureIcon from "@mui/icons-material/SquareFootRounded"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"
import Container from "@mui/material/Container"
import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import Link from "@mui/material/Link"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import NotificationsIcon from "@mui/icons-material/Notifications"
import { mainListItems, secondaryListItems } from "./listItems"
import { useLocation, useNavigate } from "react-router-dom"
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Engineering, Extension } from "@mui/icons-material"

const drawerWidth = 240

const pathnames = {
	'/measure': 'Замер',
	'/plate-configuration': 'Конфигурация',
	'/combination': 'Постановка',
}

interface AppBarProps extends MuiAppBarProps {
	open?: boolean
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
	"& .MuiDrawer-paper": {
		position: "relative",
		whiteSpace: "nowrap",
		width: drawerWidth,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
		boxSizing: "border-box",
		...(!open && {
			overflowX: "hidden",
			transition: theme.transitions.create("width", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			width: theme.spacing(7),
			[theme.breakpoints.up("sm")]: {
				width: theme.spacing(9),
			},
		}),
	},
}))

// TODO remove, this demo shouldn't need to reset the theme.

export const MainLayout: FC<React.PropsWithChildren> = ({ children }) => {
	const { pathname } = useLocation()
	const navigate = useNavigate()

	const [open, setOpen] = React.useState(false)
	const toggleDrawer = () => {
		setOpen(!open)
	}

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="absolute" open={open}>
				<Toolbar
					sx={{
						pr: "24px", // keep right padding when drawer closed
					}}
				>
					<IconButton
						edge="start"
						color="inherit"
						aria-label="open drawer"
						onClick={toggleDrawer}
						sx={{
							marginRight: "36px",
							...(open && { display: "none" }),
						}}
					>
						<MenuIcon />
					</IconButton>
					<Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
						{pathnames[pathname as keyof typeof pathnames]}
					</Typography>
					{/* <IconButton color="inherit">
						<Badge badgeContent={4} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton> */}
				</Toolbar>
			</AppBar>
			<Drawer variant="permanent" open={open}>
				<Toolbar
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "flex-end",
						px: [1],
					}}
				>
					<IconButton onClick={toggleDrawer}>
						<ChevronLeftIcon />
					</IconButton>
				</Toolbar>
				<Divider />
				<List component="nav">
					<ListItemButton onClick={() => navigate('/plate-configuration')}>
						<ListItemIcon>
							<Extension color={pathname === '/plate-configuration' ? 'primary' : 'inherit'} />
						</ListItemIcon>
						<ListItemText primary="Конфигурация" />
					</ListItemButton>
					<ListItemButton onClick={() => navigate('/measure')}>
						<ListItemIcon color="secondary">
							<ArchitectureIcon color={pathname === '/measure' ? 'primary' : 'inherit'} />
						</ListItemIcon>
						<ListItemText primary="Замер" />
					</ListItemButton>
					<ListItemButton onClick={() => navigate('/combination')}>
						<ListItemIcon color="secondary">
							<Engineering color={pathname === '/combination' ? 'primary' : 'inherit'} />
						</ListItemIcon>
						<ListItemText primary="Постановка" />
					</ListItemButton>
					<Divider sx={{ my: 1 }} />
					{secondaryListItems}
				</List>
			</Drawer>
			<Box
				component="main"
				sx={{
					backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
					display: "flex",
					flexGrow: 1,
					height: "100vh",
					overflow: 'hidden',
				}}
			>
				<Toolbar />
				<Container maxWidth="xl" sx={{ pt: "85px", pb: 2, display: "flex", alignItems: "stretch", flexGrow: 1, }}>
					{children}
				</Container>
			</Box>
		</Box>
	)
}
