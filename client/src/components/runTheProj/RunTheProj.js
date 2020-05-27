import React from 'react'
import { IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonLabel, IonItemDivider, IonItem, IonText } from '@ionic/react'
import { withRouter } from 'react-router'
const RunTheProj = () => {
    return (
        <IonContent>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Run the Project</IonCardSubtitle>
                    <IonCardTitle>Snake</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                   run
      </IonCardContent>
            </IonCard>
        </IonContent>
    );
}
export default withRouter(RunTheProj)