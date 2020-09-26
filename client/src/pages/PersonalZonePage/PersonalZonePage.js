import React from 'react';
import { IonContent, IonPage, IonTabButton, IonLabel, IonTitle, IonTabs, IonTabBar, IonRouterOutlet, IonIcon, IonButton, IonFab, IonFabButton } from '@ionic/react';
// import allComponents from '../components'
import { useRouteMatch } from "react-router-dom";
import '../../pages/LogInPage/LogInPage.scss'
import { Route, Redirect, Switch } from 'react-router-dom'
import UpdateProfileInfo from '../../components/UpdateProfileInfo/UpdateProfileInfo'
import UpdateProjects from '../../components/UpdateProjects/UpdateProjects'
import PersonalZoneMainCard from '../../components/personalZoneMainCard/PersonalZoneMainCard'
import pages from '../Pages.js'
import { createBrowserHistory } from 'history'
import UpdateProjectInfo from '../../components/UpdateProjectInfo/UpdateProjectInfo';
import { logOut } from 'ionicons/icons'
import agada from '../../resources/Portfolyo.png'

const PersonalZonePage = () => {

    const match = useRouteMatch()
    const history = createBrowserHistory({ forceRefresh: true })
    const id = React.useMemo(() => sessionStorage.getItem('id'))

    const handleLogOut = () => {
        sessionStorage.clear()
        history.push('/')
    }

    return (
        <IonPage>
            <IonContent color="primary">
                <IonTabs>
                    <IonRouterOutlet>
                        <Switch>
                            <Route path={`${match.url}/main`} component={PersonalZoneMainCard} exact={true} />
                            <Route path={`${match.url}/updateProject/:projectId`} component={UpdateProjectInfo} exact={true} />
                            <Route path={`${match.url}/updateProfile`} component={UpdateProfileInfo} exact={true} />
                            <Route path={`${match.url}/updateProjects`} component={UpdateProjects} exact={true} />
                            <Route path={`${match.url}/`} render={() => <Redirect to={`${match.url}/main`} />} />
                        </Switch>
                    </IonRouterOutlet>
                    <IonTabBar slot="top">
                        <IonTabButton tab="" className='title-portfolyo' href={`/`}>
                            <IonTitle size="large">
                                <img src={agada}/>
                            </IonTitle>
                        </IonTabButton>
                        <IonTabButton tab="main" href={`${match.url}/main`}>
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="update Profile" href={`${match.url}/updateProfile`}>
                            <IonLabel>Update Profile</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="update Projects" href={`${match.url}/updateProjects`}>
                            <IonLabel>Update Projects</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs >
                <IonFab onClick={handleLogOut} horizontal="end" slot="fixed">
                    <IonFabButton >
                        <IonIcon icon={logOut} />
                    </IonFabButton>
                </IonFab>
            </IonContent>
            <IonButton onClick={() => history.push(`${pages.profileRoute}/${id}`)}>
                <IonLabel>Take Me To My PortfolYo !</IonLabel>
            </IonButton>
        </IonPage >
    );
};
export default PersonalZonePage
