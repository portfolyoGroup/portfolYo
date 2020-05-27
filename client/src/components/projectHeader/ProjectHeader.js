import React from 'react'
import { IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonLabel, IonItemDivider, IonItem, IonText } from '@ionic/react'
import { withRouter } from 'react-router'
import '../sharedStyles.scss'
import '../projectHeader/projectHeader.scss'
import pic from '../../resources/snakeGamePic.png'
const ProjectHeader = () => {
    return (
        <IonContent>
            <IonCard>
                <img src={pic} className="photo" />
                <IonCardHeader>
                    <IonCardSubtitle>A snake game written in JavaFx</IonCardSubtitle>
                    <IonCardTitle>Snake</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                    The game is nice!!!
                    we want it to be al chavlaz
                    we want it to be al chavlaz
                    we want it to be al chavlaz
      </IonCardContent>
            </IonCard>
        </IonContent>
    );
}
export default withRouter(ProjectHeader)