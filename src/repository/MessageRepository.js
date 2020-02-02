import axios from 'axios';

const api = axios.create({
    baseURL: "http://www.skysms.co.kr/apiSend/sendApi_UTF8.php"
});

const authKey = "IAr4J9SdabaiNkIol0wwxQMR3YY8QBfb";
const callNum = "01097788477";
const sMode = "Real";
const sUserid = "kimsw0229";

class MessageRepository {

    sendMessage = (destNum, message) => {
        let form = new FormData();
        form.append("authKey", authKey);
        form.append("callNum", callNum);
        form.append("sUserid", sUserid)
        form.append("sMode", sMode);
        form.append("destNum", destNum);
        form.append("sendMsg", message);

        return api.post("", form);
    }

}

export default new MessageRepository();
