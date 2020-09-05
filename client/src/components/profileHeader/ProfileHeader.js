import React from 'react'
import { IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonList, IonLabel, IonItemDivider, IonItem, IonText } from '@ionic/react'
import { withRouter } from 'react-router'
import '../sharedStyles.scss'
import '../profileHeader/profileHeader.scss'
import pic from '../../resources/profile_pic.png'
// /Users/noamambar/Desktop/portfolYo/client/src/resources
const ProfileHeader = ({ dataOfProfileHome }) => {

	return (
		<IonContent>
			<IonCard>
				{/* <img src={picData} className="photo" /> */}
				<IonCardHeader>
					<IonCardSubtitle>{dataOfProfileHome.title} </IonCardSubtitle>
					<IonCardTitle>{dataOfProfileHome.name}</IonCardTitle>
				</IonCardHeader>
				<IonCardContent>
					{dataOfProfileHome.main_description}
				</IonCardContent>

			</IonCard>
		</IonContent>
	);
}
export default withRouter(ProfileHeader)