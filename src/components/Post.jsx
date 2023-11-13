import { useParams } from 'react-router-dom';
import { FaEllipsisV, FaPodcast } from 'react-icons/fa'; // Importing Font Awesome Icon
import { useEffect, useState } from 'react';
import LikesCount from "./LikesCount";
import Comments from "./Comments";
import { supabase } from '../client'
import { TailSpin} from 'react-loader-spinner';

const Post = () => {

    const {postId} = useParams();
    const [post, setPost] = useState({});
    const [modifiedString, setModifiedString] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const fetchPost = async () => {

        console.log('postId: ' + postId);
          const { data, error } = await supabase
              .from('Posts')
              .select('*')
              .eq('id', postId)
              .single();

              setIsLoading(false); // Set loading to false once data is fetched
  
          if (error) {
              console.error('Error fetching crew:', error);
          } else {
              setPost(data);
              setModifiedString(data.created_at.substring(0, 10));
          }
      };
  
        setTimeout(fetchPost, 1000);

    }, []);

    const handleIconClick = (post) => {
        // Perform your action here
        console.log('post');
        console.log(post);
        window.location = "/edit/" + post.id;
    }

    return (
        <div className="grid">
            {isLoading ? (
            <TailSpin
                type="Puff"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={2000} //3 secs
            />
        ) : (
            <>
            <div className="parent">
                <div className="cell1">
                    <button className="icon-button" onClick={() => handleIconClick(post)}>
                        <FaEllipsisV />
                    </button>
                    <h1 id="title2">{post.title}</h1>
                    <img id="imgPost" src={post.img_url} alt={`Downloaded from Supabase: ${post.title}`} />
                    <p>{post.description}</p>
                    <p id="createdAt">{modifiedString}</p>
                    <LikesCount key={`${post.id}-${post.betCount}`} id={post.id} betCount={post.betCount} />
                </div>
            </div>
            <Comments id={post.id} />
        </>
        )}
        </div>
    )
  };
  
  export default Post;