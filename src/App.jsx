import React from "react";
import Search from "./components/Search";

const App = () => {
  const [searchterm, setSearchterm] = useState("");
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
          <Search />
        </div>
      </div>
    </main>
  );
};

export default App;
