from flask import Flask, render_template, request, session, jsonify
from flask.ext.session import Session  # Asegúrate que la importación sea así
import os
from dotenv import load_dotenv
import openai
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['SESSION_TYPE'] = 'filesystem'  # Usa el sistema de archivos para el almacenamiento de la sesión
Session(app)  # Inicializa la sesión con la app de Flask
CORS(app)  # Habilita CORS para la app

# Cargar la clave de la API de OpenAI
load_dotenv()
openai.api_key = os.getenv("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")

# Crear una instancia de la aplicación Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
CORS(app)  # Enable CORS

# Configuración para usar sesiones basadas en servidor
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

# Definir una función para la ruta principal (`/`)
@app.route('/')
def index():
    # Iniciar la conversación en la sesión si no existe
    if 'conversation' not in session:
        session['conversation'] = []
    return render_template("index.html", conversation=session['conversation'])

# Definir una función para la ruta de la API (`/api`)
@app.route('/api', methods=['POST'])
def api():
    # Obtener el mensaje del usuario desde el cuerpo de la solicitud JSON
    data = request.get_json()
    user_input = data['message']

    # Enviar una solicitud a la API de OpenAI con el mensaje del usuario
    response = openai.Completion.create(
        engine="text-davinci-002",  # Asegúrate de usar un motor disponible en tu plan de OpenAI
        prompt=user_input,
        temperature=0.7,
        max_tokens=150
    )

    # Procesar la respuesta de la API de OpenAI
    choice = response.choices[0].text.strip()

    # Actualizar la conversación en la sesión
    session['conversation'].append({"role": "user", "content": user_input})
    session['conversation'].append({"role": "bot", "content": choice})

    # Devolver la respuesta de la API de OpenAI en formato JSON
    return jsonify({'response': choice})

# Ejecutar la aplicación Flask
if __name__ == '__main__':
    app.run(debug=True)
