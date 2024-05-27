from flask import Flask, jsonify, request
from flask_cors import CORS
import psycopg2

conn = psycopg2.connect(
    dbname="Empresas",
    user="postgres",
    password="ucsp",
    host="localhost"
)

cur = conn.cursor()

app = Flask(__name__)
CORS(app)  # Habilitar CORS para toda la aplicación

# Rutas y lógica del servidor Flask...


@app.route('/')
def index():
    return '¡Hola, mundo! Este es un servidor básico creado con Flask.'

@app.route('/Sign-In', methods=['POST', 'OPTIONS'])
def Sign_In():
    if request.method == 'OPTIONS':
        # Responde con los encabezados CORS necesarios
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    data = request.get_json()
    input_value1 = data['inputValue1']
    input_value2 = data['inputValue2']
    input_value3 = data['inputValue3']
    
    # Insertar datos en la tabla usuarios
    sql = """INSERT INTO usuarios (name, username, password)
         VALUES (%s, %s, %s);"""
    cur.execute(sql, (input_value1, input_value2, input_value3))
    conn.commit()
    
    return jsonify({'message': 'Datos insertados correctamente en la tabla usuarios'})

@app.route('/Log-In', methods=['POST','OPTIONS'])
def Log_In():
    if request.method == 'OPTIONS':
        # Responde con los encabezados CORS necesarios
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    data = request.get_json()
    input_value1 = data['inputValue1']
    input_value2 = data['inputValue2']

    print('Valores recibidos desde la página:')
    print('Campo 1:', input_value1)
    print('Campo 2:', input_value2)
    return jsonify({'message': 'Conexión exitosa con el servidor Flask'})

@app.route('/Service', methods=['POST','OPTIONS'])
def Service():
    if request.method == 'OPTIONS':
        # Responde con los encabezados CORS necesarios
        response = jsonify({'message': 'Preflight request successful'})
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Methods', 'POST')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        return response

    data = request.get_json()
    input_value1 = data['inputValue1']
    sql = """SELECT ciudad, lugar, guia, descripcion FROM rides WHERE ciudad = %s;"""
    cur.execute(sql, (input_value1,))
    results = cur.fetchall()  # Recuperar todos los resultados de la consulta
    conn.commit()   

    print('Valores recibidos desde la página:')
    print('Campo 1:', input_value1)
    print('Valores devueltos por la consulta:')
    print(results)  # Imprimir los resultados de la consulta
    
    # Enviar una respuesta JSON con la URL a la que redirigir
    response_data = {'results': results}
    return jsonify(response_data)

    

    

if __name__ == '__main__':
    app.run(debug=True)
