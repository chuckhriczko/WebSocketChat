//Types
import ConversationListProps from "./ConversationList";
import Message from "../../lib/types/Message";

//Assets
import './ConversationList.css';
import { useState } from "react";

const ConversationList = ({
    className = '',
    header = null,
    messages = [],
}: ConversationListProps) => {
  const [text, setText] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  return (
    <>
      <div className={`conversation-list ${className}`}>
        {/* Header */}
        {header && (typeof header === 'string' ? <h3 className="conversation-list-header">{header}</h3> : header)}

        {/* Content */}
        <div className={`conversation-list-content`}>
          {messages.map((message: Message) => <div className={`message message-${message.id} message-${message.isMe ? 'right' : 'left'}`} key={`message-${message.id}`}>
            {message.isMe ? <div></div> : <></>}
            <div className={`message-container`}>
              <div className="message-content">{message.content}</div>
              <div className="message-author">{message.username}</div>
            </div>
            {!message.isMe ? <div></div> : <></>}
          </div>)}
        </div>
      </div>

      {/* Inputs */}
      <div className="inputs grid">
        <div className="grid">
          <textarea
            placeholder="Enter message here..."
            onChange={(e) => setText(e.target.value)}
            defaultValue={text}
            />
          <input
            type="text"
            placeholder="Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
        </div>
        <button type="button">Send</button>
      </div>
    </>
  )
};

export default ConversationList;