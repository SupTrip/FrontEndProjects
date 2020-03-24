/* Global Variables */
let baseURL =`https://api.openweathermap.org/data/2.5/weather?q=`;
let apiKey = '&APPID=bb95e29dbedc4d929be90b0dd99954e0';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

document.getElementById('generate').addEventListener('click',performAction);

function performAction(e){
	const feeling = document.getElementById('feelings').value;
	const zip = document.getElementById('zip').value;

	getWeather(baseURL, zip, apiKey)

	.then(function(data){
	postData('/addAnimal', {temp:data.temp, date:newDate, feeling:feeling})
    updateUI()
})
};

const getWeather = async(baseURL, zip, apiKey)=>{
	const res = await fetch(baseURL+zip+apiKey)
	try{
		const data = await res.json();
		console.log(data)
		return data;
	}
	catch(error){
		console.log("error",error);
	}
}


const postData = async( url="",data={})=>{

	const response = fetch(url,{
		method:'POST',
		credentials:'same-origin',
		headers:{
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data), 

});
 try {
        const newData = await response.json();
        console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }
  




const updateUI = async() =>{
	const request = await fetch('all')
	try{
		const allData = await request.json()
		console.log(allData);
		document.getElementById('date').innerHTML = allData[0].date;
		document.getElementById('temp').innerHTML = allData[0].temp;
		document.getElementById('content').innerHTML = allData[0].content;
	}catch(error){
		console.log("error",error);
	}
}



























