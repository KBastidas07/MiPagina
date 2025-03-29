const apiUrl = "/.netlify/functions/openrouter"; // Llama al backend

function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');

    if (!userInput) {
        alert('Por favor, escribe algo.');
        return;
    }

    responseDiv.innerHTML = '<p>Escribiendo...</p>';

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            model: "deepseek/deepseek-r1-zero:free",
            messages: [{ role: "user", content: userInput }],
            temperature: 0.7,
            top_p: 0.9
        })
    };

    fetch(apiUrl, requestOptions)
        .then(response => response.json())
        .then(data => {
            responseDiv.innerHTML = `<pre><code>${data.choices[0].message.content}</code></pre>`;
        })
        .catch(error => {
            console.error('Error:', error);
            responseDiv.innerHTML = '<p>Hubo un error al procesar tu solicitud.</p>';
        });
}
