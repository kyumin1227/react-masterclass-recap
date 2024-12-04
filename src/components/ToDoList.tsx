import { useRecoilState, useRecoilValue } from "recoil";
import { categoryListState, categoryState, toDoSelector } from "../atom";
import CreateToDo from "./CreateToDo";
import React from "react";
import ToDo from "./ToDo";
import { IToDo } from "../types";
import CreateCategory from "./CreateCategory";

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const categoryList = useRecoilValue(categoryListState);
  const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
    setCategory(e.currentTarget.value as IToDo["category"]);
  };

  console.log(toDos);

  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        {Object.keys(categoryList).map((key) => (
          <option key={key} value={key}>
            {key}
          </option>
        ))}
      </select>
      <CreateToDo />
      <CreateCategory />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
};

export default ToDoList;
