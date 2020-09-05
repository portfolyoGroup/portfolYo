import React, { useEffect, useState } from 'react';
import {
    IonTabs, IonTabBar, IonTabButton, IonLabel, IonRouterOutlet, IonContent,
    IonTitle, IonLoading
} from '@ionic/react';
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
// import allComponents from '../components'
import ProjectsList from '../../components/projectsList/ProjectsList'
import About from '../../components/about/About'
import ProfileHeader from '../../components/profileHeader/ProfileHeader';
import Contact from '../../components/contact/Contact'
import './ProfilePage.scss'
import { getProfileData } from '../../services/profileService'
import { useHistory } from 'react-router-dom';
import pages from '../Pages'
const ProfilePage = () => {

    let { id } = useParams();
    const match = useRouteMatch()
    const history = useHistory()
    let curr_component;
    const [{ dataOfAbout, dataOfContact, dataOfProfileHome }, setProfileData] = useState({})
    
    useEffect(() => {
        (async () => {
            try{
                const profileData = await getProfileData(id);
                setProfileData(profileData)
            } catch(e) {
                console.log(pages.errorRoute)
                history.push(pages.errorRoute)
            }
        })()
    }, [])


    if (dataOfAbout && dataOfContact && dataOfProfileHome) {
        curr_component = (
            <IonContent>
                <IonTabs>
                    <IonRouterOutlet>
                        <Switch>
                            <Route path={`${match.url}/home`} component={() => <ProfileHeader dataOfProfileHome={dataOfProfileHome} />} exact={true} />
                            <Route path={`${match.url}/about`} component={() => <About dataOfAbout={dataOfAbout} />} exact={true} />
                            <Route path={`${match.url}/projectsList`} component={ProjectsList} exact={true} />
                            <Route path={`${match.url}/contact`} component={() => <Contact dataOfContact={dataOfContact} />} />
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
        )
    }
    else {
        curr_component = (
            <IonContent>
                <IonLoading
                    isOpen={true}
                    message={'ProtfolYoing...'}
                    duration={Number.MAX_SAFE_INTEGER}
                />
            </IonContent>
        ) 
    }
    return  curr_component
};
export default ProfilePage

