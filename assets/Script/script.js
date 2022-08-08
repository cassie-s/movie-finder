var savedMovies = [];

//function to get random movies in selected genre
var getRandomGenre = function (genreId, genreText, genrePageId) {
    // set title somewhere to genreText
    $('#headline-txt').text("Showing movies in the " + genreText + " genre.");

    fetch('https://api.themoviedb.org/3/discover/movie?'

        +
        'api_key=3e05de6918321bc70bb8260fdbd331f3'

        +

        '&language=en-US'


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

                //movieId = response.results[i].id
                genreObject['id'] = response.results[i].id
                genreObject['title'] = response.results[i].title;
                genreObject['image'] = response.results[i].poster_path;
                genreObject['rating'] = response.results[i].vote_average; //out of 10
                genreObject['description'] = response.results[i].overview;
                genreList[i] = genreObject;
            }
            console.log(genreList);
            //renderWhereToWatch(movieId)
            renderGenreMovies(genreList)
        });
};

function renderGenreMovies(genreList) {

    for (var i = 0; i < genreList.length; i++) {

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
        cardTitle.setAttribute("class", "card-title mt-3")
        console.log(cardTitle);
        $('#' + i).append(cardTitle);

        var cardRating = document.createElement('p');
        cardRating.textContent = ("Rating: " + genreList[i].rating + " out of 10");
        cardRating.setAttribute("class", "card-rating underline");
        $('#' + i).append(cardRating);

        var cardDescription = document.createElement('p');
        cardDescription.textContent = ("Description: " + genreList[i].description);
        cardDescription.setAttribute("class", "card-description max-h-44 overflow-auto");
        $('#' + i).append(cardDescription);

        var movieId = document.createElement('button');
        movieId.setAttribute('class', 'text-white font-bold my-4 py-2 px-6 rounded-full max-w-sm md:w-full movieId');
        movieId.textContent = 'Watch Providers';
        movieId.setAttribute('value', genreList[i].id);
        $('#' + i).append(movieId);
        //$('#' + i).append(movieId);

        var bookmarkId = document.createElement('button');
        bookmarkId.setAttribute('class', 'text-white font-bold my-4 py-2 px-6 rounded-full max-w-sm md:w-full bookmarkId');
        bookmarkId.setAttribute('id', "bookmark-" + [i]);
        bookmarkId.setAttribute('value', genreList[i].id);
        bookmarkId.textContent = 'Bookmark';
        $('#' + i).append(bookmarkId);
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
            //console.log(movieList);
            renderMovies(movieList);
        });
};

//function to show random movies - pretty much same as render
function renderMovies(movieList) {

    for (var i = 0; i < movieList.length; i++) {


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
        cardImage.setAttribute('value', movieList[i].tmdbId);
        $(setImgLocation).html(cardImage);

        var cardTitle = document.createElement('p');
        cardTitle.textContent = movieList[i].title;
        cardTitle.setAttribute("class", "card-title mt-3")
        cardTitle.setAttribute('value', movieList[i].tmdbId);
        console.log(cardTitle);
        $('#' + i).append(cardTitle);

        var cardRating = document.createElement('p');
        cardRating.textContent = ("Rating: " + movieList[i].rating + " out of 10");
        cardRating.setAttribute("class", "card-rating underline");
        cardRating.setAttribute('value', movieList[i].tmdbId);
        $('#' + i).append(cardRating);

        var cardDescription = document.createElement('p');
        cardDescription.textContent = ("Description: " + movieList[i].description);
        cardDescription.setAttribute("class", "card-description max-h-44 overflow-auto");
        cardDescription.setAttribute('value', movieList[i].tmdbId);
        $('#' + i).append(cardDescription);

        var movieId = document.createElement('button');
        movieId.setAttribute('class', 'text-white font-bold my-4 py-2 px-6 rounded-full max-w-sm md:w-full movieId');
        movieId.textContent = 'Watch Providers';
        movieId.setAttribute('value', movieList[i].tmdbId);
        $('#' + i).append(movieId);
        //$('#' + i).append(movieId);

        var bookmarkId = document.createElement('button');
        bookmarkId.setAttribute('class', 'text-white font-bold my-4 py-2 px-8 rounded-full max-w-sm md:w-full bookmarkId');
        bookmarkId.setAttribute('id', "bookmark-" + movieList[i].tmdbId);
        bookmarkId.setAttribute('value', movieList[i].tmdbId);
        bookmarkId.textContent = 'Bookmark';
        $('#' + i).append(bookmarkId);
    };
};


//listens for the click of button (could switch to an "a" tag), then that card's movie id is send to the 'where to watch' function
$(document).on('click', '.movieId', function () {
    var movieId = this.value;
    console.log(movieId);
    whereToWatch(movieId)
    $('#selected-movie-dash').css("display", "block");
    //reset value of 'a' or do I need to reset movieId?
    $(this).val('');
    movieId = '';
})

$(document).on('click', '.bookmarkId', function () {
    $(this).text('Added!');
    // save value of bookmark button which equals tmdb id
    var selectedId = $(this).val();
    // save value of bookmarked description
    var selectedDesc = $(this).parent("div").children(".card-description").text();
    // save value of bookmarked rating
    var selectedRating = $(this).parent("div").children(".card-rating").text();
    // save value of bookmarked title
    var selectedTitle = $(this).parent("div").children(".card-title").text();
    // save value of bookmarked image
    var selectedImage = $(this).parent("div").children(".card-image").attr("src");
    // create the object
    var bookmarkItem = {};
    // add the elements of the object
    bookmarkItem['id'] = selectedId;
    bookmarkItem['description'] = selectedDesc;
    bookmarkItem['rating'] = selectedRating;
    bookmarkItem['title'] = selectedTitle;
    bookmarkItem['image'] = selectedImage;

    //log the object for checking
    addBookmark(bookmarkItem);

});

//add bookmark to local storage
function loadBookmarks() {
    savedMovies = JSON.parse(localStorage.getItem("movies"));
    console.log('Loading Bookmarks from localStorage');
    if (savedMovies === null) {
        savedMovies = []
    } 
    console.log("length of array is: " + savedMovies.length);
};

function addBookmark(bookmarkItem) {
    savedMovies.push(bookmarkItem);
    localStorage.setItem("movies", JSON.stringify(savedMovies));
    console.log("bookmark added" + savedMovies);
};

function whereToWatch(movieId) {

    fetch('https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?'

        +
        'rapidapi-key=bbb550455emsh90631cae1cb42dcp1fb394jsn26315c4b067a'
        +
        '&source_id='
        +
        movieId
        +
        '&source=tmdb&country=us')
        .then(response => response.json())
        .then(response => {

            // response.collection.locations.length
            var watch = response.collection
            var watchLocations = [];
            watchTitle = watch.name;

            // console.log("collection length: " + response.collection.locations.length);
            // console.log("collection 1: " + watch.collection.locations[0].display_name);
            // console.log("collection 2: " + watch.collection.locations[1].display_name);
            // console.log("collection 3: " + watch.collection.locations[2].display_name);
            // console.log("collection 4: " + watch.collection.locations[3].display_name);

            for (var i = 0; i < watch.locations.length; i++) {
                var watchPlatform = {};
                watchPlatform['company'] = watch.locations[i].display_name;
                watchPlatform['url'] = watch.locations[i].url;
                watchPlatform['icon'] = watch.locations[i].icon;
                // console.log(watchPlatform);
                watchLocations[i] = watchPlatform;
            }
            // console.log(watchLocations);
            renderWhereToWatch(watchLocations, watchTitle)
        })
}

function renderWhereToWatch(watchLocations, watchTitle) {
    // set title of modal
    $('#modal-title').text("Watch Providers for: " + watchTitle);
    // clear modal of previous search if any
    $('#modal-icon-grid').empty();

    if (watchLocations.length < 1) {
        var errorText = document.createElement('h4');
        errorText.textContent = "No watch providers available!"
        $('#modal-icon-grid').append(errorText);
    } else {
        for (var i = 0; i < watchLocations.length; i++) {
            // var company = document.createElement('p');
            // company.setAttribute('class', 'company');
            // company.textContent = watchLocations[i].company;
            // $('#modal-icon-grid').append(company);

            var imgContainer = document.createElement('div');
            imgContainer.setAttribute('class', 'hover:shadow-2x1');
            imgContainer.setAttribute('id', 'img-container-' + [i]);
            $('#modal-icon-grid').append(imgContainer);

            var url = document.createElement('a');
            url.setAttribute('id', 'url' + [i]);
            url.setAttribute('href', watchLocations[i].url);
            url.setAttribute('target', '_blank');
            $('#img-container-' + [i]).append(url);

            var icon = document.createElement('img');
            icon.setAttribute('id', 'icon');
            icon.setAttribute('src', watchLocations[i].icon);
            icon.setAttribute('class', 'place-self-stretch');
            $('#url' + [i]).append(icon);
        }
    }
}

function renderBookmarks(){
    console.log("bookmark page array length is: " + savedMovies.length);
    for (var i = 0; i < savedMovies.length; i++) {


        if (savedMovies[i].image === null) {
            var imageUrl = "./assets/Images/null.jpg";
        } else {
            var imageUrl = "https://image.tmdb.org/t/p/w500" + savedMovies[i].image;
        };

        var cardImage = document.createElement('img');
        cardImage.setAttribute("src", imageUrl);
        // cardImage.setAttribute("width", '100px');
        cardImage.setAttribute("class", "card-image");
        var setImgLocation = "main section div#bm-" + i;
        cardImage.setAttribute('value', savedMovies[i].id);
        $(setImgLocation).html(cardImage);

        var cardTitle = document.createElement('p');
        cardTitle.textContent = savedMovies[i].title;
        cardTitle.setAttribute("class", "card-title mt-3")
        cardTitle.setAttribute('value', savedMovies[i].id);
        console.log(cardTitle);
        $('#bm-' + i).append(cardTitle);

        var cardRating = document.createElement('p');
        cardRating.textContent = (savedMovies[i].rating);
        cardRating.setAttribute("class", "card-rating underline");
        cardRating.setAttribute('value', savedMovies[i].id);
        $('#bm-' + i).append(cardRating);

        var cardDescription = document.createElement('p');
        cardDescription.textContent = (savedMovies[i].description);
        cardDescription.setAttribute("class", "card-description max-h-44 overflow-auto");
        cardDescription.setAttribute('value', savedMovies[i].id);
        $('#bm-' + i).append(cardDescription);

        var movieId = document.createElement('button');
        movieId.setAttribute('class', 'text-white font-bold my-4 py-2 px-8 rounded-full max-w-sm md:w-full movieId');
        movieId.textContent = 'Watch Providers';
        movieId.setAttribute('value', savedMovies[i].id);
        $('#bm-' + i).append(movieId);
    }
}

// intercept button click to show random movies
$('#random-btn').click(function () {
    getRandomMovies();
})

$('#refresh-btn').click(function () {
    // set combobox ID to value of selected option in combobox
    var genreId = $("#genre-combo").val();
    console.log("refresh id is: " + genreId);

    // set combobox text to value of selected option in combobox
    var genreText = $("#genre-combo option:selected").text();

    // generate random integer between 1 and 500 for pageID, to mimic randomness
    var genrePageId = Math.floor(Math.random() * (500 - 2) + 1);

    // send parameters to getRandomGenre function
    getRandomGenre(genreId, genreText, genrePageId);
})

// when clicking view bookmarked movies, hide unrelated elements and show bookmark features
$('#bookmark-btn').click(function () {
    $('#suggested-movie-cards').addClass('hidden');
    $('#random-btn').addClass('hidden');
    $('#bookmark-btn').addClass('hidden');
    $('#genre-pick-box').addClass('hidden');
    $('#return-btn').removeClass('hidden');
    $('#bookmark-cards').removeClass('hidden');
    $('#headline-txt').text("Bookmarks");
    $('#refresh-btn').hide();

    renderBookmarks();
})

// when clicking return button, hide bookmark related and show main page
$('#return-btn').click(function () {
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

$('#modal-btn').click(function () {
    $('#selected-movie-dash').css("display", "none");
})

$(document).ready(function () {
    if ($("#genre-combo option:selected").val() == 0) {
        $('#refresh-btn').hide();
        //console.log("true: " + "Value:" + $("#genre-combo option:selected").val())
    } else {
        $('#refresh-btn').show();
        console.log("false: " + "Value:" + $("#genre-combo option:selected").val())
    };
    loadBookmarks();
})

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

// Used for testing with set movie id, no longer needed
// $('#modal2-btn').click(function () {
//     $('#selected-movie-dash').css("display","block");
//     testMovieId = "10150";
//     whereToWatch(testMovieId);
// })
//