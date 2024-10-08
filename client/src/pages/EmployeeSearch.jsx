import { useState, useEffect } from "react";
import { Hamburger4 } from "../components/Hamburger_4";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, sendInvite, reset } from "../features/invite/inviteSlice";
import { getMembers, reset as teamReset } from "../features/team/teamSlice";
import mainbg from "../assets/project-dashboard/main-bg.jpg";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const EmployeeSearch = () => {
  const { projectId } = useParams();
  const dispatch = useDispatch();
  const { employees, isSuccess, result, isLoading, isError, appErr, serverErr } = useSelector((state) => state.invite);

  const { employees: employees2, isLoading: teamLoading, isSuccess: teamSuccess, isError: teamError, appErr: teamAppErr, serverErr: teamServerErr } = useSelector((state) => state.team);

  const [searchTerm, setSearchTerm] = useState("");
  const [matchingEmployees, setMatchingEmployees] = useState([]);
  const [selectedEmployees, setSelectedEmployees] = useState([]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.trim() !== "") {
      const filteredEmployees = employees?.filter((employee) =>
        employee.email.toLowerCase().includes(term.toLowerCase())
      );
      
      const filteredEmployees2 = filteredEmployees.filter((employee) => {
        return !employees2?.some(
          (employee2) => employee2.email === employee.email
        );
      });

      setMatchingEmployees(filteredEmployees2);
    } else {
      setMatchingEmployees([]);
    }
  };

  const handleEmployeeClick = (employee) => {
    const isAlreadySelected = selectedEmployees.some(
      (selectedEmployee) => selectedEmployee.email === employee.email
    );

    if (!isAlreadySelected) {
      setSelectedEmployees([...selectedEmployees, employee]);
    }

    setSearchTerm("");
    setMatchingEmployees([]);
  };

  const handleInvite = () => {
    const employees = selectedEmployees;
    const values = { employees, projectId };

    dispatch(sendInvite(values));

    setSelectedEmployees([]);
  };

  useEffect(() => {
    dispatch(getEmployees());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getMembers(projectId));
  }, [dispatch, projectId]);

  useEffect(() => {

    if (teamSuccess)
    {
      dispatch(teamReset());
    }

    if (teamError)
    {
      toast.error(teamAppErr || teamServerErr);
      dispatch(teamReset());
    }

  }, [dispatch, teamSuccess, teamError, teamAppErr, teamServerErr]);

  useEffect(() => {

    if (isSuccess)
    {
      dispatch(reset());
    }

    if (isSuccess && result) 
    {
      toast.success(result);
    }

    if (isError) 
    {
      toast.error(appErr || serverErr);
      dispatch(reset());
    }
  }, [dispatch, isSuccess, isError, appErr, serverErr]);


  if (isLoading || teamLoading) {
    return (
      <>
        <div
          className="px-3 py-3"
          style={{
            backgroundImage: `url(${mainbg})`,
            backgroundRepeat: "repeat",
            minHeight: "92vh",
          }}
        >
          <div className="row">
            <div className="col-3">
              <Hamburger4 />
            </div>
            <div className="col-9">
              <div className="d-flex flex-column">
              <h1 className="display-6 fw-medium">Invite Employees</h1>
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search Employee"
                className="rounded border-1 my-2 p-2"
                style={{ width: "90%" }}
              />
            
            {/* <div className="mt-2 d-flex justify-content-center align-items-center gap-3" style={{ width: "90%" }}>
              <div className="display-6 fw-normal">Sending Invitations</div>
              <div className="spinner-border" style={{width: "3rem", height: "3rem"}} role="status">
              </div>
            </div> */}
          
          </div>

            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div
      className="px-3 py-3"
      style={{
        backgroundImage: `url(${mainbg})`,
        backgroundRepeat: "repeat",
        minHeight: "92vh",
      }}
    >
      <div className="row">
        <div className="col-3">
          <Hamburger4 />
        </div>
        <div className="col-9">
          <h1 className="display-6 fw-medium">Invite Employees</h1>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search Employee"
            className="rounded border-1 my-2 p-2"
            style={{ width: "90%" }}
          />
          {matchingEmployees?.length > 0 &&
            matchingEmployees?.map((employee) => (
              <p
                key={employee?.email}
                onClick={() => handleEmployeeClick(employee)}
                style={{ cursor: "pointer", width: "90%" }}
                className="rounded my-1 p-2 bg-light"
              >
                {employee?.email}
              </p>
            ))}
          {matchingEmployees?.length === 0 && searchTerm.trim() !== "" && (
            <p className="rounded my-1 p-2 bg-light" style={{ width: "90%" }}>
              No matching employees found
            </p>
          )}
          {selectedEmployees?.length > 0 && (
            <div>
              <h1 className="display-6 mt-4 fw-medium">Selected Employees:</h1>
              {selectedEmployees?.map((employee) => (
                <p
                  key={employee?.email}
                  className="rounded bg-light my-1 p-2"
                  style={{ width: "90%" }}
                >
                  {employee?.email}
                </p>
              ))}
              <button className="btn btn-primary my-4" onClick={handleInvite}>
                Invite
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
