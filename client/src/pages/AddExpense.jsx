import { useFormik } from "formik";
import { useParams, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import mainbg from "../assets/project-dashboard/main-bg.jpg";
import { toast } from 'react-toastify';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createExpense, reset } from "../features/expense/expenseSlice";
import { Loading } from "../components/Loading";

export const AddExpense = () => {
  
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formSchema = Yup.object({
    name: Yup.string().required("Name is required").max(30, "Expense name must not exceed 30 characters").min(1).trim(),
    category: Yup.string().required("Category is required"),
    amount: Yup.number().required("Amount is required"),
    date: Yup.date().required("Date is required"),
    driveLink: Yup.string().required("Link of uploaded bill is required").min(1).trim()
      .matches(
        /^https:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/,
        "Please enter a valid URL link of uploaded bill"
      ),
    description: Yup.string().max(400, "Expense Description must not exceed 400 characters").min(1).trim(),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      description: "",
      amount: "",
      date: "",
      driveLink: "",
    },
    onSubmit: (values) => {
      values.projectId = projectId;
      dispatch(createExpense(values));
    },
    validationSchema: formSchema,
  });

  const {isSuccess, isError, isLoading, appErr, serverErr} = useSelector(state => state.expense);

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
      toast.success("Expense Created Successfully!");
      dispatch(reset());
      navigate(`/projects/${projectId}/expenses`)
    }

    if (isError)
    {
      toast.error(appErr||serverErr);
      dispatch(reset())
    }

  }, [dispatch, isSuccess, isError, appErr, serverErr]);

  const categoryOptions = ["Accommodation", "Advertising", "Entertainment", "Food", "Gifts", "Miscellaneous", "OfficeSupplies", "Technology", "Travel", "Utilities"]
  
  if (isLoading)
  {
    return (<Loading />)
  }

  return (
    <div className="container-fluid">
      <div className="row" style={{ backgroundImage: `url(${mainbg})` }}>
        <div className="col-md-3">

        </div>
        <div className="col-md-6 my-5 rounded rounded-4 d-flex flex-column align-items-center justify-content-center" style={{
          backgroundColor: "rgb(93, 150, 245)",
          minHeight: "100vh",
        }}>
          <div className="col-md-10 mt-5 mb-5">
            <p className="text-center text-white display-6" style={{ fontWeight: "400", textShadow: "2px 2px 4px rgba(0,0,0,0.6)"}}>
              Add your Expense
            </p>
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-3 mt-4">
                <label className="form-label text-dark" style={{ fontSize: "20px", fontWeight:"600" }}>
                  Name
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
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <div className="alert alert-danger text-center mt-2">
                    {formik.touched.name && formik.errors.name}
                  </div>
                )}
              </div>

              <div className="mb-3 mt-4">
                <label htmlFor="date" className="form-label text-dark" style={{ fontSize: "20px", fontWeight:"600" }}>
                  Date
                </label>
                <div className="input-group">
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={formik.values.date}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.date && formik.errors.date && (
                  <div className="alert alert-danger text-center mt-2">
                    {formik.touched.date && formik.errors.date}
                  </div>
                )}
              </div>

              <div className="mb-3 mt-4">
                <label className="form-label text-dark" style={{ fontSize: "20px", fontWeight:"600" }}>
                  Category
                </label>
                <div className="input-group">
                  <select
                    name="category"
                    className="form-select"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {categoryOptions.map((categoryOption) => (
                      <option key={categoryOption} value={categoryOption}>
                        {categoryOption}
                      </option>
                    ))}
                  </select>
                </div>
                {formik.touched.category && formik.errors.category && (
                  <div className="alert alert-danger text-center mt-2">
                    {formik.touched.category && formik.errors.category}
                  </div>
                )}
              </div>

              <div className="mb-3 mt-4">
                <label className="form-label text-dark" style={{ fontSize: "20px", fontWeight:"600" }}>
                  Amount
                </label>
                <div className="input-group">
                  <input
                    type="number"
                    name="amount"
                    placeholder="Amount"
                    className="form-control"
                    value={formik.values.amount}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.amount && formik.errors.amount && (
                  <div className="alert alert-danger text-center mt-2">
                    {formik.touched.amount && formik.errors.amount}
                  </div>
                )}
              </div>

              <div className="mb-3 mt-4">
                <label className="form-label text-dark" style={{ fontSize: "20px", fontWeight:"600" }}>
                  Link of uploaded bill
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    name="driveLink"
                    placeholder="Link of uploaded bill"
                    className="form-control"
                    value={formik.values.driveLink}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>
                {formik.touched.driveLink && formik.errors.driveLink && (
                  <div className="alert alert-danger text-center mt-2">
                    {formik.touched.driveLink && formik.errors.driveLink}
                  </div>
                )}
              </div>

              <div className="mb-3 mt-4">
                <label className="form-label text-dark" style={{ fontSize: "20px", fontWeight:"600" }}>
                  Description
                </label>
                <div className="input-group">
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    className="form-control"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                </div>

                {formik.touched.description && formik.errors.description && (
                  <div className="alert alert-danger text-center mt-2">
                    {formik.touched.description && formik.errors.description}
                  </div>
                )}

              </div>

              <div className="d-flex gap-5 mt-4">
                <button
                  type="submit"
                  className="btn btn-dark rounded-pill shadow-lg"
                  style={{ fontSize: "22px" }}
                  disabled={!formik.isValid}
                >
                  Save and close
                </button>

                <button
                  type="button"
                  className="btn btn-dark rounded-pill shadow-lg"
                  onClick={() => navigate(`/projects/${projectId}/expenses`)}
                  style={{ fontSize: "22px" }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="col-md-3">

        </div>
      </div>
    </div>
  );
};
