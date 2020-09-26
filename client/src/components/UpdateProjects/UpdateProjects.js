import { IonModal, IonLoading, IonFab, IonFabButton, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItemDivider, IonItem, IonButton, IonIcon, IonInput, IonRow, IonCol } from '@ionic/react'
import { createBrowserHistory } from 'history'
import '../about/about.scss'
import '../sharedStyles.scss'
import '../UpdateProjects/updateProjects.scss'
import { getProfileData } from '../../services/profileService'
import { getProjectData } from '../../services/projectService'
import { useRouteMatch } from 'react-router-dom'
import React, { useState, useEffect } from 'react'
import { add } from 'ionicons/icons'
import { setProjectData } from '../../services/projectService'
import uploadPic from '../../resources/uploadProjImage.svg'

const UpdateProjects = () => {
    const profileId = React.useMemo(() => sessionStorage.getItem('id'))
    const history = createBrowserHistory({ forceRefresh: true });
    const match = useRouteMatch();
    const [projectsCards, setProjectsCards] = useState([])
    const [projectsList, setProjectsList] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [modalInputValue, setModalInputValue] = useState("")
    const removeLastSlash = (path) => {
        const splited = path.split('/');
        splited.pop();
        path = splited.reduce((acc, curr) => acc + '/' + curr, "");
        path = path.slice(1);
        return path;
    }

    useEffect(() => {
        const fetchData = async () => {
            const projectsList = await getProfileData(profileId)
            setProjectsList(projectsList.projectsList)
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

    const createNewProject = async () => {
        if (!modalInputValue) {
            console.log("null input")
            return
        }
        setShowModal(false)
        await setProjectData(profileId, {
            dataOfProjectHeader: {
                title: modalInputValue
            }
        })
        history.push(match.url)
    }

    return (
        projectsList ? <IonContent>
            <IonModal animated={true} isOpen={showModal}>

                {/* <IonTitle slot="center">Create a New Project</IonTitle>
                <IonItemDivider></IonItemDivider> */}
                <img src={uploadPic} className="uploadphoto" />
                <IonItemDivider>Create a New Project</IonItemDivider>
                <IonCol>
                    <IonInput placeholder="Choose Your New Project's Name" autoGrow={true} clearOnEdit={false} size="100%" onIonChange={e => setModalInputValue(e.detail.value)} ></IonInput>
                </IonCol>
                <IonItemDivider></IonItemDivider>
                <IonRow>
                    <IonButton onClick={createNewProject}>Create Project</IonButton>
                    <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
                </IonRow>
            </IonModal>
            <IonCard>
                <IonCardHeader>
                    <div style={{ display: "flex" }}>
                        <ion-text color="primary">
                            <h1>My Projects</h1>
                        </ion-text>
                        <IonFab onClick={() => setShowModal(true)} vertical="bottom" horizontal="end" slot="fixed">
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
        </IonContent> :
            <IonContent>
                <IonLoading
                    isOpen={true}
                    message={'ProtfolYoing...'}
                />
            </IonContent>
    )
}
export default UpdateProjects