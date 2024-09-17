import { fetch } from 'wix-fetch'

// A function for generating requests to the PAYGLOCAL API.
export async function payGlocalRequest(method, endpoint, body, authToken) {
    const options = {
        method: method,
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            'x-gl-auth': authToken
        },
        body: body
    }

    try {
        let response = await fetch('https://api.prod.payglocal.in' + endpoint, options)
        let formattedResponse = await response.json()
        return formattedResponse
    } catch (err) {
        console.log('Request to the PayGlocal API failed.', err)
        return err
    }
}