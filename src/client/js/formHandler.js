async function handleSubmit(event) {
    event.preventDefault();
    
    let forminputurl = document.getElementById('url').value;
    console.log('URL IS:', forminputurl);
    
    if (typeof Client !== 'undefined' && !Client.URLCheck(forminputurl)) {
        alert('Please enter a valid URL');
        return;
    }
    
    try {
        const response = await fetch('http://localhost:8000/api/evaluate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url: forminputurl })
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        localStorage.setItem('lastResults', JSON.stringify({
            url: forminputurl,
            results: data
        }));

        saveinfo(data);
    } catch (error) {
        console.error('Error:', error);
        alert('Error analyzing URL. Please try again.');
    }
}

function saveinfo(data) {
    document.getElementById('polarity').innerHTML = `Polarity: ${data.score_tag || 'N/A'}`;
    document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.subjectivity || 'N/A'}`;
    document.getElementById('text').innerHTML = `Text: ${data.sentence_list?.[0]?.text || 'N/A'}`;
}

window.addEventListener('load', () => {
    const savedResults = localStorage.getItem('lastResults');
    if (savedResults) {
        const { url, results } = JSON.parse(savedResults);
        document.getElementById('url').value = url;
        saveinfo(results);
    }
});

export { handleSubmit }