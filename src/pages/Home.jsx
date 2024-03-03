import React, { useState } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { useDispatch, useSelector } from "react-redux";
import { fetchSneakers } from "../components/redux/reducers/sneakersReducer";

import Cards from "../components/Card/Cards";
import Sort from "../components/Sort";

const Home = () => {
  const [animate] = useAutoAnimate();

  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const sortType = useSelector((state) => state.filter.sort.sortProperty);

  const items = useSelector((state) => state.sneakers.items);

  React.useEffect(() => {
    try {
      dispatch(fetchSneakers({ sortType }));
    } catch (error) {
      console.log(error);
    }
  }, [sortType, dispatch]);
  return (
    <div className="content">
      <div className="contentItems d-flex align-center mb-40">
        <h1>Все кроссовки</h1>
      </div>
      <div className="filterGroup">
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            placeholder="Поиск..."
          />
        </div>
        <Sort />
      </div>

      <div className="cardsGroup" ref={animate}>
        {items
          .filter((obj) => {
            return obj.title.toLowerCase().includes(searchValue.toLowerCase());
          })
          .map((obj) => (
            <Cards key={obj.id} {...obj} />
          ))}
      </div>
    </div>
  );
};

export default Home;
