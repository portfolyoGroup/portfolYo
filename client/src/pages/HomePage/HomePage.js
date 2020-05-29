import React, { useEffect, useState } from 'react';
import {
    IonTabs, IonTabBar, IonTabButton, IonLabel, IonPage, IonRouterOutlet, IonToolbar, IonHeader, IonContent,
    IonTitle, IonNav
} from '@ionic/react';
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
// import allComponents from '../components'
import UpdateProfileInfo from '../../components/UpdateProfileInfo/UpdateProfileInfo'
import UpdateProjectInfo from '../../components/UpdateProjectInfo/UpdateProjectInfo'
import HomePageMainCard from '../../components/homePageMainCard/HomePageMainCard'

const HomePage = () => {

    let { id } = useParams();
    const match = useRouteMatch()
    return (

        <IonContent>

            <IonTabs>
                <IonRouterOutlet>
                    <Switch>
                        <Route path={`${match.url}/home`} component={HomePageMainCard} exact={true} />
                        <Route path={`${match.url}/updateProfile`} component={UpdateProfileInfo} exact={true} />
                        <Route path={`${match.url}/updateProject`} component={UpdateProjectInfo} exact={true} />
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
                    <IonTabButton tab="update Profile" href={`${match.url}/updateProfile`}>
                        <IonLabel>Update Profile</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="update Project" href={`${match.url}/updateProject`}>
                        <IonLabel>Update Project</IonLabel>
                    </IonTabButton>

                </IonTabBar>
            </IonTabs>
        </IonContent>
    );
};
export default HomePage