// eslint-disable-next-line
import React, { useState } from "react";
// import { Link } from "react-router-dom";
import "./dashboard.css";
import axios from "axios";
import { useEffect } from "react";
import Map from "../Dashboard/Map";
import { useNavigate } from "react-router-dom";

// import map from'./../../assets/ok.png';
// import Table from "../../components/table";
// import CustomMap from '../../components/Map'

// eslint-disable-next-line
const DashBoard = (props) => {
  const [workPermitData, setWorkPermitData] = useState([]);
  const maps = [
    "https://www.google.com/maps/d/u/0/embed?mid=1UMcXTWzduulegwDpDPW5axN42plgmLc&ehbc=2E312F",
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3493.377173975159!2d76.68103870892409!3d28.88713797542455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUzJzEzLjciTiA3NsKwNDEnMDEuMCJF!5e0!3m2!1sen!2sin!4v1708961863312!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3493.3785868503505!2d76.68152470892404!3d28.887095975424593!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUzJzEzLjYiTiA3NsKwNDEnMDIuOCJF!5e0!3m2!1sen!2sin!4v1708962020130!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3493.360488449955!2d76.6815727089241!3d28.887633975424276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUzJzE1LjUiTiA3NsKwNDEnMDMuMCJF!5e0!3m2!1sen!2sin!4v1708962134265!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3493.3601184050967!2d76.6821257089241!3d28.887644975424323!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUzJzE1LjUiTiA3NsKwNDEnMDQuOSJF!5e0!3m2!1sen!2sin!4v1708962198457!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3493.410746073271!2d76.68188170892401!3d28.886139975425113!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUzJzEwLjEiTiA3NsKwNDEnMDQuMSJF!5e0!3m2!1sen!2sin!4v1708962265936!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3493.4258834461616!2d76.681855708924!3d28.885689975425322!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUzJzA4LjUiTiA3NsKwNDEnMDQuMCJF!5e0!3m2!1sen!2sin!4v1708962318762!5m2!1sen!2sin",
    "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3493.408761379513!2d76.68148470892399!3d28.886198975425092!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDUzJzEwLjMiTiA3NsKwNDEnMDIuNiJF!5e0!3m2!1sen!2sin!4v1708962385662!5m2!1sen!2sin",
  ];
  const [selecteMap, setSelectedMap] = useState(maps[0]);
  const navigate = useNavigate();
  // const dummyData = [
  //   {
  //     permitNo: "P001",
  //     area: "Area A",
  //     subArea: "Sub Area 1",
  //     typeOfPermit: "Type A",
  //     fromDate: "2024-02-01",
  //     toDate: "2024-02-10",
  //     requiringDepartment: "Dept A",
  //     issuingDepartment: "Dept B",
  //     kyStatusToday: "Active",
  //     riskCategory: "Low",
  //     checkSheetStatusToday: "Complete",
  //     permitStatus: "Approved",
  //   },
  //   {
  //     permitNo: "P001",
  //     area: "Area A",
  //     subArea: "Sub Area 1",
  //     typeOfPermit: "Type A",
  //     fromDate: "2024-02-01",
  //     toDate: "2024-02-10",
  //     requiringDepartment: "Dept A",
  //     issuingDepartment: "Dept B",
  //     kyStatusToday: "Active",
  //     riskCategory: "Low",
  //     checkSheetStatusToday: "Complete",
  //     permitStatus: "Approved",
  //   },
  //   {
  //     permitNo: "P001",
  //     area: "Area A",
  //     subArea: "Sub Area 1",
  //     typeOfPermit: "Type A",
  //     fromDate: "2024-02-01",
  //     toDate: "2024-02-10",
  //     requiringDepartment: "Dept A",
  //     issuingDepartment: "Dept B",
  //     kyStatusToday: "Active",
  //     riskCategory: "Low",
  //     checkSheetStatusToday: "Complete",
  //     permitStatus: "Approved",
  //   },
  //   // Add more dummy data as needed
  // ];

  // const columns = [
  //   "Permit No",
  //   "Area",
  //   "Sub Area",
  //   "Type Of Permit",
  //   "Area",
  //   "From Date",
  //   "To Date",
  //   "Requiring Department",
  //   "Issuing Department",
  //   "KY Status Today",
  //   "Risk Category",
  //   "Check Sheet Status Today",
  //   "Permit Status",
  // ];

  // const [mapUrl, setMapUrl] = useState(
  //   "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1021.8545271774815!2d76.68104713971542!3d28.88566667716725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d9b032f3f1007%3A0x3ab4fe928fc5c0fc!2sMaruti%20Suzuki%20India%20Ltd.%20R%26D%20Plant!5e1!3m2!1sen!2sin!4v1706091534569!5m2!1sen!2sin"
  // );

  // const handleHoverIn = () => {
  //   const cordinatesData = [
  //     {
  //       name: "Building 14A",
  //       xCordinates: "28.887138",
  //       yCordinates: "76.683619",
  //     },
  //     {
  //       name: "Building 14B",
  //       xCordinates: "28.887096",
  //       yCordinates: "76.684105",
  //     },
  //     {
  //       name: "Building 15",
  //       xCordinates: "28.887634",
  //       yCordinates: "76.684153",
  //     },
  //     {
  //       name: "Building 9 Exp",
  //       xCordinates: "28.887645",
  //       yCordinates: "76.684706",
  //     },
  //     {
  //       name: "Building 3 Exp",
  //       xCordinates: "28.886140",
  //       yCordinates: "76.684462",
  //     },
  //     {
  //       name: "Builing 1 Exp",
  //       xCordinates: "28.885690",
  //       yCordinates: "76.684436",
  //     },
  //     {
  //       name: "VFF facility",
  //       xCordinates: "28.886199",
  //       yCordinates: "76.684065",
  //     },
  //   ];
  //   // 29.73797829504393, -95.3962518363664
  //   console.log("Show the map cordinates on the google map.", cordinatesData);

  //   function generateGoogleMapsURL(latitude, longitude) {
  //     // Replace the placeholders with actual values
  //     const urlTemplate =
  //       "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1021.8545271774815!2d{longitude}!3d{latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d9b032f3f1007%3A0x3ab4fe928fc5c0fc!2sMaruti%20Suzuki%20India%20Ltd.%20R%26D%20Plant!5e1!3m2!1sen!2sin!4v1706091534569!5m2!1sen!2sin";

  //     // Replace placeholders with actual coordinates
  //     const url = urlTemplate
  //       .replace("{latitude}", latitude)
  //       .replace("{longitude}", longitude);

  //     return url;
  //   }

  //   const finalUrl = generateGoogleMapsURL(
  //     cordinatesData[0].xCordinates,
  //     cordinatesData[0].yCordinates
  //   );
  //   console.log("finalUrl", finalUrl);
  //   setMapUrl(finalUrl);
  // };
  // console.log("mapUrl", mapUrl);
  // console.log("setMapUrl", setMapUrl);

  const getWorkPermitData = async () => {
    try {
      // const response = {
      //   error: false,
      //   errors: null,
      //   data: {
      //     workPermitWithActiveCheckListToday: 4,
      //     workPermitOverLast2Days: 106,
      //     workPermitWithNoCheckListToday: 34,
      //   },
      // };

      const response = await axios.get(
        "http://localhost:9090/workpermit/api/v1/work-permit-tab-count"
      );

      setWorkPermitData(response?.data?.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWorkPermitData();
  }, []);

  console.log(workPermitData);

  return (
    <div className="dashboard-page">
      <div className="page-header">
        <span className="header">Dashboard</span>
      </div>
      <div className="page-content">
        <div className="top-block">
          <div className="map-and-options-block">
            <div className="info-cards-block">
              <div
                className="card green"
                onMouseEnter={() => setSelectedMap(maps[1])}
                onMouseLeave={() => setSelectedMap(maps[0])}
                onClick={() => navigate("work-permit")}
              >
                <div className="card_number">
                  {workPermitData?.workPermitWithActiveCheckListToday
                    ?.totalCount || 0}
                </div>
                <div className="card_text">
                  WrorkPermit With Active Checklist
                </div>
              </div>
              {/* </Link> */}

              {/* <Link to="/work-permit" className="card red">
                <div className="card_number">
                  {workPermitData?.workPermitWithNoCheckListToday || 0}
                </div>
                <div className="card_text">
                  Wrork Permit With No Checklist Today
                </div>
              </Link> */}
              <div
                className="card red"
                onMouseEnter={() => setSelectedMap(maps[2])}
                onMouseLeave={() => setSelectedMap(maps[0])}
                onClick={() => navigate("work-permit")}
              >
                <div className="card_number">
                  {workPermitData?.workPermitWithNoCheckListToday?.totalCount ||
                    0}
                </div>
                <div className="card_text">
                  WrorkPermit With No Checklist Today
                </div>
              </div>
              {/* <Link to="/work-permit" className="card amber">
                <div className="card_number">1</div>
                <div className="card_text">Wrork Permit On Hold By Safety</div>
              </Link> */}
              <div
                className="card amber"
                onMouseEnter={() => setSelectedMap(maps[3])}
                onMouseLeave={() => setSelectedMap(maps[0])}
                onClick={() => navigate("work-permit")}
              >
                <div className="card_number">1</div>
                <div className="card_text">WrorkPermit On Hold By Safety</div>
              </div>

              <div
                className="card"
                onMouseEnter={() => setSelectedMap(maps[4])}
                onMouseLeave={() => setSelectedMap(maps[0])}
                onClick={() => navigate("work-permit")}
              >
                <div className="card_number">
                  {workPermitData?.workPermitOverLast2Days?.totalCount || 0}
                </div>
                <div className="card_text">WrorkPermit Over (Last 2 days)</div>
              </div>
            </div>
            {/* <CustomMap/> */}
            {/* <MainScreen /> */}
            <div className="map">
              <Map url={selecteMap} />
            </div>

            {/* <div className="map">
              <iframe
                src="https://www.google.com/maps/d/u/0/embed?mid=1Kg7XXmJZ5idsf9tKHINMS0I_LVOX9m8&ehbc=2E312F"
                width="800"
                height="1000"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div> */}

            {/* <div>
              <div>
                <h1>Permit Data Table</h1>
                <Table
                  data={dummyData}
                  columns={columns}
                  defaultRowsPerPage={10}
                  pagination={true}
                />
              </div>
            </div> */}
            {/* <h1> Main Map </h1>
            <div className="map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16648.252418965956!2d76.67183185033349!3d28.886346872406573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d9b032f3f1007%3A0x3ab4fe928fc5c0fc!2sMaruti%20Suzuki%20India%20Ltd.%20R%26D%20Plant!5e1!3m2!1sen!2sin!4v1698910968369!5m2!1sen!2sin"
                width="800"
                height="600"
                allowfullscreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div> */}

            {/* <div className='btn-block'>
                            <button className='btn'>Create new Work Permit</button>
                            <button className='btn'>Create new KY Sheet</button>
                            <button className='btn'>Create new Check Sheet</button>
                        </div> */}
          </div>
        </div>
        {/* <div className='table-block'>
                    <div className='table-title'>
                        <span className='title'>Recent Work Permits</span>
                        <Link className='view-all' to="/workPermit">View All</Link>
                    </div>
                    <div className='table_wrapper'>
                        <table className='data-table'>
                            <tr>
                                <th style={{'width':'5%'}}>Work Permit No</th>
                                <th style={{'width':'5%'}}>Status</th>
                                <th style={{'width':'20%'}}>Area / Sub Area</th>
                                <th style={{'width':'10%'}}>Permit Type</th>
                                <th style={{'width':'15%'}}>Date</th>
                                <th style={{'width':'5%'}}>Requiring Department</th>
                                <th style={{'width':'5%'}}>Issuing Departmnet</th>
                                <th style={{'width':'5%'}}>Ky Status</th>
                                <th style={{'width':'10%'}}>Risk Category</th>
                                <th style={{'width':'10%'}}>Check Sheet Status</th>
                                <th style={{'width':'15%'}}></th>
                            </tr>
                            <tr>
                                <td className='table-cell'>12345</td>
                                <td className='table-cell text-center'>
                                    <span className='dot red'></span>
                                </td>
                                <td className='table-cell area-cell'>
                                    <span className='area'>Building 5</span>
                                    <span className='sub-area'>First Floor Cealing area</span>
                                </td>
                                <td className='table-cell permitType'>Hot Height</td>
                                <td className='table-cell' width='20%'>
                                    <span className='start-date'>07/27/23</span> - <span className='end-date'>08/27/23</span>
                                </td>
                                <td className='table-cell text-center'>CVL-R</td>
                                <td className='table-cell text-center'>EN7F</td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell text-center'><span className='highlight-text bold red'>High</span></td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell'>
                                    <button className='btn btn-view-more'>View more</button>
                                </td>
                            </tr>
                            <tr>
                                <td className='table-cell'>12345</td>
                                <td className='table-cell text-center'>
                                    <span className='dot green'></span>
                                </td>
                                <td className='table-cell area-cell'>
                                    <span className='area'>Building 5</span>
                                    <span className='sub-area'>First Floor Cealing area</span>
                                </td>
                                <td className='table-cell permitType'>Hot Height</td>
                                <td className='table-cell' width='20%'>
                                    <span className='start-date'>07/27/23</span> - <span className='end-date'>08/27/23</span>
                                </td>
                                <td className='table-cell text-center'>CVL-R</td>
                                <td className='table-cell text-center'>EN7F</td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell text-center'><span className='highlight-text bold red'>High</span></td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell'>
                                    <button className='btn btn-view-more'>View more</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <div className='table-block'>
                    <div className='table-title'>
                        <span className='title'>Recent KY Sheets</span>
                        <Link to="/allKySheets" className='view-all'>View All</Link>
                    </div>
                    <div className='table_wrapper'>
                        <table className='data-table'>
                            <tr>
                                <th style={{'width':'5%'}}>Work Permit No</th>
                                <th style={{'width':'5%'}}>Status</th>
                                <th style={{'width':'20%'}}>Area / Sub Area</th>
                                <th style={{'width':'10%'}}>Permit Type</th>
                                <th style={{'width':'15%'}}>Date</th>
                                <th style={{'width':'5%'}}>Requiring Department</th>
                                <th style={{'width':'5%'}}>Issuing Departmnet</th>
                                <th style={{'width':'5%'}}>Ky Status</th>
                                <th style={{'width':'10%'}}>Risk Category</th>
                                <th style={{'width':'10%'}}>Check Sheet Status</th>
                                <th style={{'width':'15%'}}></th>
                            </tr>
                            <tr>
                                <td className='table-cell'>12345</td>
                                <td className='table-cell text-center'>
                                    <span className='dot red'></span>
                                </td>
                                <td className='table-cell area-cell'>
                                    <span className='area'>Building 5</span>
                                    <span className='sub-area'>First Floor Cealing area</span>
                                </td>
                                <td className='table-cell permitType'>Hot Height</td>
                                <td className='table-cell' width='20%'>
                                    <span className='start-date'>07/27/23</span> - <span className='end-date'>08/27/23</span>
                                </td>
                                <td className='table-cell text-center'>CVL-R</td>
                                <td className='table-cell text-center'>EN7F</td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell text-center'><span className='highlight-text bold red'>High</span></td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell'>
                                    <button className='btn btn-view-more'>View more</button>
                                </td>
                            </tr>
                            <tr>
                                <td className='table-cell'>12345</td>
                                <td className='table-cell text-center'>
                                    <span className='dot green'></span>
                                </td>
                                <td className='table-cell area-cell'>
                                    <span className='area'>Building 5</span>
                                    <span className='sub-area'>First Floor Cealing area</span>
                                </td>
                                <td className='table-cell permitType'>Hot Height</td>
                                <td className='table-cell' width='20%'>
                                    <span className='start-date'>07/27/23</span> - <span className='end-date'>08/27/23</span>
                                </td>
                                <td className='table-cell text-center'>CVL-R</td>
                                <td className='table-cell text-center'>EN7F</td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell text-center'><span className='highlight-text bold red'>High</span></td>
                                <td className='table-cell text-center'><span className='highlight-text blue'>Updated</span></td>
                                <td className='table-cell'>
                                    <button className='btn btn-view-more'>View more</button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div> */}
      </div>
    </div>
  );
};
export default DashBoard;
