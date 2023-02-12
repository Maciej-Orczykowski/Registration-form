import "./App.css";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type FormValues = {
  firstName: string;
  surName: string;
  PESEL: string;
  NIP: string;
  image: File;
};

function App() {
  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      firstName: "",
      surName: "",
      PESEL: "",
      NIP: "",
    },
  });

  const [focus, setFocus] = useState(false);

  const handleChange = () => {
    if (focus === false) {
      setFocus(true);
    } else setFocus(false);
  };

  const userType = () => {
    if (focus === false) {
      return (
        <input
          {...register("PESEL")}
          minLength={11}
          maxLength={11}
          className="Special-Input"
          type="text"
          placeholder="PESEL"
          required
        />
      );
    } else
      return (
        <input
          {...register("NIP")}
          minLength={10}
          maxLength={10}
          className="Special-Input"
          type="text"
          placeholder="NIP"
          required
        />
      );
  };

  const onSubmit: SubmitHandler<FormValues> = (data: FormValues) => {
    const form = document.querySelector("form");

    form?.addEventListener("submit", (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      fetch("https://localhost:60001/Contractor/Save", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((res) => console.log(res));
    });
    throw new Error("Nie znaleziono metody zapisu");
  };

  return (
    <div className="App">
      <header className="Header">Join us!</header>
      <form className="Body" onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("firstName")}
          className="Input"
          type="text"
          placeholder="Name"
          required
        />
        <input
          {...register("surName")}
          className="Input"
          type="text"
          placeholder="Surname"
          required
        />
        <select onChange={handleChange} className="Input">
          <option value="person">Person</option>
          <option value="business">Business</option>
        </select>
        <div>{userType()}</div>
        <input
          {...register("image")}
          className="Input"
          type="file"
          accept=".png, .jpg, jpeg"
        />
        <input className="Submit" type="submit"></input>
      </form>
    </div>
  );
}

export default App;
