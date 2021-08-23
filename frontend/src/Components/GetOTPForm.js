import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from '@material-ui/core/Box';
import React from "react";
import {withStyles} from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Container from "@material-ui/core/Container";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Loader from "./Loader";
import { SERVER_USER_AUTH } from "../config";

const useStyles = theme => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    paper: {
        display: 'flex',
        flexDirection: 'column',
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
});

class GetOTPForm extends React.Component {
    constructor(props) {
        super(props);
        this.wrapper = React.createRef();
        this.state = {
            error: false,
            email: '',
            getotpMessage: '',
            getotpError: '',
            open: false,
            loading: false
        };
    }

    handleChange = (event) => {
        this.setState({getotpError: ""});
        const email = event.target.value;
        this.setState({ email: email });
    }

    catchError = ( error ) => {

        console.log( "Error here: ", error.detail );
        this.setState({getotpError: error.detail});
    }

    handleSubmit = () => {
        //console.log(this.state.email);
        this.setState({loading: true});
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: this.state.email })
        };
        fetch(SERVER_USER_AUTH + '/v1/auth/get_otp_email', requestOptions)
            .then(response => response.json())
            .then(data => {
                    //console.log(data);
                    if( data.message == null ){
                        this.catchError( data );

                    } else {

                        this.setState({getotpMessage: data.message});
                        this.setState({open: true});

                    }
                    this.setState({loading: false})
            }

            )
            .catch(error => {
                /*this.setState({ getotpMessage: error.toString() });*/
                //console.error('There was an error!', error);
                this.setState({loading: false})
            });
    }

    handleClose = (e) => {
        e.preventDefault();
        this.props.otpdone(true);
        localStorage.setItem('email', this.state.email);
        this.setState({open: false});
    };

    render() {
        const { email } = this.state;
        //const { error } = this.state;
        const { classes } = this.props;
        return(
            <Container className={classes.paper} ref={this.wrapper}>
{/*            <Avatar className={classes.avatar}>
                <LockOutlinedIcon/>
            </Avatar>*/}
       <Typography component="body1" variant="body1" color="textSecondary">
            Enter your email address and we will send you a One-Time Password(OTP).
        </Typography>
            <ValidatorForm className={classes.form}
                           onSubmit={this.handleSubmit}
                           onError={errors => console.log(errors)}>
                <TextValidator
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    value={email}
                    onChange={this.handleChange}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}
                />
                <FormHelperText id="component-helper-text" error>{this.state.getotpError}</FormHelperText>
                <Grid container direction="row" spacing={1} alignItems={"flex-start"}>
                    <Grid item md={5} lg={5}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                        >
                            Get OTP
                        </Button>
                    </Grid>
                    <Grid item container justify={"flex-end"} md={7} lg={7}>
                        <Typography variant="body2" color="textSecondary" align="right" style={{fontSize: 12}}>
                            Not a registered user yet? <br/><Box color="primary.main">Contact Us.</Box>
                        </Typography>
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

export default withStyles(useStyles)(GetOTPForm)