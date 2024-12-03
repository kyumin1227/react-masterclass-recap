import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { toDoState } from "../atom";

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(toDoState);

  const onValid = ({ toDo }: IForm) => {
    setToDos((prev) => [...prev, { text: toDo, category: "TO_DO", id: Date.now() }]);
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
