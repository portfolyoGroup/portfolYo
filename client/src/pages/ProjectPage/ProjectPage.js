import React, { useEffect, useState } from 'react';
import {
    IonTabs, IonTabBar, IonTabButton, IonLabel, IonPage, IonRouterOutlet, IonToolbar, IonHeader, IonContent,
    IonTitle, IonNav
} from '@ionic/react';
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
// import allComponents from '../components'
import RunTheProj from '../../components/runTheProj/RunTheProj'
import CodeInspector from '../../components/codeInspector/CodeInspector'
import ProjectHeader from '../../components/projectHeader/ProjectHeader';
import './ProjectPage.scss'

const ProjectPage = () => {
   
    let { id } = useParams();
    const match = useRouteMatch()
    return (

        <IonContent>

            <IonTabs>
                <IonRouterOutlet>
                    <Switch>
                        <Route path={`${match.url}/home`} component={ProjectHeader} exact={true}/>
                        <Route path={`${match.url}/RunTheProj`} component={RunTheProj} exact={true}/>
                        <Route path={`${match.url}/CodeInspector`} component={CodeInspector} exact={true}/>
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
                    <IonTabButton tab="RunTheProj" href={`${match.url}/RunTheProj`}>
                        <IonLabel>RunTheProj</IonLabel>
                    </IonTabButton>
                    <IonTabButton tab="CodeInspector" href={`${match.url}/CodeInspector`}>
                        <IonLabel>CodeInspector</IonLabel>
                    </IonTabButton>

                </IonTabBar>
            </IonTabs>

        </IonContent>
    );
};
export default ProjectPage