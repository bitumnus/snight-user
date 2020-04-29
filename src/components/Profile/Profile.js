import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import axios from '../axios/api';
import './index.css';
import Loader from '../UI/Loader/Loader';

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

    const [login, setLogin] = useState('')
    const [user, setUser] = useState();
    const [avatar, setAvatar] = useState('');
    const [id, setId] = useState('');
    const [company, setCompany] = useState('');
    const [url, setUrl] = useState('');
    const [followers, setFollowers] = useState('');
    const [loading, setLoading] = useState(true);
    const [publicRepos, setPublicRepos] = useState('');
    const [showFollowers, setShowFollowers] = useState(false);
    const [followersList, setFollowersList] = useState([{id: 0, name: 'No followers'}])

    useEffect(() => {
        (async () => {
          await axios.get(`/users/${props.match.params.user}`)
            .then(res => {
              setLogin(res.data.login);
              setUser(res.data.name);
              setAvatar(res.data.avatar_url);
              setCompany(res.data.company ? res.data.company : '-');
              setId(res.data.id);
              setFollowers(res.data.followers);
              setUrl(res.data.html_url);
              setPublicRepos(res.data.public_repos);
              
              if(followers) {
                try {
                  axios.get(`/users/${props.match.params.user}/followers`)
                    .then(f => {
                      let followerList = [];
                      Object.entries(f.data).forEach((val) => {
                        
                        followerList.push({
                          id: val[1].id,
                          name: val[1].login,
                        })
                      })
                      
                      setFollowersList(followerList);
                    })
 
                } catch (error) {
                  console.log(error);
                  
                }
              }
              setLoading(false);
              
            })
        })();
      });

    function renderFollowersList() {
      return followersList.map(d => {
        return (
          <li key={d.id}>{d.name}</li>
        )
      })
    }

    return (
      <div>
        { loading
          ? <Loader />
          : <div className="profile">
            <img src={avatar} alt={`${user}-avatar`} className="wrap-avatar" />
            <div className="info">
              <ul>
                <li>ID:</li>
                <li>Name:</li>
                <li>Company:</li>
                <li>Public Repos:</li>
                <li>Link to GitHub:</li>
                <li>Followers Count:</li>
              </ul>
              <ul>
                <li>{id}</li>
                <li>{user}</li>
                <li>{company}</li>
                <li>{publicRepos}</li>
                <li><a href={url} rel="noopener noreferrer" target="_blank">{login}</a></li>
                <li className="tooltip" onClick={() => setShowFollowers(true)}>{followers}
                  {/* <span class="tooltiptext">{followersList}</span> */}
                </li>
              </ul>
            </div>
            <br />
            {showFollowers && <ul style={{'padding-inline-start': '3rem'}}>{renderFollowersList()}</ul>}
          </div>
        }
      </div>
    )
}

export default withRouter(Profile);