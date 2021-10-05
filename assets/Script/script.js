//function to get random movies in selected genre
var getRandomGenre = function (genreId, genreText, genrePageId) {
    // set title somewhere to genreText
    $('#headline-txt').text("Showing movies in the " + genreText + " genre.");

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
                genreObject['tmdbId'] = response.results[i].id
                genreObject['title'] = response.results[i].title;
                genreObject['image'] = response.results[i].poster_path;
                genreObject['rating'] = response.results[i].vote_average; //out of 10
                genreObject['description'] = response.results[i].overview;
                genreList[i] = genreObject;
            }
            console.log(genreList);
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
    $('#headline-txt').text("Movies");    

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
            var movieList = [];
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
            renderMovies(movieList);
        });
};

//function to show random movies - pretty much same as render
function renderMovies(movieList) {

    for (var i = 0; i <= movieList.length; i++) {

        
        if (movieList[i].image === null) {
            var imageUrl = "./assets/Images/null.jpg";
        } else {
            var imageUrl = "https://image.tmdb.org/t/p/w500" + movieList[i].image;
        };

        var cardImage = document.createElement('img');
        cardImage.setAttribute("src", imageUrl);
        // cardImage.setAttribute("width", '100px');
        cardImage.setAttribute("class", "card-image");
        var setImgLocation = "main section div#" + i;
        $(setImgLocation).html(cardImage);

        var cardTitle = document.createElement('p');
        cardTitle.textContent = movieList[i].title;
        cardTitle.setAttribute("class", "card-title")
        console.log(cardTitle);
        $('#' + i).append(cardTitle);

        var cardRating = document.createElement('p');
        cardRating.textContent = (" Rating: " + movieList[i].rating);
        cardRating.setAttribute("class", "card-rating");
        $('#' + i).append(cardRating);

        var cardDescription = document.createElement('p');
        cardDescription.textContent = ("Description: " + movieList[i].description);
        cardDescription.setAttribute("class", "card-description");
        $('#' + i).append(cardDescription);

    };
};

// intercept button click to show random movies
$('#random-btn').click(function() {
    getRandomMovies();
})

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

// when clicking view bookmarked movies, hide unrelated elements and show bookmark features
$('#bookmark-btn').click(function() {
    $('#suggested-movie-cards').addClass('hidden');
    $('#random-btn').addClass('hidden');
    $('#bookmark-btn').addClass('hidden');
    $('#genre-pick-box').addClass('hidden');
    $('#return-btn').removeClass('hidden');
    $('#bookmark-cards').removeClass('hidden');
    $('#headline-txt').text("Bookmarks");
    $('#refresh-btn').hide();
})

// when clicking return button, hide bookmark related and show main page
$('#return-btn').click(function() {
    $('#suggested-movie-cards').removeClass('hidden');
    $('#random-btn').removeClass('hidden');
    $('#bookmark-btn').removeClass('hidden');
    $('#genre-pick-box').removeClass('hidden');
    $('#return-btn').addClass('hidden');
    $('#bookmark-cards').addClass('hidden');
    $('#headline-txt').text("Movies");
 
    if ($("#genre-combo option:selected").val() > 0) {
        console.log("True: " + $("#genre-combo option:selected").val());
        $('#refresh-btn').show();
    } else {
        console.log("False: " + $("#genre-combo option:selected").val());
    };
})


$(document).ready(function () {
    if ($("#genre-combo option:selected").val() == 0) {
        $('#refresh-btn').hide();
        console.log("true: " + "Value:" + $("#genre-combo option:selected").val())
    } else {
        $('#refresh-btn').show();
        console.log("false: " + "Value:" + $("#genre-combo option:selected").val())
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