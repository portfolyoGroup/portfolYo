import {serverPath} from '../pages/Pages'

export const fetchFromServer = async (route, method, body = null) => {

    const options = {
        method
    }
    if (body && !!body) {
        Object.assign(options, {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
    }
    const res = await fetch(`http://${serverPath}:5000/${route}`, options)

    if (res.ok) {
        // handle some default when accept
        return await res.json()
    }
    else {
        const err = await res.json()
        console.log(err)
        throw new Error(res.status)
    }
}