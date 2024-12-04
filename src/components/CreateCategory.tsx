import { useSetRecoilState } from "recoil";
import { categoryListState } from "../atom";
import { useForm } from "react-hook-form";

interface IForm {
  categoryList: string;
}

const CreateCategory = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setToDos = useSetRecoilState(categoryListState);

  const onValid = ({ categoryList }: IForm) => {
    setToDos((prev: { [key: string]: string }) => {
      const newCategoryList = { ...prev };
      const newCategory = categoryList.toUpperCase();
      newCategoryList[newCategory] = newCategory.toString();
      console.log(newCategoryList);

      localStorage.setItem("categoryList", JSON.stringify(newCategoryList));

      return newCategoryList;
    });
    setValue("categoryList", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input {...register("categoryList", { required: "Please write a Category" })} placeholder="Write a category" />
        <button>Add</button>
      </form>
    </>
  );
};

export default CreateCategory;
