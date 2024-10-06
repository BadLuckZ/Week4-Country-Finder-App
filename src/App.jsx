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
        style={{
          margin: "0 0.5rem",
          border: "none",
          padding: "0.5rem",
          fontSize: "16px",
        }}
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
              return country.name.official
                .toLowerCase()
                .includes(text.toLowerCase());
            })
            .map((country, index) => {
              const countryName = country.translations[language]
                ? country.translations[language].official
                : country.name.official;
              return (
                <li
                  key={country.name.official}
                  style={{
                    whiteSpace: "pre",
                    borderBottom: "1px solid black",
                    padding: "1rem 0",
                    listStyleType: "none",
                  }}
                >
                  <p>{country.flag}</p>
                  {countryName
                    .split(new RegExp(`(${text})`, "gi"))
                    .map((c, idx) =>
                      c.toLowerCase() == text.toLowerCase() ? (
                        <span key={idx} style={{ backgroundColor: "skyblue" }}>
                          {c}
                        </span>
                      ) : (
                        c
                      )
                    )}
                </li>
              );
            })}
        </ul>
      )}
    </>
  );
}

export default App;
