import { fetchFromServer } from './service'
// import dummyPicData from './dummyProfileData'
import { object } from 'prop-types';


const allData = {
    "5": {
        dataOfAbout: {
            description: "about started with it ",
            programing_languages: "about started with it ",
            skills: "about started with it",
            experience: "about started with it"
        },
        dataOfContact: {
            date_of_birth: "contact started with it",
            address: "contact started with it",
            phone: "contact started with it"
        },
        dataOfProfileHome: {
            name: "profHome started with it",
            title: "profHome started with it",
            main_description: "profHome started with it"
        },
        profilePic: {
            picName: "some pic",
            picType: "png",
            picData: 'kaki of yonim'
        }
    }
}
const DummyProjList = ["71",  "72", "73"]


const isRealServer = true;
export const getProfileData = async (profileId) => {
    if (isRealServer) {
        //call the server by id.
        return await fetchFromServer(`profile?id=${profileId}`, 'GET')
    }
    else {
        return await allData["5"]
    }
}

export const getUserProjList = async (profileId) => { //gets list of projects IDs
    if (isRealServer) {
        //call the server by id.
        return await fetchFromServer(`user_proj_list?id=${profileId}`, 'GET')
    }
    else {
        return await DummyProjList
    }
}


export const setProfileData = async (profileId, data) => {

    if (isRealServer) {
        //call the server by id.
        try {
            return await fetchFromServer(`profile?id=${profileId}`, 'PUT', data)
        }
        catch (err) {
            // todo : handle catch
        }
    }
    else {
        return await '5'
        // nothing to do its here
    }
}

export const serverRegister = async (email, password) => {
    const response = await fetchFromServer('user', 'POST', { email, password })
    return response.id
}

export const serverLogin = async (email, password) => {
    const response = await fetchFromServer('login', 'POST', { email, password })
    return response.id
}


