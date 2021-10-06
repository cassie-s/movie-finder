var movieId = '';

//function to get random movies in selected genre
var getRandomGenre = function (genreId, genreText, genrePageId) {
    // set title somewhere to genreText
    // $('#movie-results).text = "Showing movies in the " + genreText + " genre."    

    fetch('https://api.themoviedb.org/3/discover/movie?'

            +
            'api_key=3e05de6918321bc70bb8260fdbd331f3'

            +
            '&include_adult=false'

            +
            '&with_genres='

            +
            genreId
    
            +
            '&page='

            +
            genrePageId)

        .then(response => response.json())
        .then(response => {
            var genreList = [];
            //note: Collin changed the curly braces to [] in genreList
            for (var i = 0; i < 10; i++) {
                var genreObject = {};

                movieId = response.results[i].id
                //genreObject['tmdbId'] = response.results[i].id
                genreObject['title'] = response.results[i].title;
                genreObject['image'] = response.results[i].poster_path;
                genreObject['rating'] = response.results[i].vote_average; //out of 10
                genreObject['description'] = response.results[i].overview;
                genreList[i] = genreObject;
            }
            console.log(genreList);
            renderWhereToWatch(movieId)
            renderGenreMovies(genreList)
        });
};

function renderGenreMovies(genreList) {

    for (var i = 0; i <= genreList.length; i++) {

        
        if (genreList[i].image === null) {
            var imageUrl = "./assets/Images/null.jpg";
        } else {
            var imageUrl = "https://image.tmdb.org/t/p/w500" + genreList[i].image;
        };

        var cardImage = document.createElement('img');
        cardImage.setAttribute("src", imageUrl);
        // cardImage.setAttribute("width", '100px');
        cardImage.setAttribute("class", "card-image");
        //cardImage.setAttribute("alt", genreList[i].title) //+ " Movie Poster."
        var setImgLocation = "main section div#" + i;
        $(setImgLocation).html(cardImage);

        var cardTitle = document.createElement('p');
        cardTitle.textContent = genreList[i].title;
        cardTitle.setAttribute("class", "card-title")
        console.log(cardTitle);
        $('#' + i).append(cardTitle);

        var cardRating = document.createElement('p');
        cardRating.textContent = (" Rating: " + genreList[i].rating);
        cardRating.setAttribute("class", "card-rating");
        $('#' + i).append(cardRating);

        var cardDescription = document.createElement('p');
        cardDescription.textContent = ("Description: " + genreList[i].description);
        cardDescription.setAttribute("class", "card-description");
        $('#' + i).append(cardDescription);
    };
};


//start of function for getting combo-box value
$('#genre-combo').change(function () {

    // show refresh button
    $('#refresh-btn').show();

    // set combobox ID to value of selected option in combobox
    var genreId = this.value;

    // set combobox text to value of selected option in combobox
    var genreText = $("#genre-combo option:selected").text();

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

            +
            'api_key=3e05de6918321bc70bb8260fdbd331f3'

            +
            '&include_adult=false'

            +
            '&page='

            +
            moviePageId)

        .then(response => response.json())
        .then(response => {
            var movieList = {};
            for (var i = 0; i < 10; i++) {
                var movieObject = {};
                movieObject['tmdbId'] = response.results[i].id
                movieObject['title'] = response.results[i].title;
                movieObject['image'] = response.results[i].poster_path;
                movieObject['rating'] = response.results[i].vote_average; //out of 10
                movieObject['description'] = response.results[i].overview;
                movieList[i] = movieObject;
            }
            console.log(movieList);
        });
};

function whereToWatch(movieId) {

    fetch('https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?'

    + 'rapidapi-key=bbb550455emsh90631cae1cb42dcp1fb394jsn26315c4b067a'
    + '&source_id='
    + movieId
    + '&source=tmdb&country=us')
    .then(response => response.json())
    .then(response => { 

        watchLocations = {}
       // response.collection.locations.length
       var watch = response.collection
       var watchPlatform = {}
       for (var i = 0; i < 1; i++) {
        watchPlatform['company'] = watch.locations[i].display_name
        watchPlatform['url'] = watch.locations[i].url
        watchPlatform['icon'] = watch.locations[i].icon
       watchLocations[i] = watchPlatform
       }
       console.log(watchLocations)
     })
}

function renderWhereToWatch(watchLocations) {

}

whereToWatch('14872')

//watchPlatform[''] = watch[i].id

//watchPlatform[''] = watch[i].name

$('#refresh-btn').click(function () {
    // set combobox ID to value of selected option in combobox
    var genreId = this.value;

    // set combobox text to value of selected option in combobox
    var genreText = $("#genre-combo option:selected").text();

    // generate random integer between 1 and 500 for pageID, to mimic randomness
    var genrePageId = Math.floor(Math.random() * (500 - 2) + 1);

    // send parameters to getRandomGenre function
    getRandomGenre(genreId, genreText, genrePageId);
})

// to-do: add function for "Get Random Movies" once ui elements in place

$(document).ready(function () {
    if ($('#genre-combo').value == null) {
        $('#refresh-btn').hide();
        console.log("true" + "Value:" + $('#genre-combo').value)
    } else {
        $('#refresh-btn').show();
        console.log("false" + "Value:" + $('#genre-combo').value)
    };
});


// save and display bookmarked movies to local storage
var displayBookmarks = function() {
    savedMovies = JSON.parse(localStorage.getItem("movies"));
    
}

let savedMovies = {

}

var bookmarkMovies = function() {
    localStorage.setItem("movies", JSON.stringify(savedMovies))
}

var movies = JSON.parse(localStorage.getItem('movies')) || [];

$("#bookmark-btn").click(function() {

bookmarkMovies();
    
});

displayBookmarks();

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