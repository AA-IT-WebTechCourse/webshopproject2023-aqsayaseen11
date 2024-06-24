import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../utils/UserContext";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

const Header = () => {
  const { user, logoutUser } = useContext(UserContext);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handlePopulateDatabase = async () => {
    try {
      await api.get("/populate-database");
      navigate("/shop");
      enqueueSnackbar("Database has been populated successfully!", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar("Please try again!", {
        variant: "error",
      });
    }
  };
  return (
    <nav class="navbar navbar-expand-lg navbar-light">
      <div class="container">
        <Link class="navbar-brand" to="/shop">
          My Shop
        </Link>
        <div class="collapse navbar-collapse row" id="navbarNav">
          <ul class="navbar-nav ml-auto col">
            <li class="nav-product active">
              <Link class="nav-link" to="/shop">
                Shop
              </Link>
            </li>
            <li class="nav-product">
              <Link class="nav-link" to="/myitems">
                My products
              </Link>
            </li>
            <li class="nav-product">
              <Link class="nav-link" to="/account">
                Account
              </Link>
            </li>
          </ul>
          <div className="col-3" />
          <ul className="col row">
            {!user ? (
              <>
                <li class="nav-product col">
                  <Link class="btn btn-outline-primary ml-2" to="/signup">
                    Signup
                  </Link>
                </li>
                <li class="nav-product col">
                  <Link class="btn btn-primary ml-2" to="/login">
                    LOGIN
                  </Link>
                </li>
              </>
            ) : (
              <li class="nav-product col">
                <button
                  class="btn btn-danger ml-2"
                  onClick={() => logoutUser()}
                >
                  LOGOUT
                </button>
              </li>
            )}
            <li class="nav-product col">
              <button
                class="btn btn-warning ml-2 text-nowrap"
                onClick={() => handlePopulateDatabase()}
              >
                POPULATE DB
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
