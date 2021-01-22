const dogsContainer = document.querySelector('.dogs-container')
const voteButton = document.querySelector('.vote-button')

const URL = 'https://dog.ceo/api/breeds/image/random'
const dogCount = 8;

fetchWinningDog();
async function fetchWinningDog() {
    if (!document.querySelector('.dog-big')){
        response = await axios.get(URL);
        const {message: fetchedDog } = response.data

        const bigDogCard = document.createElement('div')
        bigDogCard.classList.add('dog', 'dog-big')
        bigDogCard.innerHTML = `<img src='${fetchedDog}' alt='Big Dog' />`
        dogsContainer.appendChild(bigDogCard)

    } else {
        const allDogs = document.querySelectorAll('.dog')
        let favoriteDog = ''
        allDogs.forEach(dog => {
            if(dog.classList.contains('active')){
                favoriteDog = dog
                dogsContainer.innerHTML = ''
                const bigDogCard = document.createElement('div')
                bigDogCard.classList.add('dog', 'dog-big', 'active')
                bigDogCard.innerHTML = `<img src='${favoriteDog.firstElementChild.src}' alt='Big Dog' />`
                
                dogsContainer.appendChild(bigDogCard)
                fetchSmallDogs()
            }
        })
        console.log('use the old active one')
    }
}

fetchSmallDogs();
async function fetchSmallDogs() {
    response = await axios.get(URL + '/' + dogCount);
    const {message: fetchedDogs } = response.data

    fetchedDogs.forEach((dog, index) => {
        const dogCard = document.createElement('div')
        dogCard.classList.add('dog', 'small-dog', `dog${index}`)
        dogCard.innerHTML = `<img src='${dog}' alt=Dog ${index} />`
        dogsContainer.appendChild(dogCard)
    })
}

dogsContainer.addEventListener('click', e => {
    if(e.target.parentElement.classList.contains('dog')){
        if(e.target.parentElement.classList.contains('active')){
            e.target.parentElement.classList.remove('active')
        }else {
            removeActive();
            e.target.parentElement.classList.add('active')
        }
    }
})

function removeActive() {
    const allDogs = document.querySelectorAll('.dog')
    allDogs.forEach(dog => {
        dog.classList.remove('active')
    })
}

voteButton.addEventListener('click', () => fetchWinningDog())
