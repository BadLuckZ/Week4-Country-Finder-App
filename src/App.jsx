import { useState } from "react";

function App() {
  const [text, setText] = useState("");
  const countries = [
    { name: "United States", flag: "🇺🇸" },
    { name: "Brazil", flag: "🇧🇷" },
    { name: "Thailand", flag: "🇹🇭" },
    { name: "Japan", flag: "🇯🇵" },
    { name: "China", flag: "🇨🇳" },
  ];

  return (
    <>
      <h1 style={{ margin: "0.5rem" }}>Country Finder</h1>
      <input
        style={{
          padding: "1rem",
          margin: "0.5rem",
          background: "lightgrey",
          border: "none",
          borderRadius: "16px",
          fontSize: "1.25rem",
        }}
        onChange={(e) => {
          setText(e.target.value);
        }}
        placeholder="Type to find..."
      />
      <ul
        style={{
          padding: "0 0.5rem",
          margin: "0.5rem",
        }}
      >
        {countries
          .filter((country) => {
            const size = text.length;
            return country.name
              .slice(0, size)
              .toLowerCase()
              .includes(text.toLowerCase());
          })
          .map((country, index) => {
            return (
              <li
                key={country.name + index}
                style={{
                  borderBottom: "1px solid black",
                  padding: "1rem 0",
                  listStyleType: "none",
                }}
              >
                {country.flag} {country.name}
              </li>
            );
          })}
      </ul>
    </>
  );
}

export default App;
