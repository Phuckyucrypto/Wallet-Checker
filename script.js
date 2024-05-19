require('dotenv').config();

function checkWallet() {
    const walletAddress = document.getElementById('walletInput').value.trim().toLowerCase();
    // Use environment variable
    const apiURL = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SHEET_ID}/values/Sheet1!A2:B500?key=${process.env.API_KEY}`;
    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            const columnA = data.values.map(row => row[0] ? row[0].toLowerCase() : '');
            const columnB = data.values.map(row => row[1] ? row[1].toLowerCase() : '');
            let message = 'You are not on OG/WL. You can mint public phase.';
            if (columnA.includes(walletAddress)) {
                message = 'You are eligible for OG Phase.';
            } else if (columnB.includes(walletAddress)) {
                message = 'You are eligible for WL Phase.';
            }
            document.getElementById('result').textContent = message;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').textContent = 'Error checking wallet. Please try again.';
        });
}
