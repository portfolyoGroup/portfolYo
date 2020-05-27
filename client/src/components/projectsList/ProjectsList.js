import React from 'react'
import { IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonLabel, IonItemDivider, IonItem, IonText, IonItemSliding, IonButton } from '@ionic/react'
import { withRouter } from 'react-router'
import pic from '../../resources/snakeGamePic.png'
import '../about/about.scss'
import '../sharedStyles.scss'
import '../projectsList/projectList.scss'
import { Route, Switch, useRouteMatch, useParams, Redirect } from 'react-router-dom'
const ProjectsList = () => {

    const OneProj = () => {
        return (
            <IonItem class='centeredItem'>
                <IonCard>
                    <img src={pic} />
                    <IonCardHeader>
                        <IonCardSubtitle>Cool game</IonCardSubtitle>
                        <IonCardTitle>Snake</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        <h3>
                        written in cpp
                        </h3>
                        <IonItem class='centeredItem'>    
                        <IonButton onClick={()=>{alert('TODO: redirect to proj')}}>
                            Take A Look
                        </IonButton>
                        </IonItem>
                    </IonCardContent>
                </IonCard>
            </IonItem>
        )
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
                        <OneProj></OneProj>
                        <OneProj></OneProj>
                        <OneProj></OneProj>
                    </IonList>
                </IonCardContent>
            </IonCard>
        </IonContent>
    )
}
export default withRouter(ProjectsList)