let quotes = [];

// Fallback quotes in case API fails
const fallbackQuotes = [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { text: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { text: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" }
];

const quoteElement = document.getElementById('quote');
const authorElement = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote');

// Fetch quotes from API
async function fetchQuotes() {
    try {
        quoteElement.textContent = 'Loading quotes...';
        authorElement.textContent = '';
        newQuoteBtn.disabled = true;
        
        const response = await fetch('https://type.fit/api/quotes', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            quotes = data;
            displayRandomQuote();
            newQuoteBtn.textContent = 'New Quote';
        } else {
            throw new Error('No quotes received');
        }
    } catch (error) {
        console.error('Error fetching quotes from API:', error);
        console.log('Using fallback quotes instead');
        quotes = fallbackQuotes;
        displayRandomQuote();
        newQuoteBtn.textContent = 'New Quote';
    } finally {
        newQuoteBtn.disabled = false;
    }
}

// Display a random quote
function displayRandomQuote() {
    if (quotes.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    
    quoteElement.textContent = randomQuote.text;
    authorElement.textContent = randomQuote.author ? `— ${randomQuote.author.replace(', type.fit', '')}` : '— Unknown';
}

// Event listener for button
newQuoteBtn.addEventListener('click', () => {
    if (quotes.length === 0) {
        fetchQuotes();
    } else {
        displayRandomQuote();
    }
});

// Load quotes on page load
fetchQuotes();
