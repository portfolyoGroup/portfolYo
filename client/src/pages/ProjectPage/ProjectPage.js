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
import { serverRunProject, getProjectData, serverTerminateProject } from '../../services/projectService'
import { createBrowserHistory } from 'history'
import pages from "../../pages/Pages";

const ProjectPage = () => {
    const [projectData, setProjectData] = useState()
    let { id } = useParams();
    const match = useRouteMatch()
    let curr_component;
    const history = createBrowserHistory({ forceRefresh: true });
    const [runResponse, setRunResponse] = useState()

    useEffect(() => {
        (async () => {
            if (id) {
                try {
                    const projectData = await getProjectData(id);
                    const stringOfForamt = `data:image/${projectData.projectPic.picType};base64,`
                    projectData.projectPic.picData = stringOfForamt + projectData.projectPic.picData.replace(new RegExp(stringOfForamt,"g"),'')
                    setProjectData(projectData) 
                    runProject()
                } catch (e) {
                    history.push(pages.errorRoute)
                }
            }
        })()
    }, [id])

    const runProject = async () => {
        const runResponse = await serverRunProject(id);
        setRunResponse(runResponse);
        sessionStorage.setItem('isRunning', 'true')
        sessionStorage.setItem('runningProjectId', id)
    }

    if (projectData && projectData.dataOfProjectHeader && projectData.projectPic && projectData.dataOfProjectDetails && runResponse) {
        curr_component = (
            <IonContent>
                <IonTabs>
                    <IonRouterOutlet>
                        <Switch>
                            <Route path={`${match.url}/home`} component={() => <ProjectHeader dataOfProjectHeader={projectData.dataOfProjectHeader} projectPic={projectData.projectPic} />} exact={true} />
                            <Route path={`${match.url}/runTheProj`} component={() => <RunTheProj runResponse={runResponse} />} exact={true} />
                            <Route path={`${match.url}/`} render={() => <Redirect to={`${match.url}/home`} />} exact={true} />
                        </Switch>
                    </IonRouterOutlet>
                    <IonTabBar slot="top">
                        <IonTabButton className='title-portfolyo' >
                            <IonTitle onClick={() => history.push('/')} size="large">PortfolYo!</IonTitle>
                        </IonTabButton>
                        <IonTabButton tab="home" href={`${match.url}/home`}>
                            <IonLabel>Home</IonLabel>
                        </IonTabButton>
                        <IonTabButton tab="runTheProj" href={`${match.url}/runTheProj`}>
                            <IonLabel>Run The Project</IonLabel>
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
                />
            </IonContent>
        )
    }
    return curr_component
};
export default ProjectPage