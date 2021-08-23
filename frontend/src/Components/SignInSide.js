import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {createMuiTheme, ThemeProvider, withStyles} from '@material-ui/core/styles';

import Paper from "@material-ui/core/Paper";
import GetOTPForm from "./GetOTPForm";
import GetJWTForm from "./GetJWTForm";

/*function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="right">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                CapDev Portal
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}*/

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

const useStyles = theme => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/75xPHEQBmvA)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        width: "75%",
        minWidth: 375,
        marginLeft: "auto",
        marginRight: "auto",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class SignInSide extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        this.state = {
            otpdone: false
        };
    }

    ShowForm(otpdone) {
        this.setState(currentState => {
            return { otpdone: otpdone };
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <ThemeProvider theme={theme}>
                <Grid container component="main" className={classes.root}>
                    <CssBaseline/>
                    <Grid item xs={false} sm={4} md={5} className={classes.image}/>
                    <Grid item xs={12} sm={8} md={7} component={Paper} elevation={6} square container
                          alignItems={"center"}>
                        <Grid item xs={12}>
                            <div className={classes.paper}>
                                <Typography component="h1" variant="h3" style={{margin: 20}}>
                                    CapDev<b>Portal</b>
                                </Typography>
                            </div>
                            <div className={classes.paper} ref={this.wrapper}>
                                {this.state.otpdone ?
                                    (<GetJWTForm />) :
                                    (<GetOTPForm otpdone={(otpdone) => this.ShowForm(otpdone)} />)
                                }
{/*                                <Box mt={5}>
                                    <Copyright/>
                                </Box>*/}
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
            </ThemeProvider>
        );
    }
}

export default withStyles(useStyles)(SignInSide)