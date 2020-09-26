import React from 'react'
import { IonContent, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react'
import { withRouter } from 'react-router'
import '../sharedStyles.scss'
import '../profileHeader/profileHeader.scss'
import pic from '../../resources/profile_pic.png'
// /Users/noamambar/Desktop/portfolYo/client/src/resources
const ProfileHeader = ({ dataOfProfileHome, profilePic }) => {

	return (
		<IonContent>
			<IonCard>
				<img src={profilePic.picData} alt="no pic in server" className="photo" />
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