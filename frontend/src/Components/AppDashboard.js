import React, {useEffect, useState} from "react";
import {Grid, Toolbar, Typography} from "@material-ui/core";
import AppBar from '@material-ui/core/AppBar';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import {createMuiTheme, makeStyles, ThemeProvider} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import {Box} from "@material-ui/core";
import PowerSettingsNewOutlinedIcon from '@material-ui/icons/PowerSettingsNewOutlined';
import Button from "@material-ui/core/Button";
import {userAuth} from "../auth";
import {SERVER_USER_AUTH} from "../config";
import Loader from "./Loader";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "rgb(63,192,243)",
            contrastText: '#ffffff'
        },
        secondary: {
            main: "rgb(41,177,181)",
        },
    },
});

const useStyles = makeStyles((theme) => ({
    subportals: {
        marginTop: 20,
        maxWidth: 900,
        marginLeft: "auto",
        marginRight: "auto",
    },
    appBarContents: {
        width: 880,
        height: 80,
        display: "flex",
        //justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
    },
    inactive: {
        opacity: 0.4,
    },
    button: {
        margin: theme.spacing(1),
        flexDirection: 'row-reverse',
        textTransform: 'capitalize',
        color: 'white',
    },
}));

function AppDashboard(props) {
    const classes = useStyles();
    const history = useHistory();
    const routeChange = (path) => {
        if (path === '/') {
            history.push(path);
        } else {
            const win = window.open(path, "_blank");
            win.focus();
        }
    }
    const handleLogout = (path) => {
        userAuth.signout(() => {
            sessionStorage.clear();
            localStorage.clear();
            //console.log("isAuthenticated: ", userAuth.isAuthenticated);
            routeChange('/');
        })
    }

    const [loading, setLoading] = useState(false);
    const [apps, setApps] = useState([]);
    const [userapps, setUserApps] = useState([]);

    useEffect(() => {
        setLoading(true);
        setUserApps(sessionStorage.getItem('apps'));
        fetch(`${SERVER_USER_AUTH}/v1/auth/get_apps`)
            .then(response => response.json())
            .then(data => {
                console.log(data);

                setApps(data.apps);

                setLoading(false);
            })
            .catch(error => {
                //this.setState({getjwtError: error.toString()});
                //console.error('There was an error!', error);
                setLoading(false);
            });
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <div style={{marginTop: 20}}>
                <AppBar color="primary" position="static" style={{height: 80}}>
                    <Toolbar className={classes.appBarContents}>
                        <Grid container direction="row" spacing={1} alignItems="center">
                            <Grid item md={6} lg={6}>
                                <Typography variant="h4"
                                            color="inherit"
                                >
                                    CapDev<b>Portal</b>
                                </Typography>
                            </Grid>
                            <Grid item md={6} lg={6} container justify="flex-end">
                                <Button
                                    color="secondary"
                                    size="small"
                                    className={classes.button}
                                    endIcon={<PowerSettingsNewOutlinedIcon/>}
                                    onClick={() => {
                                        handleLogout()
                                    }}
                                >
                                    <Typography variant="body1"
                                                color="inherit"
                                    ><Box fontWeight="fontWeightBold">Log Out</Box></Typography>
                                </Button>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Grid container direction="row" spacing={2} justify="center" className={classes.subportals}>
                    {apps.map((app) => {
                        if(userapps.indexOf(app) >= 0){
                            return(
                                <Grid item xs={4} md={4}>
                                    <Card onClick={() => routeChange('profilefetcher')}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="140"
                                                width="140"
                                                image="https://source.unsplash.com/KdeqA3aTnBY/300x300"
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {app.title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        } else{
                            return(
                                <Grid className={classes.inactive} item xs={4} md={4}>
                                    <Card onClick={() => routeChange('profilefetcher')}>
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                alt="Contemplative Reptile"
                                                height="140"
                                                width="140"
                                                image="https://source.unsplash.com/KdeqA3aTnBY/300x300"
                                                title="Contemplative Reptile"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    {app.title}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            )
                        }

                    })}
{/*                    <Grid item xs={4} md={4}>
                        <Card onClick={() => routeChange('profilefetcher')}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    width="140"
                                    image="https://source.unsplash.com/KdeqA3aTnBY/300x300"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Staff Profile Fetcher
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item className={classes.inactive} xs={4} md={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140"
                                    image="https://source.unsplash.com/8pb7Hq539Zw/300x300"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Project A
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item className={classes.inactive} xs={4} md={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    alt="Contemplative Reptile"
                                    height="140 "
                                    image="https://source.unsplash.com/5aiRb5f464A/300x300"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        Project B
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>*/}
                </Grid>
                <Loader open={loading}/>
            </div>
        </ThemeProvider>
    );
}

export default AppDashboard;