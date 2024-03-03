import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import styles from "./Favorite.module.scss";

import Cards from "../components/Card/Cards";
import EmptyFavorites from "./EmptyFavorites";

import { useSelector } from "react-redux";

const Favorite = () => {
  const [animate] = useAutoAnimate();

  const favoriteItems = useSelector(
    (state) => state.favorites.favoriteProducts
  );

  return (
    <div className={styles.root}>
      <div className="content" ref={animate}>
        <div className="contentItems d-flex align-center mb-40">
          <h1>Избранное</h1>
          <img
            className="heartSvg"
            alt="like"
            src="./img/heart-liked.svg"
          ></img>
        </div>
        {favoriteItems.length > 0 ? (
          <div className="cardsGroup" ref={animate}>
            {favoriteItems.map((obj) => (
              <Cards key={obj.id} {...obj} favorited={true} />
            ))}
          </div>
        ) : (
          <EmptyFavorites />
        )}
      </div>
    </div>
  );
};

export default Favorite;
