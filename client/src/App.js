import React, { useEffect } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { Route, Redirect } from 'react-router-dom'
import ProfilePage from './pages/ProfilePage'

const App = () => {

    useEffect(() => {
        
    }, [])

    const isLoggedIn = true
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route
                        exact path="/profile"
                        render={props => {
                            return isLoggedIn ? <ProfilePage {...props} /> : <div >login</div>
                        }}
                    />
                    <Redirect exact from="/" to="/profile" />
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}
export default App;