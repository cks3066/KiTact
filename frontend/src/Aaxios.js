import React from "react";
import axios from "axios";

const Aaxios = (props) => {
  const baseUrl = "https://localhost:8080";

  const [todos, setTodos] = React.useState([]);
  const [input, setInput] = React.useState("axios");

  React.useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    await axios
      .get(baseUrl + "/test/time")
      .then((response) => {
        console.log(response.data);
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function changeText(e) {
    e.preventDefault();
    setInput(e.target.value);
  }
  return (
    <React.Fragment>
      <label>
        Axios :
        <input
          type="text"
          required={true}
          value={input}
          onChange={changeText}
        />
        <input type="submit" value="Create"></input>
      </label>
    </React.Fragment>
  );
};

export default Aaxios;
