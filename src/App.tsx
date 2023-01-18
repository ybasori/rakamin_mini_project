import React, { useState } from "react";
import TextField from "./components/atoms/TextField/TextField";

function App() {
  const [text, setText] = useState("");
  return (
    <TextField
      value={text}
      onChange={(e) => setText(e.currentTarget.value)}
      placeholder="input"
    />
  );
}

export default App;
