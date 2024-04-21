import Button from "./AppButton.jsx"

export default function Login({
  username,
  setUsername,
  handleKeypress,
  loginAction
}) {
  return (
    <>
      <h3 className="font-bold text-white text-xl">
        What&apos;s your name?
      </h3>
      <input
        type="text"
        placeholder="Name..."
        value={username}
        className="p-3 rounded-md outline-none"
        onChange={(e) => setUsername(e.target.value)}
        onKeyUp={handleKeypress}
      />
      <Button
        text={"Start!"}
        onClick={loginAction}
      />
    </>
  );
}
