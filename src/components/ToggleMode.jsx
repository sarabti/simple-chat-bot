import {useEffect} from "react";
import Button from "./AppButton.jsx"

export default function ToggleMode({mode, toggleMode}) {
  if (typeof window !== 'undefined') {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <>
      <h3 className="font-bold text-white text-xl">
        Your Mode is: {mode}
      </h3>
      <Button
        text={"Toggle Mode"}
        onClick={toggleMode}
      />
    </>
  );
}
