const axios = require("axios");
require("dotenv").config();

const handleAddCart = async (req, res) => {
  try {
    let id = req.body.id;
    let size = req.body.size;
    const data = await axios.get(process.env.BASE_URL + `products/${id}`);
    let name = data.data.name;
    let price = data.data.price;
    let image = data.data.image;
    let count = 0;
    for (let i = 0; i < req.session.cart.length; i++) {
      if (req.session.cart[i].id == id) {
        req.session.cart[i].quantity += 1;
        count++;
      }
    }
    if (count === 0) {
      cart_data = {
        id: id,
        name: name,
        price: price,
        image: image,
        size: size,
        quantity: 1,
      };
      req.session.cart.push(cart_data);
    }
    console.log(req.session.cart);
    const referer = req.headers.referer;
    const previousUrl = new URL(referer);
    const previousPath = previousUrl.pathname;
    return res.redirect(previousPath);
  } catch (error) {
    console.log(error);
  }
};

const deleteCart = (req, res) => {
  let productId = req.params.id;
  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].id === productId) {
      req.session.cart.splice(i, 1);
    }
  }
  return res.redirect("/cart");
};

const upCart = (req, res) => {
  let productId = req.params.id;
  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].id === productId) {
      req.session.cart[i].quantity++;
    }
  }
  return res.redirect("/cart");
};

const deCart = (req, res) => {
  let productId = req.params.id;
  for (let i = 0; i < req.session.cart.length; i++) {
    if (req.session.cart[i].id === productId) {
      req.session.cart[i].quantity--;
      if (req.session.cart[i].quantity === 0) {
        req.session.cart.splice(i, 1);
      }
    }
  }
  return res.redirect("/cart");
};

module.exports = {
  handleAddCart,
  deleteCart,
  upCart,
  deCart,
};
