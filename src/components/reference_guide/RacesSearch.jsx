import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Box, Container, Paper, MenuItem, FormControl, InputLabel, Select, Card, CardContent } from '@mui/material';
import DOMPurify from 'dompurify';

function RaceSearch() {
    const [races, setRaces] = useState([]);
    const [selectedRaceIndex, setSelectedRaceIndex] = useState('');
    const [selectedRace, setSelectedRace] = useState(null);
    const [subraces, setSubraces] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://www.dnd5eapi.co/api/races")
            .then(response => response.json())
            .then(data => {
                setRaces(data.results);

                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedRaceIndex) {
            fetchRaceDetails(selectedRaceIndex);


        }
    }, [selectedRaceIndex]);

    const fetchRaceDetails = (index) => {
        setIsLoading(true);
        fetch(`https://www.dnd5eapi.co/api/races/${index}`)
            .then(response => response.json())
            .then(data => {
                setSelectedRace(data);
                fetchSubRaces(index);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    };
    const fetchSubRaces = (index) => {
        setIsLoading(true);
        fetch(`https://www.dnd5eapi.co/api/races/${index}/subraces`)
            .then(response => response.json())
            .then(data => {
                setSubraces(data.results);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    }

    const handleRaceChange = (event) => {
        setSelectedRaceIndex(event.target.value);
    };

    const formatValue = (value, level = 0) => {
        if (Array.isArray(value)) {
            return value.map((item, index) => (
                <Box key={index} sx={{ pl: level * 2 }}>
                    {formatValue(item, level + 1)}
                </Box>
            ));
        } else if (typeof value === 'object' && value !== null) {
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
    const renderRaceData = (data) => {
        if (!data) return null;

        return Object.entries(data).map(([key, value], i) => (
            <Typography key={i} variant="body2" component="div" sx={{ mt: 1 }}>
                <strong>{key}:</strong> {formatValue(value)}
            </Typography>
        ));
    }

    const renderSubRaces = () => {
        // Use the `subraces` state directly
        if (subraces.length === 0) return <Typography variant="body1">None</Typography>;

        return subraces.map((subrace, i) => (
            <Typography key={i} variant="body1">{subrace.name}</Typography>
        ));
    };

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', my: 4 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="race-select-label">Select Race</InputLabel>
                <Select
                    labelId="race-select-label"
                    id="race-select"
                    value={selectedRaceIndex}
                    label="Select Race"
                    onChange={handleRaceChange}
                >
                    {races.map((race) => (
                        <MenuItem key={race.index} value={race.index}>
                            {race.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{ width: '100%' }}>
                <Paper elevation={3} sx={{ p: 2, minHeight: 500, overflow: 'auto' }}>
                    {isLoading && <CircularProgress />}
                    {error && <Typography color="error">{error}</Typography>}
                    {selectedRace && (
                        <>
                            <Typography variant="h4" component="h2">{selectedRace.name}</Typography>
                            {renderRaceData(selectedRace)}</>
                    )}
                </Paper>
            </Box>
        </Container>
    );
}

export default RaceSearch;
