import React from "react";
import { Categories, IToDo } from "../types";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atom";

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const oldToDo = prev[targetIndex];
      const newToDo = { ...oldToDo, category: name as Categories };

      return [...prev.slice(0, targetIndex), newToDo, ...prev.slice(targetIndex + 1)];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== Categories.DOING ? (
        <button name={Categories.DOING} onClick={onClick}>
          Doing
        </button>
      ) : null}
      {category !== Categories.TO_DO ? (
        <button name={Categories.TO_DO} onClick={onClick}>
          To Do
        </button>
      ) : null}
      {category !== Categories.DONE ? (
        <button name={Categories.DONE} onClick={onClick}>
          Done
        </button>
      ) : null}
    </li>
  );
};

export default ToDo;
