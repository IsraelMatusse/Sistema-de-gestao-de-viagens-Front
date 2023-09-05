import axios from "axios";

export const GET = (url: string, isAuth: boolean) => {
    return isAuth ? axios.get(url, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }) : axios.get(url);
}

export const POST = (url: string, data: any, isAuth: boolean) => {
    return isAuth ? axios.post(url, data, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }) : axios.post(url, data);
}

export const PUT = (url: string, data: any, isAuth: boolean) => {
    return isAuth ? axios.put(url, data, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }) : axios.put(url, data);
}

export const DELETE = (url: string, isAuth: boolean) => {
    return isAuth ? axios.delete(url, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }) : axios.delete(url);
}