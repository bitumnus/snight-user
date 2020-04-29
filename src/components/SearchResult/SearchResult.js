import React, { useMemo, useState, useEffect } from "react";
import axios from "../axios/api";
import qs from 'querystring';
import {NavLink} from 'react-router-dom';

import Table from "../UI/Table/Table";
import Loader from "../UI/Loader/Loader";

const Avatars = ({ value }) => {
  return (
    <>
      <img src={value} alt={value} className="badge" />
    </>
  );
};

const Login = ({ value }) => {
    return (
      <>
        <NavLink to={`/user/${value}`}>
            {value}
        </NavLink>
      </>
    );
  };

function SearchResult(props) {
    
  const columns = useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id",
      },
      {
        Header: "Login name",
        accessor: "login",
        Cell: ({ cell: { value } }) => <Login value={value} />
      },
      {
        Header: "Avatar",
        accessor: "avatar_url",
        Cell: ({ cell: { value } }) => <Avatars value={value} />
      },
      {
        Header: "Repos",
        accessor: "reposName",
      },
    ],
    []
  );

  const parsedSearch = qs.parse(props.location.search);
    const searchType = parsedSearch['?type'];
    const searcValue = parsedSearch.value;
    
  const [data, setData] = useState([]);
  const [type, setType] = useState(searchType);
  const [value, setValue] = useState(searcValue);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      const response = await axios(`https://api.github.com/search/${type}?q=${value.toLowerCase()}`);
      const data = type.includes('users')
        ? response.data.items
        : response.data.items.map(el => {
            return {
                reposName: el.name,
                login: el.owner.login,
                id: el.owner.id,
                avatar_url: el.owner.avatar_url,
            }
        });
    //   console.log(data);
      setData(data);
      setLoading(false);
    })();
  });

  return (
    <div className="App">
        {loading
            ? <Loader />
            : <Table columns={columns} data={data} hiddenColumns={type.includes('user') ? 'reposName' : ''} />
        }
    </div>
  );
}

export default SearchResult;