import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className='text-center m-5 p-5'>
    <h1>404 - Not Found!</h1>
    <img src="https://cdn.7tv.app/emote/60ae387cb2ecb0150505e235/4x" alt="gigachad" /><br/><br/>
    <Link to="/">Go Home</Link>
  </div>
);

export default NotFound;