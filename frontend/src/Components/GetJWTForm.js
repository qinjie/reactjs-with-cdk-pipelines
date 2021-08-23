import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {userAuth} from "../auth";
import {Redirect} from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { SERVER_USER_AUTH } from "./../config";
import Loader from "./Loader";
import {Dialog, DialogActions, DialogContent, DialogContentText} from "@material-ui/core";

const useStyles = theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    button: {
        margin: theme.spacing(1),
        textTransform: 'capitalize',
    },
});

class GetJWTForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            otp: '',
            jwt: '',
            redirectToReferrer: false,
            getjwtError: '',
            open: false,
            getotpMessage: '',
            loading: false
        };
    }

    handleChange = (event) => {
        this.setState({getjwtError: ""});
        const otp = event.target.value;
        this.setState({ otp: otp });
    }

    catchError = ( error ) => {

        //console.log( "Error here: ", error.detail );
        this.setState({getjwtError: error.detail});
    }
    handleClose = (e) => {
        e.preventDefault();
        this.setState({open: false});
    };

    handleResendOTP = () => {
        this.setState({loading: true});
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: localStorage.getItem("email") })
        };
        fetch(`${SERVER_USER_AUTH}/v1/auth/get_otp_email`, requestOptions)
            .then(response => response.json())
            .then(data => {
                    console.log(data);
                    if( data.message == null ){
                        this.catchError( data );
                    } else {

                        this.setState({getotpMessage: data.message});
                        this.setState({open: true});

                    }
                    this.setState({loading: false});
                }

            )
            .catch(error => {
                /*this.setState({ getotpMessage: error.toString() });*/
                //console.error('There was an error!', error);
                this.setState({loading: false});
            });
    }

    handleSubmit = () => {
        //console.log("OTP submitted: " + this.state.otp);
        this.setState({loading: true});
        const email = localStorage.getItem('email');
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, otp: this.state.otp})
        };
        fetch(`${SERVER_USER_AUTH}/v1/auth/get_jwt_token`, requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if( data.jwt == null ){

                    this.catchError( data );

                } else {

                    sessionStorage.setItem('jwt', data.jwt);
                    sessionStorage.setItem('apps', data.apps);
                    userAuth.signin(() => {
                        this.setState({
                            redirectToReferrer: true
                        })
                    })

                }
                this.setState({loading: false});
            })
            .catch(error => {
                this.setState({getjwtError: error.toString()});
                console.error('There was an error!', error);
                this.setState({loading: false});
            });
    }
    render() {
        const { otp } = this.state;
        //const { error } = this.state;
        const { classes } = this.props;
        const redirectToReferrer = this.state.redirectToReferrer;
        if(redirectToReferrer === true){
            return <Redirect to="/" />
        }
        return(
            <Container className={classes.paper}>
                <Typography component="body1" variant="body1" color="textSecondary">An OTP has been emailed to you. Enter OTP below.</Typography>
                <ValidatorForm className={classes.form}
                               onSubmit={this.handleSubmit}
                               onError={errors => console.log(errors)}>
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="otp"
                        label="OTP"
                        name="otp"
                        autoFocus
                        value={otp}
                        onChange={this.handleChange}
                        validators={['required', 'matchRegexp:^[0-9]{5}$']}
                        errorMessages={['this field is required', 'Invalid OTP']}
                    />
                    <FormHelperText id="component-helper-text" error>{this.state.getjwtError}</FormHelperText>
                    <Grid container direction="row" spacing={1} alignItems={"flex-start"}>
                        <Grid item >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.button}
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item >
                            <Button onClick={this.handleResendOTP}>
                                <Typography variant="button" color="textSecondary" className={classes.button}>
                                    Resend OTP
                                </Typography>
                            </Button>
                        </Grid>
                    </Grid>
                </ValidatorForm>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-describedby="alert-dialog-description">
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {this.state.getotpMessage}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <Loader open={this.state.loading} />
            </Container>
        );
    }
}

export default withStyles(useStyles)(GetJWTForm)