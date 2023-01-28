//Types
import ConversationListProps from "./ConversationList";
import Message from "../../lib/types/Message";

//Assets
import './ConversationList.css';

const ConversationList = ({
    className = '',
    header = null,
    messages = [],
    username = ''
}: ConversationListProps) => {
  

  return (
    <>
      <div className={`conversation-list ${className}`}>
        {/* Header */}
        {header && (typeof header === 'string' ? <h3 className="conversation-list-header">{header}</h3> : header)}

        {/* Content */}
        <div className={`conversation-list-content`}>
          {messages.map((message: Message) => {
            return <div
              key={`message-${message.id}`}
              className={`message message-${message.id} message-${message.username && message.username.toLowerCase() === username ? 'right' : 'left'}`}
            >
              {message.username && message.username.toLowerCase() === username ? <div></div> : <></>}
              <div className={`message-container`}>
                <div className="message-content">{message.content}</div>
                <div className="message-author">{message.username} - <span className="message-date">{message.date ? `${new Date(message.date).toLocaleDateString()} ${new Date(message.date).toLocaleTimeString()}` : ''}</span></div>
              </div>
              {message.username && message.username.toLowerCase() === username ? <div></div> : <></>}
            </div>
          })}
        </div>
      </div>
    </>
  )
};

export default ConversationList;