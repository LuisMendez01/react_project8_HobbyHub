import React from "react";
// import './CreatePost.css'
import { supabase } from '../client'
import { useState } from 'react'

const CreateCrew = () => {

  const [file, setFile] = useState('');
  const supabaseUrl = 'https://vwsuxfxmlogjihdfwhtn.supabase.co';

    function handleFileInputChange(event) {
      const file = event.target.files[0];
      if (file) {
        console.log('SetFile:');
          console.log(file);
          setFile(file);
      } else {
          console.log('No file selected');
      }
   }
  
    const createPost = async (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const description = event.target.description.value;

        console.log('title: ');
        console.log(file);

        //SERVER SIDE
        // const path = require('path');
        // const fileName = path.basename(img_url);
        // const fileExtension = path.extname(img_url);
        // console.log('File name:', fileName); // Outputs: file.txt
        // console.log('File extension:', fileExtension); // Outputs: .txt

        const fileName = file.name;
        const fileExtension = fileName.slice((fileName.lastIndexOf(".") - 1 >>> 0) + 2);

        console.log('File name:', fileName);
        console.log('File extension:', fileExtension);

        // UPLOAD IMAGE TO STORAGE
        try {
          const { data, error } = await supabase.storage.from('images').upload(fileName, file, {
            cacheControl: '3600',
            upsert: true,
            transform: {
              width: 100,
              height: 100,
            }
          })
  
          if (error) {
              throw error
          }
  
            console.log('File uploaded: ', data)

            const bucket = 'images';
            const img_url = `${supabaseUrl}/storage/v1/object/public/${bucket}/${fileName}`
      
            await supabase
              .from('Posts')
              .insert({'title': title, 'description': description, 'img_url': img_url})
              .select();
          
            window.location = "/newsfeed";

        } catch (error) {
            console.error('Error uploading file: ', error)
        }
      }

    return (
        <div>
            <form onSubmit={createPost} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" /><br />
                <br/>

                <label for="description">Description</label><br />
                <textarea id="description" name="description" rows="12" style={{ width: '100%' }}></textarea><br />
                <br/>

                <label htmlFor="image" >Image</label><br />
                <div style={{ overflow: 'hidden', position: 'relative', textAlign: 'center',margin: '0 0 15px 75px' }}>
                    <input type="file" id="image" name="image" style={{  right: 0, top: 0 }} onChange={handleFileInputChange}/>
                </div>
                <br/>

                <input id="createPostBtn" type="submit" value="Create Post" />
            </form>
        </div>
    );
  };
  
  export default CreateCrew;
