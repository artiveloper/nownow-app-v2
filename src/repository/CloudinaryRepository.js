import axios from "axios";
import Reactotron from "reactotron-react-native";

const api = axios.create({
    baseURL: `https://api.cloudinary.com/v1_1/dgmnmk1g2/image/upload?folder=nownow`
});

class CloudinaryRepository {

    upload = (uri, filename, progress) => {

        const formData = new FormData();

        formData.append('file', {uri: uri, type: 'image/png', name: filename});
        formData.append("upload_preset", "vybqjbcr");

        return api.post("", formData, {
            onUploadProgress: progress
        });

    };

    /*upload = (images, progress) => {

        for (let image of images) {
            const formData = new FormData();

            formData.append('file', {uri: image.uri, type: 'image/png', name: image.filename});
            formData.append("upload_preset", "vybqjbcr");

            api.post("", formData, {
                onUploadProgress: progress
            });
        }

        const uploaded = images.map(image => {
            const formData = new FormData();

            formData.append('file', {uri: image.uri, type: 'image/png', name: image.filename});
            formData.append("upload_preset", "vybqjbcr");

            api.post("", formData, {
                onUploadProgress: progress
            });
        });

        return axios.all(uploaded);
    };*/

}

export default new CloudinaryRepository();
