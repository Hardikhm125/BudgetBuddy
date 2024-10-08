import { Link, useNavigate } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout } from "../features/auth/authSlice";
import { clearAnnouncements } from "../features/announcement/announcementSlice";
import { clearEmployeesAndInvitations } from "../features/invite/inviteSlice";
import { clearProjects } from "../features/project/projectSlice";
import { clearTeam } from "../features/team/teamSlice";
import { clearExpenses } from "../features/expense/expenseSlice";
import { clearNotification, getEmployeeNotifications, getManagerNotifications, reset } from "../features/notification/notificationSlice";
import { clearStatistics } from "../features/statistic/statisticSlice";
import { toast } from "react-toastify";
import "../styles/Homepage.css";
import Logo from '../assets/Logo.jpeg';

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, user } = useSelector((state) => state.auth);
  const { isLoading: isLoadingAnnouncement } = useSelector((state) => state.announcement);
  const { isLoading: isLoadingExpense } = useSelector((state) => state.expense);
  const { isLoading: isLoadingInvite } = useSelector((state) => state.invite);
  const { notifications, isSuccess, isError, appErr, serverErr } = useSelector((state) => state.notification);
  const { isLoading: isLoadingProject } = useSelector((state) => state.project);
  const { isLoading: isLoadingStatistic } = useSelector((state) => state.statistic);
  const { isLoading: isLoadingTeam } = useSelector((state) => state.team);

  const handleLogout = async () => {
    try {
      dispatch(clearAnnouncements());
      dispatch(clearEmployeesAndInvitations());
      dispatch(clearProjects());
      dispatch(clearTeam());
      dispatch(clearExpenses());
      dispatch(clearNotification());
      dispatch(clearStatistics());
      await dispatch(logout());
      toast.success("User Logged Out Successfully!");
      navigate('/login');
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user?.role === "manager") {
      dispatch(getManagerNotifications());
    } else if (user?.role === "employee") {
      dispatch(getEmployeeNotifications());
    }
  }, [user, isLoading, isLoadingAnnouncement, isLoadingExpense, isLoadingInvite, isLoadingProject, isLoadingStatistic, isLoadingTeam]);

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
    }
    if (isError) {
      toast.error(appErr || serverErr);
      dispatch(reset());
    }
  }, [dispatch, isSuccess, isError, appErr, serverErr]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary p-2"
      style={{ fontSize: "18px",background: "linear-gradient(to right, #333333, #666666, #000000)", }}

    >
      <div className="container-fluid">
        <a
          href=""
          target="_blank"
          className="navbar-brand"
        >
          <img
            src={Logo}
            alt="logo"
            className="rounded-circle"
            style={{ height: "45px", width: "45px" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/projects">
                Projects
              </Link>
            </li>
            {/* <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/about-us">
                About Us
              </Link>
            </li> */}
          </ul>

          {user ? (
            <div className="d-flex align-items-center">
              {notifications?.length > 0 ? (
                <Link to='/notifications' className="text-decoration-none">
                  <NotificationsActiveIcon className="text-light mx-2" style={{ fontSize: "30px" }} />
                </Link>
              ) : (
                <Link to='/notifications' className="text-decoration-none">
                  <NotificationsIcon className="text-light mx-2" style={{ fontSize: "30px" }} />
                </Link>
              )}
              <Link to='/profile' className="text-decoration-none">
                <div className="text-light mx-3" style={{ fontSize: "18px" }}>
                  {user?.firstName} {user?.lastName}
                </div>
              </Link>
              <button
                className="btn btn-danger"
                onClick={handleLogout}
                style={{ fontSize: "18px" }}
              >
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <div className="d-flex">
              <Link to="/login">
                <button
                  className="btn btn-success mx-3"
                  type="submit"
                  style={{ fontSize: "18px" }}
                >
                  <FaSignInAlt /> Login
                </button>
              </Link>
              <Link to="/register">
                <button
                  className="btn btn-primary"
                  type="submit"
                  style={{ fontSize: "18px" }}
                >
                  <FaUser /> Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};
