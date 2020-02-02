import axios from 'axios';
import { API_URI } from 'react-native-dotenv';

const api = axios.create({
    baseURL: `${API_URI}/v1/points/`
});


class PointRepository {

    chargePoint = (token, point) => {
        return api.post(`charge/${point}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    };

    pointHistory = (token, lastNum, rowCnt) => {
        return api.get(`history/${lastNum}/${rowCnt}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )
    }

}

export default new PointRepository();
