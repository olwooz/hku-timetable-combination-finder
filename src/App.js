import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Timetable from "./routes/Timetable";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/timetable" element={<Timetable />} />
      </Routes>
    </Router>
  );
}

export default App;
