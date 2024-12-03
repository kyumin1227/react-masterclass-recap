import { atom } from "recoil";
import { IToDo } from "./types";

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
});
