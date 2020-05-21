import React from 'react'
import { IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonList, IonLabel, IonItemDivider, IonItem, IonText } from '@ionic/react'
import { withRouter } from 'react-router'
import './about.scss'
import '../sharedStyles.scss'
import { object } from 'prop-types'
const dataOfAbout = {
    description: 'Keep close to Natures heart... and break clear away, once in awhile, and climb a mountain or spend a week in the woods. Wash your spiritspend a week in the woods. Wash your spiritspend a week in the woods. Wash your spirit clean.',
    programing_languages: 'c, Java',
    programing_languages2: 'c, Java',
    programing_languages3: 'c, Java',
    programing_languages4: 'c, Java',
    programing_languages5: 'c, Java',
    programing_languages6: 'c, Java',
    skills: 'react'
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