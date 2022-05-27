import React from "react";

const Blog = () => {
  return (
    <div>
      <p className="text-3xl m-5">Some important Questions</p>

      <div class="card m-5  bg-primary text-primary-content">
        <div class="card-body">
          <h2 class="card-title">
            How will you improve the performance of a React Application?
          </h2>
          <p>
            <ol>
              <li>Keeping component state local where necessary.</li>
              <li>Keeping component state local where necessary.</li>
              <li>
                Memoizing React components to prevent unnecessary re-renders.
              </li>
            </ol>
          </p>
        </div>
      </div>
      <div class="card m-5  bg-primary text-primary-content">
        <div class="card-body">
          <h2 class="card-title">
            What are the different ways to manage a state in a React
            application?
          </h2>
          <p>
            <ol>
              <li>Local state (using setItems)</li>
              <li>Server State (using server)</li>
              <li>url State (using params or query</li>
            </ol>
          </p>
        </div>
      </div>
      <div class="card m-5  bg-primary text-primary-content">
        <div class="card-body">
          <h2 class="card-title">How does prototypical inheritance work?</h2>
          <p>
            The Prototypal Inheritance is a feature in javascript used to add
            methods and properties in objects. It is a method by which an object
            can inherit the properties and methods of another object.
          </p>
        </div>
      </div>
      <div class="card m-5  bg-primary text-primary-content">
        <div class="card-body">
          <h2 class="card-title">
            {`  Why you do not set the state directly in React. For example, if you
            have const [products, setProducts] = useState([]). Why you do not
            set products = [...] instead, you use the setProducts`}
          </h2>
          <p>ans</p>
        </div>
      </div>
      <div class="card m-5  bg-primary text-primary-content">
        <div class="card-body">
          <h2 class="card-title">
            You have an array of products. Each object has a name, price,
            description, etc. How will you implement a search to find products
            by name?
          </h2>
          <p>{`products.filter((product) => product.name == searchText)`}</p>
        </div>
      </div>
      <div class="card m-5  bg-primary text-primary-content">
        <div class="card-body">
          <h2 class="card-title">
            What is a unit test? Why should write unit tests?
          </h2>
          <p>
            Unit tests are typically automated tests written and run by software
            developers to ensure that a section of an application (known as the
            "unit") meets its design and behaves as intended
            <br></br>
            Unit testing allows software developers to actually think through
            the design of the software and what has to be done before they write
            the code.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Blog;
