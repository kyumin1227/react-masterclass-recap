export interface IToDo {
  text: string;
  category: Categories;
  id: number;
}

// enum은 기본적으로 실제 표현 값은 숫자로 작동하지만 아래와 같이 값을 주면 해당 값으로 표현
export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}
