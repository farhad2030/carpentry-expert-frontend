import React from "react";

const Portfolio = () => {
  return (
    <div className="bordered p-5 m-5 text-center">
      <p className="text-2xl "> MD Mazharul Islam Farhad</p>
      <p className="text ">Fulstack web developer</p>
      <p className="text ">mazharul383all@gmail.com</p>
      <p className="text ">01635069081</p>
      <p className="text ">Cumilla ,Bangladesh</p>

      <div class="divider"></div>
      <div className="text-left">
        <p className="text-2xl "> Education</p>
        <p className="text-xl ">
          Shahjalal University of Science and Technology 2019 – 2023 |<br></br>
          <p className="text-sm">
            Bachelor of Science in Mechanical engineering
          </p>
        </p>

        <div class="divider"></div>

        <p className="text-2xl "> Skills</p>
        <b>Frontend</b>
        <p>
          HTML5, CSS3, SCSS, Bootstrap4, Bootstrap5, TailwindCSS, Chakra UI,
          Material UI, React React Query
        </p>
        <b>Backend</b>
        <p> NodeJS, Express, Django</p>
        <b>Database</b>
        <p>MySQL, MongoDB, Django ORM</p>

        <div class="divider"></div>
      </div>
    </div>
  );
};

export default Portfolio;
