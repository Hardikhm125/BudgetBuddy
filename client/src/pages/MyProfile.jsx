import main_bg from "../assets/project-dashboard/main-bg.jpg";
import Profile_pic from "../assets/MyProfile-img/Profile.png";
import { Hamburger2 } from "../components/Hamburger_2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeOpenText, faUser, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import '../styles/Profile.css';
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { toast } from "react-toastify";
import { reset, getEmployeeProfile, getManagerProfile } from "../features/auth/authSlice";

const inlineStyles1 = {
  backgroundColor: "#E0E0E0",
  fontSize: "2vh",
  fontWeight: 400,
  padding: "10px",
  borderRadius: "8px",
  margin: "5px 0"
};
const inlineStyles2 = {
  backgroundColor: "#F5F5F5",
  fontSize: "2vh",
  fontWeight: 400,
  padding: "10px",
  borderRadius: "8px",
  margin: "5px 0"
};

export const MyProfile = () => {

  const { user, profile, isLoading, isSuccess, isError, appErr, serverErr } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.role === "manager") {
      dispatch(getManagerProfile());
    } else if (user?.role === "employee") {
      dispatch(getEmployeeProfile());
    }
  }, [dispatch, user?.role]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }

    if (isError) {
      toast.error(appErr || serverErr);
      dispatch(reset());
    }
  }, [dispatch, isSuccess, isError, appErr, serverErr]);

  if (isLoading && !profile) {
    return (
      <div className="container-fluid px-3 py-3" style={{ backgroundImage: `url(${main_bg})`, backgroundRepeat: "repeat" }}>
        <div className="row">
          <div className="col-md-3">
            <Hamburger2 />
          </div>
          <div className="col-md-8 mx-5 rounded rounded-3 bg-light">
            <div className="me-5" style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px", marginBottom: "20px" }}>
              <ul className="nav nav-underline rounded">
                <li className="nav-item mx-4">
                  <Link className="nav-link active" aria-current="page" style={{ color: "blue", fontSize: "20px" }} to="/profile">
                    <FontAwesomeIcon className="mx-2" icon={faUser} />
                    Profile
                  </Link>
                </li>
                <li className="nav-item mx-3">
                  <Link className="nav-link" style={{ color: "black", fontSize: "20px" }} to="/edit-profile">
                    <FontAwesomeIcon className="mx-2" icon={faUserEdit} />
                    Edit Profile
                  </Link>
                </li>
                {user?.role === "employee" && (
                  <li className="nav-item mx-3">
                    <Link className="nav-link" style={{ color: "black", fontSize: "20px" }} to="/invites">
                      <FontAwesomeIcon className="mx-2" icon={faEnvelopeOpenText} />
                      Invites
                    </Link>
                  </li>
                )}
              </ul>
              <div className="row">
                <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
                  <Skeleton variant="circular" animation="wave" width="200px" height="200px" />
                </div>
                <div className="col-md-8">
                  <div className="mt-3 mr-4 ml-3 mb-3 pt-5 p-3">
                    <Typography component="div" variant="h3" style={{ marginTop: "2vh", borderRadius: "9rem" }}>
                      <Skeleton variant="rounded" animation="wave" width="33vw" height="9vh" />
                    </Typography>
                    <Typography component="div" variant="h3" style={{ marginTop: "2vh" }}>
                      <Skeleton variant="rounded" animation="wave" width="33vw" height="9vh" />
                    </Typography>
                    <Typography component="div" variant="h3" style={{ marginTop: "2vh" }}>
                      <Skeleton variant="rounded" animation="wave" width="33vw" height="9vh" />
                    </Typography>
                    <Typography component="div" variant="h3" style={{ marginTop: "2vh" }}>
                      <Skeleton variant="rounded" animation="wave" width="33vw" height="9vh" />
                    </Typography>
                    <Typography component="div" variant="h3" style={{ marginTop: "2vh" }}>
                      <Skeleton variant="rounded" animation="wave" width="33vw" height="9vh" />
                    </Typography>
                    <Typography component="div" variant="h3" style={{ marginTop: "2vh" }}>
                      <Skeleton variant="rounded" animation="wave" width="33vw" height="9vh" />
                    </Typography>
                    <Typography component="div" variant="h3" style={{ marginTop: "2vh" }}>
                      <Skeleton variant="rounded" animation="wave" width="33vw" height="9vh" />
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-3 py-3" style={{ backgroundImage: `url(${main_bg})`, backgroundRepeat: "repeat" }}>
      <div className="row">
        <div className="col-md-3">
          <Hamburger2 />
        </div>
        <div className="col-md-8 mx-5 rounded rounded-3 bg-light">
          <div className="me-5" style={{ marginTop: "20px", marginLeft: "10px", marginRight: "10px", marginBottom: "20px" }}>
            <ul className="nav nav-underline rounded">
              <li className="nav-item mx-4">
                <Link className="nav-link active" aria-current="page" style={{ color: "blue", fontSize: "20px" }} to="/profile">
                  <FontAwesomeIcon className="mx-2" icon={faUser} />
                  Profile
                </Link>
              </li>
              <li className="nav-item mx-3">
                <Link className="nav-link" style={{ color: "black", fontSize: "20px" }} to="/edit-profile">
                  <FontAwesomeIcon className="mx-2" icon={faUserEdit} />
                  Edit Profile
                </Link>
              </li>
              {user?.role === "employee" && (
                <li className="nav-item mx-3">
                  <Link className="nav-link" style={{ color: "black", fontSize: "20px" }} to="/invites">
                    <FontAwesomeIcon className="mx-2" icon={faEnvelopeOpenText} />
                    Invites
                  </Link>
                </li>
              )}
            </ul>

            <div className="row d-flex flex-column align-items-center justify-content-center text-center">
              <div className="col-md-4 d-flex flex-column align-items-center justify-content-center">
                <img style={{ width: "200px", height: "200px", borderRadius: "50%" }} src={Profile_pic} alt="Profile" />
                <h2 style={{ marginTop: "20px" }}>{profile?.firstName} {profile?.lastName}</h2>
              </div>
              <div className="col-md-8">
                <div className="mt-3 mr-4 ml-3 mb-3 pt-5 p-3">
                  <h2 className="p-3 rounded" style={inlineStyles1}>
                    Email : {profile?.email}
                  </h2>
                  <h2 className="p-3 mt-3 rounded" style={inlineStyles2}>
                    Birth Date : {profile?.dob}
                  </h2>
                  <h2 className="p-3 mt-3 rounded" style={inlineStyles1}>
                    Contact No. : {profile?.contactNo}
                  </h2>
                  <h2 className="p-3 mt-3 rounded" style={inlineStyles2}>
                    Joining Date : {profile?.joiningDate}
                  </h2>
                  <h2 className="p-3 mt-3 rounded" style={inlineStyles1}>
                    Role : {profile?.role}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
