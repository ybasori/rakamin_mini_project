import React, { useState } from "react";
import InputField from "./components/atoms/InputField/InputField";

function App() {
  const [text, setText] = useState("");
  return (
    <InputField
      value={text}
      onChange={(e) => setText(e.currentTarget.value)}
      placeholder="input"
    />
  );
}

export default App;
