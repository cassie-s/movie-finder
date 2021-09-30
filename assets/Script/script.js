//store api key to avoid typos
var tmdbApiKey="api_key=3e05de6918321bc70bb8260fdbd331f3"

//function to get random movies
var getRandomMovie = function () {
    
    // create the basic tmdb api url for fetching movies
    var tmdbGenApiUrl = "https://api.themoviedb.org/3/discover/movie?" + tmdbApiKey + "&include_adult=false";

    // request to get url
    fetch(tmdbGenApiUrl).then(function (response) {
        if (response.ok) {
            console.log("Response OK");
            console.log(this);
        } else {
            console.log("Response Not OK");
        }
    });
};

// start of function for getting combo-box value
$('#genre-combo').change(function () {
    var genrePickVal = this.value;
    var genrePickText = $( "#genre-combo option:selected" ).text();
    console.log("Value: "+ genrePickVal);
    console.log("Text: "+ genrePickText);
});

