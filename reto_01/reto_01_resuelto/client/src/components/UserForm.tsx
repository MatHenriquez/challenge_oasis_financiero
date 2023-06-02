import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import styles from "./UserForm.module.css";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
}

export default function UserForm() {
  const [data, setData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [errors, setErrors] = useState<FormErrors>({
    firstName: "*Please, type your first name",
    lastName: "*Please, type your last name",
    email: "*Please, type your email",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create user");
      }

      alert("User created successfully");

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleErrors();
  }, [data]);

  const handleErrors = () => {
    const updatedErrors: FormErrors = {
      firstName: data.firstName ? "" : "*Please, type your first name",
      lastName: data.lastName ? "" : "*Please, type your last name",
      email: data.email ? "" : "*Please, type your email",
    };
    setErrors(updatedErrors);
  };

  const isSubmitDisabled = Object.values(errors).some((error) => error !== "");

  return (
    <>
      <div className={styles.container}>
        <h2 className={styles.title}>User Form</h2>
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label className={styles.labels}>First Name:</label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          {errors.firstName
            ? ( <span className={styles.error}>{errors.firstName}</span> )
            :<span className={styles.okMessage}>✓ Ok</span>}
          <div className={styles.inputContainer}>
            <label className={styles.labels}>Last Name:</label>
            <input
              type="text"
              name="lastName"
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          {errors.lastName
            ? ( <span className={styles.error}>{errors.lastName}</span> )
            :<span className={styles.okMessage}>✓ Ok</span>}
          <div className={styles.inputContainer}>
            <label className={styles.labels}>Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          {errors.email
            ? ( <span className={styles.error}>{errors.email}</span> )
            :<span className={styles.okMessage}>✓ Ok</span>}
          <br />
          <button type="submit" className={styles.button} disabled={isSubmitDisabled}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
