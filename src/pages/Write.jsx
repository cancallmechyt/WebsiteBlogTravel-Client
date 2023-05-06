import React, { useState, useContext } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import useAxios from '../useAxios';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { AuthContext } from '../context/authContext'; //

export const Write = () => {

  const state = useLocation().state

  const [value, setValue] = useState(state?.des || '');
  const [title, setTitle] = useState(state?.title || '');
  const [img, setPic] = useState(state?.img || '');
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || '');

  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file)
      const res = await useAxios.post("/upload", formData)
      return res.data
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick = async e => {
    e.preventDefault()
    const imgUrl = await upload()
    const user = JSON.parse(localStorage.getItem("user")) || null // get user data from localStorage
  
    try {
      state
        ? await useAxios.put(`/posts/${state.id}`, {
            title,
            des: value,
            cat,
            img,
            user: user ? user.name : null, // add user's name to the object
            uid: user ? user.id : null // add user's id to the object
          })
        : await useAxios.post(`/posts/`, {
            title,
            des: value,
            cat,
            img,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            user: user ? user.name : null, // add user's name to the object
            uid: user ? user.id : null // add user's id to the object
          });
      navigate("/")
    } catch (err) {
      console.log(err);
    }
  }

  console.log(value)
  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)} />
        <div className="editorContainer">
          <ReactQuill className="editor" theme="snow" value={value} onChange={setValue} />
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status</b> Draft
          </span>
          <span>
            <b>Visibility</b> Public
          </span>
          {/* <input style={{ display: "none" }} type="file" id="file" name="" onChange={e => setFile(e.target.files[0])} /> */}
          <input type="text" value={img} placeholder='URL of Picture' onChange={e => setPic(e.target.value)} />
          {/* <label className="file" htmlFor="file">Upload Image</label> */}
          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
            <input type="radio" checked={cat === "food"} name="cat" value="food" id="food" onChange={e => setCat(e.target.value)} />
            <label htmlFor="food">Food</label></div>
          <div className="cat">
            <input type="radio" checked={cat === "hotel"} name="cat" value="hotel" id="hotel" onChange={e => setCat(e.target.value)} />
            <label htmlFor="hotel">Hotel</label></div>
          <div className="cat">
            <input type="radio" checked={cat === "recommend"} name="cat" value="recommend" id="recommend" onChange={e => setCat(e.target.value)} />
            <label htmlFor="recommend">Recommend</label></div>
          <div className="cat">
            <input type="radio" checked={cat === "travel"} name="cat" value="travel" id="travel" onChange={e => setCat(e.target.value)} />
            <label htmlFor="travel">Travel</label></div>
          <div className="cat">
            <input type="radio" checked={cat === "fashion"} name="cat" value="fashion" id="fashion" onChange={e => setCat(e.target.value)} />
            <label htmlFor="fashion">Fashion</label></div>
          <div className="cat">
            <input type="radio" checked={cat === "about"} name="cat" value="about" id="about" onChange={e => setCat(e.target.value)} />
            <label htmlFor="about">About</label></div>
        </div>
      </div>
    </div>
  )
}
