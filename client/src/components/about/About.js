import React from 'react'
import { IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonList, IonLabel, IonItemDivider, IonItem, IonText } from '@ionic/react'
import { withRouter } from 'react-router'
import './about.scss'
import '../sharedStyles.scss'
import { object } from 'prop-types'
const dataOfAbout = {
    description: "I'm a student you guys, very loving the open sourve community, you guys.",
    programing_languages: 'c, Java',
    skills: 'react',
    experience: 'working at a nice company the I am doc, s about n v d. ahh I get it.'
}
const About = () => {
    const MyList = () => {
        return (
            <IonList>
                {Object.entries(dataOfAbout).map(([key, value], index) => {
                    return (
                        <IonItem class='ion-padding' key={index}>
                            <IonLabel>
                                <IonText>
                                    <h1>{key}</h1>
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
                        <h1>About Me</h1>
                    </ion-text>
                </IonCardHeader>

                <IonCardContent>
                    <MyList></MyList>
                </IonCardContent>
            </IonCard>
        </IonContent>
    )
}
export default withRouter(About)