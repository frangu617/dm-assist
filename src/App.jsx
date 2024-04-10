import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Link as RouterLink } from "react-router-dom";

import CharacterManager from "./components/characters/CharacterManager";
import CharacterCreator from "./components/characters/CharacterCreator";
import Home from "./components/Home";
import DiceRoller from "./components/tools/DiceRoller";
import InitiativeTracker from "./components/tools/InitiativeTracker";
import MusicSearch from "./components/tools/MusicSearch";
import MonsterSearch from "./components/reference_guide/MonsterSearch";
import RacesSearch from "./components/reference_guide/RacesSearch";
import RulesSearch from "./components/reference_guide/RulesSearch";
import DnDClasses from "./components/reference_guide/DnDClasses";
import Alignment from "./components/reference_guide/Alignment";
import "./App.scss"; // Your SCSS file

function App() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuId, setMenuId] = useState("");

  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuId("");
  };

  return (
    <Router>
      <div className="app-bar">
        <div className="toolbar">
          <NavLink to="/" className="logo-link">
            DM Assist
          </NavLink>
          <div className="nav-section">
            <Button
              sx={{
                color: "paperColor",
                "&:hover": { bgcolor: "highlightColor", color: "primaryColor" },
              }}
              onClick={(e) => handleClick(e, "characters")}
            >
              Characters
            </Button>
            <Menu
              id="characters-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl) && menuId === "characters"}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/create"
              >
                Create Character
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/manager"
              >
                Character Manager
              </MenuItem>
            </Menu>
            <Button
              sx={{
                color: "paperColor",
                "&:hover": { bgcolor: "highlightColor", color: "primaryColor" },
              }}
              onClick={(e) => handleClick(e, "tools")}
            >
              Tools
            </Button>
            <Menu
              id="tools-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl) && menuId === "tools"}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/dice-roller"
              >
                Dice Roller
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/initiative-tracker"
              >
                Initiative Tracker
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/music-search"
              >
                Music Search
              </MenuItem>
            </Menu>
            <Button
              sx={{
                color: "paperColor",
                "&:hover": { bgcolor: "highlightColor", color: "primaryColor" },
              }}
              onClick={(e) => handleClick(e, "reference")}
            >
              Reference
            </Button>
            <Menu
              id="reference-menu"
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && menuId === "reference"}
              onClose={handleClose}
            >
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/rules-search"
              >
                Rules Search
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/monster-search"
              >
                Monster Search
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/races-search"
              >
                Races Search
              </MenuItem>
              <MenuItem
                onClick={handleClose}
                component={RouterLink}
                to="/classes"
              >
                Classes
              </MenuItem>
              
            </Menu>
          </div>
        </div>
      </div>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create" element={<CharacterCreator />} />
          <Route path="/manager" element={<CharacterManager />} />
          <Route path="/dice" element={<DiceRoller />} />
          <Route path="/initiative-tracker" element={<InitiativeTracker />} />
          <Route path="/music-search" element={<MusicSearch />} />
          <Route path="/monster-search" element={<MonsterSearch />} />
          <Route path="/races-search" element={<RacesSearch />} />
          <Route path="/rules-search" element={<RulesSearch />} />
          <Route path="/alignment" element={<Alignment />} />
          <Route path="/classes" element={<DnDClasses />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
