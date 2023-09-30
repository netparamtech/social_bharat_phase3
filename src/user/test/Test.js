import React, { useState, useEffect } from "react";

function Test() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  const getPosts = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
    );
    const data = await response.json();
    setPosts((prevPosts) => [...prevPosts, ...data]);
  };

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        // Reached the last point of the page, increase the page number
        setPage((prevPage) => prevPage + 1);
        console.log(scrollTop,scrollHeight,clientHeight)
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    getPosts();
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <div className="App">
      {posts.map((post, index) => (
        <div key={index} className="post">
          <div className="number">{post.id}</div>
          <div className="post-info">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-body">{post.body}</p>
          </div>
        </div>
      ))}
      <div className="loader">
        <div className="circle"></div>
        <div className="circle"></div>
        <div className="circle"></div>
      </div>
    </div>
  );
}

export default Test;
