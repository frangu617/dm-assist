import React, { useState, useRef } from 'react';
import { Typography, IconButton, Box, Card, CardContent, List, ListItem, ListItemText, ListItemSecondaryAction, Slider, Checkbox } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeDownIcon from '@mui/icons-material/VolumeDown';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

const AudioPlayer = () => {
    const [audioSrc, setAudioSrc] = useState('');
    const [currentTrackName, setCurrentTrackName] = useState('');
    const [volume, setVolume] = useState(100);
    const [favorites, setFavorites] = useState({});
    const audioRef = useRef(new Audio());

    const tracks = [
        { name: 'Tavern Music 1', file: '/audio/music/tavern1.mp3' },
        { name: 'Tavern Music 2', file: '/audio/music/tavern2.mp3' },
        { name: 'Tavern Ambience', file: '/audio/music/tavern3.wav' },
        // Add more tracks here
    ];

    const playAudio = (track) => {
        setAudioSrc(track.file);
        setCurrentTrackName(track.name);
        audioRef.current.src = track.file;
        audioRef.current.play();
    };

    const pauseAudio = () => {
        audioRef.current.pause();
    };

    const stopAudio = () => {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setCurrentTrackName('');
    };

    const handleVolumeChange = (event, newValue) => {
        const newVolume = newValue / 100;
        audioRef.current.volume = newVolume;
        setVolume(newValue);
    };

    const toggleFavorite = (track) => {
        setFavorites(prevFavorites => ({
            ...prevFavorites,
            [track.name]: !prevFavorites[track.name]
        }));
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    Audio Player
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    Now Playing: {currentTrackName || 'None'}
                </Typography>
                <List>
                    {tracks.map((track, index) => (
                        <ListItem key={index}>
                            <Checkbox
                                icon={<StarBorderIcon />}
                                checkedIcon={<StarIcon />}
                                checked={favorites[track.name] || false}
                                onChange={() => toggleFavorite(track)}
                            />
                            <ListItemText primary={track.name} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="play" onClick={() => playAudio(track)}>
                                    <PlayArrowIcon />
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))}
                </List>
                <Box mt={2} display="flex" justifyContent="center" alignItems="center">
                    <VolumeDownIcon />
                    <Slider
                        value={volume}
                        onChange={handleVolumeChange}
                        aria-labelledby="continuous-slider"
                        min={0}
                        max={100}
                    />
                    <VolumeUpIcon />
                    <IconButton
                        color="secondary"
                        onClick={pauseAudio}
                        disabled={!audioSrc}
                    >
                        <PauseIcon />
                    </IconButton>
                    <IconButton
                        onClick={stopAudio}
                        disabled={!audioSrc}
                    >
                        <StopIcon />
                    </IconButton>
                </Box>
            </CardContent>
        </Card>
    );
};

export default AudioPlayer;
