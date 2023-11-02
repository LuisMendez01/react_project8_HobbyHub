import React from "react";
import { useEffect, useState } from 'react'
//import './CreatePost.css'
import { supabase } from '../client'
import { FaEllipsisV } from 'react-icons/fa'; // Importing Font Awesome Icon

const EditCrew = () => {

    const [posts, setPosts] = useState([]);
      
    useEffect(() => {
        fetchPosts();
    }, [])
    
    // READ all post from table
    const fetchPosts = async () => {
        const {data} = await supabase
        .from('crew')
        .select();
    
        // set state of posts
        setPosts(data)
    }

    function handleIconClick(post) {
        // Perform your action here
        console.log('post');
        console.log(post);
        window.location = "/edit/" + post.id;
    }

    return (
        <div className="grid">
            {posts.map((post, index) => (
                <div key={index} className="cell">
                <button className="icon-button" onClick={() => handleIconClick(post)}>
                    <FaEllipsisV />
                </button>
                    <h1>{post.name}</h1>
                    <h2>{post.color}</h2>
                    <p>Speed: {post.speed}</p>
                </div>
            ))}
        </div>
    );
}
  
  export default EditCrew;
