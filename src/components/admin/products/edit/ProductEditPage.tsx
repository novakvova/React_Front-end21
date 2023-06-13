import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import http from "../../../../http_common";
import { ICategorySelect, IProductEdit } from "../types";
import * as yup from "yup";
import { useFormik } from "formik";
import InputGroup from "../../../common/InputGroup";

const ProductEditPage = () => {
  const { id } = useParams();
  //Зберігаємо списко категорій
  const [categories, setCategories] = useState<ICategorySelect[]>([]);

  useEffect(() => {
    //Посилаємо запит на сервер по список категорій для тега select
    http.get<ICategorySelect[]>("api/categories/list").then((resp) => {
      setCategories(resp.data);
      //console.log("categories", resp.data);
    });
    console.log("Get data view Product edit", id);
  }, [id]);

  //створили конкретни екземлеяр на основі нашого інтерфейсу
  const init: IProductEdit = {
    id: id,
    name: "",
    priority: 0,
    categoryId: 0,
    description: "",
    ids: [],
    price: 0,
  };

  //Дані, які приходять після валіації із форміка
  const onFormikSubmit = async (values: IProductEdit) => {
    //Вивовдимо дані на консоль, щоб їх побачить
    console.log("Formik submit data", values);
  };

  //Схема валідації даних
  const validSchema = yup.object({
    name: yup.string().required("Вкажіть назву"), //валідуємо назву товару
    priority: yup
      .number()
      .min(1, "Пріорітет має бути більшим 0")
      .required("Вкажіть пріорітет"), //перевіряємо пріорітет
    categoryId: yup.number().min(1, "Вкажіть категорію"), //Має бути обрана категорія
    description: yup.string().required("Вкажіть опис"), //Має бути опис у товару
    price: yup.string().required("Вкажіть ціну"), //має бути ціна товару
    ids: yup
      .array()
      .of(yup.number())
      .min(1, "Мінімального одна фотка для товару")
      .required("Оберіть хочаб одне фото"), //перевіряємо чи масив має елементи
  });

  //створюємо formik
  const formik = useFormik({
    initialValues: init, //початкові налаштування для полів
    onSubmit: onFormikSubmit, //метод, який спрацьовує, коли усі дані у форміку валідні
    validationSchema: validSchema, //схема валідації даних
  });

  const {
    values, //отримуємо доступ до полів у форміку
    touched, //Відстлідковує подію виклику методу handleSubmit
    errors, //Містить набері помилок для сервака
    handleSubmit, //метод, який спрацьовує на форміку для валідації даних і якщо вони валідні то буде спрацьосувать onFormikSubmit
    handleChange, //метод, який відслідковує зміни значення полів у формі
    setFieldValue, //можна задавати значення полів через іменовані параметри (імя поля, значення)
  } = formik; //сам об'єкт із якого ми витягуємо потрібні властивості форми

  return (
    <>
      <h1 className="text-center">Зміна продукта</h1>
      {/* Форма, яка зберігає значення усіх полів */}
      <form onSubmit={handleSubmit} className="col-md-10 offset-md-1">
        {/* Значення - Назва товару */}
        <InputGroup
          label="Назва"
          field="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          touched={touched.name}
        />
        {/* Пріорітет - Отримує від користувача пріорітет */}
        <InputGroup
          label="Пріорітет"
          field="priority"
          value={values.priority}
          onChange={handleChange}
          error={errors.priority}
          touched={touched.priority}
          type={"number"}
        />
      </form>
    </>
  );
};

export default ProductEditPage;
