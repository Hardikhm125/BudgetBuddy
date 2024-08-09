/* eslint-disable react/jsx-no-target-blank */
import { MDBFooter } from "mdb-react-ui-kit";
import Logo from '../assets/Logo.png';

export const Footer = () => {
  return (
    <MDBFooter bgColor="dark" className="text-white text-center">
      <section className="p-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12 mb-4">
              <p className="display-6">
                <a
                  href=""
                  target="_blank"
                  className="d-inline-flex align-items-center text-white text-decoration-none"
                >
                  <img
                    src={Logo}
                    alt="logo"
                    className="rounded-circle me-3"
                    style={{ height: "60px", width: "60px" }}
                  />
                  BudgetBuddy
                </a>
              </p>
              <p>
                Welcome to BudgetBuddy, where we revolutionize the way
                businesses manage and track employee expenses.
              </p>
            </div>
          </div>
        </div>
      </section>
    </MDBFooter>
  );
};
