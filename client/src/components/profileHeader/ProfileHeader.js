import React from 'react'
import { IonToolbar, IonTitle } from '@ionic/react'
import { withRouter } from 'react-router'

const ProfileHeader = () => {
	return (
		<IonToolbar>
			<IonTitle>Details</IonTitle>
		</IonToolbar>
	);
}
export default withRouter(ProfileHeader)