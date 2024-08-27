import React from "react";
import ReactDOM from "react-dom/client"; // Import the 'react-dom/client'
import App from "./app";

function Main() {
  return <App />;
}

const rootElement = document.getElementById("root"); // Get the DOM element to mount the app
const root = ReactDOM.createRoot(rootElement); // Create the root with the DOM element

root.render(<Main />); // Render the Main component into the root
