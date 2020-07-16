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
            console.log("allData")
            console.log(allData["5"])
            return await allData["5"]
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
            console.log('this is the id: ' + profileId)
            console.log('this is the data: ')
            console.log(data)
            // nothing to do its here
        }
    }

export const useRegister = async (email, password) => {
        if (isRealServer) {
            try {
                const id = await fetchFromServer('/user', 'POST', { email, password })
                return id
            }
            catch (err) {
                // todo : handle catch
            }
        }
        else {
            return await "5"
        }
    }

