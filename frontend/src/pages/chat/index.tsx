import axios from 'axios';
import React, {useEffect} from 'react';

const Chat = () => {
  const fetch = async () => {
    const response = await axios.get(
      'http://localhost:5000/chat/617a077e18c25468bc7c4dd4',
    );
    console.log(response.data);
  };
  useEffect(() => {
    fetch();
  }, []);
  return <div>Chat</div>;
};

export default Chat;
