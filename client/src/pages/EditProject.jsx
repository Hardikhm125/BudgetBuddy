import { useFormik } from "formik";
import * as Yup from "yup";
import mainbg from "../assets/project-dashboard/main-bg.jpg";
// import ep from "../assets/edit-project/ep.jpg";
import { Hamburger4 } from "../components/Hamburger_4";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editProject, reset } from "../features/project/projectSlice";
import { toast } from "react-toastify";
import { Loading } from "../components/Loading";
import { useEffect } from "react";

export const EditProject = () => {

  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isSuccess, isLoading, isError, appErr, serverErr } = useSelector((state) => state.project);
  const { project } = useSelector((state) => state.announcement);

  const formSchema = Yup.object({
    name: Yup.string().required("Project Name is required").max(100, "Project Name must not exceed 100 characters").min(1).trim(),
    budget: Yup.number().required("Project Amount is required"),
    alertLimit: Yup.number().required("Alert Limit is required"),
    description: Yup.string().max(400, "Project Description must not exceed 400 characters").min(1).trim(),
  });

  const formik = useFormik({
    initialValues: {
      name: project?.name,
      description: project?.description,
      budget: project?.budget,
      alertLimit: project?.alertLimit
    },
    onSubmit: (values) => {
      const data = {
        projectId: projectId,
        name: values.name,
        description: values.description,
        budget: values.budget,
        alertLimit: values.alertLimit
      };
      
      dispatch(editProject(data));
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
      toast.success("Project edited successfully!");
      navigate(`/projects/${projectId}/announcements`);
      dispatch(reset());
    }

    if (isError)
    {
      toast.error(appErr || serverErr);
      dispatch(reset());
    }

  }, [dispatch, isSuccess, isError, appErr, serverErr]);

  if (isLoading)
  {
    return (
      <Loading />
    )
  }

  return (
    <div className="px-3 py-3" style={{ backgroundImage: `url(${mainbg})`, backgroundRepeat: "repeat" }}>
    <div className="row" style={{ backgroundImage: `url(${mainbg})` }}>
        <div className="col-md-3">

          <Hamburger4 />

        </div>
        <div
          className="col-md-9 mb-3 rounded-4"
        >
          <div className="row px-5 justify-content-center">
            <div
              className="col-md-7 mt-4 mb-4 px-4 rounded rounded-4 d-flex flex-column justify-content-center"
              style={{
                backgroundColor: "#ffffff"
                }}
            >
              <div className="mt-3 mb-3">
                <h3
                  className="text-center display-6"
                  style={{ fontWeight: "600", color: "#2D91E6" }} 
                >
                  Edit Project
                </h3>
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3 mt-4">
                    <label
                      className="form-label text-dark"
                      style={{ fontSize: "20px", fontWeight:"600" }}
                    >
                      Project Name
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        className="form-control"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          backgroundColor:"#7dbef5"
                        }}
                      />
                    </div>
                    {formik.touched.name && formik.errors.name && (
                      <div className="alert alert-danger text-center mt-2">
                        {formik.touched.name && formik.errors.name}
                      </div>
                    )}
                  </div>

                  <div className="mb-3 mt-4">
                    <label
                      className="form-label text-dark"
                      style={{ fontSize: "20px",fontWeight:"600" }}
                    >
                      Budget
                    </label>
                    <div className="input-group">
                      <input
                        type="number"
                        name="budget"
                        placeholder="Budget"
                        className="form-control"
                        value={formik.values.budget}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          backgroundColor:"#7dbef5"
                        }}
                      />
                    </div>
                    {formik.touched.budget && formik.errors.budget && (
                      <div className="alert alert-danger text-center mt-2">
                        {formik.touched.budget && formik.errors.budget}
                      </div>
                    )}
                  </div>

                  <div className="mb-3 mt-4">
                    <label
                      className="form-label text-dark"
                      style={{ fontSize: "20px",fontWeight:"600" }}
                    >
                      Alert Limit
                    </label>
                    <div className="input-group">
                      <input
                        type="text"
                        name="alertLimit"
                        placeholder="Alert Limit in %"
                        className="form-control"
                        value={formik.values.alertLimit}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          backgroundColor:"#7dbef5"
                        }}
                      />
                    </div>
                    {formik.touched.alertLimit && formik.errors.alertLimit && (
                      <div className="alert alert-danger text-center mt-2">
                        {formik.touched.alertLimit && formik.errors.alertLimit}
                      </div>
                    )}
                  </div>

                  <div className="mb-3 mt-4">
                    <label
                      className="form-label text-dark font"
                      style={{ fontSize: "20px",fontWeight:"600" }}
                    >
                      Description
                    </label>
                    <div className="input-group">
                      <textarea
                        type="text"
                        name="description"
                        placeholder="Description"
                        className="form-control"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        style={{
                          backgroundColor:"#7dbef5",
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-center m-3 p-2 gap-3 ">
                    <button
                      type="button"
                      className="btn col-3 btn-danger rounded-pill shadow-lg"
                      onClick={() => navigate(`/projects/${projectId}/announcements`)}
                      style={{ fontSize: "25px" }}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="btn col-3 btn-primary rounded-pill shadow-lg"
                      style={{ fontSize: "25px"}}
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
    </div>
  );
};
