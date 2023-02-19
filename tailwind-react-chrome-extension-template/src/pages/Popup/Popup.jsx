import React from 'react';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  const [text, setText] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  const handleSubmit = () => {
    setMessages([...messages, { text, isUser: true }]);
    setText('');
  };

  return (
    <div className="App">
      <header className="App-header h-full">
        <div className="p-3">
          <h1>Let's Talk About This Article</h1>
        </div>
        <div className="my-auto overflow-y-scroll">
          <div className="flex flex-col">
            {messages.map((message, index) => (
              <div
                className={`
              flex flex-row text-sm w-auto my-1 p-2 rounded-md overflow-y-auto
              ${
                message.isUser
                  ? 'bg-blue-400 justify-self-end'
                  : 'bg-gray-400 justify-self-start'
              }`}
                key={index}
              >
                {message.text}
              </div>
            ))}
          </div>
        </div>
        <input
          className="justify-self-end text-sm text-black m-2 px-2"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onSubmit={() => handleSubmit()}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSubmit();
            }
          }}
        ></input>
      </header>
    </div>
  );
};

export default Popup;
