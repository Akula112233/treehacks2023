import React from 'react';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  const [text, setText] = React.useState('');
  const [messages, setMessages] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);

  const handleSubmit = async () => {
    if (!text) return;
    setMessages([...messages, { text, isUser: true }]);
    const params = {
      name: 'qanda',
      highlighted: '',
      reqType: 'question',
      article: document.body.innerHTML,
      raw_website: document.body.innerHTML,
      question: text,
    };

    setDisabled(true);

    const ret = fetch('https://treehacks2023.uc.r.appspot.com/send_text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });

    ret
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        alert(data);
        setMessages([
          ...messages,
          { text, isUser: true },
          { text: data.response, isUser: false },
        ]);
      })
      .catch((e) => alert(e));

    setDisabled(false);

    setText('');
  };

  return (
    <div className="App">
      <header className="App-header h-full">
        <div className="p-3">
          <h1>Let's Talk About This Article</h1>
        </div>
        <div className="overflow-y-scroll h-full">
          <div className="flex w-full flex-col my-auto">
            {messages.map((message, index) => (
              <p
                className={`
              text-sm my-1 p-2 rounded-md break-words
              ${
                message.isUser
                  ? 'bg-blue-400 justify-self-end'
                  : 'bg-gray-400 justify-self-start'
              }`}
                key={index}
              >
                {message.text}
              </p>
            ))}
          </div>
        </div>
        <input
          className="justify-self-end text-sm text-black m-2 px-2"
          type="text"
          value={text}
          disabled={disabled}
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
