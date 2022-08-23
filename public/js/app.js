console.log('Client side JS loaded.');

/* fetch('http://localhost:3000/weather?address=Boston').then((response) => {
    response.json().then((data) => {
        if (data.error) {
            return console.error(data.error)
        } else {
            console.log(data.location)
            console.log(data.degree)
            console.log(data.feels)
        }
    })
})  */

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                /* console.error(data.error) */
                messageOne.textContent = 'Error: ' + data.error
                messageTwo.textContent = ''
                messageThree.textContent = ''
            } else {
                logEvent(analytics, 'Search', { search_term: location});
               /*  console.log(data.location)
                console.log(data.degree)
                console.log(data.feels)  */  
                messageOne.textContent = 'Location: ' + data.location
                messageTwo.textContent = 'Degree: ' + data.degree
                messageThree.textContent = 'Feels: ' + data.feels
            }
        })
    })
})