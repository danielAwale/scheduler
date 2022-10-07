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
    if (history.length > 1) {
      const newHistory = [...history].pop();
      setHistory(newHistory);
    }
    setMode(history[history.length - 1]);
    setHistory([...history]);

  }

  return { mode, transition, back }


}


