import {API_URI} from 'react-native-dotenv';
import axios from "axios";

const api = axios.create({
    baseURL: `${API_URI}/v1/auth/`
});

class AuthRepository {

    login = (nickName, phoneNumber) => {
        return api.post("", {
            nickname: nickName,
            phoneNumber: phoneNumber
        })
    }

}

export default new AuthRepository();
