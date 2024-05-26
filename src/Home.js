import React, { useState } from 'react';

function Log_in() {
    const [formData, setFormData] = useState({
        inputValue1: '',
        inputValue2: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/Log-In', {
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
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="inputValue1"
                    value={formData.inputValue1}
                    onChange={handleChange}
                    placeholder="Username"
                    style={styles.input}
                />
                <input
                    type="password"
                    name="inputValue2"
                    value={formData.inputValue2}
                    onChange={handleChange}
                    placeholder="Password"
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Log In</button>
            </form>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    form: {
        width: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px'
    },
    input: {
        marginBottom: '10px',
        width: '100%',
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    },
    button: {
        width: '100%',
        padding: '8px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer'
    }
};

export default Log_in;
