import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import LoginDasboard from "./Container/LoginContainer";
import HomeContainer from "./Container/HomeContainer";
import ErrorBoundary from "./utils/errorBoundary";

class App extends React.PureComponent {
    render() {
        return (
            <React.Fragment>
                <ErrorBoundary>
                    <Router>
                        <Switch>
                            <Route exact path="/Home/:id">
                                <HomeContainer />
                            </Route>
                            <Route path="/">
                                <LoginDasboard />
                            </Route>
                        </Switch>
                    </Router>
                </ErrorBoundary>
            </React.Fragment>
        )
    }
}
export default App;