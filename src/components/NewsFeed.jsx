import React from "react";
import { useEffect, useState } from 'react'
//import './CreatePost.css'
import { supabase } from '../client'
import { FaEllipsisV, FaPodcast } from 'react-icons/fa'; // Importing Font Awesome Icon
import LikesCount from "./LikesCount";

const EditCrew = () => {
      
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, [])
    
    // READ all post from table
    const fetchPosts = async () => {
        const {data} = await supabase
        .from('Posts')
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

    //SORTING
    const [sortOrder, setSortOrder] = useState('created_at'); // Default sort order

    const sortedPosts = [...posts].sort((a, b) => {
        if (sortOrder === 'created_at') {
            return new Date(b.created_at) - new Date(a.created_at); // Sort by created_at in descending order
        } else {
            return b.betCount - a.betCount; // Sort by likes in descending order
        }
    });

    const toggleSortOrder = () => {
        setSortOrder(sortOrder === 'created_at' ? 'betCount' : 'created_at');
    };

    //SEARCHING
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredPosts = sortedPosts.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="grid">
            <input id="searchBox" type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search by Title" />
            <button id="toggleButton" onClick={toggleSortOrder}>
                    Sort by: {sortOrder === 'created_at' ? 'Date' : 'Likes'}
                </button>
                {filteredPosts.map((post, index) => {
                const modifiedString = post.created_at.substring(0, 10);
                return (
                    <div key={index} className="cell">
                        <button className="icon-button" onClick={() => handleIconClick(post)}>
                            <FaEllipsisV />
                        </button>
                        <h1 id="title">{post.title}</h1>
                        <img id="imgPost" src={post.img_url} alt={`Downloaded from Supabase: ${post.title}`} />
                        <p>{post.description}</p>
                        <p id="createdAt">{modifiedString}</p>
                        <LikesCount key={`${post.id}-${post.betCount}`} id={post.id} betCount={post.betCount} />
                    </div>
                );
            })}
        </div>
    );
}
  
  export default EditCrew;
