const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show Loading
function loading() {
    quoteContainer.hidden = true;
}

// Hide Loading
function hideLoading() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

let apiQuotes = [];

// Get Quote From API
async function getQuote() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes';

    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        showNewQuote();
        hideLoading();
    } catch (error) {
        console.log('whoops no quote', error);
        errorText();
    }
}

function showNewQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    // Check if Author field is blank and replace it with 'Unknown'
    if (quote.author === '') {
        authorText.innerText = 'Unknown';
    } else {
        authorText.innerText = quote.author;
    }

    // Dynamically reduce font size for long quotes
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = quote.text;
}

// Error Text
function errorText() {
    hideLoading();
    authorText.innerText = `OOPS! Having some troubles to load quotes at the moment. Plase try again later.`;
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuote();
