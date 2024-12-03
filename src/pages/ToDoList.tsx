import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { toDoState } from "../atom";

interface IForm {
  toDo: string;
}

const ToDoList = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(toDoState);

  const onSubmit = ({ toDo }: IForm) => {
    setToDos((prev) => [...prev, { text: toDo, category: "TO_DO", id: Date.now() }]);
    setValue("toDo", "");
  };

  console.log(toDos);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("toDo", { required: "Please write a To Do" })} placeholder="Write a to do" />
        <button>Add</button>
      </form>
      <ul>
        {toDos.map((toDo) => {
          return <li key={toDo.id}>{toDo.text}</li>;
        })}
      </ul>
    </div>
  );
};

export default ToDoList;
