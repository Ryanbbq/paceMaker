function youtubeSearch() {
    console.log("YOUTUBE API");

    //Clears the div's contents after each new search
    $("#label").html("");
    $("#image").html("");
    $("#youtubeSpan").html("");

    //AJAX request for Youtube API
    $.ajax({
        dataType: 'json',
        type: 'get',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: ({
            key: '<%= youtubeAPI %>',
            q: $('#searchValue').val() + ' recipes',
            part: 'snippet'
        }),

        success: function(data, status) {
            console.log(data);

            for (var i = 0; i < 3; i++) {
                //console.log(data["items"][i]);
                $("#youtubeSpan").append("<br>" +
                    "<iframe id='youtubeDiv' width='350' height='250' src='https://www.youtube.com/embed/" + data["items"][i]["id"]["videoId"] + "'></iframe>")
            }
            console.log("Success Status: " + status);
            return status;
        },

        complete: function(data, status) {
            console.log("Complete Status: " + status);
            return status;
        }
    }); //AJAX
} //End of youtubeSearch() function.