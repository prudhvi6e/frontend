import {
  Card,
  Grid,
  Stack,
  InputLabel,
  Button,
  Container,
  Typography,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Autocomplete,
} from "@mui/material";
import ImageCards from "../../Section/KYHazared/ImageCards";
import Navbar from "../Navbar/Navbar";
import "../Screen2/Index.css";
import { Locations } from "../../assets/Locations/Locations";
import { workPermit } from "../../assets/Locations/WorkPermit";
import { outputData } from "../../assets/Locations/output";
import { useState } from "react";
import axios from "axios";

const Index = () => {
  const [recommendationData, setRecommendationData] = useState([]);
  const [location, setLocation] = useState("");
  const [selectWorkPermit, setSelectWorkPermit] = useState("");
  const [activities, setActivities] = useState("");
  const [chemicals, setChemicals] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(filterData({ location }));
    console.log(selectWorkPermit, activities, chemicals);
    const response = await axios.post(
      "http://internal-dkhy-dev-alb-1225508802.ap-south-1.elb.amazonaws.com/recommendation",
      {
        selectWorkPermit,
        activities,
        chemicals,
        location,
      }
    );
    setRecommendationData(response?.data?.data);
  };

  const filterData = (values) => {
    const { location } = values;
    const data = outputData.filter((output) => {
      if (output.Location.includes(location)) {
        return output;
      }
      return false;
    });
    return data;
  };

  // const getRecommendation = () => {

  // }

  return (
    <>
      <Navbar title="KY Hazard Application" />
      <Container
        maxWidth="90%"
        className="container-body"
        sx={{ paddingTop: 2 }}
      >
        <Grid container spacing={2}>
          <Grid item xs={5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography
                  sx={{ fontWeight: 700, fontSize: "16px", marginBottom: 2 }}
                >
                  Hazard Recommendation Engine
                </Typography>
                <form onSubmit={handleSubmit}>
                  <Card
                    sx={{ width: "141%" }}
                    padding={2}
                    // sx={{
                    //   borderRadius: 5,
                    //   boxShadow: "0px 0px 4px 1px rgba(0,0,0,0.5)",
                    // }}
                  >
                    <Grid container spacing={1} sx={{ padding: 2 }}>
                      <Grid item xs={12}>
                        <InputLabel>Choose location</InputLabel>
                        <Autocomplete
                          onInputChange={(e, value) => setLocation(value)}
                          fullWidth
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={Locations}
                          sx={{
                            ".MuiOutlinedInput-root": {
                              borderRadius: 50,
                              borderColor: "red",
                              borderWidth: 10,
                            },
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Choose Location"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel>Select Work Permit:</InputLabel>
                        <Autocomplete
                          onInputChange={(e, value) =>
                            setSelectWorkPermit(value)
                          }
                          fullWidth
                          size="small"
                          disablePortal
                          id="combo-box-demo"
                          options={workPermit}
                          sx={{
                            ".MuiOutlinedInput-root": {
                              borderRadius: 50,
                              borderColor: "red",
                              borderWidth: 10,
                            },
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Choose Permit Type"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel>
                          Enter Activities (comma-separated):
                        </InputLabel>
                        <TextField
                          onChange={(e) => setActivities(e.target.value)}
                          fullWidth
                          size="small"
                          placeholder="Enter Activities"
                          InputProps={{
                            sx: { borderRadius: 8, height: "35px" },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel>
                          Enter Chemicals (comma-separated):
                        </InputLabel>
                        <TextField
                          onChange={(e) => setChemicals(e.target.value)}
                          fullWidth
                          size="small"
                          placeholder="Enter type of chemicals around the area"
                          InputProps={{
                            sx: { borderRadius: 8, height: "35px" },
                          }}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{
                            borderRadius: 8,
                            width: "100%",
                            backgroundColor: "#2d3395",
                            color: "#fff",
                          }}
                        >
                          Get Recommendations
                        </Button>
                      </Grid>
                    </Grid>
                  </Card>
                </form>
              </Grid>
              <Grid item xs={12}>
                <ImageCards />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={7}>
            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ marginBottom: 2 }}
            >
              <Typography sx={{ fontWeight: 700, fontSize: "16px" }}>
                Results
              </Typography>
              <Button
                variant="contained"
                size="small"
                sx={{
                  borderRadius: 8,
                  width: "200px",
                  height: "20px",
                  backgroundColor: "#2d3395",
                  color: "#fff",
                }}
              >
                Download as PDF
              </Button>
            </Stack>
            <Card>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Hazard Category</TableCell>
                    <TableCell>Hazards</TableCell>
                    <TableCell>Risk Category</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recommendationData?.map((data) => {
                    <TableRow>
                      <TableCell>{data?.location || "N/a"}</TableCell>
                      <TableCell>{data?.abc || "N/a"}</TableCell>
                      <TableCell>{data?.abc || "N/a"}</TableCell>
                    </TableRow>;
                  })}
                </TableBody>
              </Table>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default Index;
