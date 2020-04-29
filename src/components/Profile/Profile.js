import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import axios from '../axios/api';
import Avatar from '../Avatar/Avatar'
import styled from 'styled-components';

const Styles = styled.div `
  user: {
    color: 'inherit',
  },

  user_wrapAvatar: {
    marginRight: 15,
  },

  user_username: {
    fontSize: 20,
  },
  userInfo_item: {
    marginBottom: 6,
  },

  userInfo_text: {
    fontSize: 14,
  },

  userInfo_icon: {
    marginRight: 7,
  },
`
/*

avatar_url: "https://avatars3.githubusercontent.com/u/15800478?v=4"
bio: null
blog: ""
company: "@Novell"
created_at: "2015-11-11T13:13:57Z"
email: null
events_url: "https://api.github.com/users/bitumnus/events{/privacy}"
followers: 0
followers_url: "https://api.github.com/users/bitumnus/followers"
following: 0
following_url: "https://api.github.com/users/bitumnus/following{/other_user}"
gists_url: "https://api.github.com/users/bitumnus/gists{/gist_id}"
gravatar_id: ""
hireable: null
html_url: "https://github.com/bitumnus"
id: 15800478
location: "Kiev"
login: "bitumnus"
name: "Dariia"
node_id: "MDQ6VXNlcjE1ODAwNDc4"
organizations_url: "https://api.github.com/users/bitumnus/orgs"
public_gists: 0
public_repos: 7
received_events_url: "https://api.github.com/users/bitumnus/received_events"
repos_url: "https://api.github.com/users/bitumnus/repos"
site_admin: false
starred_url: "https://api.github.com/users/bitumnus/starred{/owner}{/repo}"
subscriptions_url: "https://api.github.com/users/bitumnus/subscriptions"
type: "User"
updated_at: "2020-04-27T10:52:55Z"
url: "https://api.github.com/users/bitumnus"

*/


function Profile(props) {

    const [user, setUser] = useState();
    const [avatar, setAvatar] = useState('');
    const [id, setId] = useState('');
    const [company, setCompany] = useState('');
    const [blog, setBlog] = useState('');
    const [location, setLocation] = useState('')

    useEffect(() => {
        (async () => {
          const res = await axios.get(`/users/${props.match.params.user}`);
          
          setUser(res.data.name);
          setAvatar(res.data.avatar_url);
          setCompany(res.data.company);
          setId(res.data.id);
          setLocation(res.data.location);
          setBlog(res.data.blog);
        })();
      });
    return (
      <Styles>
        <div>
          <p> id: {id} </p>
          <p className="user_username">Name: {user}</p>
          
        </div>
      </Styles>
    )
}

export default withRouter(Profile);