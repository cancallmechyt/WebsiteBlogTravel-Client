import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
//import useAxios from '../useAxios'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';

export const Ready = () => {
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await login({ email, password })
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div className='backgroudlogin'>
      <div className='auth'>
        <form onSubmit={handleSubmit}>
          <h1>Login</h1>
          <input required type="text" placeholder='email' name='email' onChange={e => setEmail(e.target.value)} />
          <input required type="password" placeholder='password' name='password' onChange={e => setPassword(e.target.value)} />
          <button onClick={handleSubmit}>Login</button>
          {err && <p>{err}</p>}
          <span>Don't you have account? <Link to="/register">Register</Link>
          </span>
        </form>
      </div>
    </div>
  )
}
