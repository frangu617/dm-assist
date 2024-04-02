import React, { useState, useEffect } from "react";
import {Tooltip, TextField} from "@mui/material";

function BackgroundSelector({selectedBackground, onBackgroundChange}) {

    const [background, setBackground] = useState([]);

    const fetchBackgrounds = () => {
        fetch("https://www.dnd5eapi.co/api/backgrounds")
            .then((response) => response.json())
            .then((data) => {
                // Extract the background names from the fetched data
                const backgroundNames = data.results.map((background) => background.name);
                setBackground(backgroundNames);
            })
            .catch((error) => console.error("Error fetching races:", error));
    };
    
    useEffect(() => {
        // Fetch races when the component mounts
        // fetchBackgrounds(); //api only has acolyte, going to change it back if it changes in the api
        setBackground(['Acolyte', 'Folk Hero', 'Noble', 'Sage', 'Soldier', 'Criminal', 'Entertainer', 'Hermit', 'Outlander']);
    }, [])

    return (
        <Tooltip title={`Selected Background: ${selectedBackground}`}>
            <TextField
                fullWidth
                select
                label="Background"
                variant="outlined"
                value={selectedBackground}
                onChange={(e) => onBackgroundChange(e.target.value)}
                SelectProps={{ native: true }}
            >
                <option value=""></option>
                {background.map((background, index) => (
                    <option key={index} value={background}>
                        {background}
                    </option>
                ))}
            </TextField>
        </Tooltip>
    )
}

export default BackgroundSelector