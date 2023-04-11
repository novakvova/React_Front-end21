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

  const viewList = list.map((item) => (
    <tr key={item.id}>
      <th scope="row">{item.id}</th>
      <td>
        <img src={item.image} alt="Якась фотка" width="75" />
      </td>
      <td>{item.name}</td>
    </tr>
  ));

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
