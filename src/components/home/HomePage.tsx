import { useState } from "react";
import Slider from "./Slider";
import { ICategoryItem } from "./types";

const HomePage = () => {
  const [list, setList] = useState<ICategoryItem[]>([
    {
      id: 1,
      name: "Ноутбуки",
      image:
        "https://cdn.thewirecutter.com/wp-content/media/2022/10/laptopstopicpage-2048px-2029.jpg",
    },
  ]);

  // map - перебирає список елементів, як foreach, але при цьому він повертає розмітку (можна використовувати return)
  // key - є обов'язковим, тому, що коли буде порівнюватися Virtual DOM і фактичний дом на сторінці 
  //- будуть виникати помилки по відображеню елементів, бо не буде зрозуміло, як кожен із елементів відрізняється між собою
  const viewList = list.map((item) => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>
          <img src={item.image} alt="Якась фотка" width="75" />
        </td>
        <td>{item.name}</td>
      </tr>
    );
  });

  return (
    <>
      <Slider />
      <h1 className="text-center">Головна сторінка</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Фото</th>
            <th scope="col">Назва</th>
          </tr>
        </thead>
        <tbody>
          {viewList}
        </tbody>
      </table>
    </>
  );
};

export default HomePage;
