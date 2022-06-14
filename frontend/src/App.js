import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import HomePage from "./HomePage";
import Signup from "./Signup";
import Signin from "./Signin";

const App = () => {
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" element={<HomePage />} />

          <Route exact path="/:signup" element={<Signup />} />

          <Route exact path="/signin" element={<Signin />} />
          
        </Routes>
      </Router>
    </div>
  );
};
export default App;
