import React, { useEffect, useState } from 'react';
import {
    IonTabs, IonTabBar, IonTabButton, IonLabel, IonPage, IonRouterOutlet, IonToolbar, IonHeader, IonContent,
    IonTitle, IonNav
} from '@ionic/react';
import { Route, Switch, useRouteMatch, useParams } from 'react-router-dom'
// import allComponents from '../components'
import ProjectsList from '../components/projectsList/ProjectsList'
import About from '../components/about/About'
import ProfileHeader from '../components/profileHeader/ProfileHeader';
import './ProfilePage.css'
const ProfilePage = () => {
    // const [headerComps, setHeaderComps] = useState([])
    // const [contentComps, setContentComps] = useState([])

    // useEffect(() => {
    //     setHeaderComps(
    //         allComponents.map(comp => {
    //             return <Route key={comp.exposeName} path={`/:tab(${comp.exposeName.toLocaleLowerCase()})`} component={comp.component} />
    //         })
    //     )
    //     setHeaderComps([...headerComps, <Route key={'/prof'} path="/profile" render={() => <Redirect to={`/${allComponents[0].exposeName}`} />} />])
    //     setContentComps(
    //         allComponents.map(comp => {
    //             return <IonTabButton key={comp.exposeName} tab={comp.exposeName.toLocaleLowerCase()} href={`/${comp.exposeName.toLocaleLowerCase()}`}>
    //                 <IonLabel>{comp.exposeName}</IonLabel>
    //             </IonTabButton>
    //         })
    //     )
    // }, [])
    let { id } = useParams();
    const match = useRouteMatch()
    return (

        <IonContent>

            <IonTabs>
                <IonRouterOutlet>
                    <Switch>
                        <Route exact path={`${match.url}/:tab(home)`} component={ProfileHeader} />
                        <Route exact path={`${match.url}/:tab(about)`} component={About} />
                        <Route exact path={`${match.url}/:tab(projectsList)`} component={ProjectsList} />
                        <Route exact path={`${match.url}/:tab(contact)`} component={About} />
                    </Switch>
                </IonRouterOutlet>
                <IonTabBar slot="top">
                    <IonTabButton className='title-portfolyo' disabled={true}>
                        <IonTitle >PortfolYo!</IonTitle>
                    </IonTabButton>
                    <IonTabButton tab="home" href={`${match.url}/home`}>
                        <IonLabel>Home</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="about" href={`${match.url}/about`}>
                        <IonLabel>About</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="projectsList" href={`${match.url}/projectsList`}>
                        <IonLabel>Projects List</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="contact" href={`${match.url}/contact`}>
                        <IonLabel>Contact</IonLabel>
                    </IonTabButton>

                </IonTabBar>
            </IonTabs>

        </IonContent>
    );
};
export default ProfilePage