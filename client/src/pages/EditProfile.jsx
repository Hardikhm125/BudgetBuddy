import main_bg from "../assets/project-dashboard/main-bg.jpg";
import Profile_pic from "../assets/MyProfile-img/Profile.png";
import { Hamburger2 } from "../components/Hamburger_2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUserEdit, faEnvelopeOpenText } from "@fortawesome/free-solid-svg-icons";
import "../styles/Profile.css";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Loading } from "../components/Loading";
import { useEffect } from "react";
import { editEmployeeProfile, editManagerProfile, reset } from "../features/auth/authSlice";

export const EditProfile = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isSuccess, isLoading, isError, appErr, serverErr } = useSelector((state) => state.auth);

  const formSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First Name must be at least 2 characters")
      .max(24, "First Name must not exceed 24 characters")
      .matches(
        /^[A-Z][a-z]*$/,
        "First Name must start with a capital letter and contain only letters"
      )
      .required("First Name is required").trim(),
      lastName: Yup.string()
      .min(2, "Last Name must be at least 2 characters")
      .max(24, "Last Name must not exceed 24 characters")
      .matches(
        /^[A-Z][a-z]*$/,
        "Last Name must start with a capital letter and contain only letters"
      )
      .required("Last Name is required").trim(),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required").trim(),
    dob: Yup.date().required("Birth Date is required"),
    contactNo: Yup.string()
      .matches(/^[6-9]\d{9}$/, "Contact Number must be 10 digits long and start with 9,8,7,6 only")
      .required("Contact Number is required")
      .trim(),  });

  const formik = useFormik({
    initialValues: {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      dob: user?.dob.substring(0, 10),
      contactNo: user?.contactNo,
    },
    onSubmit: (values) => {
      
      if (user?.role == "employee")
        dispatch(editEmployeeProfile(values));
      
      else if (user?.role == "manager")
        dispatch(editManagerProfile(values));
    },
    validationSchema: formSchema,
  });

  useEffect(() => {
    
    const handleBeforeUnload = (e) => {
        const confirmationMessage = "Are you sure you want to leave? Your changes may not be saved.";
        e.returnValue = confirmationMessage;
        return confirmationMessage;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };

  }, []);

  useEffect(() => {

    if (isSuccess) 
    {
      toast.success("Profile Updated Successfully!");      
      setTimeout(() => {
        dispatch(reset());
        navigate('/profile');
      }, 20);

    }

    if (isError) 
    {
      toast.error(appErr || serverErr);
      dispatch(reset());
    }

  }, [dispatch, isSuccess, isError, appErr, serverErr, navigate]);

  if (isLoading) 
  {
    return (
      <Loading />
    )
  }

  return (
    <div
      className="container-fluid px-3 py-3"
      style={{ backgroundImage: `url(${main_bg})`, backgroundRepeat: "repeat" }}
    >
      <div className="row">
        <div className="col-md-3">
          <Hamburger2 />
        </div>
        <div className="col-md-8 mx-5 rounded rounded-3 bg-light">
          <div
            className="me-5"
            style={{
              marginTop: "20px",
              marginLeft: "10px",
              marginRight: "10px",
              marginBottom: "20px",
            }}
          >
            <ul className="nav nav-underline rounded">
              <li className="nav-item mx-4">
                <Link
                  className="nav-link"
                  style={{ color: "black", fontSize: "20px" }}
                  to="/profile"
                >
                  <FontAwesomeIcon className="mx-2" icon={faUser} />
                  Profile
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  style={{ color: "blue", fontSize: "20px" }}
                  to="/edit-profile"
                >
                  <FontAwesomeIcon className="mx-2" icon={faUserEdit} />
                  Edit Profile
                </Link>
              </li>
              {user?.role == "employee" && (
                <li className="nav-item mx-3">
                  <Link
                    className="nav-link"
                    style={{ color: "black", fontSize: "20px" }}
                    to="/invites"
                  >
                    <FontAwesomeIcon
                      className="mx-2"
                      icon={faEnvelopeOpenText}
                    />
                    Invites
                  </Link>
                </li>
              )}
            </ul>

            <div className="m-4 d-flex flex-column">
              <img
                style={{ width: "200px", height: "200px", alignSelf: "center" }}
                src={Profile_pic}
              />
            </div>

            <div className="d-flex col-12 flex-column m-2 p-2">
              <form
                className="d-flex flex-column"
                onSubmit={formik.handleSubmit}
              >
                <div className="gap-3 d-flex mb-2">
                  <div>
                    <label
                        className="form-label text-dark"
                        style={{ fontSize: "20px", fontWeight:"600" }}
                      >
                      First Name
                    </label>
                    <input
                      className="col-md-3 text-center"
                      style={{
                        width: "29vw",
                        height: "60px",
                        borderRadius: "15px",
                        background: "linear-gradient(to right, #333333, #cccccc)",
                        fontWeight:"600",
                        border: "none",
                      }}
                      name="firstName"
                      type="text"
                      placeholder="First Name"
                      value={formik.values.firstName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.firstName && formik.errors.firstName && (
                      <div className="alert alert-danger text-center mt-2">
                        {formik.touched.firstName && formik.errors.firstName}
                      </div>
                    )}
                  </div>
                  <div>
                    <label
                          className="form-label text-dark"
                          style={{ fontSize: "20px", fontWeight:"600" }}
                        >
                      Last Name
                    </label>
                    <input
                      className="col-md-3 text-center"
                      style={{
                        width: "29vw",
                        height: "60px",
                        borderRadius: "15px",
                        background: "linear-gradient(to right, #333333, #cccccc)",
                        fontWeight:"600",
                        border: "none",
                      }}
                      name="lastName"
                      type="text"
                      placeholder="Last Name"
                      value={formik.values.lastName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.lastName && formik.errors.lastName && (
                      <div className="alert alert-danger text-center mt-2">
                        {formik.touched.lastName && formik.errors.lastName}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                      <label
                        className="form-label text-dark"
                        style={{ fontSize: "20px", fontWeight:"600" }}
                      >
                      Email
                    </label>
                  <input
                    disabled
                    className="mt-2 mb-2 col-md-12 text-center"
                    style={{
                      height: "60px",
                      borderRadius: "15px",
                      background: "linear-gradient(to right, #333333, #cccccc)",
                      fontWeight:"600",
                      border: "none",
                      width: "100%",
                    }}
                    type="text"
                    placeholder="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                <div className="gap-3 d-flex mt-2">
                  <div>
                      <label
                        className="form-label text-dark"
                        style={{ fontSize: "20px", fontWeight:"600" }}
                      >
                      Date of birth
                    </label>
                    <input
                      className="col-md-3 text-center"
                      style={{
                        width: "29vw",
                        height: "60px",
                        borderRadius: "15px",
                        background: "linear-gradient(to right, #333333, #cccccc)",
                        fontWeight:"600",
                        border: "none",
                      }}
                      name="dob"
                      type="date"
                      placeholder="Birth Date"
                      value={formik.values.dob}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.dob && formik.errors.dob && (
                      <div className="alert alert-danger text-center mt-2">
                        {formik.touched.dob && formik.errors.dob}
                      </div>
                    )}
                  </div>
                  <div>
                      <label
                        className="form-label text-dark"
                        style={{ fontSize: "20px", fontWeight:"600" }}
                      >
                      Contact Number
                    </label>
                    <input
                      className="col-md-3 text-center"
                      style={{
                        width: "29vw",
                        height: "60px",
                        borderRadius: "15px",
                        background: "linear-gradient(to right, #333333, #cccccc)",
                        fontWeight:"600",
                        border: "none",
                      }}
                      name="contactNo"
                      type="text"
                      placeholder="Contact No"
                      value={formik.values.contactNo}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.contactNo && formik.errors.contactNo && (
                      <div className="alert alert-danger text-center mt-2">
                        {formik.touched.contactNo && formik.errors.contactNo}
                      </div>
                    )}
                  </div>
                </div>

                <div className="d-flex justify-content-end mt-2">
                  <button className="btn btn-danger rounded-4 my-button m-2 fs-4" onClick={() => navigate('/profile')}>
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary rounded-4 my-button m-2 fs-4"
                    disabled={!formik.isValid}
                  >
                    Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
