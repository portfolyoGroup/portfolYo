import React from 'react'
import { IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonList, IonLabel, IonItemDivider, IonItem, IonText, IonButton } from '@ionic/react'
import { withRouter } from 'react-router'
import '../about/about.scss'
import '../sharedStyles.scss'
import { object } from 'prop-types'
const Contact = ({dataOfContact}) => {
    const MyList = () => {
        return (
            <IonList>
                {Object.entries(dataOfContact).map(([key, value], index) => {
                    return (
                        <IonItem class='ion-padding' key={index}>
                            <IonLabel>
                                <IonText>
                                    <h1>{key.replaceAll('_', ' ')}</h1>
                                    <p>{value}</p>
                                </IonText>
                            </IonLabel>
                        </IonItem>
                    )
                })}
            </IonList>
        )
    }
    return (
        <IonContent>
            <IonCard>
                <IonCardHeader>
                    <ion-text color="primary">
                        <h1>Contact Me</h1> 
                    </ion-text>
                </IonCardHeader>

                <IonCardContent>
                    <MyList></MyList>
                    <IonButton onClick={() => {alert("Thanks for downloading my CV")}}>Download CV</IonButton>
                </IonCardContent>
            </IonCard>
        </IonContent>
    )
}
export default withRouter(Contact)