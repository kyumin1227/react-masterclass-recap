import { atom, selector } from "recoil";
import { Categories, IToDo } from "./types";

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: JSON.parse(localStorage.getItem("toDos") || "[]") as IToDo[],
});

export const categoryState = atom<IToDo["category"]>({
  key: "category",
  default: "TO_DO",
});

export const categoryListState = atom<Object>({
  key: "categoryList",
  default: JSON.parse(localStorage.getItem("categoryList") || JSON.stringify(Categories)),
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});

export const clickBoxState = atom<string>({
  key: "clickBoxLayoutId",
  default: "",
});
