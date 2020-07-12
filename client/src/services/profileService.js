import { fetchFromServer } from './service'

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

export const useProfileData = async (profileId) => {

    //call the server by id.
    try {
        return await fetchFromServer(`/profile?profileId=${profileId}`, 'GET')
    }
    catch (err) {
        // todo : handle catch
    }
}

export const useRegister = async (args) => {
    try {
        const id = await fakeRegister()
        return { id }
        // return await fetchFromServer(`/register`, 'POST', args)
    }
    catch (err) {
        // todo : handle catch
    }
}

const fakeRegister = async () => {
    return 40
}