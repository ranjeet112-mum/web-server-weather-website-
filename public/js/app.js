console.log('client side js');



const button = document.querySelector('form');
const search = document.querySelector('input');
const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');



button.addEventListener('submit' ,(e) => {
    e.preventDefault();
    // console.log('hello world');
    var location = search.value;
    // console.log(location);
    // if(location === '') 
        // console.log('no null allowed!');

    fetch(`http://localhost:3000/weather?location=${location}`).then((response)=>{
        message1.textContent = '■■■■■■■■■■■□□□  LOADING';
        message2.textContent = '';
    response.json().then((data)=>{
            if(data.err) {
                message1.textContent = data.err;
            } else {
                message1.innerText = data.location;
                message2.innerText   = `${data.weather}
                ${data.actual_temp}
                ${data.feelslike}`
            }
        })
    })

    
})