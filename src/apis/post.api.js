// HTTP Accessible Functions

import axios from 'axios';
import { setNewPost, setOwnPosts } from '../actions/post.actions';
import store from '../store';


// creates a new post
export function createPost(postData, profile) {

	// handling requests for creating new profile
	axios.post('http://localhost:5100/api/post/new', {profile: profile, data: postData})
		.then(res => {
			console.log(res.data);
			getSinglePost(res.data._id);
		})
		.catch(err => {
			console.log(err);
		});

}

// fetches user's own posts
export function getOwnPosts(email) {

	// handling requests for fetching user's own posts
	axios.get(`http://localhost:5100/api/find/post/all`)
		.then(res => {
			store.dispatch(setOwnPosts(res.data));
		})
		.catch(err => {
			console.log(err);
		});
}

// fetches a single post
export function getSinglePost(postId) {

	// handling requests for fetching a single post
	axios.get(`http://localhost:5100/api/post/single/${postId}`)
		.then(res => {
			if(res.data == null) {
				return;
			} else {
				store.dispatch(setNewPost(res.data));
			}
		})
		.catch(err => {
			console.log(err);
		});
}

// fetches user's timeline posts
export function getTimelinePosts(email) {

	// handling requests for fetching user's timeline posts
	axios.get(`http://localhost:5100/api/post/timeline/${email}`)
		.then(res => {
			store.dispatch(setTimelinePosts(res.data));
		})
		.catch(err => {
			console.log(err);
		});
}