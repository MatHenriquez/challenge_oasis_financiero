import { useState, useEffect } from "react";
import styles from "./Main.module.css";

export default function Main() {
  const [word, setWord] = useState("");
  const [errors, setErrors] = useState("Please, type a word...");

  function handleSubmit(event) {
    event.preventDefault();
    console.log(word);
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
    </>
  );
}
