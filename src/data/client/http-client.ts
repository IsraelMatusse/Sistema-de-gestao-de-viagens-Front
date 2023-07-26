import axios from "axios";

export const GET = (url: string, isAuth: boolean) => {
    isAuth ? axios.get(url, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    }) : axios.get(url)
}

export const POST = (url: string, data: any, isAuth: boolean) => {
    return isAuth ? axios.post(url, data, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")        }
    }) : axios.post(url, data);
}

