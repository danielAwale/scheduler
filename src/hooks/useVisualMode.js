import { useState } from "react"

export default function useVisualMode(initialValue) {
  const [mode, setMode] = useState(initialValue);

  function transition(transitionMode) {
    setMode(transitionMode);
  }

  return { mode, transition }


}


