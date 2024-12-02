import React, { useState } from "react";
import { useForm } from "react-hook-form";

// const ToDoList = () => {
//   const [toDo, setTodo] = useState("");
//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setTodo(value);
//   };

//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(toDo);
//   };

//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input onChange={onChange} placeholder="Write a to do" value={toDo} />
//         <button>Add</button>
//       </form>
//     </div>
//   );
// };

interface IForm {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
  extraError?: string;
}

const ToDoList = () => {
  const { register, watch, handleSubmit, formState, setError } = useForm<IForm>({
    defaultValues: { email: "@naver.com" },
  });
  // form의 모든 값이 정상인 경우에만 실행
  const onValid = (data: IForm) => {
    if (data.password !== data.password1) {
      setError("password1", { message: "Password not match" }, { shouldFocus: true });
    }
    // setError("extraError", { message: "Server offline" });
  };
  // console.log(watch());
  console.log(formState.errors);

  return (
    <div>
      <form onSubmit={handleSubmit(onValid)} style={{ display: "flex", flexDirection: "column" }}>
        <input
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com email allowed",
            },
          })}
          placeholder="Email"
        />
        <span>{formState.errors?.email?.message}</span>
        <input
          {...register("firstName", {
            required: "Firstname is required",
            validate: {
              noKyumin: (value) => (value.includes("kyumin") ? "No kyumin allowed" : true),
              noNico: (value) => (value.includes("nico") ? "No nico allowed" : true),
            },
          })}
          placeholder="FirstName"
        />
        <span>{formState.errors?.firstName?.message}</span>
        <input {...register("lastName", { required: "Lastname is required" })} placeholder="LastName" />
        <span>{formState.errors?.lastName?.message}</span>
        <input {...register("username", { required: "Username is required", minLength: 10 })} placeholder="Username" />
        <span>{formState.errors?.username?.message}</span>
        <input {...register("password", { required: "Password is required", minLength: 5 })} placeholder="Password" />
        <span>{formState.errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password1 is required",
            minLength: {
              value: 5,
              message: "Password must have at least 5 characters",
            },
          })}
          placeholder="Password1"
        />
        <span>{formState.errors?.password1?.message}</span>
        <button>Add</button>
        <span>{formState.errors?.extraError?.message}</span>
      </form>
    </div>
  );
};

export default ToDoList;
