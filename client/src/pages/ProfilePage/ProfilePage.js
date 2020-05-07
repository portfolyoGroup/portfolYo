import React, { useEffect, useState } from 'react';
import {
    IonTabs, IonTabBar, IonTabButton, IonLabel, IonPage, IonRouterOutlet, IonToolbar, IonHeader, IonContent,
    IonTitle, IonNav
} from '@ionic/react';
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
// import allComponents from '../components'
import ProjectsList from '../../components/projectsList/ProjectsList'
import About from '../../components/about/About'
import ProfileHeader from '../../components/profileHeader/ProfileHeader';
import './ProfilePage.scss'

const ProfilePage = () => {
   
    let { id } = useParams();
    const match = useRouteMatch()
    return (

        <IonContent>

            <IonTabs>
                <IonRouterOutlet>
                    <Switch>
                        <Route path={`${match.url}/home`} component={ProfileHeader} exact={true}/>
                        <Route path={`${match.url}/about`} component={About} exact={true}/>
                        <Route path={`${match.url}/projectsList`} component={ProjectsList} exact={true}/>
                        <Route path={`${match.url}/contact`} component={About} />
                        <Route path={`${match.url}/`} render={() => <Redirect to={`${match.url}/home`} />} exact={true} />
                    </Switch>
                </IonRouterOutlet>
                <IonTabBar slot="top">
                    <IonTabButton className='title-portfolyo' >
                        <IonTitle size="large">PortfolYo!</IonTitle>
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