import { useState, ChangeEvent, FormEvent, useEffect } from "react";

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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(data);
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
      <div>
        <h2>User Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              onChange={handleChange}
              required
            />
            {errors.firstName && <p>{errors.firstName}</p>}
          </div>
          <div>
            <label>Last Name:</label>
            <input type="text" name="lastName" onChange={handleChange} required />
            {errors.lastName && <p>{errors.lastName}</p>}
          </div>
          <div>
            <label>Email:</label>
            <input type="email" name="email" onChange={handleChange} required />
            {errors.email && <p>{errors.email}</p>}
          </div>

          <button type="submit" disabled={isSubmitDisabled}>Submit</button>
        </form>
      </div>
    </>
  );
}

