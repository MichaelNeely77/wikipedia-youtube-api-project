window.onload = function() {
    document.getElementById('search').addEventListener('click', showResults);
}

function showResults() {
    var searchTerm = document.querySelector('input[name="searchTerm"]').value;
    var url = 'https://en.wikipedia.org/w/api.php?format=json&action=opensearch&origin=*&search='+searchTerm;
    var output = document.querySelector('#output');
    output.innerHTML = "<h2>Search Term: "+searchTerm+"</h2>"
    ajaxJS(url, function(response) {
        for (var x in response){
            var holder = typeof response[x] == 'string' ? response[x] : response[x][0];
            output.innerHTML += "<div class='dataOutput'>"+holder+"</div";
        }
    });

    // AIzaSyCXJor9gOGxL06dbD6Iksn0fEHe_lH7hFs
    // https://www.googleapis.com/youtube/v3/search/?part=snippet&key=AIzaSyCXJor9gOGxL06dbD6Iksn0fEHe_lH7hFs&q=test&maxResults=10


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