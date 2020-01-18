import {API_URI} from 'react-native-dotenv';
import axios from "axios";

const api = axios.create({
    baseURL: `${API_URI}/v1/follows`
});

class FollowRepository {

    getFollows = (token, lastNum, rowCnt) => {
        return api.get(`${lastNum}/${rowCnt}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    };

    saveFollows = (token, followings) => {
        return api.post("/", {
                followings: followings
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        )
    }

}

export default new FollowRepository();
