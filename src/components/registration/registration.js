import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ForgetPassword from "./forgetPassword";
import Login from "./login";
import SignUp from "./sign-up";


function Registration() {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/registration/sign-up" exact component={SignUp} />
                    <Route path="/registration" exact component={Login} />
                    <Route path="/registration/forget-password" exact component={ForgetPassword} />
                </Switch>
            </Router>
        </>
    );
}

export default Registration;
