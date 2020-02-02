import {AsyncStorage} from 'react-native';
import {action, observable} from "mobx";
import postRepository from "../repository/PostRepository";
import PostModel from "../model/PostModel";
import Reactotron from 'reactotron-react-native';

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


    @observable
    postDetailLoading = false;

    @observable // post detail screen
    post = [];

    @action
    getPosts = async () => {
        try {
            let token = await AsyncStorage.getItem("token");
            const {data} = await postRepository.getPosts(token, this.lastNum, this.rowCnt);
            this.posts = this.refreshing
                ? data.map(post => new PostModel(post))
                : this.posts.concat(data.map(post => new PostModel(post)));
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
    refresh = async () => {
        this.refreshing = true;
        this.lastNum = 0;
        await this.getPosts();
    };

    @action
    tempAddPost = (post) => {
        let createdPost = new PostModel(post);
        this.posts.unshift(createdPost);
        // todo 내가 등록한 게시글에도 추가해야함
    };

    @action
    getPost = async (postId) => {
        try {
          this.postDetailLoading = true;
            let token = await AsyncStorage.getItem("token");
            const {data} = await postRepository.getPost(token, postId);
            this.post = new PostModel(data);
        } catch (e) {

        } finally {
            this.postDetailLoading = false;
        }
    };

    @action
    deleteCurrentPost = async () => {
        try {
            this.inProgress = true;
            let token = await AsyncStorage.getItem("token");
            await postRepository.delete(token, this.post.postId);
        } catch (e) {
        } finally {
            this.lastNum = 0;
            await this.refreshPosts();
            this.inProgress = false;
        }
    }

}

export default PostStore;
