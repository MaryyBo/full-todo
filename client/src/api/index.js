import { response } from '../../../server/routes';
import CONSTANTS from '../constants'

export const registerUser = (data) => {
    return fetch(`${CONSTANTS.API_BASE}/user/registration}`, {
        mathod: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    . then(response => response.json());
}