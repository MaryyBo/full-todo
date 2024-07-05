import axios from 'axios';
import CONSTANTS from '../constants'
import history from '../BrowserHistory';

// INSTANCE

const httpClient = axios.create({
    baseURL: CONSTANTS.API_BASE
});


// USER API

export const registerUser = async (userData) => await httpClient.post('/users/sign-up', userData);


export const loginUser = async (userData) => await httpClient.post('/users/sign-in', userData);

export const refreshUser = async () => {
    const refreshToken = localStorage.getItem('refreshToken')
    const { data } = await httpClient.post('/users/refresh', { refreshToken })
    return data
}

export const authUser = async () => await httpClient.get('/users');

// РОЗЛОГУВАННЯ

export const logOut = async () => {
    localStorage.clear(); // метод clear видаляє все з localStorage
}

// TASK API 

export const getTasks = async () =>
    await httpClient.get('/tasks');

export const createTask = async (taskData) =>
    await httpClient.post('/tasks', taskData);

export const deleteTask = async (taskId) =>
    await httpClient.delete(`/tasks/${taskId}`);



// INTERCEPTORS


httpClient.interceptors.request.use((config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers = {
            ...config.headers, // у новий об'єкт спочатку треба розпилити старі заголовки 
            Authorization: `Bearer ${accessToken}` //  далі доповнюємо заголовком Authorization
        }
    }
    return config;

}, (error) => Promise.reject(error)) // Для помилок

/*
Якщо на якомусь моменті сатється помилка виповнюжться метод колбек 
 Promise.reject(error) реджектимо проміс для того щоб у місці виклику 
 спрацював блок catch і фронт зміг сповістити про помилку користувачеві
*/

httpClient.interceptors.response.use((response) => { //response - тут буде відповідь від сервера
    // data: { data: foundUser, tokens: {accessToken, refreshToken} } = response

    if (response.data.tokens) {
        const { data: { tokens } } = response;
        localStorage.setItem('refreshToken', tokens.refreshToken)
        localStorage.setItem('accessToken', tokens.accessToken)
    }
    return response;

}, async (error) => {
    if (error.response.status === 403 && localStorage.getItem('refreshToken')) {
        await refreshUser();

        // Повторити запит коли сталася помилка 403
        await httpClient(error.config)
    }
    if (error.response.status === 401) {
        history.push('/')
    }

    return Promise.reject(error);
})
