import React, { createContext, useState } from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import SignInSide from "./Components/SignInSide";
import AppDashboard from "./Components/AppDashboard";
import App from "./App";

export default function AppAuth() {
    return (
        <ProvideAuth>
            <Router>
                <div>
                    <Switch>
                        <Route path="/login" exact component={SignInSide}/>
                        <PrivateRoute path="/" exact component={AppDashboard}/>
                        <PrivateRoute path="/profilefetcher" exact component={App}/>
                    </Switch>
                </div>
            </Router>
        </ProvideAuth>
    );
}


export const userAuth = {
    isAuthenticated: false,
    signin(cb) {
        userAuth.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        userAuth.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

const authContext = createContext();

function ProvideAuth({ children }) {
    const auth = useProvideAuth();
    return (
        <authContext.Provider value={auth}>
            {children}
        </authContext.Provider>
    );
}

/*function useAuth() {
    return useContext(authContext);
}*/

function useProvideAuth() {
    const [user, setUser] = useState(null);

    const signin = cb => {
        return userAuth.signin(() => {
            setUser("user");
            cb();
        });
    };

    const signout = cb => {
        return userAuth.signout(() => {
            setUser(null);
            cb();
        });
    };

    return {
        user,
        signin,
        signout
    };
}

function PrivateRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={() =>
                sessionStorage.getItem('jwt') != null || localStorage.getItem('email') != null ? <Component />: (
                    <Redirect
                        to="/login"
                    />
                )
            }
        />
    );
}

