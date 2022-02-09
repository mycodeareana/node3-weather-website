console.log('Client side javascript file is loaded!');



const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#message-1');
const msgTwo = document.querySelector('#message-2');


weatherForm.addEventListener('submit', (e) =>{
    
    e.preventDefault(); // prevent page reload on submit
    
    const location = search.value;
    // console.log(location);

    msgOne.textContent = 'Loading...';
    msgTwo.textContent = '';

    fetch('http://localhost:3000/weather?address=' + location).then((response) =>{
        response.json().then((data) => {
            if (data.error){
                // console.log(data.error);
                msgOne.textContent = data.error;
                
            }else{
                // console.log(data.location);
                // console.log(data.forecast);
                msgOne.textContent = data.location;
                msgTwo.textContent = data.forecast;
            }
        });
    });
});
