import React, { useContext } from "react";

import { Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { deleteCartItem } from "./redux/reducers/cartReducer";
import AppContext from "../Context";

const CartItem = ({ imageUrl, title, price, id }) => {
  const dispatch = useDispatch();

  const { onClickCloseCart } = useContext(AppContext);

  const onClickDelete = () => {
    dispatch(deleteCartItem(id));
  };

  return (
    <div className="cartItem d-flex align-center mb-20">
      <>
        <Link to={`/product/${id}`} onClick={onClickCloseCart}>
          <div
            className="cartItemImg"
            style={{ backgroundImage: `url(${imageUrl})` }}
          ></div>
        </Link>
        <div className="mr-20 flex">
          <Link to={`/product/${id}`} onClick={onClickCloseCart}>
            <p className="mb-5">{title}</p>
            <b>{price} rub.</b>
          </Link>
        </div>
      </>
      <img
        className="removeBtn"
        src="/img/btn-remove.svg"
        alt="Remove"
        onClick={onClickDelete}
      />
    </div>
  );
};

export default CartItem;
