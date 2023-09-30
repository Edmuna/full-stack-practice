import { useState } from "react";

function App() {

  const [retrievedData, setRetrievedData] = useState([]);
  const [name, setName] = useState("")
  const [lastName, setLastName] = useState("")
  const [age, setAge] = useState("")

  const originalUrl = "http://localhost:3000";

  const obj = {
    name: name,
    last_name: lastName,
    age: age
  }

  const getName = (e) => {
    setName(e.target.value)
  }

  const getLastName = (e) => {
    setLastName(e.target.value)
  }

  const getAge = (e) => {
    setAge(e.target.value)
  }

  async function postData() {
    try {
      const reponse = await fetch(`${originalUrl}/post`, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })
      if (!reponse.ok) {
        throw new Error("Network response was not ok")
      }
    } catch (error) {
      console.error(error)
    }

    setName("")
    setLastName("")
    setAge("")
  }


  async function getData() {
    try {
      const response = await fetch(`${originalUrl}/`, {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRetrievedData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <>
      <label htmlFor="">Name</label>
      <input value={name} onChange={getName} type="text" />
      <label htmlFor="">Last name</label>
      <input value={lastName} onChange={getLastName} type="text" />
      <label htmlFor="">Age</label>
      <input value={age} onChange={getAge} type="number" name="" id="" />
      <button onClick={postData}>Post data</button>
      <button onClick={getData}>Fetch data</button>
      <div>
        {retrievedData.length === 0 ? (
          <p>No data available</p>
        ) : (
          <ul>
            {retrievedData.map((item) => (
              <li key={item.id}>
                <strong>Name:</strong> {item.name}
                <br />
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
