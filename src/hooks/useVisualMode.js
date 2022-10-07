import { useState } from "react"

export default function useVisualMode(initialValue) {
  const [mode, setMode] = useState(initialValue);
  const [history, setHistory] = useState([initialValue]);

  function transition(transitionMode, replace = false) {
    setMode(transitionMode);
    if (replace === true) {
      history[history.length - 1] = transitionMode
    } else {
      history.push(transitionMode)
    }
  }

  function back() {
    setMode(history[history.length - 2]);
    setHistory((prev) => [...prev].slice(0, -1))

  }

  return { mode, transition, back }


}


