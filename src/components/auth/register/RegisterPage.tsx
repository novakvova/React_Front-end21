import { ChangeEvent, useState } from "react";
import { IRegisterPage, ISelectItem } from "./types";

const RegisterPage = () => {
  //створили конкретни екземлеяр на основі нашого інтерфейсу
  const init: IRegisterPage = {
    email: "",
    password: "",
    image: null,
    countryId: 0,
  };

  //При зміни значення елемента в useState компонент рендериться повторно і виводить нові значення
  const [data, setData] = useState<IRegisterPage>(init);

  const [countries, setCountries] = useState<ISelectItem[]>([
    {
      id: 1,
      name: "Україна",
    },
    {
      id: 2,
      name: "Польща",
    },
    {
      id: 3,
      name: "Амерка USA",
    },
  ]);

  console.log("Render Login component", "------SALO----");

  //console.log("Дестурктуризація", {...data, password: "123456"});

  const onSubmitHandler = (e: any) => {
    e.preventDefault();
    console.log("Ми відправляємо на сервер", data);
    //setData({email: "pylyp", password: "123456"});
  };

  const onChangeHandler = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    //console.log("Щось вводити в інтпут");
    //console.log(e.target.name, e.target.value);
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const file = files[0];
      console.log("Ви обрали файл", file);
      setData({ ...data, [e.target.name]: file });
    }
    e.target.value = "";
  };

  const viewCountriesOption = countries.map((country, index) => (
    <option key={index} value={country.id}>
      {country.name}
    </option>
  ));
  return (
    <>
      <h1 className="text-center">Реєстрація на сайт</h1>
      <form onSubmit={onSubmitHandler} className="col-md-6 offset-md-3">
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Електронна адраса
          </label>
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={data.email}
            onChange={onChangeHandler}
            aria-describedby="emailHelp"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="countryId" className="form-label">
            Країна
          </label>
          <select
            className="form-select"
            name="countryId"
            id="countryId"
            onChange={onChangeHandler}
          >
            <option>Оберіть країну</option>
            {viewCountriesOption}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">
            {data.image == null ? (
              <img
                src="https://i.insider.com/63fb81d984099d001960d513?width=1136&format=jpeg"
                style={{ cursor: "pointer" }}
                width="200"
              />
            ) : (
              <img
                src={URL.createObjectURL(data.image)}
                style={{ cursor: "pointer" }}
                width="200"
              />
            )}
          </label>
          <input
            type="file"
            className="d-none"
            id="image"
            name="image"
            onChange={onChangeFileHandler}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Пароль
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            onChange={onChangeHandler}
            value={data.password}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Реєстрація
        </button>
      </form>
    </>
  );
};

export default RegisterPage;
