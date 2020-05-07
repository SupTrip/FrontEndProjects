/* Global Variables */
/* Global Variables */
const baseURL =`http://api.geonames.org/searchJSON?q=`;
const apiKey = '&username=supnav';
let apiData='';
let pixabayEP = 'https://pixabay.com/api/?key=';
let key = '16358191-fd4c471105557c199f122e3ba';

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//document.getElementById('generate').addEventListener('click',performAction);


function performAction(e){
	e.preventDefault();
	const userCity = document.getElementById('city').value;


	getPhoto(pixabayEP, key,userCity )
	.then(function(photoData){
		console.log(photoData);
		postPhotoData('http://localhost:8000/addPhoto', {photoUrl:photoData.hits[0].largeImageURL});
	})

	//const zip = document.getElementById('zip').value;

	//if(userCity=='undefined' || userCity)
	getWeather(baseURL, userCity, apiKey)


	.then(function(data){
 


	apiData = {latitude: data.geonames[0].lat, longitude: data.geonames[0].lng, country: data.geonames[0].countryName};
    console.log(data.geonames[0].countryName);
	postData('http://localhost:8000/addAnimal', {date:d,"latitude":data.geonames[0].lat, "longitude":data.geonames[0].lng, "country":data.geonames[0].countryName});
    updateUI()
})
};

const getWeather = async(baseURL,city, key)=>{
	const res =  await fetch(baseURL+city+key)
	try{
		const data = await res.json();
		console.log(data)
		return data;
	}
	catch(error){
		console.log("error",error);
	}
}

const getPhoto = async(pixabayEP, key,city)=>{
	const res =  await fetch(pixabayEP+key+"&q="+city);
	try{
		const photoData = await res.json();
		console.log("Modified pixabay API Call"+photoData);
		return photoData;
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
                cityLat: data.latitude,
                cityLong: data.longitude,
                dataCountry: data.country
            })

});
 try {
        const newData = await response.json();
        
        return newData
      }catch(error) {
      console.log("error", error)
      }
  }
  

  const postPhotoData = async( url="",photoData={})=>{
     console.log("PhotoData"+JSON.stringify(photoData));
	const response = await fetch(url,{
		method:'POST',
		credentials:'same-origin',
		headers:{
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(photoData)

});
 try {
        const newData = await response.json();
        
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
	    
	    // To be integrated after updateUI gets fixed
	    //document.getElementById('latitude').innerHTML = "latitude:" + " "+ allData.cityLat;
		//document.getElementById('longitude').innerHTML = "Longitude:" +" "+ allData.cityLong;
		//document.getElementById('country').innerHTML = "Longitude:" + " " + allData.datCountry;

		// This is going to by pass the integration
		//document.getElementById('date').innerHTML = `Date: ${allData[0].date}`;
		document.getElementById('latitude').innerHTML = "latitude:" + " "+ apiData.latitude;
		document.getElementById('longitude').innerHTML = "Longitude:" +" "+ apiData.longitude;
		document.getElementById('country').innerHTML = "Longitude:" + " " + apiData.country;
        document.getElementById('content').innerHTML = `I feel: ${allData.content} <br> Photo URL: ${allData.photoUrl}`;
	}catch(error){
		console.log("error",error);
	}
}
export {  performAction };
