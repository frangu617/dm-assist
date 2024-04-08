import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Routes,
} from "react-router-dom";
import CharacterManager from "./components/characters/CharacterManager";
import CharacterCreator from "./components/characters/CharacterCreator";
import Home from "./components/Home";
import DiceRoller from "./components/tools/DiceRoller";
import InitiativeTracker from "./components/tools/InitiativeTracker";
import MusicSearch from "./components/tools/MusicSearch";
import MonsterSearch from "./components/reference_guide/MonsterSearch";
import RacesSearch from "./components/reference_guide/RacesSearch";
import RulesSearch from "./components/reference_guide/RulesSearch";
import AbilityScores from "./components/characters/AbilityScore";
import DnDClasses from "./components/reference_guide/DnDClasses";
import Skills from "./components/characters/Skills";
import Alignment from "./components/reference_guide/Alignment";
import "./App.scss"; // Ensure you have this SCSS file with the styles defined

function App() {
  const [characterMenuOpen, setCharacterMenuOpen] = useState(false);
  const [toolsMenuOpen, setToolsMenuOpen] = useState(false);
  const [referenceMenuOpen, setReferenceMenuOpen] = useState(false);

  const toggleCharacterMenu = () => setCharacterMenuOpen(!characterMenuOpen);
  const toggleToolsMenu = () => setToolsMenuOpen(!toolsMenuOpen);
  const toggleReferenceMenu = () => setReferenceMenuOpen(!referenceMenuOpen);

  const closeAllMenus = () => {
    setCharacterMenuOpen(false);
    setToolsMenuOpen(false);
    setReferenceMenuOpen(false);
  };

  return (
    <Router>
      <div className="app-bar">
        <div className="toolbar">
          <NavLink to="/" className="logo-link">
            DM Assist
          </NavLink>
          <div className="nav-section">
            <button className="nav-button" onClick={toggleCharacterMenu}>
              Characters
            </button>
            {characterMenuOpen && (
              <div className="dropdown-menu">
                <NavLink
                  to="/create"
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Create Character
                </NavLink>
                <NavLink
                  to="/manager"
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Character Manager
                </NavLink>
              </div>
            )}
            <button className="nav-button" onClick={toggleToolsMenu}>
              Tools
            </button>
            {toolsMenuOpen && (
              <div className="dropdown-menu">
                <NavLink
                  to="/dice"
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Dice Roller
                </NavLink>
                <NavLink
                  to="/initiative-tracker"
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Initiative Tracker
                </NavLink>
                <NavLink
                  to="/music-search"
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Music Search
                </NavLink>
              </div>
            )}
            <button className="nav-button" onClick={toggleReferenceMenu}>
              Reference
            </button>
            {referenceMenuOpen && (
              <div className="dropdown-menu">
                <NavLink
                  to="/rules-search"
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Rules Search
                </NavLink>
                <NavLink
                  to="/monster-search"
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Monster Search
                </NavLink>
                <NavLink
                  to="/races-search"
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Races Search
                </NavLink>
                <NavLink
                  to="/classes"
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Classes
                </NavLink>
                <NavLink
                  to="/alignment"
                  className="dropdown-item"
                  onClick={closeAllMenus}
                >
                  Alignment
                </NavLink>
              </div>
            )}
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
