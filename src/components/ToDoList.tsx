import { useRecoilValue } from "recoil";
import { toDoSelector } from "../atom";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

const ToDoList = () => {
  const [toDos, doing, done] = useRecoilValue(toDoSelector);

  console.log(toDos);

  return (
    <div>
      <CreateToDo />
      <hr />
      <h2>To Do</h2>
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Doing</h2>
      <ul>
        {doing.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
      <h2>Done</h2>
      <ul>
        {done.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
      <hr />
    </div>
  );
};

export default ToDoList;
