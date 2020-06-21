import React, { useState } from "react";
import axios from "axios";

import addSvg from "../../assets/img/add.svg";
import "./Tasks.scss";

const AddTasksForm = ({ list, onAddTask }) => {
  const [visibleForm, setVisibleForm] = useState(false);
  const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

  const toggleFormVisisble = () => {
    setVisibleForm(!visibleForm);
    setInputValue("");
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false,
    };
    setIsLoading(true);
    axios.post("http://localhost:3001/tasks", obj).then(({ data }) => {
      console.log(data);
      onAddTask(list.id, data);
      toggleFormVisisble();
    }).finally(()=>{
        setIsLoading(false);
    });
  };
  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisisble} className="tasks__form-new">
          <img src={addSvg} alt="Add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="tasks__form-block">
          <input
            value={inputValue}
            className="field"
            type="text"
            placeholder="Название списка"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button disabled={isLoading} onClick={addTask} className="button">
            {isLoading ? "Добавление..." : " Добавить задачу"}
          </button>
          <button onClick={toggleFormVisisble} className="button button--grey">
            Отмена
          </button>
        </div>
      )}
    </div>
  );
};

export default AddTasksForm;
