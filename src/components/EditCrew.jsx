import React from "react";
// import './CreatePost.css'
import { supabase } from '../client'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'

const EditCrew = () => {

    const {crewId} = useParams();
    const [crew, setCrew] = useState({});

    const [name, setName] = useState(crew.name);
    const [color, setColor] = useState(crew.color);
    const [speed, setSpeed] = useState(crew.speed);

    useEffect(() => {
      const fetchCrew = async () => {

        console.log('crewId: ' + crewId);
          const { data, error } = await supabase
              .from('crew')
              .select('*')
              .eq('id', crewId)
              .single();
  
          if (error) {
              console.error('Error fetching crew:', error);
          } else {
              setCrew(data);

            setName(data.name);
            setColor(data.color);
            setSpeed(data.speed);
          }
      };
  
      fetchCrew();
  }, [crewId]);

    // UPDATE post
    const updatePost = async (event) => {
        event.preventDefault();

        console.log('crew.id:');
        console.log(crew.id);

        setName(event.target.name.value);
        setColor(event.target.color.value);
        setSpeed(event.target.speed.value);

        if (!name || !color || !speed) {
            alert("Please fill in all fields.");
            return;
          }
    
        await supabase
        .from('crew')
        .update({name, color, speed})
        .eq('id', crew.id);
    
        window.location = "/display";
    }

    const deletePost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('crew')
          .delete()
          .eq('id', crew.id); 
      
        window.location = "/display";
      }

      const handleNameChange = (event) => {
        setName(event.target.value);
      };

    const handleColorChange = (event) => {
      setColor(event.target.value);
    };

    const handleSpeedChange = (event) => {
      setSpeed(event.target.value);
    };

    return (
        <div>
            <form onSubmit={updatePost}>
                <label for="name"></label> <br />
                <input type="text" id="name" name="name" value={name} onChange={handleNameChange}/><br />
                <br/>

                <label for="color"></label><br />
                <input type="text" id="color" name="color" value={color} onChange={handleColorChange}/><br />
                <br/>

                <label for="speed"></label><br />
                <input type="text" id="speed" name="speed" value={speed} onChange={handleSpeedChange}/><br />
                {/* <textarea rows="5" cols="50" id="speed"> */}
                {/* </textarea> */}
                <br/>
                <input type="submit" value="Submit" />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    );
  };
  
  export default EditCrew;
