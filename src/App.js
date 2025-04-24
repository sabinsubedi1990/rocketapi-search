import { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const value = e.target.value;
    if(/^[a-zA-Z0-9]*$/.test(value) && value.length <= 30) {
      setSearchTerm(value);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
  };

  const handleSearch = async () => {
    if(!searchTerm) return;
    try {
      const response = await axios.post(
        "https://rocketapi-for-developers.p.rapidapi.com/instagram/user/search",
        { query: searchTerm },
        {
          headers: {
            "X-Rapidapi-Key": "ba3b2a31d6msh094e26bf4ff14e3p11530fjsnefda12dbfccc",
            "X-Rapidapi-Host": "rocketapi-for-developers.p.rapidapi.com",
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Response Users: ", response.data.response.body.users);
      setUsers(response.data.response.body.users || []);
    } catch (error) {
      console.error("Error fetching users: ", error);
      setError("Failed to fetch results");
    }
  }

  return (
    <div className='container'>
      <h1 className='title'>React User Search</h1>
      <input type='text' value={searchTerm} onChange={handleChange} onPaste={handlePaste} placeholder='Enter username' className='input'/>
      <button onClick={handleSearch} className='button'>Search</button>
      <div className='card-container'>
        {users.map((user) => (
          <UserCard key={user.username} user={user}/>
        ))}
      </div>
      {error && <div className="error">{error}</div>}
    </div>    
  );
}


function UserCard({user}) {
  return (
    <div className='card'>
      <img src={user.profile_pic_url} alt={user.username} className='user-profile-pic' referrerPolicy="no-referrer"/>
      <h3>{user.full_name}</h3>
      <p>@{user.username}</p>
    </div>
  )
}
export default App

