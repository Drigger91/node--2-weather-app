console.log('Client side javascript loaded')



const searchForm = document.querySelector('form')
const address = document.querySelector('input')
const loading = document.querySelector('.loading')
const city = document.querySelector('.city')
const forecast = document.querySelector('.forecast')
const error = document.querySelector('.error')
searchForm.addEventListener('submit' , (event)=>{
    event.preventDefault()
    const location = address.value
    loading.textContent = 'Loading... Please wait'
    fetch('/weather?address='+encodeURIComponent(location)).then(
    (response)=>{
        response.json().then(
            (data)=>{
                loading.textContent=''
                if(!data.error){
                    city.textContent = ` Weather at ${data.Location}`
                    forecast.textContent = `Today's prediction : ${data.forecast}`
                    error.textContent=''
                }
                else{
                
                     error.textContent = `${data.error}`
                     city.textContent =''
                     forecast.textContent = ''
                
            }
            }
        )
    }
)
   
    
})