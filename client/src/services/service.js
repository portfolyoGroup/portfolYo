import { useEffect, useState } from "react"

export const serverPath = 'http://dummy.restapiexample.com/api/v1/employees'


export const fetchFromServer = async (route, method, body = null) => {

    const [response, setResponse] = useState()

    useEffect(() => {
        const fetchData = async () => {
            const options = {
                method
            }
            if (body && !!body) {
                Object.assign(options, {
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(body)
                })
            }
    
            const res = await fetch(`${serverPath}/${route}`, options)
    
            if (res.ok) {
                // handle some default when accept
                setResponse(await res.json())
            }
            else {
                // handle some default when rejected
            }
        }
        fetchData()
    }, [])

    return response
}