import React, { useState } from "react";

import "../App.css"
import {
  FaUserCircle,
  FaShieldAlt,
  FaTachometerAlt,
  FaUserFriends,
  FaQuestionCircle,
  FaSignOutAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaBookOpen,
  FaUserClock,
  FaSearch,
  FaTools,
} from "react-icons/fa";
import { MdPolicy, MdOutlinePublishedWithChanges } from "react-icons/md";
import { GrSchedules } from "react-icons/gr";
import { LuNotebookText } from "react-icons/lu";
import { PiStudentDuotone } from "react-icons/pi";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { FaWhatsapp } from "react-icons/fa";
import { FaPeopleGroup } from "react-icons/fa6";
import Swal from "sweetalert2";
const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
}
)

const Dashboard = () => {

  const tdStyle = {
    padding: "8px",
    borderBottom: "1px solid #333",
    fontWeight: "bold",
    width: "40%",
  };

  const valStyle = {
    padding: "8px",
    borderBottom: "1px solid #333",
    color: "#ccc",
  };


  const [activeSection, setActiveSection] = useState("dashboard");
  const [students, setStudents] = useState([]);
  const [activeStudentPage, setActiveStudentPage] = useState("list");
  const [name, setName] = useState("");
  const [newStudent, setNewStudent] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [errors, setErrors] = useState({});
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  //const [showModal, setShowModal] = useState(false);
  const [savedLead, setSavedLead] = useState(null);

  const [leadDetails, setLeadDetails] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    Status: "",
    Follow_up: "",
    Assigned_to: "",
    date_created: ""
  });


  const [activeEmployeePage, setActiveEmployeePage] = useState("list");
  const [employees, setEmployees] = useState([]);
  const employeeNameList = employees.map(
    emp => emp.firstName + " " + emp.lastName
  );
  const [employeeDetails, setEmployeeDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dob: "",
    doj: "",
    remark: "",
    joinTime: "",
    designation: "",
    address: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;

    setLeadDetails({
      ...leadDetails,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };


  const submitLead = (e) => {
    e.preventDefault();

    let newErrors = {};

    const requiredFields = [
      "name",
      "email",
      "phone",
      "city",
      //"address",
      "Assigned_to",
      "Follow_up",
      "Status",
      "Date_creates",
    ];


    requiredFields.forEach((field) => {
      if (!leadDetails[field] || leadDetails[field].trim() === "") {
        newErrors[field] = ` ${field} is required`;
      }
    });


    if (leadDetails.email && !/\S+@\S+\.\S+/.test(leadDetails.email)) {
      newErrors.email = "Invalid email format";
    }

    if (leadDetails.phone && leadDetails.phone.length !== 10) {
      newErrors.phone = "Phone must be 10 digits";
    }


    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }


    setErrors({});
    setSavedLead(leadDetails);
    setShowModal(true);

    if (editIndex !== null) {
      const updated = [...students];
      updated[editIndex] = leadDetails;
      setStudents(updated);
      setEditIndex(null);
    } else {
      setStudents([...students, leadDetails]);
    }


    setLeadDetails({
      name: "",
      email: "",
      phone: "",
      city: "",
      //address: "",
      Assigned_to: "",
      Follow_up: "",
      Status: "",
      date_created: ""
    });

    setShowLeadForm(false);
  };


  const handleEditLead = (index) => {
    setLeadDetails(students[index]);
    setEditIndex(index);
    setActiveStudentPage("add");
  };


  const handleDeleteLead = (index) => {
    Swal.fire({
      title: "Delete Lead?",
      text: "Are you sure you want to delete this lead?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        setStudents((prev) => prev.filter((_, i) => i !== index));

        Toast.fire({
          icon: "success",
          title: "Lead deleted successfully!",
        });
      }
    });
  };
  const handleDeleteEmployee = (index) => {
    Swal.fire({
      title: "Delete Employee?",
      text: "Are you sure you want to delete this employee?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        setEmployees((prev) => prev.filter((_, i) => i !== index));

        Toast.fire({
          icon: "success",
          title: "Employee deleted successfully!",
        });
      }
    });
  };


  const addStudent = (e) => {
    e.preventDefault();
    if (newStudent.trim() === "") return;
    setStudents([...students, newStudent.trim()]);
    setNewStudent("");
  };

  // Single handleEmployeeChange function
  const handleEmployeeChange = (e) => {
    const { name, value } = e.target;
    setEmployeeDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmployeeSubmit = (e) => {
    e.preventDefault();

    // Add new employee
    setEmployees([...employees, employeeDetails]);

    // Reset employee form
    setEmployeeDetails({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dob: "",
      doj: "",
      remark: "",
      joinTime: "",
      designation: "",
      address: "",
    });

    setActiveEmployeePage("list");
  };

  const handleEmployeeDelete = (index) => {
    setEmployees(employees.filter((_, i) => i !== index));
  };

  const handleEmployeeEdit = (index) => {
    setEmployeeDetails(employees[index]);
    setActiveEmployeePage("add");
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#131212",
      }}
    >

      <aside
        style={{
          width: "180px",
          backgroundColor: "black",
          color: "white",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "28px",
              marginBottom: "30px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <FaShieldAlt size={28} color="#09319e" />
            <span>skill</span>
            <span style={{ color: "#09319e" }}>Admin</span>
          </h1>


          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "26px",
              marginTop: "10px",
            }}
          >
            <button onClick={() => setActiveSection("dashboard")} style={menuBtn}>
              <FaTachometerAlt /> Dashboard
            </button>
            <button onClick={() => setActiveSection("students")} style={menuBtn}>
              <FaUserFriends /> Leads
            </button>
            <button onClick={() => setActiveSection("employees")} style={menuBtn}>
              <FaPeopleGroup /> Employees
            </button>

          </nav>

          <hr style={{ border: "0.5px solid #333", margin: "20px 0" }} />


          <nav
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "26px",
              marginTop: "10px",
            }}
          >
            <button style={menuBtn}>
              <FaQuestionCircle /> Support
            </button>
            <button style={menuBtn} onClick={handleLogout}>
  <FaSignOutAlt /> Logout
</button>

            <button style={menuBtn}>
              <MdPolicy /> Privacy Policy
            </button>
          </nav>

          <hr style={{ border: "0.5px solid #333", margin: "25px 0" }} />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <FaUserCircle size={45} color="#09319e" />
          <div>
            <p style={{ margin: 0, fontWeight: "bold" }}>SkillManthan</p>
            <p style={{ margin: 0, fontSize: "12px" }}>Administrator</p>
          </div>
        </div>
      </aside>

      {/* MAIN SECTION */}
      <main
        style={{
          flex: 1,
          padding: "30px",
          overflowY: "auto",
          backgroundColor: "#000",
          color: "white",
        }}
      >
        {/* Search Bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginBottom: "20px",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#0d0d0d",
              border: "1px solid #333",
              borderRadius: "8px",
              padding: "5px 10px",
              width: "250px",
              gap: "10px",
            }}
          >
            <FaSearch color="#888" size={16} />
            <input
              type="text"
              placeholder="Search students, courses…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                padding: "10px",
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
                color: "white",
                fontSize: "14px",
              }}
            />
          </div>
          {/*<select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: "10px",
              backgroundColor: "#1a1a1a",
              color: "white",
              border: "1px solid #333",
              borderRadius: "6px",
              cursor: "pointer",
              width: "150px",
            }}
          >
            <option value="">All Status</option>
            <option value="Procces">Procces</option>
            <option value="Complete">Complete</option>
            <option value="Pending">Pending</option>
          </select>*/}

          {/* ADD LEAD BUTTON */}


        </div>


        {activeSection === "dashboard" && (
          <>
            <h2 style={{ fontSize: "30px", fontWeight: "bold" }}>
              Welcome back, SkillManthan!
            </h2>
            <p style={{ color: "gray", marginBottom: "25px" }}>
              Here’s the current overview of your students, teachers, and courses.
            </p>

            {/* Dashboard Cards */}



            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  window.innerWidth <= 600
                    ? "repeat(1, 1fr)"
                    : window.innerWidth <= 1024
                      ? "repeat(2, 1fr)"
                      : "repeat(4, 1fr)",
                gap: "22px"
              }}
            >

              {/* Total Students */}
              <div className="card" style={card}>
                <div style={cardHeader}>
                  <FaUsers size={28} color="#00ff6a" />
                  <h3>420</h3>
                </div>
                <p>Total Students</p>
                <p style={{ color: "#00ff6a", fontSize: "13px", marginTop: "6px" }}>
                  30 new this semester
                </p>
              </div>

              {/* Total Teachers */}
              <div className="card" style={card}>
                <div style={cardHeader}>
                  <FaChalkboardTeacher size={28} color="#007bff" />
                  <h3>35</h3>
                </div>
                <p>Total Teachers</p>
                <p style={{ color: "#4da6ff", fontSize: "13px", marginTop: "6px" }}>
                  Updated recently
                </p>
              </div>

              {/* Active Courses */}
              <div className="card" style={card}>
                <div style={cardHeader}>
                  <FaBookOpen size={28} color="#ffa500" />
                  <h3>50</h3>
                </div>
                <p>Active Courses</p>
                <p style={{ color: "#4da6ff", fontSize: "13px", marginTop: "6px" }}>
                  Increased this year
                </p>
              </div>

              {/* Pending Admissions */}
              <div className="card" style={card}>
                <div style={cardHeader}>
                  <FaUserClock size={28} color="#ff4444" />
                  <h3>12</h3>
                </div>
                <p>Pending Admissions</p>
                <p style={{ color: "#ffcc00", fontSize: "13px", marginTop: "6px" }}>
                  Needs review
                </p>
              </div>
            </div>



            {/* Graph + Activities */}
            <div style={{ display: "flex", marginTop: "35px", gap: "25px" }}>
              <div
                style={{
                  flex: 2,
                  backgroundColor: "#0d0d0d",
                  padding: "20px",
                  borderRadius: "12px",
                  height: "300px",
                  border: "2px solid #333",
                }}
              >
                <h3>Student Performance Analytics</h3>
                <p style={{ color: "gray" }}></p>
              </div>

              <div
                style={{
                  flex: 1,
                  backgroundColor: "#0d0d0d",
                  padding: "20px",
                  borderRadius: "12px",
                  height: "300px",
                  height: "auto",
                  border: "2px solid #333",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              >
                <h3 style={{ fontSize: "1.2rem" }}>Recent Activities</h3>
                <ul style={{ marginTop: "15px", paddingLeft: "0px" }}>
                  <li
                    style={{

                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      marginBottom: "8px",
                      fontSize: "0.9rem",
                      width: "100%",

                    }}
                  >
                    <PiStudentDuotone size={26} color="#00ff6a" />

                    <span style={{ flex: 1, wordBreak: "break-word" }}>
                      New student admitted – Priya Sharma
                    </span>
                  </li>
                  <hr style={{ border: "1px solid #333" }} />
                  <li
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      marginBottom: "8px",
                      fontSize: "0.9rem",
                      width: "100%",
                    }}
                  >
                    <LuNotebookText size={26} color="#007bff" />

                    <span style={{ flex: 1, wordBreak: "break-word" }}>
                      New course added – Data Structures
                    </span>
                  </li>
                  <hr style={{ border: "1px solid #333" }} />
                  <li
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      marginBottom: "8px",
                      fontSize: "0.9rem",
                      width: "100%",
                    }}
                  >
                    <GrSchedules size={26} color="#ffa500" />

                    <span style={{ flex: 1, wordBreak: "break-word" }}>
                      Exam scheduled – Mathematics
                    </span>
                  </li>

                  <hr style={{ border: "1px solid #333" }} />
                  <li
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "0.9rem",
                      width: "100%",
                    }}
                  >
                    <MdOutlinePublishedWithChanges size={26} color="#ff4444" />

                    <span style={{ flex: 1, wordBreak: "break-word" }}>
                      Result published – Semester 2
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}

        {/* STUDENT SECTION */}
        {activeSection === "students" && (
          <>
            {/* TOP BAR */}
            {activeStudentPage === "list" && (
              <>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    gap: "15px",
                    marginBottom: "20px",


                  }}
                >
                  {/* STATUS DROPDOWN */}
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={{
                      padding: "10px",
                      backgroundColor: "#1a1a1a",
                      color: "white",
                      border: "1px solid #333",
                      borderRadius: "6px",
                      cursor: "pointer",
                      width: "150px",


                    }}
                  >
                    <option value="">All Status</option>
                    <option value="Success">Process</option>
                    <option value="Complete">Complete</option>
                    <option value="Pending">Pending</option>
                  </select>


                  {/* OPEN ADD PAGE */}
                  <button
                    onClick={() => setActiveStudentPage("add")}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#292768",
                      border: "none",
                      color: "white",
                      borderRadius: "6px",
                      cursor: "pointer",

                    }}
                  >
                    Add Lead
                  </button>
                </div>

                {/* STUDENTS LIST PAGE */}
                <div
                  style={{
                    backgroundColor: "#0d0d0d",
                    padding: "15px",
                    borderRadius: "10px",
                    overflow: "auto",
                  }}
                >
                  {students.length === 0 ? (
                    <p style={{ color: "gray" }}>No leads added yet.</p>
                  ) : (
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        tableLayout: "fixed",
                        textAlign: "left",
                        backgroundColor: "#111",
                        color: "white",
                      }}
                    >
                      <thead>
                        <tr>
                          {[
                            { head: "Name", width: "12%" },
                            { head: "Email", width: "22%" },
                            { head: "Phone", width: "12%" },
                            { head: "City", width: "10%" },
                            { head: "Assigned_to", width: "12%" },
                            { head: "Follow_up", width: "10%" },
                            { head: "Status", width: "10%" },
                            { head: "Date Creates", width: "12%" },
                            { head: "Action", width: "10%" },
                          ].map((col, i) => (
                            <th
                              key={i}
                              style={{
                                width: col.width,
                                padding: "10px",
                                border: "1px solid #333",
                                backgroundColor: "#1a1a1a",
                                fontWeight: "bold",
                                textAlign: "center",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {col.head}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {students
                          .filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
                            (statusFilter === "" || s.Status === statusFilter))
                          .map((student, index) => (
                            <tr key={index}>
                              {[
                                student.name,
                                student.email,
                                student.phone,
                                student.city,

                                student.Assigned_to,
                                student.Follow_up,

                                student.Status,
                                student.date_created,


                              ].map((val, i) => (
                                <td
                                  key={i}
                                  style={{ padding: "15px", border: "1px solid #333", textAlign: "center" }}
                                >
                                  {val}
                                </td>
                              ))}
                              <td style={{ textAlign: "center", }}>
                                <button
                                  onClick={() => handleDeleteLead(index)}
                                  style={{
                                    padding: "3px 7px",
                                    backgroundColor: "#ff4444",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    margin: "0 4px",
                                  }}
                                >
                                  <MdDelete />
                                </button>
                                <button
                                  onClick={() => handleEditLead(index)}
                                  style={{
                                    padding: "3px 7px",
                                    backgroundColor: "#44e9ff",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    margin: "0 4px",
                                  }}
                                >
                                  <CiEdit />
                                </button>
                                <button
                                  onClick={() => window.open(`https://wa.me/${student.phone}`, "_blank")}
                                  style={{
                                    padding: "3px 7px",
                                    backgroundColor: "#44ff6d",
                                    border: "none",
                                    color: "white",
                                    borderRadius: "4px",
                                    cursor: "pointer",
                                    margin: "0 4px",
                                  }}
                                >
                                  <FaWhatsapp />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  )}


                </div>
              </>
            )}

            {/* ADD LEAD PAGE */}
            {activeStudentPage === "add" && (
              <div
                style={{
                  backgroundColor: "#0d0d0d",
                  padding: "20px",
                  borderRadius: "12px",
                }}
              >
                <h3 style={{ marginBottom: "20px" }}>Add New Lead</h3>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    const res = await fetch("http://localhost:5000/api/leads/add", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(leadDetails),
                    });

                    const data = await res.json();
                    if (editIndex === null) {
                      leadDetails.Status = "Pending";
                    }
                    if (editIndex !== null) {

                      setStudents((prev) =>
                        prev.map((item, i) => (i === editIndex ? leadDetails : item))
                      );
                      setSavedLead(leadDetails);
                      setShowModal(true);

                      Toast.fire({
                        icon: "success",
                        title: "Lead Updated Successfully!",
                      });

                      setEditIndex(null);
                    } else {
                      //  ADD NEW LEAD
                      setStudents((prev) => [...prev, leadDetails]);
                      setSavedLead(leadDetails);
                      setShowModal(true);
                      Toast.fire({
                        icon: "success",
                        title: "Lead Added Successfully!",
                      });
                    }

                    // RESET FORM
                    setLeadDetails({
                      name: "",
                      email: "",
                      phone: "",
                      city: "",
                      //address: "",
                      Status: "",
                      Follow_up: "",
                      Assigned_to: "",
                      date_created: ""
                    });

                    setActiveStudentPage("list");
                  }}

                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "15px",
                  }}
                >


                  {/* Left column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={leadDetails.name}
                      onChange={handleChange}
                      style={{
                        ...formInput,
                        border: errors.name ? "1px solid red" : "1px solid #ccc",
                      }}
                    />
                    {errors.name && (
                      <span style={{ color: "red", fontSize: "12px" }}>{errors.name}</span>
                    )}
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={leadDetails.email}
                      onChange={handleChange}
                      style={{
                        ...formInput,
                        border: errors.email ? "1px solid red" : "1px solid #ccc",
                      }}
                    />
                    {errors.email && (
                      <span style={{ color: "red", fontSize: "12px", }}>{errors.email}</span>
                    )}
                    <input
                      type="text"
                      name="phone"
                      placeholder="Phone Number"
                      value={leadDetails.phone}
                      onChange={handleChange}
                      style={{
                        ...formInput,
                        border: errors.phone ? "1px solid red" : "1px solid #ccc",
                      }}
                    />
                    {errors.phone && (
                      <span style={{ color: "red", fontSize: "12px" }}>{errors.phone}</span>
                    )}

                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={leadDetails.city}
                      onChange={handleChange}
                      style={{
                        ...formInput,
                        border: errors.city ? "1px solid red" : "1px solid #ccc",
                      }}
                    />
                    {errors.city && (
                      <span style={{ color: "red", fontSize: "12px" }}>{errors.city}</span>
                    )}
                  </div>
                  {/* Right column */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                    <select
                      name="Status"
                      value={leadDetails.Status || ""}
                      onChange={handleChange}
                      style={{
                        ...formInput,
                        border: errors.Status ? "1px solid red" : "1px solid #ccc",
                        backgroundColor: "#241e1efd",
                      }}
                    >
                      <option value=""> Status </option>
                      <option value="Procces">Procces</option>
                      <option value="Complete">Complete</option>
                      <option value="Pending">Pending</option>
                    </select>

                    {errors.Status && (
                      <span style={{ color: "red", fontSize: "12px" }}>{errors.Status}</span>
                    )}

                    <select
                      name="Assigned_to"
                      value={leadDetails.Assigned_to}
                      onChange={handleChange}
                      style={formInput}
                    >
                      <option value="">Select Employee</option>

                      {employeeNameList.map((emp, i) => (
                        <option key={i} value={emp}>
                          {emp}
                        </option>
                      ))}
                    </select>

                    {errors.Assigned_to && (
                      <span style={{ color: "red", fontSize: "12px" }}>
                        {errors.Assigned_to}
                      </span>
                    )}



                    <input
                      type="text"
                      name="Follow_up"
                      placeholder="Follow Up"
                      value={leadDetails.Follow_up}
                      onChange={handleChange}
                      style={{
                        ...formInput,
                        border: errors.Follow_up ? "1px solid red" : "1px solid #ccc",
                      }}
                    />
                    {errors.Follow_up && (
                      <span style={{ color: "red", fontSize: "12px" }}>{errors.Follow_up}</span>
                    )}
                    <input
                      type="date"
                      name="date_created"
                      placeholder="Date Created"
                      value={leadDetails.date_created}
                      onChange={handleChange}
                      style={{
                        ...formInput,
                        border: errors.date_created ? "1px solid red" : "1px solid #ccc",
                      }}
                    />
                    {errors.date_created && (
                      <span style={{ color: "red", fontSize: "12px" }}>{errors.date_created}</span>
                    )}
                  </div>

                  <div style={{ display: "flex", gap: "10px" }}>

                    <button
                      type="submit"
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#ff000d",
                        color: "black",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Save Lead
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveStudentPage("list")}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#00ffb3",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Cancel
                    </button>

                  </div>
                </form>
              </div>
            )}
          </>
        )}
        {/*  this is  for Employees*/}
        {activeSection === "employees" && (
          <>
            {/* TOP BAR */}
            {activeEmployeePage === "list" && (
              <>
                <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>


                  <button
                    onClick={() => setActiveEmployeePage("add")}
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#292768",
                      border: "none",
                      color: "white",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Add Employee
                  </button>
                </div>

                {/* EMPLOYEE TABLE */}
                <div style={{ backgroundColor: "#0d0d0d", padding: "15px", borderRadius: "10px" }}>
                  {employees.length === 0 ? (
                    <p style={{ color: "gray" }}>No employees added yet.</p>
                  ) : (
                    <table
                      style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        tableLayout: "fixed",
                        textAlign: "left",
                        backgroundColor: "#111",
                        color: "white",
                      }}
                    >

                      <thead>
                        <tr>
                          {[
                            { head: "First Name", width: "10%" },
                            { head: "Last Name", width: "10%" },
                            { head: "Email", width: "18%" },
                            { head: "Password", width: "10%" },
                            { head: "DOB", width: "10%" },
                            { head: "DOJ", width: "10%" },
                            { head: "Remark", width: "12%" },
                            { head: "Join Time", width: "10%" },
                            { head: "Designation", width: "10%" },
                            { head: "Address", width: "15%" },
                            { head: "Action", width: "8%" },
                          ].map((col, i) => (
                            <th
                              key={i}
                              style={{
                                width: col.width,
                                padding: "10px",
                                border: "1px solid #333",
                                backgroundColor: "#1a1a1a",
                                fontWeight: "bold",
                                textAlign: "center",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                              }}
                            >
                              {col.head}
                            </th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {employees
                          .filter((e) =>
                            e.firstName.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((emp, index) => (
                            <tr key={index}>
                              {[
                                emp.firstName,
                                emp.lastName,
                                emp.email,
                                emp.password,
                                emp.dob,
                                emp.doj,
                                emp.remark,
                                emp.joinTime,
                                emp.designation,
                                emp.address,
                              ].map((value, idx) => (
                                <td
                                  key={idx}
                                  style={{
                                    padding: "10px",
                                    border: "1px solid #333",
                                    textAlign: "center",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                  }}
                                >
                                  {value}
                                </td>
                              ))}

                              {/* ACTION BUTTONS */}
                              <td
                                style={{
                                  padding: "15px",
                                  border: "1px solid #333",
                                  textAlign: "center",
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    gap: "8px",
                                  }}
                                >
                                  <button
                                    onClick={() => handleEmployeeEdit(index)}
                                    style={{
                                      padding: "3px 7px",
                                      backgroundColor: "#44e9ff",
                                      borderRadius: "4px",
                                      margin: "0 4px",
                                      border: "none",
                                      cursor: "pointer",
                                    }}
                                  >
                                    <CiEdit />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteEmployee(index)}
                                    style={{
                                      padding: "3px 7px",
                                      backgroundColor: "#ff4444",
                                      border: "none",
                                      color: "white",
                                      borderRadius: "4px",
                                      cursor: "pointer",
                                      margin: "0 4px",
                                    }}
                                  >
                                    <MdDelete />
                                  </button>


                                </div>
                              </td>
                            </tr>
                          ))}
                      </tbody>

                    </table>

                  )}
                </div>
              </>
            )}

            {/* ADD EMPLOYEE PAGE */}
            {activeEmployeePage === "add" && (
              <div style={{ backgroundColor: "#0d0d0d", padding: "20px", borderRadius: "12px" }}>
                <h3 style={{ marginBottom: "20px" }}>Add New Employee</h3>
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();

                    // Backend API call
                    const res = await fetch("http://localhost:5000/api/employees/add", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(employeeDetails),
                    });
                    const data = await res.json();

                    if (editIndex !== null) {
                      // EDIT EXISTING
                      setEmployees((prev) =>
                        prev.map((item, i) => (i === editIndex ? employeeDetails : item))
                      );
                      setEditIndex(null);
                      Toast.fire({ icon: "success", title: "Employee Updated Successfully!" });
                    } else {
                      // ADD NEW EMPLOYEE
                      setEmployees((prev) => [...prev, employeeDetails]);
                      Toast.fire({ icon: "success", title: "Employee Added Successfully!" });
                    }

                    // RESET FORM
                    setEmployeeDetails({
                      firstName: "",
                      lastName: "",
                      email: "",
                      password: "",
                      dob: "",
                      doj: "",
                      remark: "",
                      joinTime: "",
                      designation: "",
                      address: "",
                    });

                    setActiveEmployeePage("list");
                  }}

                >
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
                    {/* LEFT COLUMN */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={employeeDetails.firstName}
                        onChange={handleEmployeeChange}
                        style={{
                          ...formInput,
                          border: errors.firstName ? "1px solid red" : "1px solid #ccc",
                        }}
                      />
                      {errors.firstName && (
                        <span style={{ color: "red", fontSize: "12px" }}>{errors.firstName}</span>
                      )}

                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={employeeDetails.lastName}
                        onChange={handleEmployeeChange}
                        style={{
                          ...formInput,
                          border: errors.lastName ? "1px solid red" : "1px solid #ccc",
                        }}
                      />
                      {errors.lastName && (
                        <span style={{ color: "red", fontSize: "12px" }}>{errors.lastName}</span>
                      )}

                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={employeeDetails.email}
                        onChange={handleEmployeeChange}
                        style={{
                          ...formInput,
                          border: errors.email ? "1px solid red" : "1px solid #ccc",
                        }}
                      />
                      {errors.email && (
                        <span style={{ color: "red", fontSize: "12px" }}>{errors.email}</span>
                      )}

                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={employeeDetails.password}
                        onChange={handleEmployeeChange}
                        style={{
                          ...formInput,
                          border: errors.password ? "1px solid red" : "1px solid #ccc",
                        }}
                      />
                      {errors.password && (
                        <span style={{ color: "red", fontSize: "12px" }}>{errors.password}</span>
                      )}
                      <textarea
                        name="remark"
                        placeholder="Remark"
                        value={employeeDetails.remark}
                        onChange={handleEmployeeChange}
                        style={{
                          ...formInput,
                          height: "80px",
                          border: errors.remark ? "1px solid red" : "1px solid #ccc",
                        }}
                      />
                      {errors.remark && (
                        <span style={{ color: "red", fontSize: "12px" }}>{errors.remark}</span>
                      )}


                    </div>
                    {/* Right Column*/}
                    <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                      <input
                        type="date"
                        name="doj"
                        placeholder="Date of Joining"
                        value={employeeDetails.doj}
                        onChange={handleEmployeeChange}
                        style={{
                          ...formInput,
                          border: errors.doj ? "1px solid red" : "1px solid #ccc",
                        }}
                      />
                      {errors.doj && (
                        <span style={{ color: "red", fontSize: "12px" }}>{errors.doj}</span>
                      )}

                      <input
                        type="time"
                        name="joinTime"
                        placeholder="Join Time"
                        value={employeeDetails.joinTime}
                        onChange={handleEmployeeChange}
                        style={{
                          ...formInput,
                          border: errors.joinTime ? "1px solid red" : "1px solid #ccc",
                        }}
                      />
                      {errors.joinTime && (
                        <span style={{ color: "red", fontSize: "12px" }}>{errors.joinTime}</span>
                      )}

                      <input
                        type="text"
                        name="designation"
                        placeholder="Designation"
                        value={employeeDetails.designation}
                        onChange={handleEmployeeChange}
                        style={{
                          ...formInput,
                          border: errors.designation ? "1px solid red" : "1px solid #ccc",
                        }}
                      />
                      {errors.designation && (
                        <span style={{ color: "red", fontSize: "12px" }}>{errors.designation}</span>
                      )}

                      <textarea
                        name="address"
                        placeholder="Address"
                        value={employeeDetails.address}
                        onChange={handleEmployeeChange}
                        style={{
                          ...formInput,
                          height: "80px",
                          border: errors.address ? "1px solid red" : "1px solid #ccc",
                        }}
                      />
                      {errors.address && (
                        <span style={{ color: "red", fontSize: "12px" }}>{errors.address}</span>
                      )} <input
                        type="date"
                        name="dob"
                        placeholder="Date of Birth"
                        value={employeeDetails.dob}
                        onChange={handleEmployeeChange}
                        style={{
                          ...formInput,
                          border: errors.dob ? "1px solid red" : "1px solid #ccc",
                        }}
                      />
                      {errors.dob && (
                        <span style={{ color: "red", fontSize: "12px" }}>{errors.dob}</span>
                      )}


                    </div>
                  </div>

                  {/* BUTTONS */}
                  <div style={{ gridColumn: "1 / 3", display: "flex", gap: "10px" }}>

                    <button
                      onClick={handleEmployeeSubmit}  // <-- Add this
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#ff000d",
                        color: "black",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Save Employee
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveEmployeePage("list")}
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#00ffb3",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "bold",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}

      </main>
    </div>
  );
};
// Reusable Styles
const menuBtn = {
  background: "transparent",
  border: "none",
  color: "white",
  textAlign: "left",
  display: "flex",
  gap: "12px",
  alignItems: "center",
  fontSize: "16px",
  cursor: "pointer",
};

const card = {
  backgroundColor: "#0d0d0d",
  padding: "18px",
  borderRadius: "12px",
  color: "white",
};

const cardHeader = {
  display: "flex",
  alignItems: "center",
  gap: "10px",
};

const formInput = {
  padding: "12px",
  backgroundColor: "#1a1a1a",
  border: "1px solid #333",
  borderRadius: "6px",
  color: "white",
};



export default Dashboard;