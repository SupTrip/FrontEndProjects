const baseURL =`http://api.geonames.org/searchJSON?q=`;
const apiKey = '&username=supnav';



document.getElementById('generate').addEventListener('click',performAction);

function performAction(e){
	const userCity = document.getElementById('city').value;
	//const zip = document.getElementById('zip').value;

	getWeather(baseURL, userCity, apikey)

	.then(function(data){
	const apiData = {latitude: data.south, longitude: data.geonames[0].lng, country: data.geonames[0].countryName};
    console.log(apiData);
	postData('http://localhost:8000/addAnimal', {"latitude":data.south, "longitude":data.geonames[0].lng, "country":data.geonames[0].countryName});
    updateUI()
})
};

const getWeather = async(baseURL, city, key)=>{
	const res =  await fetch('http://api.geonames.org/searchJSON?q='+city+key)
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
		body: JSON.stringify({
                cityLat: apiData.latitude,
                cityLong: apiData.longitude,
                dataCountry: apiData.country
            })

});
 try {
        const newData = await response.json();
        console.log(newData + "is here");
        return newData
      }catch(error) {
      console.log("error", error)
      }
  }
  

const updateUI = async() =>{
	const request = await fetch('http://localhost:8000/all')
	try{
		const allData = await request.json()
		//let lastElement = allData[allData.length- 1];
		//console.log(lastElement);
	    document.getElementById('latitude').innerHTML = "latitude:" + " "+ allData.cityLat;
		document.getElementById('longitude').innerHTML = "Longitude:" +" "+ allData.cityLong ;
		document.getElementById('country').innerHTML = "Longitude:" + " " + allData.dataCountry;
	}catch(error){
		console.log("error",error);
	}
}
export {  performAction };


