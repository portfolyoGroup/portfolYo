import { fetchFromServer } from './service'
import * as dummyProfileData from '../services/dummyProfileData.json'
import { object } from 'prop-types';

const isRealServer = false;
export const getProfileData = async (profileId) => {
    if (isRealServer) {

        //call the server by id.
        try {
            return await fetchFromServer(`/profile?profileId=${profileId}`, 'GET')
        }
        catch (err) {
            // todo : handle catch
        }
    }
    else {
        return await dummyProfileData[profileId]
    }
}

export const setProfileData = async (profileId, data) => {

    if (isRealServer) {
        //call the server by id.
        try {
            return await fetchFromServer(`/profile?profileId=${profileId}`, 'SET', data)

        }
        catch (err) {
            // todo : handle catch
        }
    }
    else {
        dummyProfileData[profileId][dataOfAbout] = data.dataOfAbout
        dummyProfileData[profileId][dataOfContact] = data.dataOfContact
        dummyProfileData[profileId][dataOfProfileHome] = data.dataOfProfileHome
    }
}

export const useRegister = async (email, password) => {
    if (isRealServer) {
        try {
            const id = await fetchFromServer('/profile', 'POST', { email, password })
            return { id }
        }
        catch (err) {
            // todo : handle catch
        }
    }
    else {
        console.log("this is the email " + email)
        dummyProfileData[email] = dummyProfileData[5]
        return email // we mock with the email as the id.
    }
}

