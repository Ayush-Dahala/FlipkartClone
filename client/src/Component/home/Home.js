import { Box, styled } from "@mui/material";
import React, { useEffect } from "react";
import { getProducts } from "../../Redux/action/ProductsAction";
import Banner from "./Banner";
import Navbar from "./Navbar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Slide from "./Slide";
import MidSlide from "./MidSlide";
import MidSection from "./MidSection";

const Component = styled(Box)`
  padding: 10px;
  background: #f2f2f2;
`;

const Home = () => {
  const getProduct = useSelector((state) => state.getProducts);
  const { products } = getProduct;
  console.log(products);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <Navbar />
      <Component>
        <Banner />
        {products && <MidSlide products={products} title="Deal of the Day" timer={true} />}
        {products && <MidSection/>}
        {products && <Slide products={products} title="Discount for you" timer={false}/>}
        {products && <Slide products={products} title="Suggesting Items" timer={false}/>}
        {products && <Slide products={products} title="Recommended Items" timer={false}/>}
        {products && <Slide products={products} title="Trending Offers" timer={false}/>}
        {products && <Slide products={products} title="Season's top picks" timer={false}/>}

      </Component>
    </>
  );
};

export default Home;
