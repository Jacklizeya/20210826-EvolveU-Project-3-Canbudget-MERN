import { useState, useEffect } from "react";

import { LoginFormDiv, SubmitButton, SubmitCancelButtons } from "../pages/assetbudgetcomponent/assetAndBudget.elements"

const Setting = () => {
    const [name, setName] = useState();
    const [commission, setCommission] = useState();
    const [key, setKey] = useState();
    const [interval, setInterval] = useState();

    const [error, setError] = useState();

    useEffect(() => {
        const getSetting = async () => {
            const url = '/api/settings';
            try {
                let response = await fetch(url);
                if (!response.ok) {
                    setError("Server Error ");
                    return;
                }
                let data = await response.json();
                if (data) {
                    setCommission(data.commission);
                    setKey(data.key);
                    setInterval(data.interval);
                } else {
                    setError("Server Error 2")
                }

            } catch (error) {
                setError("Server Error " + error.message)
            }

        };
        getSetting();
    }, [])

    let onSave = async (e) => {
        e.preventDefault();
        const url = '/api/settings';
        const setting = { commission, key, interval };
        try {
            let response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(setting)
            });
            if (response.ok) {
                setError("Configuration saved");
            } else {
                setError(await response.text());
            }

        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <LoginFormDiv>
            <h1>Settings</h1>

            <div>
                <label htmlFor="commission">Transaction commission $:</label>
                <input
                    type="number"
                    name="commission"
                    id="commission"
                    value={commission}
                    className="input-field"
                    placeholder="Enter commission"
                    required
                    onChange={(e) => setCommission(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="key">Code to connect with exchange</label>
                <input
                    type="text"
                    name="key"
                    id="key"
                    value={key}
                    className="input-field"
                    placeholder="Enter code"
                    required
                    onChange={(e) => setKey(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="interval">Interval between data requests</label>
                <select name="interval" id="interval" value={interval} size="1"
                    onChange={(e) => setInterval(e.target.value)}>

                    <option value="1min">1min</option>
                    <option value="5min">5min</option>
                    <option value="15min">15min</option>
                    <option value="30min">30min</option>
                    <option value="60min">60min</option>
                </select>
            </div>

            <SubmitCancelButtons>
                <SubmitButton onClick={onSave}>Save</SubmitButton>
            </SubmitCancelButtons>

            {error && <h3>{error}</h3>}
        </LoginFormDiv >
    );
}

export default Setting;