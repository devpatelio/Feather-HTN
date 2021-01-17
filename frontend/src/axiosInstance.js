import axios from 'axios'

const baseURL = 'http://localhost:8000/'

const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        'Authorization': localStorage.getItem('access') && 'Bearer ' + localStorage.getItem('access'),
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json',
    },
})

    
axiosInstance.interceptors.response.use(
    response => response,
    err => {
        const originalRequest = err.config

        // Check if connection to API failed
        if (!err.response) {
            return Promise.reject(err)
        }

        // Check if error occurred during token refresh
        else if (err.response.status === 401 && originalRequest.url === baseURL + 'auth/refresh/') {
            window.location.href = '/login/'
            return Promise.reject(err)
        }

        // Check if error was caused by an expired access token
        else if (err.response.data.code === 'token_not_valid' && err.response.status === 401) {
            const refreshToken = localStorage.getItem('refresh_token')

            if (refreshToken) {
                const tokenParts = JSON.parse(atob(refreshToken.split('.')[1]))

                if (tokenParts.exp > Math.ceil(Date.now() / 1000)) {
                    return axiosInstance
                        .post('/auth/refresh/', { refresh: refreshToken })
                        .then((res) => {
                            localStorage.setItem('access', res.data.access)

                            axiosInstance.defaults.headers['Authorization'] = 'Bearer ' + res.data.access
                            originalRequest.headers.common['Authorization'] = 'Bearer ' + res.data.access

                            return axiosInstance(originalRequest)
                        })
                        .catch(err => console.log(err.data))
                }
            }
            window.location.href = '/login/'
        }
        return Promise.reject(err)
    },
)

export default axiosInstance