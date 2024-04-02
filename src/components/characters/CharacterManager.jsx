import React, { useState, useEffect } from "react";
import {
  Grid,
  Button,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const CharacterManager = () => {
  const [characters, setCharacters] = useState([]);
  const [expandedCharacterId, setExpandedCharacterId] = useState(null);

  useEffect(() => {
    // Load characters from Local Storage
    const storedCharacters =
      JSON.parse(localStorage.getItem("characters")) || [];
    setCharacters(storedCharacters);
  }, []);

  const toggleExpandCharacter = (id) => {
    setExpandedCharacterId(expandedCharacterId === id ? null : id);
  };

  const deleteCharacter = (id) => {
    // Filter out the character to delete and update Local Storage
    const updatedCharacters = characters.filter(
      (character) => character.id !== id
    );
    localStorage.setItem("characters", JSON.stringify(updatedCharacters));
    setCharacters(updatedCharacters);
  };

  const renderAbilities = (abilities) => (
    <List>
      {Object.entries(abilities).map(([key, value]) => (
        <ListItem key={key}>
          <ListItemText
            primary={`${key.charAt(0).toUpperCase() + key.slice(1)}: ${value}`}
          />
        </ListItem>
      ))}
    </List>
  );

  const renderSkills = (skills) => (
    <List>
      {skills.map((skill, index) => (
        <ListItem key={index}>
          <ListItemText primary={skill} />
        </ListItem>
      ))}
    </List>
  );

  const renderCharacterDetails = (character) => (
    <div style={{ marginLeft: 20, marginBottom: 0 }}>
      <p>Race: {character.race}</p>
      <p>Class: {character.class}</p>
      <p>Inventory: {character.inventory}</p>
      <p>Description: {character.description}</p>
      <p>Hit Points: {character.hitPoints}</p>
      <Typography variant="subtitle1">Abilities:</Typography>
      {renderAbilities(character.abilities)}
      <Typography variant="subtitle1">Skills:</Typography>
      {renderSkills(character.skills)}
    </div>
  );

  return (
    <div>
      <h3>Characters:</h3>
      {characters.length > 0 ? (
        <ul style={{ listStyleType: "none" }}>
          {characters.map((character) => (
            <Card key={character.id} sx={{ minWidth: 275, marginTop: 2 }}>
              <CardContent>
                <li>
                  <div>
                    <h3>Name: {character.name}</h3>
                    <Button
                      sx={{ marginLeft: 1 }}
                      variant="contained"
                      onClick={() => toggleExpandCharacter(character.id)}
                    >
                      {expandedCharacterId === character.id
                        ? "Collapse"
                        : "Expand"}
                    </Button>
                    <Button
                      sx={{ marginLeft: 1 }}
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => deleteCharacter(character.id)}
                    >
                      Delete
                    </Button>
                  </div>
                  {expandedCharacterId === character.id &&
                    renderCharacterDetails(character)}
                </li>
              </CardContent>
            </Card>
          ))}
        </ul>
      ) : (
        <p>No characters available.</p>
      )}
    </div>
  );
};

export default CharacterManager;
