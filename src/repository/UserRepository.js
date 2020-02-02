import axios from 'axios';
import {API_URI} from 'react-native-dotenv';

const api = axios.create({
    baseURL: `${API_URI}/v1/users`
});

class UserRepository {

    findUserByToken = (token) => {
        return api.get('/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    };

    findUserById = (token, friendId) => {
        return api.get(`/friend/${friendId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    };
}

export default new UserRepository();
