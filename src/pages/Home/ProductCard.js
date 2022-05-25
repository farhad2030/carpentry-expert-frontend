import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ data }) => {
  console.log(data);
  const { name, description, img, quantity, minOrderQuantity } = data;

  const navigate = useNavigate();
  const purchaseHandeler = () => {
    navigate("/purchase", { state: data });
  };
  return (
    <div class="card bg-base-100 shadow-2xl">
      <figure class="px-5 pt-5">
        <img src={img} alt="Shoes" class="rounded w-[200px] " />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">{name}</h2>
        <p>{description}</p>
        <p>Available quantity :{quantity}</p>
        <p>Minimum order Quantity : {minOrderQuantity}</p>
        <div class="card-actions">
          <button
            class="btn btn-primary"
            onClick={() => {
              purchaseHandeler();
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
