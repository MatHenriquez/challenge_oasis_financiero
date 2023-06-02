import { useState, useEffect } from "react";
import styles from "./Main.module.css";

export default function Main() {
  const [word, setWord] = useState("");
  const [errors, setErrors] = useState("Please, type a word...");
  const [response, setResponse] = useState([{}]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
        const response = await fetch(`http://localhost:3001/search?word=${word}`, {
          method: "GET"
        });
  
        if (!response.ok) {
          throw new Error("Failed to find your word");
        }

        const data = await response.json();
        
        setResponse(data);
  
      } catch (error) {
        console.log(error);
      }
  }

  function handleChange(event) {
    setWord(event.target.value);
  }

  function handleErrors() {
    word.length === 0 ? setErrors("Please, type a word...") : setErrors("");
  }

  const isSubmitDisabled = errors !== "";

  useEffect(() => {
    handleErrors();
  }, [word]);

  return (
    <>
    <div className={styles.generalContainer}>
      <div className={styles.container}>
        <h2 className={styles.title}>Enter the word you want to search for</h2>

        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.labels}>Type here</label>
            <input
              className={styles.input}
              type="text"
              name="word"
              placeholder="word to search..."
              onChange={handleChange}
              required
            />{" "}
          </div>
          {errors !== "" ? (
            <span className={styles.error}>{errors}</span>
          ) : (
            <span className={styles.okMessage}>✓ Ok</span>
          )}
          <br />
          <button
            className={styles.button}
            type="submit"
            disabled={isSubmitDisabled}
          >
            Search
          </button>
        </form>
      </div>

        {Object.keys(response[0]).length > 0 && (
        <div className={styles.resultContainer}>
          <h3>Results:</h3>
          {response.map((result, index) => (
            <div key={index}>
              <p>Word: {result.word}</p>
              <p>Phonetic: {result.phonetic}</p>
              <p>Meanings:</p>
              <ul>
                {result.meanings.map((meaning, index) => (
                  <li key={index}>
                    <p>Part of Speech: {meaning.partOfSpeech}</p>
                    <p>Definition: {meaning.definitions[0].definition}</p>
                    {meaning.definitions[0].example && (
                      <p>Example: {meaning.definitions[0].example}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  );
}
