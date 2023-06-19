import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import { QueryClient, QueryClientProvider } from "react-query";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
// import CardsList from "./Components/CardsList";
import CardsList from "./Components/Shop/CardsList";
import AboutUs from "./Components/AboutUs";
import ViewCardsList from "./Components/ViewCardsList";
import LoginUser from "./Components/Login/LoginUser";
import SignUpUser from "./Components/SignIn/SignupUser";
import AddedIteams from "./Components/ShopCardAddedItems/AddedIteams";
import Paycheck from "./Components/Paycheck/Paycheck";
// import Shop from "../src/Components/Shop/ShoppingCart"
import TicketPage from "./Components/Paycheck/PaymentSucess/TicketPage";
import { Profile } from "./Components/CustomerProfile/Profile.jsx";
import ProductDetails from "./Components/ReactqueryComponent/ProductDetails";
import SigninQuery from "./Components/ReactqueryComponent/SigninQuery";
import LoginQuery from "./Components/ReactqueryComponent/LoginQuery";

import Grid from "./Components/CustomerProfile/Grid";

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ["/"]; // Specify the routes where the navbar should be hidden
  const hideNavbarRoutes1 = ["/signup"]; // Specify the routes where the navbar should be hidden
  const hideNavbarRoutes2 = ["/ticketPage"]; // Specify the routes where the navbar should be hidden

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
  const shouldHideNavbar1 = hideNavbarRoutes1.includes(location.pathname);
  const shouldHideNavbar2 = hideNavbarRoutes2.includes(location.pathname);
  const queryClient = new QueryClient();

  return (
    <>
      {!shouldHideNavbar && !shouldHideNavbar1 && !shouldHideNavbar2 && (
        <Navbar />
      )}

      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route exact path="/card" element={<CardsList />} />
          <Route path="/" element={<LoginUser />} />
          <Route path="/signup" element={<SignUpUser />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/viewcards/:id" element={<ViewCardsList />} />
          <Route path="/addedIteams" element={<AddedIteams />} />
          <Route path="/paycheck" element={<Paycheck />} />
          <Route path="/ticketPage" element={<TicketPage />} />
          <Route path="/grid" element={<Grid />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/productDetails" element={<ProductDetails />} />
          <Route path="/signinquery" element={<SigninQuery />} />
          <Route path="/loginquery" element={<LoginQuery />} />

        </Routes>
      </QueryClientProvider>

      {/* <Footer></Footer> */}
    </>
  );
}

export default App;
