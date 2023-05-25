import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APP_ENV } from "../../../../env";
import http from "../../../../http_common";
import { IProductSearchResult } from "../types";

const ProductsListPage = () => {

  const [searchResult, setSearchResult] = useState<IProductSearchResult>({
    total: 0,
    categoryName: "",
    pages: 0,
    currentPage: 0,
    products: [],
  });

  useEffect(() => {
    console.log("Working useEffect");
    //setLoading(true);
    http.get<IProductSearchResult>(`api/products/search`)
      .then(resp => {
        const {data} = resp;
        console.log("Server responce", data); 
        setSearchResult(data);
        //setList(data);
        //setLoading(false);
      });
  },[]);

  const {products} = searchResult; 

  const viewList = products.map((item) => {
    return (
      <tr key={item.id}>
        <th scope="row">{item.id}</th>
        <td>{item.name}</td>
        <td>
          {item.images.map(img => {
            return (
              <span key={img}>
                <img src={`${APP_ENV.BASE_URL}images/150_${img}`} alt="Якась фотка" width="75" />
              </span>
            );
          })}
        </td>
        <td>{item.categoryName}</td>
        <td>{item.description}</td>
      </tr>
    );
  });

    return (
      <>
        <h1 className="text-center">Продукти</h1>
        <Link to="/admin/products/create" className="btn btn-success">
          Додати
        </Link>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Назва</th>
              <th scope="col">Фото</th>
              <th scope="col">Категорія</th>
              <th scope="col">Опис</th>
            </tr>
          </thead>
          <tbody>{viewList}</tbody>
        </table>
      </>
    );
}
export default ProductsListPage;