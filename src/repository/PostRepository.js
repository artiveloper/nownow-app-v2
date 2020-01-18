import {API_URI} from 'react-native-dotenv';
import axios from "axios";

const api = axios.create({
    baseURL: `${API_URI}/v1/posts/`
});

class PostRepository {

    getPost = (token, page, limit) => {
        return api.get(`${page}/${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
    }

}

export default new PostRepository();
