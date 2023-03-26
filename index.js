
const send_link_form = document.getElementById('send_link_form');
send_link_form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('#send_link_messgae').innerHTML = '';
    document.querySelector('#send_link_messgae').innerHTML = '';

    const link = document.getElementById('send_link_input').value;
    if(!link){
        document.querySelector('#send_link_messgae').innerHTML = 'Please enter a link';
        return;
    }
    // button text to loading
    document.querySelector('#send_link_button').innerHTML = 'saving...';
    document.querySelector('#send_link_button').disabled = true;
    fetch(`${BACKEND_URI}/api/addquestionurl`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: link
        })
    }).then((res) => {
        res.json().then((data) => {
            if(data.error){
                // set dat to send_link_error
                document.querySelector('#send_link_messgae').innerHTML = data.error;
                setTimeout(() => {
                    document.querySelector('#send_link_messgae').innerHTML = '';
                },"5000");

            }else{
                // set data to send_link_success
                // set color to green
                document.querySelector('#send_link_messgae').style.color= 'green';
                document.querySelector('#send_link_messgae').innerHTML = data.message;
                setTimeout(() => {
                    document.querySelector('#send_link_messgae').innerHTML = '';
                    document.querySelector('#send_link_messgae').style.color= 'rgba(255, 0, 0, 0.685)';
                },"5000");
                
            }
        })
    })
    document.getElementById('send_link_input').value = '';
    document.querySelector('#send_link_button').innerHTML = 'Send';
    document.querySelector('#send_link_button').disabled = false;


});


const redirect_url = (url) => {
    window.open(url, '_blank');
}

const get_link_form = document.getElementById('get_question_form');
get_link_form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('get_question_text_link').innerHTML = '';
    document.getElementById('get_question_error').innerHTML = '';

    // button text to loading
    document.querySelector('#get_question_button').innerHTML = 'Loading...';
    document.querySelector('#get_question_button').disabled = true;
    document.querySelector('#get_question_button').style.backgroundColor = 'white';

    fetch(`${BACKEND_URI}/api/getquestionurl`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        res.json().then((data) => {
            data = data.data;
            if(data.error){
                document.getElementById('get_question_error').innerHTML = data.error;
            }else{
                if(data.is_done){
                    document.getElementById('get_question_text_link').innerHTML = 'You have done this question🎉';
                    document.getElementById('get_question_error').innerHTML = 'redirecting to question...'
                    setTimeout(() => {
                        redirect_url(data.question_url);
                        document.getElementById('get_question_text_link').innerHTML = '';
                    },"2000");
                    
                }
                else{
                    window.open(data.question_url, '_blank');
                }
            }
        })
    })
    document.querySelector('#get_question_button').innerHTML = 'Get Question';
    document.querySelector('#get_question_button').disabled = false;
    document.querySelector('#get_question_button').style.backgroundColor = 'rgb(52, 173, 99)';
});


// on load the page get the domains
window.onload = () => {
    fetch(`${BACKEND_URI}/api/getdomains`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((res) => {
        res.json().then((data) => {
            data = data.data;
            for(let i = 0; i < data.length; i++){
                const domain = data[i];
                // put a p tag with domain name in the div breaking_news_text
                const p = document.createElement('p');
                p.innerHTML = domain;
                // &nbsp; is a space
                p.innerHTML += '&nbsp&nbsp&nbsp&nbsp&nbsp';
                document.getElementById('breaking_news_text').appendChild(p);

            }
        })
    })
}