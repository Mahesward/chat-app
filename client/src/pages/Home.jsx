import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io.connect('http://localhost:9001');

function Home() {
  const [showChat, setShowChat] = useState(false);
  const [userName, setUserName] = useState('');
  const [currentMessage, setCurrentMessage] = useState('');
  const [roomId, setRoomId] = useState('');
  const [messageList, setMessageList] = useState([]);

  const handleJoinRoom = (e) => {
    e.preventDefault();
    if ((userName && roomId) !== null) {
      socket.emit('join_room', roomId);
      setShowChat(true);
    }
  };

  const sendMessage = async () => {
    if (currentMessage) {
      const messageData = {
        room: roomId,
        author: userName,
        message: currentMessage,
        time: `${new Date(Date.now()).getHours()} : ${new Date(Date.now()).getMinutes()}`,
      };
      setMessageList(() => [...messageList, currentMessage]);
      await socket.emit('send_message', messageData);
    } else {
      alert('enter details');
    }
  };

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      setMessageList(() => [...messageList, data]);
    });
  }, []);
  return (
    <>
      <h1 className="font-semibold text-3xl text-center my-6">CHAT-APP</h1>
      {!showChat ? (
        <div className="flex w-full max-w-sm items-center space-x-2">
          <input
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="User Name"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <input
            className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="room id"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <button
            type="button"
            className="active:scale-95 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-1 bg-indigo-600 focus:ring-indigo-400 focus:ring-offset-1 dark:hover:bg-indigo-700 dark:hover:text-gray-100 disabled:opacity-50 dark:focus:ring-indigo-400 disabled:pointer-events-none dark:focus:ring-offset-gray-900 dark:bg-indigo-600 text-white hover:bg-indigo-700 h-10 py-2 px-4"
            onClick={handleJoinRoom}
          >
            Join
          </button>
        </div>
      ) : (
        <body className="flex flex-col items-center justify-center w-screen min-h-screen bg-gray-100 text-gray-800 p-10">
          <h2>Chat</h2>
          <div className="flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="flex flex-col flex-grow h-0 p-4 overflow-auto">
              {messageList.map((data) => (
                <div
                  className={`flex w-full mt-2 space-x-3 max-w-xs ml-auto ${
                    data.userName === userName ? 'justify-end' : ''
                  }`}
                >
                  <div>
                    <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                      <p className="text-sm">{data.userName === userName ? <span /> : data.message}</p>
                    </div>
                    <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                  </div>
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
                </div>
              ))}
              <div className="flex w-full mt-2 space-x-3 max-w-xs">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
                <div>
                  <div className="bg-gray-300 p-3 rounded-r-lg rounded-bl-lg">
                    <p className="text-sm">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
                      labore et dolore magna aliqua
                    </p>
                  </div>
                  <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                </div>
              </div>
              <div className="flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end">
                <div>
                  <div className="bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg">
                    <p className="text-sm">Lorem ipsum dolor sit.</p>
                  </div>
                  <span className="text-xs text-gray-500 leading-none">2 min ago</span>
                </div>
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300" />
              </div>
            </div>

            <div className="bg-gray-300 p-4 flex">
              <input
                className="flex items-center h-10 w-full rounded px-3 text-sm"
                type="text"
                placeholder="Type your message…"
                onChange={(e) => setCurrentMessage(e.target.value)}
                value={currentMessage}
              />
              <button
                type="button"
                className="active:scale-95 ml-2 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-1 bg-indigo-600 focus:ring-indigo-400 focus:ring-offset-1 dark:hover:bg-indigo-700 dark:hover:text-gray-100 disabled:opacity-50 dark:focus:ring-indigo-400 disabled:pointer-events-none dark:focus:ring-offset-gray-900 dark:bg-indigo-600 text-white hover:bg-indigo-700 h-10 py-2 px-4"
                onClick={sendMessage}
                onKeyPress={(e) => (e.key === 'event' ? sendMessage : '')}
              >
                Send
              </button>
            </div>
          </div>
        </body>
      )}
    </>
  );
}

export default Home;
