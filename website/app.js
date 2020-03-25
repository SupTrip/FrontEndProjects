/* Global Variables */
const baseURL =`https://api.openweathermap.org/data/2.5/weather?q=`;
const apiKey = '&APPID=bb95e29dbedc4d929be90b0dd99954e0';

// Create a new date instance dynamically with JS
let d = new Date();

document.getElementById('generate').addEventListener('click',performAction);

function performAction(e){
	const feeling = document.getElementById('feelings').value;
	const zip = document.getElementById('zip').value;

	getWeather(baseURL, zip, apiKey)

	.then(function(data){
	postData('/addAnimal', {"temp":data.main.temp, "date":d.toString(), "feelings":feeling});
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
     console.log(JSON.stringify(data));
     
	const response = await fetch(url,{
		method:'POST',
		credentials:'same-origin',
		headers:{
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)

});
 try {
        const newData = await response.json();
        console.log(newData);
        return newData
      }catch(error) {
      console.log("error", error)
      }
  }
  

const updateUI = async() =>{
	const request = await fetch('all')
	try{
		const allData = await request.json()
		let lastElement = allData[allData.length- 1];
		console.log(lastElement);
	        document.getElementById('date').innerHTML = "Date:" + " "+ lastElement.date;
		document.getElementById('temp').innerHTML = "Temperature:" +" "+ lastElement.temp +" " +"K";
		document.getElementById('content').innerHTML = "Your Feelings:" + " " + lastElement.feelings;
	}catch(error){
		console.log("error",error);
	}
}
