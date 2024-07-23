const chatboxEl = document.getElementById('chatbox');
const inputEl = document.getElementById('inputbox');
const submitEl = document.getElementById('submit');
const loadingEl = document.getElementById('loading');

submitEl.addEventListener('click', async () => {
  const input = inputEl.value;
  addMessage(input, 'user');
  inputEl.value = '';

  // 显示加载动画
  loadingEl.style.display = 'block';

  // 使用 OpenAI API 获取 ChatGPT 的回答
  const response = await getResponseFromAPI(input);

  // 隐藏加载动画
  loadingEl.style.display = 'none';

  addMessage(response, 'chatgpt');
});

function addMessage(text, sender) {
  const messageEl = document.createElement('div');
  messageEl.classList.add('message');
  messageEl.classList.add(`${sender}-message`);
  messageEl.innerHTML = text;
  chatboxEl.appendChild(messageEl);
  chatboxEl.scrollTop = chatboxEl.scrollHeight;
}

async function getResponseFromAPI(input) {
    const endpoint = 'https://api.chatanywhere.tech';
    const apiKey = 'sk-uoTYHKyy9kkr3SG9UvfrqGPzM6RqioR8TN2Q966k24HgHVux'; //换成自己的API Key
    const prompt = input;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },

        body: JSON.stringify({
            model: "text-davinci-003",
            prompt,
            max_tokens: 100,
            n: 1,
            stop: null,
            temperature: 0.5,
        }),
    });
    const result = await response.json();
    return result.choices[0].text;
}