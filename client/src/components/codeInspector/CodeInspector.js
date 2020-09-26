import React from 'react'
import { IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react'
import { withRouter } from 'react-router'
const CodeInspector = () => {
    return (
        <IonContent>
            <IonCard>
                <IonCardHeader>
                    <IonCardSubtitle>Inspect Code</IonCardSubtitle>
                    <IonCardTitle>take a look</IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                   put code
      </IonCardContent>
            </IonCard>
        </IonContent>
    );
}
export default withRouter(CodeInspector)