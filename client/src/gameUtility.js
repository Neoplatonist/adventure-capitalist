import axios from 'axios'

// Math Functions
export const cost = (baseCost, multiplier, numOwned) => baseCost * multiplier ** numOwned
export const production = (production, multiplier, numOwned) => (production * numOwned) * multiplier

// Utility Functions
export const getIndexByName = (arr, name) => arr.findIndex(i => i.name === name)

export const setAxiosInterceptor = () => axios.interceptors.request.use((config) => {
    console.debug('axios catch: ')
    config.headers.authorization = 'Bearer ' + localStorage.getItem('jwt_token')
    return config
}, (error) => {
    console.debug('axios error: ', error)
    return Promise.reject(error)
})
