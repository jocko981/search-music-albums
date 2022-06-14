// styles
import "./App.css";
// components
import SearchBar from "./components/SearchBar";
import List from "./components/List";

function App() {

  return (
    <div className="App">
      <div className="container">
        <header>
          <h1>Search for music albums:</h1>
          <SearchBar />
        </header>
        <List />
      </div>
    </div>
  );
}

export default App;
