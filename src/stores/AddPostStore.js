import {AsyncStorage} from 'react-native';
import {action, observable} from "mobx";
import PostRepository from '../repository/PostRepository';
import CloudinaryRepository from "../repository/CloudinaryRepository";
import Reactotron from "reactotron-react-native";

class AddPostStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable
    inProgress = false;

    @observable
    errors = undefined;

    @observable
    imageBrowserOpen = false;

    @observable
    images = [];

    @observable
    extraImageSize = 5;

    @observable
    uploadedImageUrls = [];

    @observable
    title = '';

    @observable
    postType = 'sale';

    @observable
    price = '';

    @observable
    content = '';

    @observable
    imageUploadProgress = 0;

    @action
    setImages = (images) => {
        this.imageBrowserOpen = false;
        images.map(image => {
            if (this.images.length <= 5)
                this.images.push(image);
        });
    };

    @action
    setTitle = (title) => {
        this.title = title;
    };

    @action
    setPostType = (postType) => {
        this.postType = postType;
    };

    @action
    setPrice = (price) => {
        this.price = price.toString().replace(/[^\d]+/g, '');
    };

    @action
    setContent = (content) => {
        this.content = content;
    };

    @action
    setImageBrowserOpenStatus = (status) => {
        this.imageBrowserOpen = status;
    };

    @action
    removeFromImages = (idx) => {
        this.images.splice(idx, 1);
    };

    isValid = () => {
        let msg = '';
        if (this.images.length === 0) {
            msg = '사진을 등록해주세요.';
        } else if (this.title === '') {
            msg = '제목을 입력해주세요.';
        } else if (this.price === '') {
            msg = '금액을 입력해주세요.';
        } else if (this.content === '') {
            msg = '내용을 입력해주세요.';
        }
        if (msg !== '') {
            alert(msg);
            return false;
        }
        return true;
    };

    @action
    submit = async () => {
        try {
            this.inProgress = true;

            for (const image of this.images) {
                let {data} = await CloudinaryRepository.upload(image.uri, image.filename, this.progress);
                this.uploadedImageUrls.push(data.secure_url);
                this.imageUploadProgress = 0;
            }

            let token = await AsyncStorage.getItem("token");
            let {headers} = await PostRepository.addPost(token, this.title, this.postType, this.price, this.content, this.uploadedImageUrls);

            let {data} = await PostRepository.getCreatedOrderRequest(token, headers.location);
            this.rootStore.postStore.tempAddPost(data);
            Reactotron.log(data)
        } catch (e) {
            this.errors = e;
            Reactotron.log(e)
        } finally {
            this.inProgress = false;
        }

    };

    @action
    clear = () => {
        this.images = [];
        this.title = '';
        this.postType = 'sale';
        this.price = '';
        this.content = '';
    };

    progress = (progressEvent) => {
        this.imageUploadProgress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
    };

}

export default AddPostStore;
