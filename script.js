const convertValues  = (()=>{

    const convertToCelsius = (value) =>{
        
        let result = value - 273.15    
        
        return `${Math.round(result)} °C`

    }

    const convertToFahrenheit = (value) =>{
        let result = (value - 273.15) * 1.8 + 32 
        console.log(result)
        return `${Math.round(result)} °F`

    }
    const convertToMph = (value) =>{
        let result = value * 0.6213711922 
        return `${result.toFixed(2)} mp/h`
    }
    const convertToKmh = (value) =>{
        let result = value * 1.609344
        return `${result.toFixed(2)} km/h`
    }

    return {
        convertToCelsius,
        convertToFahrenheit,
        convertToMph,
        convertToKmh,
    }

})();


const fetched = (() =>{
    const getData = async (city) => {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5d115994379e025f0b1d68172d59f3b5`, {
            mode: "cors"
        });
        const data = await response.json();
        const temp = data.main.temp
        console.log(temp)
        const feelsLike = data.main.feels_like

        return {temp, feelsLike}
        
    };

    return {getData}
})()


const showData = (async()=>{
const data = await fetched.getData('Skopje')



const temperatureTextElement = document.querySelector('.show-temp')
const feelsLikeTextElement = document.querySelector('.feels-like')
const convertButtons = document.querySelector('.convertButtons')
let activeElement = convertButtons.querySelector('[data-active]')

console.log(activeElement.dataset.active)

const {convertToCelsius,
    convertToFahrenheit,
    convertToMph,
    convertToKmh } = convertValues


    const changeTemperature = (value) =>{
        if(activeElement.dataset.active === 'true'){
            return  convertToFahrenheit(value)
            
        }else{
            
            return convertToCelsius(value)
        }
    }

const display = ()=>{ 
    temperatureTextElement.textContent = changeTemperature(data.temp)
    feelsLikeTextElement.textContent = changeTemperature(data.feelsLike)


}

convertButtons.addEventListener('click', (e)=>{
    
    console.log(e.target.dataset.id) 
    delete activeElement.dataset.active
    convertButtons.children[e.target.dataset.id].dataset.active = true    
    display()
    
}) 


display()

})();


const showWeather = (()=>{
    const searchButton = document.querySelector('.getData')
    
    
    searchButton.addEventListener('click', ()=>{
        const inputValue = document.getElementById('location')
       getData(inputValue.value).then(v => showTemperature(v.data.main.temp)).catch(err=>{console.log(err)})
        inputValue.value = '';
    
    
    })

})();

