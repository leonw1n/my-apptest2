"use client";

import { useEffect, useState, useRef } from "react";
import parse from "html-react-parser"

export default function HandleGenerate() {
  const [entry, setEntry] = useState("");
  const [prompt, setPrompt] = useState("");

  const entryGenerate = async () => {
    try {
      const response = await fetch("/api/generateDescription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: prompt }),
      });

      const data = await response.json();
      if (response.ok) {
        setEntry(data.entry);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter a prompt..."
      />
      <button onClick = {entryGenerate}> Generate </button>
      <br></br>
      {parse(entry)}
    </div>
  );
}
