import { useNavigate } from "react-router-dom";
import mainbg from "../assets/project-dashboard/main-bg.jpg";
import { Hamburger2 } from "../components/Hamburger_2";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import { getProjectsManager, getProjectsEmployee, reset } from "../features/project/projectSlice";
import { toast } from "react-toastify";

export const Project = () => {
  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, appErr, serverErr, projects } = useSelector(state => state.project);
  const { user } = useSelector(state => state.auth);
  const navigate = useNavigate();

  const colors = [
    "linear-gradient(to right, #333333, #cccccc)",
    "linear-gradient(to right, #003366, #66ccff)", // Dark Blue to Light Blue
    "linear-gradient(to right, #004d40, #e0f2f1)",
    "linear-gradient(to right, #191970, #f0f8ff)"
  ];

  useEffect(() => {
    if (user?.role === "manager") {
      dispatch(getProjectsManager());
    } else if (user?.role === "employee") {
      dispatch(getProjectsEmployee());
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

  if (isLoading && projects?.length === 0) {
    return (
      <div
        className="px-3 py-3"
        style={{
          backgroundImage: `url(${mainbg})`,
          backgroundRepeat: "repeat",
          minHeight: "92vh"
        }}
      >
        <div className="row">
          <div className="col-3">
            <Hamburger2 />
          </div>
          <div className="col-9" style={{ marginTop: "-1vh" }}>
            <div style={{ minHeight: "85vh" }}>
              <div className="row">
                <Typography component="div" variant="h1" style={{ marginTop: "2vh" }}>
                  <Skeleton variant="rounded" animation="wave" width="100%" height="15vh" />
                </Typography>
                <Typography component="div" variant="h1" style={{ marginTop: "2vh" }}>
                  <Skeleton variant="rounded" animation="wave" width="100%" height="15vh" />
                </Typography>
                <Typography component="div" variant="h1" style={{ marginTop: "2vh" }}>
                  <Skeleton variant="rounded" animation="wave" width="100%" height="15vh" />
                </Typography>
                <Typography component="div" variant="h1" style={{ marginTop: "2vh" }}>
                  <Skeleton variant="rounded" animation="wave" width="100%" height="15vh" />
                </Typography>
                <Typography component="div" variant="h1" style={{ marginTop: "2vh" }}>
                  <Skeleton variant="rounded" animation="wave" width="100%" height="15vh" />
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="px-3 py-3"
      style={{
        backgroundImage: `url(${mainbg})`,
        backgroundRepeat: "repeat",
        minHeight: "92vh"
      }}
    >
      <div className="row">
        <div className="col-3">
          <Hamburger2 />
        </div>
        <div className="col-9 px-4" style={{ marginTop: "-1vh" }}>
          <div>
            <div className="row">
              {projects?.map((project, index) => (
                <button
                  key={index}
                  style={{
                    marginTop: index === 0 ? "0.5%" : "3vh",
                    padding: "2.5%",
                    background: colors[index % colors.length], // Apply gradient background
                    color: "#fff",
                    border: "none",
                    borderRadius: "20px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    textAlign: "left",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)", // Adjust shadow color
                    transition: "background 0.3s ease",
                    display: "block",
                    width: "100%",
                    height: "100px", // Adjust size as needed
                    textAlign: "center",
                    fontSize: "16px",
                  }}
                  onClick={() => navigate(`/projects/${project?._id}/announcements`)}
                >
                  <div style={{ fontSize: "24px", marginBottom: "10px" }}>{project?.name}</div>
                  <div style={{ fontSize: "16px", color: "#d3d3d3" }}>{project?.managerName}</div>
                </button>
              ))}

              {projects?.length === 0 && <div className="display-1 mx-5">No projects found!</div>}

              {user?.role === "manager" && (
                <button
                  style={{
                    position: "absolute",
                    bottom: "25px",
                    left: "60px",
                    width: "150px",
                    height: "60px",
                    fontSize: "24px",
                    border: "none",
                    borderRadius: "50%",
                    backgroundColor: "black",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                  onClick={() => navigate("/add-project")}
                >
                  Add Project
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
