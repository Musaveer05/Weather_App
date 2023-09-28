document.querySelector('form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the default form submission behavior

    console.log('Working');
    const searchOptionSelect = document.getElementById('searchOption');
    const searchValueInput = document.getElementById('searchValue');

    const selectedOption = searchOptionSelect.value;
    const inputValue = searchValueInput.value;

    console.log("The selected Option is ", selectedOption);
    console.log("The input value is ", inputValue);

    // Make an AJAX request based on the selected option
    if (selectedOption === 'city') {
        makeAjaxRequest(`https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(inputValue)}`);
    } else if (selectedOption === 'postal') {
        makeAjaxRequest(`https://weatherapi-com.p.rapidapi.com/current.json?q=${encodeURIComponent(inputValue)}`);
    }
});

// Function to make the AJAX request
function makeAjaxRequest(apiUrl) {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener('readystatechange', function () {
        if (this.readyState === this.DONE) {
            if (this.status === 200) {
                const responseData = JSON.parse(this.responseText);

                let temp = document.getElementById('tempId');
                temp.textContent = responseData.current.temp_c + "°C";
                document.getElementById('weatherId').textContent = responseData.current.condition.text;
                document.getElementById('locationId').textContent = responseData.location.name;
                document.getElementById('countryId').textContent = "Country: " + responseData.location.country;

                
                let desc = document.getElementById('toggleBtn');
                desc.textContent = "See in Fahrenheit";

                const toggleBtn = document.getElementById('toggleBtn')

                toggleBtn.addEventListener('click', function(){

                    let value = toggleBtn.getAttribute('dvalue');
                    console.log("value is",value);
                    if(value === 'true'){
                        desc.textContent = "See in Celsius";
                        temp.textContent = responseData.current.temp_f + "F";
                        toggleBtn.setAttribute('dvalue', 'false');
                    }
                    else{
                        desc.textContent = "See in Fahrenheit";
                        temp.textContent = responseData.current.temp_c + "°C";
                        toggleBtn.setAttribute('dvalue', 'true');
                    }

                })

            } else {
                console.error("Error: ", this.status, this.statusText);
                document.getElementById('error').textContent = "Error Finding";
            }
        }
    });

    xhr.open('GET', apiUrl);
    xhr.setRequestHeader('X-RapidAPI-Key', '80cfae39b6mshfa540cf25d072dfp1588e3jsn1a7704585496');
    xhr.setRequestHeader('X-RapidAPI-Host', 'weatherapi-com.p.rapidapi.com');

    xhr.send();
}
