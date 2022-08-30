import MessageForm from "./MessageForm";
import MyMessage from "./MyMessage";
import TheirMessage from "./TheirMessage";

const ChatFeed = (props) => {
    const { chats, activeChats, userName, messages } = props;
    
    const chat = chats && chats[activeChats];

    const renderReadReceipts = (message, isMyMessage) => {
        return chat.people.map((person, index) => person.last_read === message.id && (
           <div
                key={`react_${index}`}
                className="read-receipt"
                style={{
                    float: isMyMessage? 'right' : 'left',
                    backgroundImage: `url(${person?.person?.avatar})`
                }}
           />
        ))

        
    }

    const renderMessages = () => {
        const keys = Object.keys(messages);

        console.log(keys);

        return keys.map((key, index) => {
            const message = messages[key];
            const lastMessageKey = index === 0 ? null : keys[index = 1];
            const isMyMessage = userName === message.sender.userName;

            return (
                <div key={`msg_${index}`} syle={{width: '100%'}}>
                    <div className="message-block">
                        {
                            isMyMessage
                            ? <MyMessage message={message}/>
                            : <TheirMessage message={message} lastmessage={messages[lastMessageKey]}/>
                        }
                    </div>
                    <div className="read-receipts" style={{ marginRight: isMyMessage ? '18px' : '0px', marginLeft : isMyMessage ? '0px' : '68px'}}></div>
                        {renderReadReceipts(message, isMyMessage)}
                </div>
            )
        })
    }

    renderMessages()

    if(!chat) return 'Loading...';

    return (
        <div className="chat-feed">
            <div className="chat-title-container">
                <div className="chat-title">{chat.title}</div>
                <div className="chat-subtitle">
                    {chat.people.map((person) => `${person.person.username}`)}
                </div>
            </div>
            {renderMessages()}
            <div style={{height: '100px'}} />
            <div className="message-form-container">
                <MessageForm {...props} chatId={activeChats} />    
            </div>
        </div>
    );
}

export default ChatFeed;