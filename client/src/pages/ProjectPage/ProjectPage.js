import React, { useEffect, useState } from 'react';
import {
    IonTabs, IonTabBar, IonTabButton, IonLabel, IonPage, IonRouterOutlet, IonToolbar, IonHeader, IonContent,
    IonTitle, IonNav, IonLoading
} from '@ionic/react';
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
// import allComponents from '../components'
import RunTheProj from '../../components/runTheProj/RunTheProj'
// import CodeInspector from '../../components/codeInspector/CodeInspector'
import ProjectHeader from '../../components/projectHeader/ProjectHeader';
import './ProjectPage.scss'
import { getProjectData } from '../../services/projectService'
import { createBrowserHistory } from 'history'

const ProjectPage = () => {
    const [{ dataOfProjectHeader, dataOfCodeRunner }, setProjectData] = useState({})
    let { id } = useParams();
    const match = useRouteMatch()
    let curr_component;
    const history = createBrowserHistory({ forceRefresh: true });
    useEffect(() => {
        (async () => {
            try{
                const projectData = await getProjectData(id);
                setProjectData(projectData)
                console.log("hhh")
                console.log(projectData)
            } catch(e) {
                console.log(pages.errorRoute)
                history.push(pages.errorRoute)
            }
        })()
    }, [])

    if(dataOfProjectHeader)
    curr_component =  (
        <IonContent>
            <IonTabs>
                <IonRouterOutlet>
                    <Switch>
                        <Route path={`${match.url}/home`} component={() => <ProjectHeader dataOfProjectHeader={dataOfProjectHeader}/>} exact={true}/>
                        <Route path={`${match.url}/RunTheProj`} component={() => <RunTheProj dataOfCodeRunner={dataOfCodeRunner}/>} exact={true}/>
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
                </IonTabBar>
            </IonTabs>

        </IonContent>
    )
    else {
        curr_component = (
            <IonContent>
                <IonLoading
                    isOpen={true}
                    message={'ProtfolYoing...'}
                />
            </IonContent>
        ) 
    }
    return  curr_component
};
export default ProjectPage