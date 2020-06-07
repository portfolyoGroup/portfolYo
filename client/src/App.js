import React, { useEffect } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ProjectPage from './pages/ProjectPage/ProjectPage'
import UpdateProfileInfo from './components/UpdateProfileInfo/UpdateProfileInfo'
import HomePage from './pages/HomePage/HomePage'
import './theme/variables.scss';
import LogIn from './pages/LogInPage/LogInPage'


const App = () => {
    const pages = {
        home:'/home',
        profileRoute: '/profile1/about',
        projectRoute: '/project1/home',
        UpdateProfileRoute: '/updateProfile',
        logInRoute: '/login'
    }
    const IsLogedIn = true
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
                    <Route path="/project:id">
                        <ProjectPage />
                    </Route>
                    <Route path='/login'>
                        <LogIn />
                    </Route>
                    <Route path='/home'>
                        <HomePage/>
                    </Route>


                    <Route path={'/'} render={() => IsLogedIn ? <Redirect to={pages.profileRoute} /> : <Redirect to={pages.logInRoute} />}></Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}
export default App;