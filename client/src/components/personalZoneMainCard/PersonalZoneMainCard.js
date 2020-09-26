import React from 'react'
import { IonContent, IonCard, IonCardContent, IonCardHeader} from '@ionic/react'
import { withRouter } from 'react-router'
import '../sharedStyles.scss'
const PersonalZoneMainCard = () => {
    return (
        <IonContent>
            <IonCard>
                <IonCardHeader>
                    <ion-text color="primary">
                        <h1>PortfolYo!</h1>
                    </ion-text>
                </IonCardHeader>

                <IonCardContent>
                    This is your PortfolYo! personal zone. you can edit your personal details and edit your projects.
                </IonCardContent>
            </IonCard>
        </IonContent>
    )
}
export default withRouter(PersonalZoneMainCard)