import {IonLoading, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonItem, IonButton } from '@ionic/react'
import { withRouter } from 'react-router'
import '../about/about.scss'
import '../sharedStyles.scss'
import '../projectsList/projectList.scss'
import { getProjectData } from '../../services/projectService'
import React, { useState, useEffect } from 'react'
import pages from '../../pages/Pages'
const ProjectsList = ({ projectsList }) => {
    const [projectsCards, setProjectsCards] = useState([])
    useEffect(() => {
        setProjectsCards(projectsList.map((currId, index) => <OneProj key={currId + index} id={currId} />))
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
                                <IonButton href={`${pages.projectRoute}/${id}`}>
                                    Take A Look
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
                    <ion-text color="primary">
                        <h1>My Projects</h1>
                    </ion-text>
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
export default withRouter(ProjectsList)