// This is the code that is run when the page loads. It checks to see if local storage is available,
// and if it is, it gets all the scores from local storage and puts them in an array. It then sorts the
// array by score, and then displays the top 10 scores in the table. If there are more than 10 scores,
// it removes the lowest score from the array, clears local storage, and then puts the top 10 scores
// back into local storage.
window.onload = function(){
    // This is checking to see if local storage is available. If it is, it gets all the scores from
    // local storage and puts them in an array.
    if(localStorage){
        let scores = [];
        for(let i = 0; i < localStorage.length; i++) {
            let initials = localStorage.key(i);
            let score = localStorage.getItem(initials);
            scores.push({initials: initials, score: score});
        }
        // This is sorting the scores array by score, and then displaying the top 10 scores in the
        // table.
        // This is sorting the scores array by score. 
        scores.sort(function(a, b) {
            return b.score - a.score;
        });
        // This is creating a table row for each score in the scores array, and then adding the
        // initials and score to the table row.
        let storedScores = document.getElementById("stored-scores");
        let tbody = storedScores.getElementsByTagName('tbody')[0];
        let scoreCounter = 0;
        scores.forEach(function(score) {
            if(scoreCounter < 10){
                let row = document.createElement("tr");
                let initialsTd = document.createElement("td");
                initialsTd.innerHTML = score.initials;
                let scoreTd = document.createElement("td");
                scoreTd.innerHTML = score.score;
                row.appendChild(initialsTd);
                row.appendChild(scoreTd);
                tbody.appendChild(row);
            }
            scoreCounter++;
        });


    //    This is checking to see if there are more than 10 scores in the scores array. If there are,
    //    it removes the lowest score from the array, clears local storage, and then puts the top 10
    //    scores back into local storage.
        if(scores.length > 10) {
            scores.pop();
            localStorage.clear();
            scores.forEach(function(score) {
                localStorage.setItem(score.initials, score.score);
            });
        }
    }
    
}

// This is an event listener that is listening for a click on the confirm-clear button. When the button
// is clicked, it clears local storage and reloads the page.
document.getElementById("confirm-clear").addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});
