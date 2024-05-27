import React, { useState } from 'react';
import foto from './foto.png';


function Service() {
    const [formData, setFormData] = useState({
        inputValue1: '',
        results: [],
        currentIndex: 0
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
            const response = await fetch('http://localhost:5000/Service', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log('Respuesta recibida del servidor:', data);

            setFormData({
                ...formData,
                results: data.results,
                currentIndex: 0
            });
        } catch (error) {
            console.error('Error al conectar con el servidor:', error);
        }
    };

    const handlePrevious = () => {
        setFormData({
            ...formData,
            currentIndex: Math.max(0, formData.currentIndex - 1)
        });
    };

    const handleNext = () => {
        setFormData({
            ...formData,
            currentIndex: Math.min(formData.results.length - 1, formData.currentIndex + 1)
        });
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                    type="text"
                    name="inputValue1"
                    value={formData.inputValue1}
                    onChange={handleChange}
                    placeholder="Ciudad"
                    style={styles.input}
                />
                <button type="submit" style={styles.button}>Buscar</button>
            </form>

            {/* Mostramos el resultado actual */}
            <div style={styles.resultContainer}>
              <div style={styles.result}>
                  <div style={styles.resultContent}>
                      <div style={styles.foto}></div> {/* Foto arriba del contenido del resultado */}
                      <div>
                          Ciudad: {formData.results[formData.currentIndex]?.[0]}<br />
                          Lugar: {formData.results[formData.currentIndex]?.[1]}<br />
                          Guía: {formData.results[formData.currentIndex]?.[2]}<br />
                          <div id="descripcion" style={styles.descripcion}>{formData.results[formData.currentIndex]?.[3]}</div> {/* Descripción dentro de un div con el id "descripcion" */}
                      </div>
                      <div id="botones">
                        <button onClick={handlePrevious} style={styles.button}>Anterior</button>
                        <button onClick={handleNext} style={styles.button}>Siguiente</button>
                        <button style={styles.button1}>Separar</button>
                      </div>
                  </div>
              </div>
              <div style={styles.sideContainer}>
              <div id="mapa" style={styles.mapa}>
                    Este es el mapa
                </div>


              </div>
            </div>

           
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh'
    },
    form: {
        width: '300px',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '20px'
    },
    input: {
        marginBottom: '10px',
        width: '100%',
        padding: '8px',
        borderRadius: '5px',
        border: '1px solid #ccc'
    },
    button: {
        padding: '8px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007bff',
        color: '#fff',
        cursor: 'pointer',
        marginRight: '5px'
    },
    button1: {
        padding: '8px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: 'green',
        color: '#fff',
        cursor: 'pointer',
        marginRight: '5px'
    },
    resultContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '70%'
    },
    result: {
      flex: 1,
      textAlign: 'center',
      padding: '20px',
      backgroundColor: 'lightgray', 
      color: 'black', 
      fontSize: '14px', 
      marginTop: '10px',
      marginBottom: '20px',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      borderRadius: '10px' 
  },
  
    resultContent: {
        backgroundColor: '#1E1E1E',
        color: '#fff',
        padding: '20px'
    },
    sideContainer: {
      width: '50%', 
      height: '400px',
      backgroundColor: 'lightgray',
      color: 'black', 
      fontSize: '14px', 
      marginTop: '10px', 
      marginBottom: '20px',
      marginLeft:'20px', 
      padding: '20px', 
      borderRadius: '10px' 
  },
  
    descripcion: {
      width: '100%',
      height: '150px',
      backgroundColor: 'lightgray',
      color: 'black',
      fontSize: '14px',
      marginTop: '10px',
      marginBottom: '20px',
      display: 'flex', 
      alignItems: 'center', 
      borderRadius: '10px' 
    },
  
    foto: {
      height: '120px', 
      width: '120px', 
      marginBottom: '20px', 
      margin: 'auto', 
      borderRadius: '50%', 
      backgroundImage: `url(${foto})`, 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      backgroundRepeat: 'no-repeat' 
  },

  mapa: {
    width: '99%',
    height: '99%',
    backgroundColor: 'black',
}
  
};

export default Service;
