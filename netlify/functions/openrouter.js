const fetch = require("node-fetch");

exports.handler = async (event) => {
    const apiKey = process.env.OPENROUTER_API_KEY;  // Netlify cargará esta clave

    const requestBody = JSON.parse(event.body);

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
    });

    const data = await response.json();

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
};
