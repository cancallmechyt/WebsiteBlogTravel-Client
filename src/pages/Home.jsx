import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import useAxios from '../useAxios'
import { useLocation } from 'react-router-dom';

export const Home = () => {
  const [posts, setPosts] = React.useState([])

  const cat = useLocation().search

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await useAxios.get(`/posts${cat}`);
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [cat])

  return (
    <div className="home">
      <div className="posts">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <div className="img">
              <img src={post.img} alt="" />
              {/* <div className="bg"></div> */}
            </div>
            <div className="content">
              <Link className="link" to={`/post/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <div dangerouslySetInnerHTML={{ __html: post.des }} />
              <button>Read More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
