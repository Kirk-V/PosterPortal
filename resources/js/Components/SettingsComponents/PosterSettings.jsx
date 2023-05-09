import React from 'react';
import { Form, Button, Row, Col, InputGroup, Accordion, Collapse, Card } from 'react-bootstrap';
import { useState} from 'react';

export default function PosterSettings({allSettinsData, updateASetting}) {
    const [settingsData, setSettingsData] = useState(null);
    const [settingsDataIsLoaded, setsettingsDataIsLoaded] = useState(false);
    return (
        <div>PosterSettings</div>
    )
}
