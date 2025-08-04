import "./styles.css";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [filters, setFilter] = useState("");
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (name.trim() === "") return;
    const obj = {
      id: uuidv4(),
      name,
    };
    setList((pv) => [...pv, obj]);
    setName("");
  };

  const onDelete = (id) => {
    const deleteItems = list.filter((item) => item.id !== id);
    setList(deleteItems);
  };

  const onEditToggle = (id, currentName) => {
    if (editId === id) {
      // Save mode
      const updatedList = list.map((item) =>
        item.id === id ? { ...item, name: editText } : item
      );
      setList(updatedList);
      setEditId(null);
      setEditText("");
    } else {
      // Edit mode
      setEditId(id);
      setEditText(currentName);
    }
  };

  const filterNames = list.filter((item) =>
    item.name.toLowerCase().includes(filters.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>

      {/* Submit Form */}
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name </label>
        <input
          type="text"
          placeholder="enter name"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <button type="submit" style={{ marginTop: "15px" }}>
          submit
        </button>
      </form>

      {/* Search Filter */}
      <input
        type="search"
        placeholder="search you need"
        style={{ marginTop: "15px" }}
        value={filters}
        onChange={(e) => setFilter(e.target.value)}
      />

      {/* Display List */}
      <ul>
        {filterNames.map((item) => (
          <li key={item.id} style={{ marginBottom: "10px" }}>
            {editId === item.id ? (
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
              />
            ) : (
              <p>{item.name}</p>
            )}

            <button
              onClick={() => onEditToggle(item.id, item.name)}
              style={{ marginRight: "10px" }}
            >
              {editId === item.id ? "Save" : "Edit"}
            </button>

            <button onClick={() => onDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
