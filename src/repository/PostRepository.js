import {API_URI} from 'react-native-dotenv';
import axios from "axios";

const api = axios.create({
    baseURL: `${API_URI}/v1/posts`
});

class PostRepository {

    getPosts = (token, page, limit) => {
        return api.get(`/${page}/${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    };

    getPost = (token, postId) => {
        return api.get(`/${postId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    };

    addPost = (token, title, postType, price, content, imagePaths) => {
        return api.post("", {
                title,
                postType,
                price,
                content,
                imagePaths
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    };

    getCreatedOrderRequest = (token, url) => {
        return axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    };

    delete = (token, postId) => {
        return api.post(`cancle/${postId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    };

    findAllMyPostList = (token, lastNum, rowCnt) => {
        return api.get(`/mypost/${lastNum}/${rowCnt}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    };

}

export default new PostRepository();
