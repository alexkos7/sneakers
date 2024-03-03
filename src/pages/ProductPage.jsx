import React, { useEffect, useState, useContext, CSSProperties } from "react";
import PuffLoader from "react-spinners/PuffLoader";

import { useAutoAnimate } from "@formkit/auto-animate/react";

import AppContext from "../Context";
import { useDispatch, useSelector } from "react-redux";
import { setCartItems } from "../components/redux/reducers/cartReducer";

import styles from "./ProductPage.module.scss";

import axios from "axios";

import { useParams } from "react-router-dom";

const ProductPage = () => {
  const [sneakers, setSneakers] = useState();
  const { id } = useParams();

  const [animate] = useAutoAnimate();

  const { handleOpenCart } = useContext(AppContext);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetch() {
      try {
        const { data } = await axios.get(
          "https://659bd21ed565feee2dabcad0.mockapi.io/items/" + id
        );
        setSneakers(data);
      } catch (err) {
        return err;
      }
    }
    fetch();
  }, [id]);

  const isInCart = useSelector((state) =>
    state.cart.cartItems.some((cartItem) => cartItem.id === id)
  );

  React.useEffect(() => {
    localStorage.setItem("isInCart", isInCart);
  }, [isInCart]);

  const onAddToCart = () => {
    if (!isInCart) {
      dispatch(setCartItems(sneakers));
    } else {
      handleOpenCart();
    }
  };

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
    paddingTop: "500px",
    marginTop: "200px",
  };

  return (
    <div className={styles.root} ref={animate}>
      {sneakers ? (
        <div className={styles.container}>
          <div className={styles.productInfo_left}>
            <img src={sneakers.imageUrl} alt="" />
          </div>
          <div className={styles.productInfo_right}>
            <h1 className={styles.productInfo_title}>{sneakers.title}</h1>
            <div className={styles.price_block}>
              <p className={styles.price_title}>Цена: </p>
              <p className={styles.price}>{sneakers.price} rub.</p>
            </div>
            <p className={styles.productInfo_right_desc}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cum eum
              sunt nulla illum nisi iusto, accusantium molestias vel labore
              placeat magnam architecto reiciendis eius omnis necessitatibus
              quasi explicabo laboriosam consequuntur odit iure earum! Doloribus
              labore voluptatum consequuntur iure a. Quo excepturi quasi hic
              voluptates repellendus fuga! Magnam, autem. Eveniet commodi
              voluptates adipisci illum perferendis similique et nobis veritatis
              incidunt soluta.
            </p>
            <button className="greenButton" onClick={onAddToCart}>
              <span>
                {isInCart ? "Перейти в корзину" : "Добавить в корзину"}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <PuffLoader cssOverride={override} color="#1d1e1d" size={60} />
      )}
    </div>
  );
};

export default ProductPage;
