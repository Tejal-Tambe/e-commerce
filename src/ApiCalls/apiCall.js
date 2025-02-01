import axios from "axios";

export const getProductsList = async() => {
    const apiRes = await axios(`https://fakestoreapi.com/products`);
    return apiRes;
};

export const getCategoriesList = async() => {
    const apiRes = await axios(`https://fakestoreapi.com/products/categories`);
    return apiRes;
};