const Details=JSON.parse(localStorage.getItem("Details"))
const rating=document.getElementById("rating")
let Avg_rating=document.createElement("h3");
Avg_rating.innerText="Rating: "+Details.vote_average+"/10";
rating.appendChild(Avg_rating)
const genre_div=document.getElementById("genre");
const Back_drop_image=document.getElementById("back_drop_img");
const BASE_URL = 'https://image.tmdb.org/t/p/original';
Back_drop_image.src=BASE_URL+Details.backdrop_path;
const TMDB_API_KEY='485e29fd1199845d2472f8d5347c2866';
let type="movie";
console.log(Details)
console.log(type)
let movie_title=document.getElementById("Title");
let Over_view=document.getElementById("overview");
Over_view.innerText=Details.overview;
const poster_div=document.getElementById("poster");
const poster_img=document.createElement("img");
poster_img.id="poster_img";
poster_img.src=BASE_URL+Details.poster_path;
poster_div.appendChild(poster_img);
if(Details.title!=null)
{
movie_title.innerText=Details.title.toUpperCase();
 Type="movie";

}
else{
    movie_title.innerText=Details.name.toUpperCase();;
    Type="tv"
}

for(var i=0;i<Details.genre_ids.length;i++){
    const genreId=Details.genre_ids[i];
    let gener_name=document.createElement("button");
const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ODVlMjlmZDExOTk4NDVkMjQ3MmY4ZDUzNDdjMjg2NiIsInN1YiI6IjY1OGQxY2FmMmFmYjI1NWY3MDBjOWRlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.oTlIA-GfFBXUwdfx9Yb9UxKVU5GUdZttzhUmoZ6y_Xc'
    }
  };
  
  fetch(`https://api.themoviedb.org/3/genre/${type}/list?language=en`, options)
    .then(response => response.json())
    .then(response => response)
    .then(data=>{
const check=data.genres;
for(var j=0;j<check.length;j++){
    if(genreId==check[j].id){
       gener_name.innerText=check[j].name;
       genre_div.appendChild(gener_name);
    }
   
}
    })
    


}

const credits_url = `https://api.themoviedb.org/3/${type}/${Details.id}/credits?api_key=${TMDB_API_KEY}`;
fetch(credits_url)
.then(res=>res.json())
.then(data=>{
    const main=document.getElementById("cast");
    const profile=data.cast;
    const crew=data.crew;
    for(var i=0;i<profile.length;i++){
        
        const profile_div=document.createElement("div");
        profile_div.id="p_div";
        const profile_img=document.createElement("img");
profile_img.id="p_img";
if(profile[i].profile_path!=null){
    
profile_img.src=BASE_URL+profile[i].profile_path;
profile_div.appendChild(profile_img);

main.appendChild(profile_div);


}

    }
 for(var j=0;j<crew.length;j++){
    const crew_div=document.createElement("div");
    crew_div.id="crews"
    const crew_name=document.createElement("h3");
    const crew_job=document.createElement("h4");
    
    crew_job.innerText=crew[j].job;
    crew_name.innerText=crew[j].name
    crew_div.appendChild(crew_name);
    crew_div.appendChild(crew_job);
    document.getElementById("status").appendChild(crew_div)
    
 }
})

function Trailer(){
    const CLose=document.getElementById("close");
    document.getElementById("popup").innerHTML="";
   
    document.getElementById("popup").appendChild(CLose);
    const Trailer_box=document.createElement("iframe");
    Trailer_box.allowFullscreen=true;
    const videos_url = `https://api.themoviedb.org/3/${type}/${Details.id}/videos?api_key=${TMDB_API_KEY}`
    fetch(videos_url)
    .then(res=>res.json())
    .then(data=>{
        const trailers = data.results.filter(video => video.type === 'Trailer');
      const key=trailers[0].key;
    
      console.log(trailers)
    
       const soc=`https://www.youtube.com/embed/${key}?autoplay=1`;
       Trailer_box.src=soc;
       const popup=document.getElementById("popup");
       popup.appendChild(Trailer_box)
       popup.style.display="flex";
       document.getElementById("black").style.display="flex"

         
    })
}

function Close(){
    document.getElementById("black").style.display="none";
    document.getElementById("popup").style.display="none";
}