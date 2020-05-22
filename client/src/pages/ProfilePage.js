import React, { useEffect, useState } from 'react';
import {
    IonTabs, IonTabBar, IonTabButton, IonLabel, IonPage, IonRouterOutlet, IonToolbar, IonHeader, IonContent,
    IonTitle, IonNav
} from '@ionic/react';
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
// import allComponents from '../components'
import ProjectsList from '../components/projectsList/ProjectsList'
import About from '../components/about/About'
import ProfileHeader from '../components/profileHeader/ProfileHeader';
import Contact from '../components/contact/Contact'
import './ProfilePage.css'
const ProfilePage = () => {
    console.log('at prof')
    let { id } = useParams();
    const match = useRouteMatch()
    return (

        <IonContent>

            <IonTabs>
                <IonRouterOutlet >
                    <Switch >
                        <Route exact path={`${match.url}/home`} component={ProfileHeader} />
                        <Route exact path={`${match.url}/about`} component={About} />
                        <Route exact path={`${match.url}/projectsList`} component={ProjectsList} />
                        <Route exact path={`${match.url}/contact`} component={Contact} />
                    </Switch>
                </IonRouterOutlet>
                <IonTabBar slot="top" selected-tab='home'>
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