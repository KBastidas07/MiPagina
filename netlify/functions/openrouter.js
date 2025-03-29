exports.handler = async (event) => {
    const apiKey = process.env.PUBLIC_APIKEY; // Lee la clave del .env
    const apiUrl = 'https://openrouter.ai/api/v1/chat/completions';

    const requestOptions = {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: event.body
    };

    try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        return {
            statusCode: 200,
            body: JSON.stringify(data)
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Error al hacer la solicitud" })
        };
    }
};
