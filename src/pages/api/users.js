export default (req, res) => {
  if (req.method === "POST") {
    // get message
    const user = req.body;

    if (!global.ONLINE_USERS.some(currentUser => currentUser.username == user.username)) {
      global.ONLINE_USERS.push(user);
    }

    // dispatch to channel "message"
    res?.socket?.server?.io?.emit("currentUsers", global.ONLINE_USERS);

    // return message
    res.status(200).json(user);
  }
};
