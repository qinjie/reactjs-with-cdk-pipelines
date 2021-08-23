import Container from '@material-ui/core/Container'
import Stepper from './Components/Modules/profilefetcher/Stepper';
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    pageHeader: {
        textAlign: "center",
        marginTop: 30,
    },
}));

function App() {
    const classes = useStyles();
  return (
    <Container maxWidth="lg">
        <h1 className={classes.pageHeader}>Staff Profile Fetcher</h1>
            <Stepper />
    </Container>
  );
}

export default App;
