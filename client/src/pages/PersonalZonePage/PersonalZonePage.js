import React from 'react';
import { IonContent, IonHeader, IonPage, IonTabButton, IonLabel, IonTitle, IonTabs,IonTabBar ,IonRouterOutlet, IonToolbar, IonCol, IonInput, IonItem, IonGrid, IonRow, IonButton, IonCard } from '@ionic/react';
// import allComponents from '../components'
import { useRouteMatch } from "react-router-dom";
import '../../pages/LogInPage/LogInPage.scss'
import { Route, Redirect, Switch } from 'react-router-dom'
import UpdateProfileInfo from '../../components/UpdateProfileInfo/UpdateProfileInfo'
import UpdateProjectInfo from '../../components/UpdateProjectInfo/UpdateProjectInfo'
import PersonalZoneMainCard from '../../components/personalZoneMainCard/PersonalZoneMainCard'

const PersonalZonePage = (props) => {
    
    const match = useRouteMatch()

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle className='big-title-portfolyo'>PortfolYo!</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent color="primary">

                <IonTabs>
                    <IonRouterOutlet>
                        <Switch>
                            <Route path={`${match.url}/main`} component={PersonalZoneMainCard} exact={true} />
                            <Route path={`${match.url}/updateProfile`} component={UpdateProfileInfo} exact={true} />
                            <Route path={`${match.url}/updateProject`} component={UpdateProjectInfo} exact={true} />
                            <Route path={`${match.url}/`} render={() => <Redirect to={`${match.url}/main`} />} exact={true} />
                        </Switch>
                    </IonRouterOutlet>
                    <IonTabBar slot="top">
                        <IonTabButton className='title-portfolyo' >
                            <IonTitle size="large">PortfolYo!</IonTitle>
                        </IonTabButton>
                        <IonTabButton tab="main" href={`${match.url}/main`}>
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="update Profile" href={`${match.url}/updateProfile`}>
                            <IonLabel>Update Profile</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="update Project" href={`${match.url}/updateProject`}>
                            <IonLabel>Update Project</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs >
            </IonContent>
        </IonPage >
    );
};
export default PersonalZonePage