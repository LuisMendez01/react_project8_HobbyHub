import React from "react";
import { supabase } from '../client'
import { useEffect, useState } from 'react';

const Comments = ({id}) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        //fetchPosts();
        setTimeout(fetchComments, 1000);
    }, [])
    
    // READ all post from table
    const fetchComments = async () => {

        console.log('idx: ' + id);

        const {data} = await supabase
        .from('Comments')
        .select('*')
        .eq('post_id', id);
    
        // set state of posts
        setPosts(data);
    }

    const [comment, setComment] = useState('');
    const [lastComment, setLastComment] = useState('');

    const handleAddComment = async () => {

        if (comment == '') {
            //alert("Type something before submitting.");
            return;
        }

        const { data, error } = await supabase
            .from('Comments') // Replace 'comments' with your table name
            .insert([{ comment: comment, post_id: id }], { returning: 'representation' }); // Replace 'text' and 'postId' with your column names
    
        if (error) {
            console.error('Error adding comment:', error);
        } else {
            console.log('data: ')
            console.log(data);
            setPosts([...posts, data]);
            setLastComment(comment);
            setComment('')
            fetchComments();
        }
    };

    return (
        <div id="commentsDiv">
        {posts && posts.map((post, index) => (
                    <div key={index} id="comments">
                        <span>- {post ? post.comment : lastComment}</span>
                        {/* Add more cells as needed */}
                    </div>
                ))}
                <div className="commentForm">
                    <input
                        type="text"
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Add a comment"
                        id="postComment"
                    />
                    <button id="postCommentBtn" onClick={handleAddComment}>
                        <i className="fas fa-paper-plane"></i>
                    </button>
                </div>
        </div>
    );
  };
  
  export default Comments;