"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);

  const alienMap = {
    A: 1,
    B: 5,
    Z: 10,
    L: 50,
    C: 100,
    D: 500,
    R: 1000,
  };

  const isSubtractive = (curr, next) => {
    return (curr === "A" && (next === "B" || next === "Z")) || (curr === "Z" && (next === "L" || next === "C")) || (curr === "C" && (next === "D" || next === "R"));
  };

  // const hasMoreThan3Repeats = (s) => {
  //   let count = 1;
  //   for (let i = 1; i < s.length; i++) {
  //     if (s[i] === s[i - 1]) {
  //       count++;
  //       if (count > 3) return true;
  //     } else {
  //       count = 1;
  //     }
  //   }
  //   return false;
  // };

  const convertAlienNumeral = (s) => {
    let total = 0;
    for (let i = 0; i < s.length; i++) {
      const curr = s[i];
      const next = s[i + 1];
      if (next && isSubtractive(curr, next)) {
        total += alienMap[next] - alienMap[curr];
        i++;
      } else {
        total += alienMap[curr];
      }
    }
    return total;
  };

  const handleChange = (e) => {
    const val = e.target.value.toUpperCase();
    setInput(val);

    const isValidChars = /^[ABZLCDR]*$/.test(val);
    // const noRepeats = !hasMoreThan3Repeats(val);

    if (isValidChars) {
      setResult(convertAlienNumeral(val));
    } else {
      setResult(null);
    }
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-700">Alien Numeral Converter</h1>

        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Symbol Values</h2>
          <div className="grid grid-cols-4 gap-2 text-sm text-center">
            {Object.entries(alienMap).map(([key, value]) => (
              <div key={key} className="flex bg-blue-50 border border-blue-200 rounded p-2">
                <div>
                  <span className="font-bold">{key}</span> = {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <input
          value={input}
          onChange={handleChange}
          placeholder="Enter Alien numeral (e.g., RCRZCAB)"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="mt-4 text-lg text-center">{input === "" ? "Please enter a numeral" : result !== null ? `Result: ${result}` : "Invalid input"}</div>
      </div>
    </div>
  );
}
