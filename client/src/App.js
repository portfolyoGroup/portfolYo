import React from 'react'
import Register from './components2/Register'
import Login from './components2/Login'
import { Route, Switch } from "react-router-dom";

const App = ({location}) => {
    return (
        <div className='main'>
            <Switch location={location}>
                <Route exact path="/" component={Login} />
                <Route exact path='/register' component={Register} />
            </Switch>
        </div>
    )
}
export default App