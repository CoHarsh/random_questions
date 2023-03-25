
const send_link_form = document.getElementById('send_link_form');
send_link_form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.querySelector('#send_link_error').innerHTML = '';
    document.querySelector('#send_link_success').innerHTML = '';

    const link = document.getElementById('send_link_input').value;
    if(!link){
        document.querySelector('#send_link_error').innerHTML = 'Please enter a link';
        return;
    }
    fetch('http://127.0.0.1:3000/api/addquestionurl', {
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
                document.querySelector('#send_link_error').innerHTML = data.error;
                setTimeout(() => {
                    document.querySelector('#send_link_error').innerHTML = '';
                },"5000");

            }else{
                // set data to send_link_success
                document.querySelector('#send_link_success').innerHTML = data.message;
                setTimeout(() => {
                    document.querySelector('#send_link_success').innerHTML = '';
                },"5000");
            }
        })
    })
    document.getElementById('send_link_input').value = '';

});


const redirect_url = (url) => {
    window.open(url, '_blank');
}

const get_link_form = document.getElementById('get_question_form');
get_link_form.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('get_question_text_link').innerHTML = '';
    document.getElementById('get_question_error').innerHTML = '';

    fetch('http://127.0.0.1:3000/api/getquestionurl', {
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
});