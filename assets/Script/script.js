//function to get random movies in selected genre
var getRandomGenre = function (genreId, genreText, genrePageId) {
    // set title somewhere to genreText
    // $('#movie-results).text = "Showing movies in the " + genreText + " genre."    

    fetch('https://api.themoviedb.org/3/discover/movie?'
    
    + 'api_key=3e05de6918321bc70bb8260fdbd331f3'

    + '&include_adult=false'

    + '&with_genres='

    + genreId
    
    + '&page='
    
    + genrePageId)
                              
        .then(response => response.json())
        .then(response => {
            var genreList = {};
            for(var i = 0; i < 10; i++ ){
                var genreObject = {};
                genreObject['tmdbId'] = response.results[i].id
                genreObject['title'] = response.results[i].title;
                genreObject['image'] = response.results[i].poster_path;
                genreObject['rating'] = response.results[i].vote_average;//out of 10
                genreObject['description'] = response.results[i].overview;
                genreList[i] = genreObject;
            }
            console.log(genreList);
        });
    
    
    };

//start of function for getting combo-box value
$('#genre-combo').change(function () {

    // show refresh button
    $('#refresh-btn').show();

    // set combobox ID to value of selected option in combobox
    var genreId = this.value;

    // set combobox text to value of selected option in combobox
    var genreText = $( "#genre-combo option:selected" ).text();

    // generate random integer between 1 and 500 for pageID, to mimic randomness
    var genrePageId = Math.floor(Math.random() * (500 - 2) + 1);
    
    // send parameters to getRandomGenre function
    getRandomGenre(genreId, genreText, genrePageId);
});

//function to get random movies
var getRandomMovies = function () {

    // generate random integer between 1 and 500 for pageID, to mimic randomness
    var moviePageId = Math.floor(Math.random() * (500 - 2) + 1);

    // set title somewhere to genreText
    // $('#movie-results).text = "Showing movies in the " + genreText + " genre."    

    fetch('https://api.themoviedb.org/3/discover/movie?'
    
    + 'api_key=3e05de6918321bc70bb8260fdbd331f3'

    + '&include_adult=false'
   
    + '&page='
    
    + moviePageId)
                              
        .then(response => response.json())
        .then(response => {
            var movieList = {};
            for(var i = 0; i < 10; i++ ){
                var movieObject = {};
                movieObject['tmdbId'] = response.results[i].id
                movieObject['title'] = response.results[i].title;
                movieObject['image'] = response.results[i].poster_path;
                movieObject['rating'] = response.results[i].vote_average;//out of 10
                movieObject['description'] = response.results[i].overview;
                movieList[i] = movieObject;
            }
            console.log(movieList);
        });
    };

$('#refresh-btn').click(function(){
    // set combobox ID to value of selected option in combobox
    var genreId = this.value;
    
    // set combobox text to value of selected option in combobox
    var genreText = $( "#genre-combo option:selected" ).text();
        
    // generate random integer between 1 and 500 for pageID, to mimic randomness
     var genrePageId = Math.floor(Math.random() * (500 - 2) + 1);
            
    // send parameters to getRandomGenre function
    getRandomGenre(genreId, genreText, genrePageId);
})

// to-do: add function for "Get Random Movies" once ui elements in place

$(document).ready(function(){
        if ($('#genre-combo').value == null){
           $('#refresh-btn').hide();
           console.log("true" + "Value:" + $('#genre-combo').value) 
        } else {
            $('#refresh-btn').show(); 
            console.log("false" + "Value:" + $('#genre-combo').value) 
        };
    });

//commented code abyss of cataclysm

//                          ___......__             _             |
//                         _.-'           ~-_       _.=a~~-_    *\|/*       
// --=====-.-.-_----------~   .--.       _   -.__.-~ ( ___===> ={[0]}===============            <= dino-laser of destruction
//               '''--...__  (    \ \\\ { )       _.-~          */|\*
//                         =_ ~_  \\-~~~//~~~~-=-~                |
//                          |-=-~_ \\   \\
//                          |_/   =. )   ~}
//                          |}      ||
//                         //       ||
//                       _//        {{
//                    '='~'          \\_    
//                                    ~~'

