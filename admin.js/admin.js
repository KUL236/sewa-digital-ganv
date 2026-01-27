let tournaments = JSON.parse(localStorage.getItem("tournaments")) || [];
let teams = JSON.parse(localStorage.getItem("teams")) || [];
let scores = JSON.parse(localStorage.getItem("scores")) || [];

function login() {
    if (u.value === "admin" && p.value === "sewa123") {
        panel.style.display = "block";
    }
}

function addTournament() {
    tournaments.push(tname.value);
    localStorage.setItem("tournaments", JSON.stringify(tournaments));
    render();
}

function addTeam() {
    teams.push(team.value);
    localStorage.setItem("teams", JSON.stringify(teams));
    render();
}

function addScore() {
    const match = matchName.value;
    const score = scoreValue.value;
    scores.push({ match, score });
    localStorage.setItem("scores", JSON.stringify(scores));
    render();
}

function render() {
    data.innerHTML = "";

    tournaments.forEach(t => {
        let li = document.createElement("li");
        li.innerText = "Tournament: " + t;
        data.appendChild(li);
    });

    teams.forEach(t => {
        let li = document.createElement("li");
        li.innerText = "Team: " + t;
        data.appendChild(li);
    });

    scores.forEach(s => {
        let li = document.createElement("li");
        li.innerText = s.match + " → " + s.score;
        data.appendChild(li);
    });
}

render();
