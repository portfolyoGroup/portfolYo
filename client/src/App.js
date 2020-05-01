import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import ProfilePage from './pages/ProfilePage'

const App = () => {
    const isLoggedIn = true
    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/profile:id">
                        <ProfilePage />
                    </Route>
                    <Route
                        path="/login"
                        component={ProfilePage}
                    />
                    <Route path={'/'} render={() => isLoggedIn ? <Redirect to={'/profile1'} /> : <Redirect to='/login' />}></Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}
export default App;