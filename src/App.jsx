import { useState, useEffect } from "react";

function App() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [language, setLanguage] = useState("eng");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
      })
      .then((data) => {
        // console.log(data);
        setLoading(false);
        setCountries(data);
      });
  }, []);

  return (
    <>
      <h1 style={{ margin: "0.5rem" }}>Country Finder</h1>
      <input
        value={text}
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
      <select
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
        }}
      >
        <option value="eng">English</option>
        <option value="ara">Arabic</option>
        <option value="ita">Italian</option>
      </select>
      {loading ? (
        <p
          style={{
            padding: "0 0.5rem",
            margin: "0.5rem",
          }}
        >
          Loading...
        </p>
      ) : (
        <ul
          style={{
            padding: "0 0.5rem",
            margin: "0.5rem",
          }}
        >
          {countries
            .filter((country) => {
              const size = text.length;
              return country.name.common
                .slice(0, size)
                .toLowerCase()
                .includes(text.toLowerCase());
            })
            .map((country, index) => {
              return (
                <li
                  key={country.name.official}
                  style={{
                    borderBottom: "1px solid black",
                    padding: "1rem 0",
                    listStyleType: "none",
                  }}
                >
                  {country.flag}{" "}
                  {country.translations[language]
                    ? country.translations[language].official
                    : country.name.official}
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
}

export default App;
