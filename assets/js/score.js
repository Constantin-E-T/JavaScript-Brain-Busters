window.onload = function(){
    if(localStorage){
        let scores = [];
        for(let i = 0; i < localStorage.length; i++) {
            let initials = localStorage.key(i);
            let score = localStorage.getItem(initials);
            scores.push({initials: initials, score: score});
        }
        scores.sort(function(a, b) {
            return b.score - a.score;
        });
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


        if(scores.length > 10) {
            scores.pop();
            localStorage.clear();
            scores.forEach(function(score) {
                localStorage.setItem(score.initials, score.score);
            });
        }
    }
    
}

document.getElementById("confirm-clear").addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});
