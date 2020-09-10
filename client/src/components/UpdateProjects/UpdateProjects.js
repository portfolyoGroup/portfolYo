import { IonToolbar, IonLoading, IonFab, IonFabButton, IonRouterOutlet, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonLabel, IonItemDivider, IonItem, IonText, IonItemSliding, IonButton, IonIcon } from '@ionic/react'
import { withRouter, useHistory } from 'react-router'
import { createBrowserHistory } from 'history'
import pic from '../../resources/snakeGamePic.png'
import '../about/about.scss'
import '../sharedStyles.scss'
import '../UpdateProjects/updateProjects.scss'
import { getProfileData } from '../../services/profileService'
import {getProjectData} from '../../services/projectService'
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import pages from '../../pages/Pages'
import ProjectPage from '../../pages/ProjectPage/ProjectPage'
import { add } from 'ionicons/icons'
import ProjectsList from '../projectsList/ProjectsList'
const UpdateProjects = () => {
    const profileId = React.useMemo(() => localStorage.getItem('id'))
    const history = useHistory();
    const match = useRouteMatch();
    const [projectsCards, setProjectsCards] = useState([])
    const [projectsList, setProjectsList] = useState([])
    const removeLastSlash = (path) =>{
        const splited = path.split('/');
        splited.pop();
        path = splited.reduce((acc, curr) => acc + '/' + curr , "");
        path = path.slice(1);
        
        console.log("path")
        console.log(path)
        return path;
    }
    
    useEffect(() => {
        const fetchData = async () => {
            const projectsList = await getProfileData(profileId)
            setProjectsList(projectsList.projectsList)
            console.log(projectsList.projectsList)
            setProjectsCards(projectsList.projectsList.map((currId, index) => <OneProj key={currId + index} id={currId} />))
        }
        fetchData()
    }, [])
    const OneProj = ({ id }) => {
        const [{ dataOfProjectHeader, projectPic }, setProjAllData] = useState({})
        useEffect(() => {
            (async () => {
                const projAllData = await getProjectData(id)
                setProjAllData(projAllData)
            })()
        }, [])
        let currComponent;
        if (dataOfProjectHeader && projectPic) {
            
            currComponent = (
                <IonItem class='centeredItem'>

                    <IonCard>
                        <img src={projectPic.picData} alt="no pic available" />
                        <IonCardHeader>
                            <IonCardSubtitle>{dataOfProjectHeader.sub_title}</IonCardSubtitle>
                            <IonCardTitle>{dataOfProjectHeader.title}</IonCardTitle>
                        </IonCardHeader>

                        <IonCardContent>
                            <h3>
                                {dataOfProjectHeader.description}
                            </h3>
                            <IonItem class='centeredItem'>
                                <IonButton onClick={() => history.push(`${removeLastSlash(match.url)}/updateProject/${id}`)}>
                                    Update
                            </IonButton>
                            </IonItem>
                        </IonCardContent>
                    </IonCard>
                </IonItem>
            )
        }
        else {
            currComponent = (
                <IonContent>
                    <IonLoading
                        isOpen={true}
                        message={'ProtfolYoing...'}
                        />
                </IonContent>);
        }
        return currComponent;
    }
    
    
    return (
        <IonContent>

            <IonCard>

                <IonCardHeader>
                    <div style={{display:"flex"}}>
                        <ion-text color="primary">
                            <h1>My Projects</h1>
                        </ion-text>
                        <IonFab vertical="bottom" horizontal="end" slot="fixed">
                            <IonFabButton>
                                <IonIcon icon={add} />
                            </IonFabButton>
                        </IonFab>
                    </div>
                </IonCardHeader>
                <IonCardContent>
                    <IonList>
                        {projectsCards}
                    </IonList>
                </IonCardContent>
            </IonCard>
        </IonContent>
    )
}
export default UpdateProjects