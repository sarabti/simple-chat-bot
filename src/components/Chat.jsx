export default function Chat ({
  username,
  messages,
  newMessage,
  setNewMessage,
  onlineUsers,
  handleKeypress,
  sendMessage
}) {
  function isOnline (username) {
    return onlineUsers.some(user => user.username == username);
  }
  return (
    <>
      <p className="font-bold text-white text-xl">
        You are chatting as: {username}
      </p>
      <div className="flex flex-col justify-end bg-white h-[20rem] min-w-[33%] rounded-md shadow-md ">
        <div className="h-full last:border-b-0 overflow-y-scroll dark:bg-cyan-400">
          {messages.map((msg, i) => {
            return (
              <div
                className="py-1 px-2 border-b border-gray-200"
                key={i}
              >
                <span className={isOnline(msg.author) ? "text-green-700" : "text-red-700"}>
                  {isOnline(msg.author) ? "(Online) " : "(Offline) "}
                  {msg.author}
                </span>
                 : {msg.message}
              </div>
            );
          })}
        </div>
        <div className="border-t border-gray-300 w-full flex rounded-bl-md dark:border-white">
          <input
            type="text"
            placeholder="New message..."
            value={newMessage}
            className="outline-none py-2 px-2 rounded-bl-md flex-1 dark:bg-teal-300"
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyUp={handleKeypress}
          />
          <div className="border-l border-gray-300 dark:border-white flex justify-center items-center rounded-br-md group hover:bg-purple-500 transition-all dark:bg-teal-300 dark:hover:bg-teal-900">
            <button
              className="group-hover:text-white px-3 h-full"
              onClick={() => {
                sendMessage();
              }}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
