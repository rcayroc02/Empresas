from flask import Flask, jsonify, request
import psycopg2


conn = psycopg2.connect(
    dbname="Empresas",
    user="postgres",
    password="ucsp",
    host="localhost"
)

cur = conn.cursor()
sql = """INSERT INTO usuarios (name, username, password)
         VALUES (%s, %s, %s);"""


app = Flask(__name__)

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
    input_value4 = data['inputValue4']

    cur.execute(sql, (input_value1, input_value2, input_value3))
    conn.commit()
    
    return jsonify({'message': 'Conexión exitosa con el servidor Flask'})


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



if __name__ == '__main__':
    app.run(debug=True)
