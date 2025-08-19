import { useState, useEffect } from "react";
import cross from "../assets/cross.jpg";
import todoicon from  "../assets/todo.png";

function TodoList() {
  const [task, setTask] = useState("");
  const [item, setItems] = useState(() => {
   
    const saved = localStorage.getItem("todo-items");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("todo-items", JSON.stringify(item));
  }, [item]);

  function handleAddItems(newItem) {
    setItems((items) => [...items, newItem]);
  }

  function handleDelete(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggle(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  }

  function onClearList() {
    setItems([]);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!task.trim()) return;
    const newItem = { task, checked: false, id: Date.now() };
    handleAddItems(newItem);
    setTask("");
  }

  return (
    <header>
      <TodoItems
        handleSubmit={handleSubmit}
        task={task}
        setTask={setTask}
        Item={item}
        handleDelete={handleDelete}
        handleToggle={handleToggle}
      >
        <FooterLi onClearList={onClearList} item={item} />
      </TodoItems>
    </header>
  );
}

function TodoItems({
  handleSubmit,
  task,
  setTask,
  Item,
  handleDelete,
  handleToggle,
  children,
}) {
  return (
    <div className="todoContainer">
      <div className="header_content">
        <img src={todoicon} alt="logo" className="header_logo" />
        <h2>Todo List</h2>
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Create a New Todo"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
      </form>
      <ul>
        {Item.map((items) => (
          <List
            items={items}
            key={items.id}
            handleDelete={handleDelete}
            handleToggle={handleToggle}
          />
        ))}
        {children}
      </ul>
    </div>
  );
}

function List({ items, handleDelete, handleToggle }) {
  return (
    <li>
      <div>
        <input
          type="checkbox"
          checked={items.checked}
          onChange={() => handleToggle(items.id)}
        />
        <p style={items.checked ? { textDecoration: "line-through" } : {}}>
          {items.task}
        </p>
      </div>
      <img
        src={cross}
        alt="cross mark"
        onClick={() => handleDelete(items.id)}
      />
    </li>
  );
}

function FooterLi({ onClearList, item }) {
  const numItems = item.length;
  const numPacked = item.filter((item) => item.checked).length;

  return (
    <li className="footer">
      <div className="item">
        <p>{numItems} Items Left</p>
      </div>
      <div className="Active">
        <p>{numPacked} completed</p>
      </div>
      <div className="clear">
        <p onClick={onClearList}>Clear All</p>
      </div>
    </li>
  );
}

export default TodoList;
