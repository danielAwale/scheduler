import { useState } from "react"

export default function useVisualMode(initialValue) {
  const [mode, setMode] = useState(initialValue);
  const [history, setHistory] = useState([initialValue]);

  function transition(transitionMode) {
    setMode(transitionMode);
    history.push(transitionMode);
    setHistory([...history]);

  }

  function back() {
    if (history.length > 1) {
      history.pop();
    }
    setMode(history[history.length - 1]);
    setHistory([...history]);

  }

  return { mode, transition, back }


}


