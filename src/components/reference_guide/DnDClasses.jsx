import React, { useState, useEffect } from "react";
import {
  CircularProgress,
  Typography,
  Box,
  Container,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";

function DnDClasses() {
  const [dndClasses, setDnDClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://www.dnd5eapi.co/api/classes")
      .then((response) => response.json())
      .then((data) => {
        setDnDClasses(data.results);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  }, []);

  const fetchClassDetails = (index) => {
    setIsLoading(true);
    fetch(`https://www.dnd5eapi.co/api/classes/${index}`)
      .then((response) => response.json())
      .then((data) => {
        setSelectedClass(data);
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        setIsLoading(false);
      });
  };

  const formatValue = (value, level = 0) => {
    if (Array.isArray(value)) {
      return value.map((item, index) => (
        <Box key={index} sx={{ pl: level * 2 }}>
          {formatValue(item, level + 1)}
        </Box>
      ));
    } else if (typeof value === "object" && value !== null) {
      return (
        <Card variant="outlined" sx={{ mb: 2, ml: level * 2 }}>
          <CardContent>
            {Object.entries(value).map(([key, val], i) => (
              <Typography key={i} variant="body2" component="div">
                <strong>{key}:</strong> {formatValue(val, level + 1)}
              </Typography>
            ))}
          </CardContent>
        </Card>
      );
    } else {
      return value.toString();
    }
  };

  const renderClassData = (data) => {
    if (!data) return null;

    return Object.entries(data).map(([key, value], i) => (
      <Typography key={i} variant="body2" component="div" sx={{ mt: 1 }}>
        <strong>{key}:</strong> {formatValue(value)}
      </Typography>
    ));
  };

  return (
    <Container sx={{ display: "flex", flexDirection: "column", my: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="class-select-label">Select Class</InputLabel>
        <Select
          labelId="class-select-label"
          id="class-select"
          value={selectedClass ? selectedClass.index : ""}
          label="Select Class"
          onChange={(event) => fetchClassDetails(event.target.value)}
        >
          {dndClasses.map((dndClass, index) => (
            <MenuItem key={index} value={dndClass.index}>
              {dndClass.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ width: "100%" }}>
        <Paper elevation={3} sx={{ p: 2, minHeight: 500, overflow: "auto" }}>
          {isLoading && <CircularProgress />}
          {error && <Typography color="error">{error}</Typography>}
          {selectedClass && (
            <>
              <Typography variant="h5" component="h2">
                {selectedClass.name}
              </Typography>
              {renderClassData(selectedClass)}
            </>
          )}
        </Paper>
      </Box>
    </Container>
  );
}

export default DnDClasses;
