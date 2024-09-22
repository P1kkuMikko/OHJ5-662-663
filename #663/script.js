document.addEventListener('DOMContentLoaded', () => {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let polls = JSON.parse(localStorage.getItem('polls')) || [];
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));

    document.getElementById('registerForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const role = document.querySelector('input[name="role"]:checked').value;

        if (users.some(user => user.username === username)) {
            alert('Käyttäjänimi on jo olemassa.');
            return;
        }

        users.push({ username, password, role });
        localStorage.setItem('users', JSON.stringify(users));
        alert('Rekisteröinti onnistui!');
        this.reset();
    });

    document.getElementById('loginForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;
        const role = document.querySelector('input[name="role"]:checked').value;

        const user = users.find(user => user.username === username && user.password === password && user.role === role);

        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            alert(`Tervetuloa, ${user.username}`);
            document.getElementById('register').style.display = 'none';
            document.getElementById('login').style.display = 'none';
            document.getElementById('pollsContainer').style.display = 'flex';
            document.getElementById('noPollsMessage').style.display = 'none';

            if (user.role === 'Admin') {
                document.getElementById('adminPanel').style.display = 'block';
            }

            document.getElementById('logoutButtonUser').style.display = 'block';
            loadPolls();
        } else {
            alert('Väärä käyttäjänimi, salasana tai rooli.');
        }
    });

    function loadPolls() {
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

                if (poll.closed) {
                    const closedLabel = document.createElement('p');
                    closedLabel.innerText = 'Äänestys suljettu';
                    voteOptions.appendChild(closedLabel);
                } else {
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
                        deleteVoteButton.innerText = 'Poista ääni';
                        deleteVoteButton.onclick = () => deleteVote(index);
                        voteOptions.appendChild(deleteVoteButton);
                    }
                }

                pollElement.appendChild(voteOptions);
                pollElement.appendChild(renderPollResult(poll));

                if (currentUser.role === 'Admin') {
                    const adminActions = document.createElement('div');
                    adminActions.classList.add('admin-actions');

                    const closePollButton = document.createElement('button');
                    closePollButton.innerText = 'Sulje äänestys';
                    closePollButton.onclick = () => closePoll(index);
                    adminActions.appendChild(closePollButton);

                    const removePollButton = document.createElement('button');
                    removePollButton.innerText = 'Poista äänestys';
                    removePollButton.onclick = () => removePoll(index);
                    adminActions.appendChild(removePollButton);

                    pollElement.appendChild(adminActions);
                }

                pollContainer.appendChild(pollElement);
            });
        }
    }

    function votePoll(pollIndex, option) {
        polls[pollIndex].votes[currentUser.username] = option;
        localStorage.setItem('polls', JSON.stringify(polls));
        loadPolls();
    }

    function deleteVote(pollIndex) {
        delete polls[pollIndex].votes[currentUser.username];
        localStorage.setItem('polls', JSON.stringify(polls));
        loadPolls();
    }

    function renderPollResult(poll) {
        const totalVotes = Object.keys(poll.votes).length;
        const votesA = Object.values(poll.votes).filter(vote => vote === 'A').length;
        const votesB = Object.values(poll.votes).filter(vote => vote === 'B').length;

        const pollResultContainer = document.createElement('div');
        pollResultContainer.classList.add('poll-result');
        pollResultContainer.innerHTML = `
            <div class="progress-bar">
                <div class="progress" style="width: ${totalVotes === 0 ? 50 : (votesA / totalVotes) * 100}%;">A: ${votesA}</div>
                <div class="progress" style="width: ${totalVotes === 0 ? 50 : (votesB / totalVotes) * 100}%;">B: ${votesB}</div>
            </div>
            <p>Ääniä yhteensä: ${totalVotes}</p>
        `;

        return pollResultContainer;
    }

    document.getElementById('createPollForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const pollName = document.getElementById('pollName').value;
        polls.push({ name: pollName, votes: {}, closed: false });
        localStorage.setItem('polls', JSON.stringify(polls));
        this.reset();
        loadPolls();
    });

    function closePoll(index) {
        polls[index].closed = true;
        localStorage.setItem('polls', JSON.stringify(polls));
        loadPolls();
    }

    function removePoll(index) {
        polls.splice(index, 1);
        localStorage.setItem('polls', JSON.stringify(polls));
        loadPolls();
    }

    document.getElementById('logoutButtonAdmin').addEventListener('click', logout);
    document.getElementById('logoutButtonUser').addEventListener('click', logout);

    function logout() {
        currentUser = null;
        localStorage.removeItem('currentUser');
        location.reload();
    }

    if (currentUser) {
        document.getElementById('register').style.display = 'none';
        document.getElementById('login').style.display = 'none';
        document.getElementById('pollsContainer').style.display = 'flex';
        document.getElementById('noPollsMessage').style.display = 'none';

        if (currentUser.role === 'Admin') {
            document.getElementById('adminPanel').style.display = 'block';
            document.getElementById('logoutButtonAdmin').style.display = 'block';
        } else {
            document.getElementById('logoutButtonUser').style.display = 'block';
        }

        loadPolls();
    } else {
        document.getElementById('pollsContainer').style.display = 'none';
    }
});
