const getHeaders = () => {

    const token = localStorage.getItem("access_token");

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

export const HeadersUtil = {
    getHeaders: getHeaders
}