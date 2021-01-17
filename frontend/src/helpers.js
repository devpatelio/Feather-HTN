export function parseJWT() {
    const accessToken = localStorage.getItem('access')
    if (accessToken) {
        return JSON.parse(atob(accessToken.split('.')[1]))
    }
    return null
}

export function getFirstName() {
    const jwt = parseJWT()
    return jwt && jwt.first_name
}

export function getLastName() {
    const jwt = parseJWT()
    return jwt && jwt.last_name
}

export function getFullName() {
    return getFirstName() + ' ' + getLastName()
}