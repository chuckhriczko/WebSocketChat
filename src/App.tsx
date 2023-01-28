import { useState } from 'react';
import { useSocket } from './lib/contexts/SocketContext/hooks/useSocket';
import { useSocketOnMessage } from './lib/contexts/SocketContext/hooks/useSocketOnMessage';
import ConversationList from './components/ConversationList';
import Message from './lib/types/Message';

function App() {
  //Our time hook. This is simply a string that will be updated by our SocketContext
  const [messages, setMessages] = useState<Message[]>([]);
  
  //When we receieve a message from the WebSocket, update the actions
  useSocketOnMessage((message: MessageEvent) => {
    try{
      const msg: Message = JSON.parse(message.data);

      //Only add the message if it doesn't already exist
      if (messages.filter(m => m.id === msg.id).length === 0){
        setMessages(current => [msg, ...current]);
      }
    } catch(err: any){
      console.error('Error parsing message: ' + err.message);
    }
  });

  //Set up our hooks
  const [text, setText] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  //Get a handle on our WebSocket
  const ws = useSocket();

  /**
   * Generates a message object and sends it to the API
   */
  const sendMessage = () => {
    if (ws.readyState === ws.OPEN){
      const message: Message = {
        content: text,
        username
      }

      ws.send(JSON.stringify(message));
    }
  }

  return (
    <div className="App">
      <ConversationList
        header={<h3>Messages:</h3>}
        messages={messages}
        username={username}
        />
      {/* Inputs */}
      <div className="inputs">
        <textarea
          placeholder="Enter message here..."
          onChange={(e) => setText(e.target.value)}
          defaultValue={text}
          />
        <div className="grid">
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
          <button
            type="button"
            onClick={sendMessage}
          >Send</button>
        </div>
      </div>
    </div>
  )
}

export default App
