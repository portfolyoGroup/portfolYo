import React from 'react'
import { IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonLabel, IonItemDivider, IonItem, IonText } from '@ionic/react'
import { withRouter } from 'react-router'
import '../sharedStyles.scss'
import '../projectHeader/projectHeader.scss'
import pic from '../../resources/snakeGamePic.png'
const ProjectHeader = ({ dataOfProjectHeader, projectPic }) => {
    return (
        <IonContent>
            <IonCard>
                <img src={pic} className="photo" />
                <IonCardHeader>
                    <IonCardSubtitle>{dataOfProjectHeader.sub_title}</IonCardSubtitle>
                    <IonCardTitle>{dataOfProjectHeader.title}</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                    {dataOfProjectHeader.description}
                </IonCardContent>
            </IonCard>
        </IonContent>
    );
}
export default withRouter(ProjectHeader)