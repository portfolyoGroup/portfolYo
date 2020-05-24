import React from 'react'
import { IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonLabel, IonItemDivider, IonItem, IonText, IonItemSliding } from '@ionic/react'
import { withRouter } from 'react-router'
import pic from '../../resources/snakeGamePic.png'
import '../about/about.scss'
import '../sharedStyles.scss'
import '../projectsList/projectsList.scss'

const ProjectsList = () => {

    const OneProj = () => {
        return (
            <IonItem>
                <IonCard>
                        <img src={pic} />
                    <IonCardHeader>
                        <IonCardSubtitle>Cool game</IonCardSubtitle>
                        <IonCardTitle>Snake</IonCardTitle>
                    </IonCardHeader>

                    <IonCardContent>
                        written in cpp
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