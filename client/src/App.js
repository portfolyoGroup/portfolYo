import React, { useEffect, useState } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import ProjectPage from './pages/ProjectPage/ProjectPage'
import HomePage from './pages/PersonalZonePage/PersonalZonePage'
import './theme/variables.scss';
import LogIn from './pages/LogInPage/LogInPage'
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import pages from "./pages/Pages.js"
import ErrorPage from './pages/ErrorPage/errorPage'
import { serverTerminateProject } from './services/projectService'

const App = () => {
    const[isRunning, setIsRunning] = useState(sessionStorage.getItem("runningProjectId") || "false")
    
    const id = sessionStorage.getItem('id')
    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
        toggleDarkTheme(prefersDark.matches);
        prefersDark.addListener((mediaQuery) => toggleDarkTheme(mediaQuery.matches));
    }, [])

    useEffect(() => {
        (async () => {
            const tempIsRunning = sessionStorage.getItem('isRunning')
            setIsRunning(tempIsRunning)
            if (tempIsRunning == 'true') {
                const runningProjectElement = document.getElementById('runningProj')
                if (!runningProjectElement && tempIsRunning == 'true') {
                    await serverTerminateProject()
                }
            }
        })()
    }, [isRunning])

    const toggleDarkTheme = shouldAdd => {
        document.body.classList.toggle('dark', shouldAdd);
    }

    return (
        <IonApp>
            <IonReactRouter>
                <IonRouterOutlet>
                    <Route path="/profile/:id">
                        <ProfilePage />
                    </Route>
                    <Route path="/project/:id">
                        <ProjectPage />
                    </Route>
                    <Route path='/login'>
                        <LogIn />
                    </Route>
                    <Route path={`/home/:${id}`}>
                        <HomePage />
                    </Route>
                    <Route path='/register'>
                        <RegisterPage />
                    </Route>
                    <Route path='/error'>
                        <ErrorPage />
                    </Route>
                    <Route exact path={`/`} render={() => id ? <Redirect to={`${pages.home}/${id}`} /> : <Redirect to={pages.logInRoute} />}></Route>
                </IonRouterOutlet>
            </IonReactRouter>
        </IonApp>
    );
}
export default App;