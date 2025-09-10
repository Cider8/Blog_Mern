import { Provider } from "react-redux";
import store from "./app/store";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";


export default function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Home />} />
        
      </Routes>
      <Toaster position="top-right" />
    </Provider>
  );
}
