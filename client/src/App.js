import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import './theme/variables.scss';

const App = () => {
    
    const isLoggedIn = true
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        toggleDarkTheme(prefersDark.matches);
        prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
    }, [])

    const toggleDarkTheme = shouldAdd => {
        document.body.classList.toggle('dark', shouldAdd);
    }

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
                    <Route  path={'/'} render={() => isLoggedIn ? <Redirect to={'/profile1/about'} /> : <Redirect to='/login' />}></Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}
export default App;