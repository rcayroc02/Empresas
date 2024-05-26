import React, { useState } from 'react';

function Sign() {
    const [formData, setFormData] = useState({
        inputValue1: '',
        inputValue2: '',
        inputValue3: '',
        inputValue4: ''
    });

    const [passwordsMatch, setPasswordsMatch] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        if (name === 'inputValue4') {
            setPasswordsMatch(value === formData.inputValue3);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.inputValue3 !== formData.inputValue4) {
            console.log('Las contraseñas no coinciden');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/Sign-In', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log(data.message);
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form onSubmit={handleSubmit} style={{ width: '300px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <input
                    type="text"
                    name="inputValue1"
                    value={formData.inputValue1}
                    onChange={handleChange}
                    placeholder="Name"
                    style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="text"
                    name="inputValue2"
                    value={formData.inputValue2}
                    onChange={handleChange}
                    placeholder="Username"
                    style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    name="inputValue3"
                    value={formData.inputValue3}
                    onChange={handleChange}
                    placeholder="Password"
                    style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input
                    type="password"
                    name="inputValue4"
                    value={formData.inputValue4}
                    onChange={handleChange}
                    placeholder="Confirm password"
                    style={{ marginBottom: '10px', width: '100%', padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                {!passwordsMatch && <p style={{ color: 'red', marginBottom: '10px' }}>Las contraseñas no coinciden</p>}
                <button type="submit" disabled={!passwordsMatch} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Sign In</button>
            </form>
        </div>
    );
}

export default Sign;
