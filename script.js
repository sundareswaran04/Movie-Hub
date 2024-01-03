const Container=document.getElementById("movie_list");
const TMDB_API_KEY='485e29fd1199845d2472f8d5347c2866';
let top_text=document.getElementById("top_text");
let page_number=1;
let page_number2=1;
let opt="movie";
let opt_show="multi"
let count=1;
const BASE_URL = 'https://image.tmdb.org/t/p/w500';
function run(){
    
    count=1;
    Container.innerHTML="";
    const popular_url=`https://api.themoviedb.org/3/${opt}/popular?api_key=${TMDB_API_KEY}&page=${page_number}`;
fetch(popular_url)
.then(res=>res.json())
.then(data => {
    const DATA = data.results;

    for (var i = 0; i < DATA.length; i++) {
        const Title = document.createElement("h5");
        Title.style.color = "black";

        const cover = document.createElement("div");
        cover.id = "COVER";

        const cover_img = document.createElement("img");
        cover_img.id = "POSTER";

        // Use a closure to capture the current value of i
        cover_img.onclick = (function (index) {
            return function (event) {
                pass_value(event, DATA[index]);
            };
        })(i);

        if (DATA[i].poster_path != null) {
            cover_img.src = BASE_URL + DATA[i].poster_path;
        }

        if (opt == "movie") {
            Title.innerText = DATA[i].title;
        } else {
            Title.innerText = DATA[i].name;
        }

        top_text.innerText = `Popular | ${opt}`;
        cover.appendChild(cover_img);
        cover.appendChild(Title);
        Container.appendChild(cover);
    }
});
}
run();
function Next_page(){
    page_number2++;
    page_number++;
    if(count==0){show()}
    else{run();}

}
function pre_page(){
    if(page_number==1){
        page_number=1;
    }
    else{
    page_number--;
    page_number2--;
}
if(count==0){
    show();
}
else{ run();}
   

}
function show(){

   count=0;
    Container.innerHTML="";
    const Search_term=document.getElementById("Search").value;
    const Search_URL=`https://api.themoviedb.org/3/search/${opt_show}?api_key=${TMDB_API_KEY}&query=${Search_term}&page=${page_number2}`;
    fetch(Search_URL)
    .then(res=>res.json())
    .then(data=>{
        const search_value=data.results;
        for(var i=0;i<search_value.length;i++){
            const Title=document.createElement("h5")
            Title.style.color="black";
            const cover=document.createElement("div")
            cover.id="COVER";
            const cover_img=document.createElement("img")
            cover_img.id="POSTER"
            if(search_value[i].poster_path!=null){
                cover_img.src=BASE_URL+search_value[i].poster_path;
            }
            if(search_value[i].media_type=="movie"|| opt_show=="movie"){
                Title.innerText=search_value[i].title;
            }
            else{
                Title.innerText=search_value[i].name;
            }
            cover_img.onclick = (function (index) {
                return function (event) {
                    pass_value(event, search_value[index]);
                };
            })(i)
            cover.appendChild(cover_img);
            cover.appendChild(Title);
            Container.appendChild(cover);
        }
        top_text.innerText=`${Search_term} | ${opt_show}`
        console.log(Search_term)
        
    });
}
 function movie(){
    opt_show="movie";
    opt="movie";
    if(count==1){
        run()
    }
    else{
    show();}
 }
 function tv(){

    opt_show="tv";
    opt="tv";
    if(count==1){
    run();
    }
    else{
        show()
    }
 }
  function pass_value(event,details){
    localStorage.setItem("Details",JSON.stringify(details));
    window.location.href="next_page.html";
    
  }
