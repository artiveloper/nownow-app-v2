import {AsyncStorage} from 'react-native';
import {action, observable} from "mobx";
import PostRepository from "../repository/PostRepository";
import PostModel from "../model/PostModel";
import Reactotron from 'reactotron-react-native'

class PostStore {

    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    @observable
    inProgress = false;

    @observable
    error = null;

    @observable
    refreshing = false;

    @observable
    posts = [];

    @observable
    lastNum = 0; // like page

    @observable
    rowCnt = 10;

    @action
    getPosts = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            const {data} = await PostRepository.getPost(token, this.lastNum, this.rowCnt);
            this.posts = this.refreshing
                ? data.map(post => new PostModel(post))
                : this.posts.concat(data.map(post => new PostModel(post)));
            this.lastNum += 1;
        } catch (e) {
            this.error = true
        } finally {
            if (this.posts.length > 1) {
                this.lastNum = this.posts[this.posts.length - 1].postId;
            }
            this.refreshing = false;
        }
    };

    @action
    refreshPosts = async () => {
        this.refreshing = true;
        this.lastNum = 0;
        await this.getPosts();
    };

}

export default PostStore;
