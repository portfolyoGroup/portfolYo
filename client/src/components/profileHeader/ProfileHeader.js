import React from 'react'
import { IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader,IonCardSubtitle,IonCardTitle, IonList, IonLabel, IonItemDivider, IonItem, IonText } from '@ionic/react'
import { withRouter } from 'react-router'
import '../sharedStyles.scss'
import '../profileHeader/profileHeader.scss'
import pic from '../../resources/profile_pic.png'
// /Users/noamambar/Desktop/portfolYo/client/src/resources
const ProfileHeader = () => {
	return (
		<IonContent>
			<IonCard>
			<img src={pic} className="photo"/>
				<IonCardHeader>
					<IonCardSubtitle>CS student</IonCardSubtitle>
					<IonCardTitle>Dudu Chen</IonCardTitle>
				</IonCardHeader>

				<IonCardContent>
					Looking for a jon in a company shechavlaz al hazman./
					Looking for a jon in a company shechavlaz al hazman./
					Looking for a jon in a company shechavlaz al hazman./
					Looking for a jon in a company shechavlaz al hazman./
					Looking for a jon in a company shechavlaz al hazman./
					Looking for a jon in a company shechavlaz al hazman./
					Looking for a jon in a company shechavlaz al hazman./
      </IonCardContent>
			</IonCard>
		</IonContent>
	);
}
export default withRouter(ProfileHeader)