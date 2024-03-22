import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);

  useEffect(() => {
    if (todos && todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  function handleAdd() {
    settodos([...todos, { todo, isCompleted: false }]);

    settodo("");
    // saveToLS();
  }

  function handleEdit(e, index) {
    // step1:- edit

    let editTodo = todos.filter((item, id) => {
      return id === index;
    });

    // console.log(editTodo);

    settodo(editTodo[0].todo);

    // step2:- update and save dry run

    let newTodos = todos.filter((item, id) => id !== index);
    settodos(newTodos);

    // saveToLS();
  }

  function handleDelete(e, index) {
    let flag = confirm("Are you sure you want to delete");

    if (flag == true) {
      let newTodos = todos.filter((item, id) => id !== index);
      settodos(newTodos);
    }
    // saveToLS();
  }

  function handleChange(e) {
    settodo(e.target.value);
    // console.log(e.target.value);
  }
  // console.log(todo);

  const handleCheckbox = (e) => {
    let index = e.target.name;
  
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    settodos(newTodos);
    // saveToLS();
  };

  const handleDeleteAll = (e) => {
    let flag = confirm("Are you sure you want to delete");
    if (flag == true) {
      let newTodos = [];
      settodos(newTodos);
    }
  };

  return (
    <>
      <Navbar></Navbar>

      <div className="my-5 h-[80vh] w-[80%] mx-auto bg-purple-100 rounded-md">
        <div className="mx-4 py-8 ">
          <h1 className="font-bold">Add a Todo</h1>
          <input
            onChange={handleChange}
            value={todo}
            className="w-[50%]  "
            type="text"
          />
          <button
            onClick={handleAdd}
            className="p-2 bg-green-600 text-white rounded-md ml-5 text-white text-xs "
          >
            Add
          </button>
        </div>

        <h1 className="mx-4 font-bold">Your Todos</h1>

        {todos.length === 0 && (
          <img
            className="ml-[20%] mt-[2%] w-[40%] h-[65%] p-2"
            src="public\empty_todolist.gif"
            alt=""
          />
        )}

        {todos.map((item, index) => {
          return (
            <div className="Todos">
              <div className="flex mx-4 justify-between w-[40%] items-center ">
                <div className="flex gap-5">
                  <input
                    name={index}
                    onChange={(e) => {
                      handleCheckbox(e);
                    }}
                    type="checkbox"
                    checked={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : ""}>
                    {item.todo}
                  </div>
                </div>

                <div className="flex gap-4 ml-4 m-2">
                  <button
                    onClick={(e) => {
                      handleEdit(e, index);
                    }}
                    className="bg-yellow-200 border border-yellow-500 p-1 rounded-md text-xs text-zinc-800"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, index);
                    }}
                    className="bg-red-400 border border-red-500 p-1 rounded-md text-xs text-zinc-800"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <hr className=" text-red-400" />
            </div>
          );
        })}

        {todos.length > 0 && (
          <button
            onClick={handleDeleteAll}
            className="p-2 bg-blue-600 mt-4 text-white rounded-md ml-5 text-white text-xs"
          >
            Delete All
          </button>
        )}
      </div>
    </>
  );
}

export default App;
