exports.handler = async (event) => {
  const { email } = JSON.parse(event.body);

  const API_KEY = process.env.MAILBOXLAYER_API_KEY;

  const response = await fetch(
    `https://apilayer.net/api/check?access_key=${API_KEY}&email=${encodeURIComponent(email)}&smtp=1&format=1`
  );

  const data = await response.json();

  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};