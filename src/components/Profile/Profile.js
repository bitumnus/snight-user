import React, { useState, useEffect } from 'react';
import {withRouter} from 'react-router-dom';
import { Card, Col, Row } from 'antd';
import axios from '../axios/api';
import './index.css';
import 'antd/dist/antd.css';
import Loader from '../UI/Loader/Loader';

function Profile(props) {
  const { Meta } = Card;

  const [login, setLogin] = useState(props.match.params.user)
  const [user, setUser] = useState('');
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
      const res = await axios.get(`/users/${login}`);
      setLogin(res.data.login);
      setUser(res.data.name);
      setAvatar(res.data.avatar_url);
      setCompany(res.data.company ? res.data.company : '-');
      setId(res.data.id);
      setFollowers(res.data.followers);
      setUrl(res.data.html_url);
      setPublicRepos(res.data.public_repos);
      
      if(followers) {
        let followerList = [];
        
        axios.get(`/users/${login}/followers`)
        .then((result) => {
          Object.entries(result.data).forEach((val) => {
            
            followerList.push({
              id: val[1].id,
              name: val[1].login,
            })
          })
          setFollowersList(followerList);
        }).catch((err) => {
          console.log(err);
        });
      }
      setLoading(false);
    })();
  }, [followers, login]);

  return (
    <div className="profile">
      { loading
        ? <Loader />
        : <Row gutter={ 16 }>
          <Col span={ 4 } >
            <button className="primary" onClick={() => props.history.goBack()}>Go Back</button>
          </Col>
          <Col>
            <Card
              style={ { width: 240, textAlign: 'center' } }
              cover={ <img src={avatar} alt={`${user}-avatar`} /> }
            >
                <Meta
                  title={ `${user || ''}` }
                />
            </Card>
          </Col>
          <Col>
            <Card>
              <div className="info">
                <ul>
                  <li>ID:</li>
                  <li>Company:</li>
                  <li>Public Repos:</li>
                  <li>Link to GitHub:</li>
                  <li>Followers Count:</li>
                </ul>
                <ul>
                  <li>{id}</li>
                  <li>{company}</li>
                  <li>{publicRepos}</li>
                  <li><a href={url} rel="noopener noreferrer" target="_blank">{login}</a></li>
                  <li className="tooltip" onClick={() => setShowFollowers(!showFollowers)}>{followers}</li>
                </ul>
              </div>
            </Card>
          </Col>
          {showFollowers &&
            <Col>
                <ul className="followers">
                    {followersList.map(d => (
                      <li key={d.id}>{d.name}</li>
                    ))}
                </ul>
            </Col>
          }
        </Row>
      }
    </div>
  )
}

export default withRouter(Profile);