// div where profile info appears:
const overview = document.querySelector(".overview");
const username = "loubarb";
const repoList = document.querySelector(".repo-list");

async function gitInfo () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    console.log(data);
    displayUserInfo(data);
};
gitInfo();

// fetch profile info to display at top
function displayUserInfo (data) {
    const newDiv = document.createElement("div");
    newDiv.classList.add("user-info");
    newDiv.innerHTML = `<figure>
                            <img alt="user avatar" src=${data.avatar_url} />
                        </figure>
                        <div>
                            <p><strong>Name:</strong> ${data.name}</p>
                            <p><strong>Bio:</strong> ${data.bio}</p>
                            <p><strong>Location:</strong> ${data.location}</p>
                            <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
                        </div> `;
    overview.append(newDiv);
    myRepos();
};

// fetch repos
async function myRepos () {
    const myInfo = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const repoData = await myInfo.json();
    console.log(repoData);
    displayRepoInfo(repoData);
};

// repo info
function displayRepoInfo (repos) {
    for (const repo of repos) {
        const li = document.createElement("li");
        li.classList.add("repo");
        li.innerHTML = `<h3>${repo.name}</h3>`;
        repoList.append(li);
    }
};

