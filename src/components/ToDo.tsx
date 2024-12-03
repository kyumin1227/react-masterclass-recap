import React from "react";
import { IToDo } from "../types";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atom";

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const oldToDo = prev[targetIndex];
      const newToDo = { ...oldToDo, category: name as IToDo["category"] };

      return [...prev.slice(0, targetIndex), newToDo, ...prev.slice(targetIndex + 1)];
    });
  };
  return (
    <li>
      <span>{text}</span>
      {category !== "DOING" ? (
        <button name="DOING" onClick={onClick}>
          Doing
        </button>
      ) : null}
      {category !== "TO_DO" ? (
        <button name="TO_DO" onClick={onClick}>
          To Do
        </button>
      ) : null}
      {category !== "DONE" ? (
        <button name="DONE" onClick={onClick}>
          Done
        </button>
      ) : null}
    </li>
  );
};

export default ToDo;
