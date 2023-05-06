import React from "react";
import { Link, useNavigate } from 'react-router-dom' //
import { useState } from "react";
import useAxios from "../useAxios";

export const Register = () => {
  const [email, inputEmail] = React.useState("")
  const [password, inputPassword] = React.useState("")
  const [username, inputUsername] = React.useState("")
  const [img, inputImage] = React.useState("")

  const [err, setError] = useState(null);

  const navigate = useNavigate();//

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await useAxios.post('auth/register', { email, password, username, img })
      navigate("/login");//
      console.log(res)
    } catch (err) {
      setError(err.response.data);
    }
  }

  return (
    <div className='backresgister'>
      <div className='auth'>
        <form>
          <h1>Register</h1>
          <input required type="username" placeholder='username' name='username' onChange={e => inputUsername(e.target.value)} />
          <input required type="text" placeholder='email' name='email' onChange={e => inputEmail(e.target.value)} />
          <input required type="password" placeholder='password' name='password' onChange={e => inputPassword(e.target.value)} />
          <input required type="text" placeholder='image' name='image' onChange={e => inputImage(e.target.value)} />
          <button onClick={handleSubmit}>Register</button>
          {err && <p>{err}</p>}
          <span>Do you have account? <Link to="/login">Login</Link>
          </span>
        </form>
      </div>
    </div>
  )
}

