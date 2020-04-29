import React, {useState} from 'react';
import {NavLink} from 'react-router-dom';
import './index.css'

const SearchContainer = () => {

    const [searchType, setSearchType] = useState('users');
    const [searchValue, setSearchValue] = useState('');
    
    return (
        <div className="container">
            <form className="card">
                <select name="select" onChange={event => setSearchType(event.target.value)}>
                    <option defaultValue value="users">User Name</option> 
                    <option value="repositories">Repos Name</option>
                </select>
                <input
                    type="text"
                    onChange={event => setSearchValue(event.target.value)}
                />
                <NavLink to={{
                    pathname: '/search',
                    search: `type=${searchType}&value=${searchValue}`,
                }}>
                    <button className="primary" disabled={!searchValue} >Get Info</button>
                </NavLink>
                
            </form>
        </div>
    )
}

export default SearchContainer;
