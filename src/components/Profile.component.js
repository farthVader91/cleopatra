// Profile presentation component

import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Icon, BackTop, Card, Button, Tabs, Badge } from 'antd';
import Navbar from './Navbar.component';
import Loader from './Loader.component';
import SettingsForm from './ProfileSettings.component';
import PostCard from './PostCard.component';
import _ from 'lodash';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
const TabPane = Tabs.TabPane;

class Profile extends Component {
	render() {
		console.log(this.props.foreignUser);
		return (
			<div className="profile-wrapper">
				<Loader active={this.props.loader} />
				<div className="profile-main"
					style={ (!this.props.loader) ? {display: "inline"}  : {display: "none"}}>
					<Layout className="profile-layout">
						<Navbar
							currentUser={this.props.loggedInEmail}
							searchDataSource={this.props.searchDataSource}
							searchUser={this.props.searchUser}
							picture={this.props.loggedInPicture}
							logout={this.props.logout}
						/>
						<Content style={{ padding: '0 50px', marginTop: 64 }}>
							<Layout style={{ padding: '24px 0' }}>
								<div className="row">
									<div className="col-md-offset-2 col-md-8 col-lg-offset-2 col-lg-8">
										<div className="row">
	      									<div className="col-md-3 col-lg-3 col-sm-3 col-xs-12">
		      									<div className="fixed-sider">
					        						<Sider width={'100%'} style={{ background: '#fff', border: '1px solid lightgrey', paddingBottom: '16px' }}>
					        							<div className="row profile-pic">
					        								<div className="col-md-12 col-lg-12">
					        									<img className="img-circle-xlg" src={this.props.foreignUser !== undefined ? this.props.foreignUser.picture : ''} />
					        								</div>
					        							</div>
					        							<div className="row">
					        								<div className="col-md-12 col-lg-12">
					        									<p className="profile-name">{this.props.foreignUser !== undefined ? this.props.foreignUser.name : ''}</p>
					        									<p className="profile-nickname">{this.props.foreignUser !== undefined ? this.props.foreignUser.nickname : ''}</p>
					        								</div>
					        							</div>
					        							<div className="row meta">
					        								<div className="col-md-6 col-lg-6">
					        									<p className="profile-meta">
					        										{this.props.foreignUser !== undefined ? this.props.foreignUser.meta.posts : 0}
					        									</p>
					        									<p className="profile-meta-tag">Posts</p>
					        								</div>
						        							<div className="col-md-6 col-lg-6">
					        									<p className="profile-meta">
					        										{this.props.foreignUser !== undefined ? this.props.foreignUser.meta.followers : 0}
					        									</p>
						        								<p className="profile-meta-tag">Followers</p>
						        							</div>
					        							</div>
					        							{
					        								this.props.foreignEmail !== this.props.loggedInEmail
					        								?
					        									this.props.foreignUser !== undefined
					        									?
						        									_.includes(this.props.foreignUser.followers, this.props.loggedInEmail)
						        									?
						        										<div className="row">
								        									<div className="col-md-12 col-lg-12 profile-follow">
								        										<Button
								        											type="primary"
								        											onClick={() => {this.props.unfollow(this.props.loggedInEmail, this.props.foreignEmail)}}
								        										>
								        											Unfollow
								        										</Button>
								        									</div>
							        									</div>
							        								:
							        									<div className="row">
								        									<div className="col-md-12 col-lg-12 profile-follow">
								        										<Button
								        											onClick={() => { this.props.follow(this.props.loggedInEmail, this.props.foreignEmail)}}
								        										>
								        											Follow
								        										</Button>
								        									</div>
							        									</div>
							        							:
							        								''
					        								:
					        									''
					        							}
					        						</Sider>
					        					</div>
					        				</div>
					        				<div className="col-md-6 col-lg-6">
					        					<div className="row">
					        						<div className="col-md-12">
						        						<Tabs defaultActiveKey="1">
	    													<TabPane tab={<span>Posts <Badge count={this.props.foreignUserPosts.length} style={{ marginLeft: '6px', backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} /></span>} key="1">
	    													{
	    														this.props.foreignUserPosts.length > 0
				        										?
																	this.props.foreignUserPosts.map((post, index) => {
																		return (
																			<PostCard
																				key={index}
																				picture={post.meta.picture}
																				email={post.meta.email}
																				nickname={post.meta.nickname}
																				date={post.meta.date}
																				body={post.body}
																			/>
																		)
																	})
																:
																	<Card
																		style={{ width: '100%', marginBottom: '1.5em' }}
																	>
		    															<p className="post-body">User hasn't made any posts yet! Come back later.</p>
		  															</Card>
															}
	    													</TabPane>
	    													<TabPane tab={<span>Followers <Badge count={this.props.foreignUser !== undefined ? this.props.foreignUser.followers.length : 0} style={{ marginLeft: '6px', backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} /></span>} key="2">
	    													{
	    														this.props.foreignUser !== undefined
	    														?
		    														this.props.foreignUser.followers.length > 0
					        										?
																		this.props.foreignUser.followers.map((post, index) => {
																			return (
																				<div>Followers</div>
																			)
																		})
																	:
																		<Card
																			style={{ width: '100%', marginBottom: '1.5em' }}
																		>
			    															<p className="post-body">User don't have any followers yet! Come back later.</p>
			  															</Card>
			  													:
			  														''
															}
	    													</TabPane>
	    													<TabPane tab={<span>Following <Badge count={this.props.foreignUser !== undefined ? this.props.foreignUser.following.length : 0} style={{ marginLeft: '3px', backgroundColor: '#fff', color: '#999', boxShadow: '0 0 0 1px #d9d9d9 inset' }} /></span>} key="3">
	    													{
	    														this.props.foreignUser !== undefined
	    														?
		    														this.props.foreignUser.following.length > 0
					        										?
																		this.props.foreignUser.following.map((post, index) => {
																			return (
																				<div>Followers</div>
																			)
																		})
																	:
																		<Card
																			style={{ width: '100%', marginBottom: '1.5em' }}
																		>
			    															<p className="post-body">User don't have any followings yet! Come back later.</p>
			  															</Card>
			  													:
			  														''
															}
	    													</TabPane>
	    													{
						        								this.props.foreignEmail === this.props.loggedInEmail
						        								?
						        									<TabPane tab="Settings" key="4">
						        										<SettingsForm
						        											email={this.props.loggedInEmail}
						        											nickname={this.props.loggedInNickname}
						        											setPassword={this.props.setPassword}
						        										/>
	    															</TabPane>
						        								:
						        									''
					        								}
	  													</Tabs>
	  												</div>
					        					</div>
					        				</div>
			        					</div>
			        				</div>
		      					</div>
							</Layout>
						</Content>
					</Layout>
				</div>
			</div>
		);
	}
}

export default Profile;