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
                        <h1>ProfolYo!</h1>
                    </ion-text>
                </IonCardHeader>

                <IonCardContent>
                    We are ProfolYo! This, is: portfolYo, where the next thing happens here and now.
                    Where state of the art technolegy meets top noch minds, and creates the inovation for next generations.
                    This is the place to express your own unieqe set of unbelievable skills, and to share your dreams, that here will come true.
                    We have a saying here at portfolYo:"Have a ya eh day, and keep being heavyly in the yep."                    
                </IonCardContent>
            </IonCard>
        </IonContent>
    )
}
export default withRouter(PersonalZoneMainCard)