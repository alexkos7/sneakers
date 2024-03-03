import React from "react";
import { Link } from "react-router-dom";

const EmptyFavorites = () => {
  return (
    <div className="emptyBlock">
      <img src="/img/sad.png" alt="emoji"></img>
      <h1>Вы ничего не добавили в избранное</h1>
      <h2>Добавьте хотя бы один товар</h2>
      <Link to="/">
        <button className="buttonBack">
          <img src="/img/arrow.svg" alt="Arrow" /> Вернуться назад
        </button>
      </Link>
    </div>
  );
};

export default EmptyFavorites;
