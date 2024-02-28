/* eslint-disable-file no-use-before-define */
import "./workPermit.css";
import searchLogo from "./../../assets/search_icon_grey.svg";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// eslint-disable-next-line
const FilterComponent = ({
  // eslint-disable-next-line
  handleFilterChange,
  // eslint-disable-next-line
  departmentFilter,
  // eslint-disable-next-line
  permitTypeFilter,
  // eslint-disable-next-line
  riskCategoryFilter,
  // eslint-disable-next-line
  dateFilter,
  // eslint-disable-next-line
  kyStatusFilter,
  // eslint-disable-next-line
  resetFilters,
}) => {
  const [workPermitData, setWorkPermitData] = useState([]);
  const departments = workPermitData?.map((item) => item?.issuingDepartment);
  const uniqueDepartments = [...new Set(departments)];

  const permitTypes = workPermitData?.map((item) => item?.permitType);
  const uniquePermitTypes = [...new Set(permitTypes)];

  const riskCategories = workPermitData?.map((item) => item?.riskCategory);
  const uniqueRiskCategories = [...new Set(riskCategories)];

  const kyStatuses = workPermitData?.map((item) => item?.kyStatus);
  const uniqueKyStatuses = [...new Set(kyStatuses)];

  const getWorkPermitData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9090/workpermit/api/v1/work-permits"
      );
      setWorkPermitData(response?.data?.data.records);
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWorkPermitData();
  }, []);

  return (
    <div className="w-100">
      <div className="d-flex justify-content-md-between align-items-center mb-3 filter-bar">
        <div className="w-100">
          <label htmlFor="area">KY Status</label>
          <select
            className="form-select"
            name="kyStatus"
            value={kyStatusFilter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            {uniqueKyStatuses?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="w-100">
          <label htmlFor="area">Department</label>
          <select
            className="form-select"
            name="department"
            value={departmentFilter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            {uniqueDepartments?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="w-100">
          <label htmlFor="permitType">Permit type</label>
          <select
            className="form-select"
            name="permitType"
            value={permitTypeFilter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            {uniquePermitTypes?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="w-100">
          <label htmlFor="riskCategory">Risk</label>
          <select
            className="form-select"
            name="riskCategory"
            value={riskCategoryFilter}
            onChange={handleFilterChange}
          >
            <option value="All">All</option>
            {uniqueRiskCategories?.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="w-100">
          <label htmlFor="date">Date</label>
          <select
            className="form-select"
            name="date"
            value={dateFilter}
            onChange={handleFilterChange}
          >
            <option value="Latest">Latest</option>
            <option value="Last Week">Last Week</option>
            <option value="Last Month">Last Month</option>
            <option value="Last Year">Last Year</option>
          </select>
        </div>
        <div className="">
          <label htmlFor="area">&nbsp;</label>
          <button
            type="button"
            className="btn btn-primary"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

function WorkPermit() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [areaFilter] = useState("All");
  const [dateFilter] = useState("Latest");
  const [permitTypeFilter, setPermitTypeFilter] = useState("All");
  const [departmentFilter, setDepartmentFilter] = useState("All");
  const [riskFilter, setRiskFilter] = useState("All");
  const [kyStatusFilter, setKyStatusFilter] = useState("All");

  const handleFilterChange = (event) => {
    switch (event.target.name) {
      case "permitType":
        setPermitTypeFilter(event.target.value);
        break;

      case "department":
        setDepartmentFilter(event.target.value);
        break;

      case "riskCategory":
        setRiskFilter(event.target.value);
        break;

      case "kyStatus":
        setKyStatusFilter(event.target.value);
        break;
    }
  };

  const resetFilters = () => {
    setPermitTypeFilter("All");
    setDepartmentFilter("All");
    setRiskFilter("All");
    setKyStatusFilter("All");
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:9090/workpermit/api/v1/work-permits"
        );

        setFilteredData(response?.data?.data);
        console.log(response?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    let filtered = filteredData;

    if (permitTypeFilter !== "All") {
      filtered = filtered?.filter(
        (item) => item?.permitType === permitTypeFilter
      );
    }

    if (dateFilter !== "Latest") {
      //filtered = filtered.filter(item => item.date === dateFilter);
    }

    if (areaFilter !== "All") {
      filtered = filtered?.filter((item) => item?.area === areaFilter);
    }

    if (departmentFilter !== "All") {
      filtered = filtered?.filter(
        (item) => item?.issuingDepartment === departmentFilter
      );
    }

    if (riskFilter !== "All") {
      filtered = filtered?.filter((item) => item.riskCategory === riskFilter);
    }

    if (kyStatusFilter !== "All") {
      filtered = filtered?.filter((item) => item?.kyStatus === kyStatusFilter);
    }

    setFilteredData(filtered);

    // eslint-disable-next-line
  }, [permitTypeFilter, departmentFilter, riskFilter, kyStatusFilter]);

  const handleSearch = async (event) => {
    try {
      const query = event.target.value;
      setSearchQuery(query);

      const response = await axios.get(
        "http://localhost:9090/workpermit/api/v1/work-permits"
      );
      // setWorkPermitData(response.data);

      const filtered = response?.data?.data?.filter((item) =>
        item?.workPermitNo.includes(query)
      );
      setFilteredData(filtered);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="work-permits-page">
      <div className="page-header">
        <span className="header">Work Permits</span>
      </div>
      <div className="page-content">
        <div className="page-utilities">
          <div className="search-block">
            <img className="search_icon" src={searchLogo} alt="search" />
            <input
              className="search"
              id="search"
              name="search"
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="btn-block">
            {/* <button className='btn btn-primary'>Create New Work Permit</button> */}
          </div>
        </div>
        <FilterComponent
          permitTypeFilter={permitTypeFilter}
          departmentFilter={departmentFilter}
          riskCategoryFilter={riskFilter}
          dateFilter={dateFilter}
          handleFilterChange={handleFilterChange}
          resetFilters={resetFilters}
          areaFilter={areaFilter}
          kyStatusFilter={kyStatusFilter}
        />
        <div className="table-block">
          <div className="table_wrapper">
            <table className="table table-striped align-middle">
              <thead className="bg-#EFEFEF">
                <tr>
                  <th>WP No</th>
                  <th>-</th>
                  <th>workPermitType</th>
                  <th>Place</th>
                  <th>Type Of Permit</th>
                  <th>From Date</th>
                  <th>To Date</th>
                  <th>No of Persons</th>
                  <th>Requiring Department</th>
                  <th>Issuing Department</th>
                  {/* <th>Ky Status</th>
                  <th>Risk Category</th> */}
                  <th>Check Sheet Status</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody>
                <tr></tr>
                {filteredData?.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <Link
                        to={{
                          pathname: `/work-permit/${item?.workPermitNo}`,
                          state: item,
                        }}
                      >
                        {item?.workPermitNo}
                      </Link>
                    </td>
                    <td>
                      <span
                        style={{
                          backgroundColor: item?.status,
                          width: "15px",
                          height: "15px",
                        }}
                        className={`badge rounded-pill block m-0 p-0 red-pill d-block`}
                      >
                        {" "}
                      </span>
                      {/* <span className={`dot ${item.status}`}> */}
                      {/* <span className="badge rounded-pill text-bg-danger block m-0 p-0"> </span> */}

                      {/* </span> */}
                    </td>
                    <td className="area-cell">
                      <span className="area">{item?.area}</span>
                      <span className="sub-area">{item?.subArea}</span>
                    </td>
                    <td className="permitType">{item?.permitType}</td>
                    <td width="20%">
                      <span className="start-date">{item?.startDate}</span> -{" "}
                      <span className="end-date">{item?.endDate}</span>
                    </td>
                    <td>{item?.requiringDepartment}</td>
                    <td>{item?.issuingDepartment}</td>
                    <td>
                      <span className="text-primary fw-semibold">
                        {item?.kyStatus}
                      </span>
                    </td>
                    <td>
                      <span className="text-danger fw-semibold">
                        {item?.riskCategory}
                      </span>
                    </td>
                    <td>
                      <span className="text-primary fw-semibold">
                        {item?.checkSheetStatus}
                      </span>
                    </td>
                    <td>...&nbsp;&nbsp;&nbsp;</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkPermit;
