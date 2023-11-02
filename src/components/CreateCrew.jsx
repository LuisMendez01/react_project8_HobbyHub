import React from "react";
// import './CreatePost.css'
import { supabase } from '../client'

const CreateCrew = () => {
  
    const createPost = async (event) => {
        event.preventDefault();

        const name= event.target.name.value;
        const color = event.target.color.value;
        const speed = event.target.speed.value;

        console.log('name: ');
        console.log(name);
      
      
        await supabase
          .from('crew')
          .insert({name, color, speed})
          .select();
      
        window.location = "/display";
      }

    return (
        <div>
            <form onSubmit={createPost}>
                <label for="name">Name</label> <br />
                <input type="text" id="name" name="name" /><br />
                <br/>

                <label for="color">Color</label><br />
                <input type="text" id="color" name="color" /><br />
                <br/>

                <label for="speed">Speed</label><br />
                <input type="text" id="speed" name="speed" /><br />
                {/* <textarea rows="5" cols="50" id="speed"> */}
                {/* </textarea> */}
                <br/>
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
  };
  
  export default CreateCrew;
