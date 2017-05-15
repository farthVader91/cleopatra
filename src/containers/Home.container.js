// Home Container Component

import React, { Component } from 'react';
import { connect } from 'react-redux';
import store from '../store';
import { loaderToggle, togglePostLoader } from '../actions/app.actions';
import { readProfileViaGoogle } from '../apis/user.api';
import { createPost } from '../apis/post.api';

// bringing in the presentation component
import Home from '../components/Home.component';
import AuthService from '../utils/AuthService.util';

class HomeContainer extends Component {
	constructor(props, context) {
    	super(props, context);

    	// called when emitted
    	props.auth.on('profile_incoming', (profile) => {
    		readProfileViaGoogle(profile);
    	});

 	}

 	// lifecycle methods
 	componentWillMount() {
 		(function(props) {
 			var timeout = setTimeout(function() {
 			if(JSON.stringify(props.auth.getProfile()) != JSON.stringify({})) {
 				readProfileViaGoogle(props.auth.getProfile());
 				clearTimeout(timeout);
 			} else {
 				console.log('still waiting!');
 			}
 		}, 1000);

 		}(this.props));
 	}

 	// toggle post loader button
 	togglePostLoader() {
 		store.dispatch(togglePostLoader());
 	}

 	// initiating the save post process
 	createPost(data) {
 		createPost(data, this.props.user);
 	}

	render() {
		var { app, user, auth, post } = this.props;
		console.log(post);
		return (
			<Home
				email={user.email}
				name={user.name}
				nickname={user.nickname}
				picture={user.picture}
				password={user.password}
				followers={user.followers}
				following={user.following}
				id={user._id}
				meta={user.meta}
				loader={app.loader}
				logout={auth.logout}
				editorState={app.editorState}
				postLoader={app.postLoader}
				togglePostLoader={this.togglePostLoader}
				editorDisabled={app.editorDisabled}
				sendEditorData={this.createPost.bind(this)}
				posts={post.posts}/>
		);
	}
}

// to isolate which parts of the state this component need as it's props
const mapStateToProps = (store) => {
	return {
		app: store.appState,
		user: store.userState,
		post: store.postState
	}
};

export default connect(mapStateToProps)(HomeContainer);