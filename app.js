window.onload = function() {
    document.getElementById('search').addEventListener('click', showResults);
}

function showResults() {
    var searchTerm = document.querySelector('input[name="searchTerm"]').value;
    var url = 'https://en.wikipedia.org/w/api.php?format=json&action=opensearch&origin=*&search='+searchTerm;
    var output = document.querySelector('#output');
    var outputYoutube = document.querySelector('#outputYoutube');
    output.innerHTML = "<h2>Search Term: "+searchTerm+"</h2>"
    outputYoutube.innerHTML = "<h2>Youtube Videos for "+searchTerm+"</h2>"
    ajaxJS(url, function(response) {
        for (var x in response){
            var holder = typeof response[x] == 'string' ? response[x] : response[x][0];
            output.innerHTML += "<div class='dataOutput'>"+holder+"</div";
        }
    });
    var url1 = 'https://www.googleapis.com/youtube/v3/search/?part=snippet&key=AIzaSyCXJor9gOGxL06dbD6Iksn0fEHe_lH7hFs&q='+searchTerm+'&maxResults=10';
    ajaxJS(url1, function(data) {
        
        for (var x in data.items){
            console.log(data.items[x]);
            var title = data.items[x].snippet.title;
            var description = data.items[x].snippet.description;
            var thumb = data.items[x].snippet.thumbnails.default.url;
            var videoID = data.items[x].id.videoId;

            
            outputYoutube.innerHTML +=          
            "<div class='vid-panel'><a href='https://youtu.be/"+videoID+"' target='_blank'><img src="+thumb+" alt=''></a><br>"+title+"</div>";
            
        } 
    });
}

function ajaxJS(url, callback) {
    var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if(xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.responseText));
        }
    }
    xhr.open('GET', url, true);
    xhr.send();
}