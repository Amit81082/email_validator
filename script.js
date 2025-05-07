document.querySelector('.menu-toggle').addEventListener('click', () => {
  document.querySelector('nav ul').classList.toggle('active');
});

document.getElementById('email-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const resultMessage = document.getElementById('result-message');

  const apiKey = '2a53688d9dbbcb7f9c5c31bc239030c8'; // Replace with your API key
  const apiUrl = `https://apilayer.net/api/check?access_key=${apiKey}&email=${email}&smtp=1&format=1`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.error) {
      resultMessage.textContent = `API error: ${data.error.info}`;
      resultMessage.style.color = 'red';
      return;
    }

    if (data.format_valid && data.smtp_check) {
      resultMessage.textContent = `The email "${email}" is valid.`;
      console.log(data);
      resultMessage.style.color = 'green';
    } else {
      resultMessage.textContent = `The email "${email}" is invalid.`;
      resultMessage.style.color = 'red';
    }
  } catch (error) {
    resultMessage.textContent = 'Network error. Please try again.';
    resultMessage.style.color = 'red';
  }
});
