import React from "react";
import Search from "./components/Search";
import { useState } from "react";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <main>
      <div className="pattern">
        <div className="wrapper">
          <header>
            <h1>
              Find <span className="text-gradient"> Movies</span> You'll Enjoy
              Without the Hassel
            </h1>
          </header>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      </div>
    </main>
  );
};

export default App;
