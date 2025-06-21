// API Key gratuita do Alpha Vantage (obtenha a sua em https://www.alphavantage.co/support/#api-key)
const API_KEY = 'SUA_CHAVE_ALPHA_VANTAGE_AQUI'; 

// Atualiza a data no footer
document.getElementById('date').textContent = new Date().toLocaleDateString('pt-BR');

// Função para buscar dados da API
async function fetchStockData(symbol) {
    const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`);
    const data = await response.json();
    return data['Global Quote'];
}

// Atualiza os cards
async function updateCards() {
    try {
        const ibovespa = await fetchStockData('^BVSP');
        const dolar = await fetchStockData('BRLUSD');

        document.querySelector('#ibovespa .value').textContent = ibovespa['05. price'] + ' pts';
        document.querySelector('#dolar .value').textContent = 'R$ ' + parseFloat(dolar['05. price']).toFixed(2);
    } catch (error) {
        console.error('Erro ao buscar dados:', error);
    }
}

// Gráfico com Chart.js
const ctx = document.getElementById('stockChart').getContext('2d');
const stockChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
        datasets: [{
            label: 'IBOVESPA (exemplo)',
            data: [120000, 121000, 119000, 122000, 123500, 124000],
            borderColor: '#2c3e50',
            tension: 0.1
        }]
    }
});

// Inicializa
updateCards();