import React from "react";
import Header from "../../components/Header/Header";
import HeroBanner from "../../components/HeroBanner/HeroBanner";
import "./HomePage.css"
import ProductCard from "../../components/ProductCard/ProductCard";

function HomePage() {
  return (
    <div className="Home-Page">
      <div className="headersection">
        <Header />
      </div>
      <div className="herosection">
        <HeroBanner />
      </div>
      <div className="featuredsection">
        <ProductCard />
      </div>

    </div>
  );
}

export default HomePage;
