import React, { useState, useEffect } from 'react';
import { CircularProgress, Typography, Box, Container, Paper, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import DOMPurify from 'dompurify';
import { marked } from 'marked';

function RulesSearch() {
    const [rules, setRules] = useState([]);
    const [selectedRuleIndex, setSelectedRuleIndex] = useState('');
    const [selectedRule, setSelectedRule] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        fetch("https://www.dnd5eapi.co/api/rule-sections")
            .then(response => response.json())
            .then(data => {
                setRules(data.results);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    }, []);

    useEffect(() => {
        if (selectedRuleIndex) {
            fetchRuleDetails(selectedRuleIndex);
        }
    }, [selectedRuleIndex]);

    const fetchRuleDetails = (index) => {
        setIsLoading(true);
        fetch(`https://www.dnd5eapi.co/api/rule-sections/${index}`, {
            method: 'GET',
            headers: new Headers({ "Accept": "application/json" }),
            redirect: 'follow'
        })
            .then(response => response.json())
            .then(data => {
                setSelectedRule(data);
                setIsLoading(false);
            })
            .catch(error => {
                setError(error.toString());
                setIsLoading(false);
            });
    };

    const handleRuleChange = (event) => {
        setSelectedRuleIndex(event.target.value);
    };

    const renderRuleData = (data) => {
        if (!data || !data.desc) return null;

        // Use `marked` to convert Markdown to HTML
        const htmlContent = marked(data.desc);
        // Sanitize the HTML content
        const sanitizedContent = DOMPurify.sanitize(htmlContent);

        return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
    };

    return (
        <Container sx={{ display: 'flex', flexDirection: 'column', my: 4 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="rule-select-label">Select Rule</InputLabel>
                <Select
                    labelId="rule-select-label"
                    id="rule-select"
                    value={selectedRuleIndex}
                    label="Select Rule"
                    onChange={handleRuleChange}
                >
                    {rules.map((rule, index) => (
                        <MenuItem key={index} value={rule.index}>
                            {rule.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Box sx={{ width: '100%' }}>
                <Paper elevation={3} sx={{ p: 2, minHeight: 500, overflow: 'auto' }}>
                    {isLoading && <CircularProgress />}
                    {error && <Typography color="error">{error}</Typography>}
                    {selectedRule && (
                        <>

                            {renderRuleData(selectedRule)}
                        </>
                    )}
                </Paper>
            </Box>
        </Container>
    );
}

export default RulesSearch;
