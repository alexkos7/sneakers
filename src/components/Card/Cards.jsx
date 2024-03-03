import React, { useState, useContext } from "react";
import AppContext from "../../Context";

import { Link } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../redux/reducers/cartReducer";
import { setFavoriteProducts } from "../redux/reducers/favoriteReducer";

function Cards({ id, title, price, imageUrl, favorited = false }) {
  const [isLiked, setIsLiked] = useState(favorited);

  const { handleOpenCart } = useContext(AppContext);

  const dispatch = useDispatch();

  const item = { id, title, price, imageUrl };

  const isInCart = useSelector((state) =>
    state.cart.cartItems.some((cartItem) => cartItem.id === item.id)
  );

  const isFavorited = useSelector((state) =>
    state.favorites.favoriteProducts.some(
      (favoriteItem) => favoriteItem.id === item.id
    )
  );

  React.useEffect(() => {
    localStorage.setItem("isFavorited", isFavorited);
  }, [isFavorited]);

  const handleAddToFavorites = () => {
    const item = { id, title, price, imageUrl };
    dispatch(setFavoriteProducts(item));
    setIsLiked(!isLiked);
  };

  React.useEffect(() => {
    localStorage.setItem("isInCart", isInCart);
  }, [isInCart]);

  const onAddToCart = () => {
    if (!isInCart) {
      dispatch(setCartItems(item));
    } else {
      handleOpenCart();
    }
  };

  return (
    <div className="card">
      <div className="favourite">
        <img
          onClick={handleAddToFavorites}
          src={isFavorited ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
          className="addFavorite"
          alt="Unliked"
        />
      </div>
      <Link to={`/product/${id}`}>
        <img src={imageUrl} className="sneakerImg" alt="Sneaker" />
        <h5>{title}</h5>
      </Link>
      <div className="cardBottom">
        <div className="cardBottomInfo">
          <span className="priceTitle">Цена:</span>
          <b className="price">{price} rub.</b>
        </div>
        <div className="btnAddGroup">
          <button className="btnAddCart" onClick={onAddToCart}>
            <span>{isInCart ? "Перейти" : "В корзину"}</span>
            <img
              className="plus"
              src={isInCart ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
              alt="Add"
            ></img>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;
