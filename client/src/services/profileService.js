import { useFetch } from 'use-http'
import {serverPath} from './service'
const dataOfAbout = {
    description: "I'm a student you guys, very loving the open sourve community, you guys.",
    programing_languages: 'c, Java',
    skills: 'react',
    experience: 'working at a nice company the I am doc, s about n v d. ahh I get it.'
}
const dataOfContact = {
    date_of_birth: "5.5.1875",
    mail: 'donotreplay@dnr.com',
    Adress: 'TLV fashion mall',
    phone: '051113345'
}

export const useGetProfile = async (profileId) => {
    //call the server by id.
    const {loading, error, get, response} = useFetch(serverPath) //error is not clear, might use it later.
    const profileData = await get(`/`)
    // const profileData = await get(`/profile:${profileId}`)
    if (response.ok) {
        console.log('we did it')
        console.log(response.text)
        profileData = { dataOfAbout, dataOfContact }
        return profileData
    }
    else {
        return error
    }

   // return { dataOfAbout, dataOfContact }
}
