import Router from 'next/router'

export const islogged = (newRoute = '') => {
    if (localStorage.getItem('token')) {
        if (newRoute != '') {
            Router.push(newRoute)
        }
        return expirationDate()
    } else {
        Router.push('/login')
        return false
    }
}
export const logOut = (newRoute = '') => {
    if (localStorage.getItem('token')) {
        localStorage.removeItem('token');
        if (newRoute && newRoute != '') {
            Router.push(newRoute)
        } else {
            Router.push('/login')
        }
        return true
    } else {
        Router.push('/login')
        return false
    }
}
export const userLogged = () => {
    if (expirationDate()) {
        return localStorage.getItem('token')
    } else {
        Router.push('/login')
        return false
    }
}

const expirationDate = () => {
    let userDetails = getUserDetails();
    let ahora = Date.now() / 1000;
    if (userDetails && (userDetails.exp > ahora)) {
        return true
    } else {
        Router.push('/login')
        return false
    }
}

const getUserDetails = () => {
    let token = localStorage.getItem('token')
    if (token) {
        let centro = token.split('.')[1]
        let user = JSON.parse(window.atob(centro))
        return user;
    }
    return null
}
