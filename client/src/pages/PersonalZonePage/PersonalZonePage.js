import React from 'react';
import { IonContent, IonHeader, IonPage, IonTabButton, IonLabel, IonTitle, IonTabs, IonTabBar, IonRouterOutlet, IonToolbar, IonCol, IonInput, IonItem, IonGrid, IonIcon, IonButton, IonCard, IonFab, IonFabButton } from '@ionic/react';
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

const PersonalZonePage = (props) => {

    const match = useRouteMatch()
    const history = createBrowserHistory({ forceRefresh: true })
    const id = React.useMemo(() => localStorage.getItem('id'))

    const handleLogOut = () => {
        localStorage.clear()
        history.push('/')
    }
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
                            <Route path={`${match.url}/updateProject/:projectId`} component={UpdateProjectInfo} exact={true} />
                            <Route path={`${match.url}/updateProfile`} component={UpdateProfileInfo} exact={true} />
                            <Route path={`${match.url}/updateProjects`} component={UpdateProjects} exact={true} />
                            <Route path={`${match.url}/`} render={() => <Redirect to={`${match.url}/main`} />} />
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
