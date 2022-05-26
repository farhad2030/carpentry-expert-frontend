import React from "react";
import { useQuery } from "react-query";
import Loading from "../../sheared/Loading";

const ReviewSection = () => {
  const {
    data: rewiews,
    isLoading,
    refetch,
  } = useQuery("reviews", () =>
    fetch(`http://localhost:5000/reviews`).then((res) => res.json())
  );
  if (isLoading) return <Loading />;
  return (
    <div className="m-5 py-5">
      <h1 className="text-2xl m-4  ">Our client Review </h1>
      <div className="grid grid-cols-3 gap-4">
        {rewiews.map((review) => {
          return <ReviewCard review={review} />;
        })}
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => {
  return (
    <>
      <div class="card  bg-base-100 text-neutral-content shadow-2xl">
        <div class="card-body items-center text-center">
          {/* <h2 class="card-title">Cookies!</h2> */}
          <p>{review?.review}</p>
          <div class="card-actions justify-end"></div>
        </div>
      </div>
    </>
  );
};

export default ReviewSection;
