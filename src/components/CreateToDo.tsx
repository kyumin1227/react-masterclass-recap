import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atom";

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);

  const onValid = ({ toDo }: IForm) => {
    setToDos((prev) => {
      const newToDos = [...prev, { text: toDo, category: category, id: Date.now() }];
      localStorage.setItem("toDos", JSON.stringify(newToDos));
      return newToDos;
    });
    setValue("toDo", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", { required: "Please write a To Do" })} placeholder="Write a to do" />
        <button>Add</button>
      </form>
    </>
  );
};

export default CreateToDo;
