const apiKey = process.env.OPENROUTER_API_KEY;

const apiUrl = 'https://openrouter.ai/api/v1/chat/completions'; // Endpoint de OpenRouter

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');

    // Validar la entrada del usuario
    if (!userInput) {
        alert('Por favor, escribe algo.');
        return;
    }

    // Mostrar "Escribiendo..." mientras se procesa la solicitud
    responseDiv.innerHTML = '<p>Escribiendo...</p>';

    // Configurar la solicitud a la API
    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'HTTP-Referer': 'https://tusitio.com', // Opcional. URL de tu sitio para estadísticas.
            'X-Title': 'Mi Chatbot', // Opcional. Título de tu sitio para estadísticas.
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "deepseek/deepseek-r1-zero:free",
            messages: [
                {
                    role: "system",
                    content:  "Eres un asistente experto en **LPP (Lenguaje de Programación para Principiantes)** creado por el ingeniero Iván Deras. **Reglas estrictas para tu respuesta**: 1. Usa **estrictamente la sintaxis de LPP** sin modificar comandos ni estructuras. 2. Usa los nombres de funciones y palabras clave correctos: - `variables` para declarar variables. - `escriba` en lugar de `Escribir`. - `lea` en lugar de `Leer`. - `llamar nueva_linea` para saltos de línea. - `inicio` y `fin`, sin `Algoritmo` ni `FinAlgoritmo`. 3. No cambies la lógica del código, solo corrige errores si los hay. 4. **Formato esperado de la respuesta:** - Primero, **muestra solo el código en LPP** dentro de un bloque de código. - **Al final del código**, incluye un comentario con una breve explicación de lo que hace. - No agregues texto fuera del bloque de código. **Ejemplo de respuesta esperada:** ```lpp proceso suma_dos_numeros definir a, b, resultado como entero; escribir 'Ingrese el primer número:'; leer a; escribir 'Ingrese el segundo número:'; leer b; resultado <- a + b; escribir 'La suma es:', resultado; finproceso // Este algoritmo solicita dos números al usuario, los suma y muestra el resultado en pantalla. ```"
                },
                {
                    role: "user",
                    content: userInput
                }
            ],
            temperature: 0.7,
            top_p: 0.9
        })
    };

    // Hacer la solicitud a la API
    fetch("/.netlify/functions/openrouter", requestOptions)
        .then(response => response.json())
        .then(data => {
            let botResponse = data.choices[0].message.content;
            
            // Mostrar la respuesta en formato código
            responseDiv.innerHTML = `<pre><code>${botResponse}</code></pre>`;
        })
        .catch(error => {
            console.error('Error:', error);
            responseDiv.innerHTML = '<p>Hubo un error al procesar tu solicitud.</p>';
        });
}
