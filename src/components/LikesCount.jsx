import React from 'react'
import { useState } from 'react'
import { supabase } from '../client'


const LikesCount = ({id, betCount}) =>  {

  const [count, setCount] = useState(betCount);
  
  const updateCount = async (event) => {
    event.preventDefault();

    console.log('id:');
    console.log(id);
  
    await supabase
      .from('Posts')
      .update({ betCount: count + 1})
      .eq('id', id)

      setCount((count) => count + 1);
  }

  return (
      <div>
          <button id="betButton" onClick={updateCount} > ❤️ &#160;{`${count}`}</button>
      </div>
  );
};

export default LikesCount;