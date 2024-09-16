let users = [];
let polls = [];
let currentUser = null;

// Registration handler
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.querySelector('input[name="role"]:checked').value;

    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert('Käyttäjänimi on jo olemassa.');
        return;
    }

    users.push({ username, password, role });
    alert('Rekisteröinti onnistui!');
    this.reset();
});

// Login handler
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const role = document.querySelector('input[name="role"]:checked').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user && user.role === role) {
        currentUser = user;
        alert(`Tervetuloa, ${user.username}`);
        document.getElementById('register').style.display = 'none';
        document.getElementById('login').style.display = 'none';

        if (user.role === 'Admin') {
            document.getElementById('adminPanel').style.display = 'block';
        }

        loadPolls();
    } else {
        alert('Väärä käyttäjänimi, salasana tai rooli.');
    }
});

// Load polls
function loadPolls() {
    document.getElementById('pollList').style.display = 'block';
    const pollContainer = document.getElementById('pollsContainer');
    pollContainer.innerHTML = '';

    if (polls.length === 0) {
        document.getElementById('noPollsMessage').style.display = 'block';
    } else {
        document.getElementById('noPollsMessage').style.display = 'none';
        polls.forEach((poll, index) => {
            const pollElement = document.createElement('div');
            pollElement.classList.add('poll');

            const pollTitle = document.createElement('h3');
            pollTitle.innerText = poll.name;
            pollElement.appendChild(pollTitle);

            const voteOptions = document.createElement('div');
            voteOptions.classList.add('vote-options');

            if (!poll.votes[currentUser.username]) {
                const voteAButton = document.createElement('button');
                voteAButton.innerText = 'Äänestä A';
                voteAButton.onclick = () => votePoll(index, 'A');
                voteOptions.appendChild(voteAButton);

                const voteBButton = document.createElement('button');
                voteBButton.innerText = 'Äänestä B';
                voteBButton.onclick = () => votePoll(index, 'B');
                voteOptions.appendChild(voteBButton);
            } else {
                const deleteVoteButton = document.createElement('button');
                deleteVoteButton.innerText = 'Poista Ääni';
                deleteVoteButton.onclick = () => deleteVote(index);
                voteOptions.appendChild(deleteVoteButton);
            }

            pollElement.appendChild(voteOptions);
            pollElement.appendChild(renderPollResult(poll));
            pollContainer.appendChild(pollElement);
        });
    }
}

// Voting handler
function votePoll(pollIndex, option) {
    polls[pollIndex].votes[currentUser.username] = option;
    loadPolls();
}

// Delete vote handler
function deleteVote(pollIndex) {
    delete polls[pollIndex].votes[currentUser.username];
    loadPolls();
}

// Render poll result
function renderPollResult(poll) {
    const totalVotes = Object.keys(poll.votes).length;
    const votesA = Object.values(poll.votes).filter(vote => vote === 'A').length;
    const votesB = Object.values(poll.votes).filter(vote => vote === 'B').length;

    const pollResultContainer = document.createElement('div');
    pollResultContainer.innerHTML = `
        <div class="progress-bar">
            <div class="progress" style="width: ${totalVotes > 0 ? (votesA / totalVotes) * 100 : 0}%;">
                A: ${votesA} ääntä
            </div>
        </div>
        <div class="progress-bar">
            <div class="progress" style="width: ${totalVotes > 0 ? (votesB / totalVotes) * 100 : 0}%;">
                B: ${votesB} ääntä
            </div>
        </div>
    `;
    return pollResultContainer;
}

// Admin panel to create new polls
document.getElementById('createPollForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const pollName = document.getElementById('pollName').value;
    polls.push({ name: pollName, votes: {} });
    loadPolls();
    this.reset();
});
