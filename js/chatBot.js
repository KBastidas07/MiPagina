const apiKey = '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'; // Reemplaza con tu clave de API de OpenRouter
const apiUrl = 'https://openrouter.ai/api/v1/chat/completions'; // Endpoint de OpenRouter

function sendMessage() {
  const userInput = document.getElementById( 'userInput' ).value;
  const responseDiv = document.getElementById( 'response' );

  // Validar la entrada del usuario
  if ( !userInput ) {
    alert( 'Por favor, escribe algo.' );
    return;
  }

  // Mostrar "Escribiendo..." mientras se procesa la solicitud
  responseDiv.innerHTML = '<p>Escribiendo...</p>';

  // Configurar la solicitud a la API
  const requestOptions = {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${ apiKey }`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify( {
      model: "deepseek/deepseek-r1-zero:free",
      messages: [
        {
          role: "system",
          content: " [Se un asistente virtual que ayude a responder preguntas]"
        },
        {
          role: "user",
          content: userInput
        }
      ],

      temperature: 0.7, // Controla la creatividad (0 = preciso, 1 = creativo)
      top_p: 0.9 // Controla la diversidad de las respuestas
    } )
  };

  // Hacer la solicitud a la API
  fetch( apiUrl, requestOptions )
    .then( response => response.json() )
    .then( data => {
      let botResponse = data.choices[ 0 ].message.content;

      // Eliminar el formato \boxed{}
      botResponse = botResponse.replace( /\\boxed\{([^}]+)\}/g, '$1' );

      // Mostrar la respuesta
      responseDiv.innerHTML = `<p><strong>Bot:</strong> ${ botResponse }</p>`;
    } )
    .catch( error => {
      console.error( 'Error:', error );
      responseDiv.innerHTML = '<p>Hubo un error al procesar tu solicitud.</p>';
    } );
}