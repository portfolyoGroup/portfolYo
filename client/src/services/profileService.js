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

export const getProfile = async (profileId) => {
    //call the server by id.

    try {
    //    return await fetchFromServer(`profile${profileId}`, 'GET')
       const s = await fetchFromServer(``, 'GET')
       console.log(s)
       return { dataOfAbout, dataOfContact }
    }
    catch(err) {
        // todo : handle catch
    }
}

export const fetchFromServer = async (route, method, body=null) => {
    const res = await fetch(`${serverPath}/${route}`)
    if(res.ok) {
        // handle some default when accept
        return await res.json()
    }
    else {
        // handle some default when rejected
    }
}
