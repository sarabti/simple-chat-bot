import React, { useEffect, useState, useRef } from "react";
import Login from "@/components/Login.jsx"
import Chat from "@/components/Chat.jsx"
import ToggleMode from "@/components/ToggleMode.jsx"
import SocketIOClient from "socket.io-client";

let socket;

const Home = () => {
  const [chosenUsername, setChosenUsername] = useState("");
  const [username, setUsername] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [mode, setMode] = useState("light");

  useEffect(() => {
    // connect to socket server
    socket = SocketIOClient.connect(process.env.BASE_URL, {
      path: "/api/socket",
    });

    socket.on("newMessage", (newMsg) => {
      setMessages((currentMessages) => [...currentMessages, newMsg]);
    });

    socket.on("currentUsers", async (newOnlineUsers) => {
      setOnlineUsers(newOnlineUsers);
    });

    // socket disconnet onUnmount if exists
    if (socket) return () => socket.disconnect();
  }, []);

  const changeMode = e => {
    e.preventDefault();
    let newMode = (mode == "light") ? "dark" : "light"
    setMode(newMode)
  }

  const sendMessage = async () => {
    if (message) {
      let newMessage = {
        author: chosenUsername,
        message: message
      }
      // dispatch message to other users
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      });

      // reset field if OK
      if (resp.ok) setMessage("");
    }
  };

  const logUserIn = async () => {
    setChosenUsername(username);
    let newUser = {
      username: username,
      socketId: socket.id
    }

    // useEffect(() => socket.emit('hellll'));

    const resp = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
  }

  const handleKeypress = (e, state, mutate) => {
    //it triggers by pressing the enter key
    if (e.keyCode === 13) {
      if (state) {
        mutate();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 mx-auto min-h-screen justify-center bg-violet-400 dark:bg-indigo-950">
      <header className="gap-4 flex flex-col items-center justify-center w-full h-full">
        <ToggleMode mode={mode} toggleMode={changeMode}/>
      </header>
      <br/>
      <main className="gap-4 flex flex-col items-center justify-center w-full h-full">
        {!chosenUsername ? (
          <Login
            username = {username}
            setUsername = {setUsername}
            handleKeypress = {(e) => handleKeypress(e, username, logUserIn)}
            loginAction = {logUserIn}
          />
        ) : (
          <Chat
            username = {username}
            messages = {messages}
            newMessage = {message}
            setNewMessage = {setMessage}
            onlineUsers = {onlineUsers}
            handleKeypress = {(e) => handleKeypress(e, message, sendMessage)}
            sendMessage = {sendMessage}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
