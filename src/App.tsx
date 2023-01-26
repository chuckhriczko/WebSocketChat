import { useState } from 'react';
import { useSocket } from './lib/contexts/SocketContext/hooks/useSocket';
import { useSocketOnClose } from './lib/contexts/SocketContext/hooks/useSocketOnClose';
import { useSocketOnMessage } from './lib/contexts/SocketContext/hooks/useSocketOnMessage';
import { useSocketOnOpen } from './lib/contexts/SocketContext/hooks/useSocketOnOpen';
import ConversationList from './components/ConversationList';
import Message from './lib/types/Message';

function App() {
  //Our time hook. This is simply a string that will be updated by our SocketContext
  const [lastTime, setLastTime] = useState<string>('N/A');
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  
  //Get our WebSocket connection
  const socket = useSocket();

  //When the socket is open, send the activity request
  useSocketOnOpen((message: any) => {
    console.log('Socket Connected');
  });
  
  //When we receieve a message from the WebSocket, update the actions
  useSocketOnMessage((message: MessageEvent) => {
    setLastTime(current => time);
    setTime(current => message.data);
  });

  //When we receieve a message from the WebSocket, update the actions
  useSocketOnClose((message: MessageEvent) => {
    console.log('Socket Closed');
  });

  const messages: Message[] = [
    {id: 1, content: 'hello world', username: 'Chuck', isMe: true},
    {id: 2, content: 'How are you?', username: 'Sam', isMe: false},
    {id: 3, content: 'Not bad', username: 'Chuck', isMe: true},
  ];

  return (
    <div className="App">
      <ConversationList header={<h3>Messages:</h3>} messages={messages} />
    </div>
  )
}

export default App
