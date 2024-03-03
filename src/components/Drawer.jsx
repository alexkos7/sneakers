import React, { useState, useContext } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useDispatch, useSelector } from "react-redux";
import { selectCart, removeAllItems } from "./redux/reducers/cartReducer";

import CartItem from "./CartItem";
import Info from "./Info";
import AppContext from "../Context";

function Drawer() {
  const [animate] = useAutoAnimate();

  const { totalPrice } = useSelector(selectCart);
  const { onClickCloseCart } = useContext(AppContext);

  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.cartItems);

  const taxCount = totalPrice / 0.05;

  const [isOrderComplete, setIsOrderComplete] = useState(false);

  const onClickOrder = () => {
    setIsOrderComplete(true);
    dispatch(removeAllItems());
  };

  return (
    <div className="overlay">
      <div className="drawer" ref={animate}>
        <h2>
          Корзина
          <img
            className="removeBtn"
            src="/img/btn-remove.svg"
            alt="Close"
            onClick={onClickCloseCart}
          />
        </h2>

        {cartItems.length > 0 ? (
          <div className="itemsBlock">
            <div className="items" ref={animate}>
              {cartItems.map((item) => {
                return <CartItem key={item.id} {...item} />;
              })}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>
                    {totalPrice > 0 ? totalPrice.toFixed(3) : totalPrice} rub.{" "}
                  </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{taxCount > 0 ? taxCount.toFixed(2) : taxCount} rub. </b>
                </li>
              </ul>
              <button className="greenButton" onClick={onClickOrder}>
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            onClickCloseCart={onClickCloseCart}
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"}
            description={
              isOrderComplete
                ? "Ваш заказ скоро будет передан курьерской доставке"
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={
              isOrderComplete ? "/img/order-success.png" : "/img/cart-empty.png"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
