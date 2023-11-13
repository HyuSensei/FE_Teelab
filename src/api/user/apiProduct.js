const axios = require("axios");
require("dotenv").config();

const getProductHome = async (req, res) => {
  try {
    const data_product_aothun = await axios.get(
      process.env.BASE_URL + "products/ao_thun"
    );
    const data_product_polo = await axios.get(
      process.env.BASE_URL + "products/polo"
    );
    res.render("user/home.ejs", {
      ao_thun: data_product_aothun.data.product,
      polo: data_product_polo.data.product,
    });
  } catch (error) {
    console.log(error);
  }
};

const getProductDetail = async (req, res) => {
  try {
    let id = req.params.id;
    const data = await axios.get(process.env.BASE_URL + `products/${id}`);
    return res.render("user/detail.ejs", {
      product: data.data,
    });
  } catch (error) {
    console.log(error);
  }
};
const getProductSearch = async (req, res) => {
  try {
    const product_name = req.query.product_name;
    const page = req.query.page || 1;
    const url = process.env.BASE_URL + `products/search/${product_name}`;
    const params = {
      page,
    };
    let data = await axios.get(url, { params });
    let products = data.data.products;
    return res.render("user/search.ejs", {
      products: products,
      total_page: data.data.total_page,
      product_name: product_name,
      current_page: data.data.current_page,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getProductHome,
  getProductDetail,
  getProductSearch,
};
