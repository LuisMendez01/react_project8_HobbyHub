import React from "react";
import { supabase } from '../client'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditPost = () => {

    const {postId} = useParams();
    const [post, setPost] = useState({});

    useEffect(() => {
      const fetchPost = async () => {

        console.log('postId: ' + postId);
          const { data, error } = await supabase
              .from('Posts')
              .select('*')
              .eq('id', postId)
              .single();
  
          if (error) {
              console.error('Error fetching crew:', error);
          } else {
              setPost(data);
              setTitle(data.title);
              setDescription(data.description);
          }
      };
  
      fetchPost();
  }, []);

    // UPDATE post
    const updatePost = async (event) => {
        event.preventDefault();

        console.log('post.id: ');
        console.log(post.id);

        if (!title || !description) {
            alert("Please fill in all fields.");
            return;
          }
    
        await supabase
        .from('Posts')
        .update({'title': title, 'description': description})
        .eq('id', post.id);
    
        window.location = "/newsfeed";
    }

    const deletePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .delete()
          .eq('id', post.id); 
      
        window.location = "/newsfeed";
      }

    const [title, setTitle] = useState(post.title || '');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    }

    const [description, setDescription] = useState(post.description || '');

    const handleDescriptionChange = (event) => {
      setDescription(event.target.value);
    }

    return (
        <div id="editView">
            <form onSubmit={updatePost} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" value={title} onChange={handleTitleChange}/><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea id="description" name="description" value={description} onChange={handleDescriptionChange} rows="12" style={{ width: '160%' }}></textarea>
                <br/>

                <input id="editPostBtn" type="submit" value="Submit" />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    );
  };
  
  export default EditPost;
