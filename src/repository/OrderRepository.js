import axios from 'axios';
import { API_URI } from 'react-native-dotenv';

const api = axios.create({
    baseURL: `${API_URI}/v1/orders/`
});

class OrderRepository {

    save = (token, postId, rentalPeriod) => {
        return api.post("", {
                postId,
                rentalPeriod
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
    };

    findOne = (token, postId) => {
        return api.get(`${postId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            }
        )
    };

    findAllRequesting = (token, lastNum, rowCnt) => {
        return api.get(`requesting/${lastNum}/${rowCnt}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
    };

    findAllTrading = (token, lastNum, rowCnt) => {
        return api.get(`trading/${lastNum}/${rowCnt}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
    };

    findAllCompleted = (token, lastNum, rowCnt) => {
        return api.get(`completed/${lastNum}/${rowCnt}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                },
            })
    };

    // 거래 수락
    okRequesting = (token, orderId) => {
        return api.post(`restrade/${orderId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    };

    // 거래 취소
    cancelRequesting = (token, orderId) => {
        return api.post(`reqcancle/${orderId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    };

    // 거래 완료
    completeOrder = (token, orderId) => {
        return api.post(`tradechk/${orderId}`, {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    };

}

export default new OrderRepository();
