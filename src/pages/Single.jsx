import React,{ useEffect, useState, useContext } from 'react'
import Edit from "../img/edit.png"
import Delete from "../img/delete.png"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Menu } from '../com/Menu'
import useAxios from '../useAxios'
import { useLocation } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import moment from 'moment';


export const Single = () => {
  const [post, setPost] = React.useState({})

  const {id} = useParams()

  const location = useLocation().search
  const navigate = useNavigate();

  const{currentUser} = useContext(AuthContext)

  useEffect(()=>{
    console.log(post)
  },[post])

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        const res = await useAxios.get(`/posts/${id}`);
        setPost(res.data[0]);
      }catch(err){
        console.log(err);
      }
    };
    fetchData();
  },[id])

  const handleDelete = async()=>{
    try{
      await useAxios.delete(`/posts/${id}`);
      navigate("/")
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className='single'>
      <div className="content">
        <img src={post.img} alt="" />
          <div className="user">
          {post.userImg && <img
            src={post.userImg}
            alt=""
          />}
            <div className="info">
              <span>{post.username}</span>
              <p>Posted {moment(post.date).fromNow()}</p>
            </div>
            {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=2`} state={post}>
                <img src={Edit} alt="" />
              </Link>
              <img onClick={handleDelete} src={Delete} alt="" />
            </div>
          )}
          </div>
          <h1>{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.des }} />          
      </div>
      <Menu cat={post.cat}/>
    </div>
  )
}
