import React from "react";
import Container from "./container";
import vector1 from "../assets/vector1.png";

const Benefits = () =>  {
  return (
    <>
      <Container className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap ">
        <div
          className="flex items-center justify-center w-full">
          <div>
            <img
              src={vector1}
            />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Benefits;
