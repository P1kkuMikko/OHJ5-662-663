document.addEventListener('DOMContentLoaded', () => {
    const users = JSON.parse(sessionStorage.getItem('users')) || [];
    const polls = JSON.parse(sessionStorage.getItem('polls')) || [];
    let currentUser = JSON.parse(sessionStorage.getItem('currentUser'));

    const getElement = (id) => document.getElementById(id);
    const showElement = (id) => getElement(id).style.display = 'block';
    const hideElement = (id) => getElement(id).style.display = 'none';

    const registerForm = getElement('registerForm');
    const loginForm = getElement('loginForm');
    const createPollForm = getElement('createPollForm');
    const logoutButtonAdmin = getElement('logoutButtonAdmin');
    const logoutButtonUser = getElement('logoutButtonUser');

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = getElement('registerUsername').value;
        const password = getElement('registerPassword').value;
        const role = document.querySelector('input[name="role"]:checked').value;

        if (users.some(user => user.username === username)) {
            alert('Käyttäjänimi on jo olemassa.');
            return;
        }

        users.push({ username, password, role });
        sessionStorage.setItem('users', JSON.stringify(users));
        alert('Rekisteröinti onnistui!');
        registerForm.reset();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = getElement('loginUsername').value;
        const password = getElement('loginPassword').value;
        const role = document.querySelector('input[name="role"]:checked').value;

        const user = users.find(user => user.username === username && user.password === password && user.role === role);

        if (user) {
            currentUser = user;
            sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
            alert(`Tervetuloa, ${user.username}`);
            hideElement('register');
            hideElement('login');
            showElement('pollsContainer');
            hideElement('noPollsMessage');

            if (user.role === 'Admin') {
                showElement('adminPanel');
            }

            showElement('logoutButtonUser');
            loadPolls();
        } else {
            alert('Väärä käyttäjänimi, salasana tai rooli.');
        }
    });

    const loadPolls = () => {
        const pollContainer = getElement('pollsContainer');
        pollContainer.innerHTML = '';

        if (polls.length === 0) {
            showElement('noPollsMessage');
        } else {
            hideElement('noPollsMessage');
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
    };

    const votePoll = (pollIndex, option) => {
        polls[pollIndex].votes[currentUser.username] = option;
        sessionStorage.setItem('polls', JSON.stringify(polls));
        loadPolls();
    };

    const deleteVote = (pollIndex) => {
        delete polls[pollIndex].votes[currentUser.username];
        sessionStorage.setItem('polls', JSON.stringify(polls));
        loadPolls();
    };

    const renderPollResult = (poll) => {
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
    };

    createPollForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const pollName = getElement('pollName').value;
        polls.push({ name: pollName, votes: {}, closed: false });
        sessionStorage.setItem('polls', JSON.stringify(polls));
        createPollForm.reset();
        loadPolls();
    });

    const closePoll = (index) => {
        polls[index].closed = true;
        sessionStorage.setItem('polls', JSON.stringify(polls));
        loadPolls();
    };

    const removePoll = (index) => {
        polls.splice(index, 1);
        sessionStorage.setItem('polls', JSON.stringify(polls));
        loadPolls();
    };

    const logout = () => {
        currentUser = null;
        sessionStorage.removeItem('currentUser');
        location.reload();
    };

    logoutButtonAdmin.addEventListener('click', logout);
    logoutButtonUser.addEventListener('click', logout);

    if (currentUser) {
        hideElement('register');
        hideElement('login');
        showElement('pollsContainer');
        hideElement('noPollsMessage');

        if (currentUser.role === 'Admin') {
            showElement('adminPanel');
            showElement('logoutButtonAdmin');
        } else {
            showElement('logoutButtonUser');
        }

        loadPolls();
    } else {
        hideElement('pollsContainer');
    }
});