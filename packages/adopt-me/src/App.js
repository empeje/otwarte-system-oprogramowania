import React from "react";
import { render } from "react-dom";
import pf from "petfinder-client";
import Pet from "./Pet";

const petFinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class App extends React.Component {
  componentDidMount() {
    const promise = petFinder.breed.list({ animal: "dog" });
    promise.then(console.log, console.error);
  }
  render() {
    return (
      <div>
        <h1>Adopt me!</h1>
        <Pet name="Luna" animal="dog" breed="Havanese" />
        <Pet name="Pepper" animal="bird" breed="Cocktiel" />
        <Pet name="Doink" animal="cat" breed="Mixed" />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
