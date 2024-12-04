import React from "react";
import { IToDo } from "../types";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryListState, toDoState } from "../atom";

const ToDo = ({ text, category, id }: IToDo) => {
  const setToDos = useSetRecoilState(toDoState);
  const categoryList = useRecoilValue(categoryListState);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    setToDos((prev) => {
      const targetIndex = prev.findIndex((toDo) => toDo.id === id);
      const oldToDo = prev[targetIndex];
      const newToDo = { ...oldToDo, category: name };

      const newToDos = [...prev.slice(0, targetIndex), newToDo, ...prev.slice(targetIndex + 1)];
      localStorage.setItem("toDos", JSON.stringify(newToDos));

      return newToDos;
    });
  };
  return (
    <li>
      <span>{text}</span>
      {Object.keys(categoryList).map((key) =>
        category !== key ? (
          <button key={key} name={key} onClick={onClick}>
            {key}
          </button>
        ) : null
      )}
    </li>
  );
};

export default ToDo;
