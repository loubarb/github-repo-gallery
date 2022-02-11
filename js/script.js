// div where profile info appears:
const overview = document.querySelector(".overview");
const username = "loubarb";
const repoList = document.querySelector(".repo-list");
const reposDisplay = document.querySelector(".repos");
const repoDisplayData = document.querySelector(".repo-data");

async function gitInfo () {
    const userInfo = await fetch(`https://api.github.com/users/${username}`);
    const data = await userInfo.json();
    // console.log(data);
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

//click event
repoList.addEventListener("click", function (e) {
    if (e.target.matches("h3")) {
        const repoName = e.target.innerText;
        specificInfo(repoName);
    }
});

async function specificInfo (repoName) {
    const specificInfoRepo = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
    const repoInfo = await specificInfoRepo.json();
    console.log(specificInfoRepo);
    const fetchLanguages = await fetch(repoInfo.languages_url);
    const languageData = await fetchLanguages.json();
    // console.log(languageData);
    const languages = [];
    for (let key in languageData) {
        languages.push(key);
    }
    // console.log(languages);
    displaySpecificInfo(repoInfo, languages);
};

// grab specfic repo info
function displaySpecificInfo (repoInfo, languages) {
    repoDisplayData.innerHTML = "";
    const infoDiv = document.createElement("div");
    infoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    <p>Description: ${repoInfo.description}</p>
    <p>Default Branch: ${repoInfo.default_branch}</p>
    <p>Languages: ${repoInfo.language}</p>
    <a class="visit" href="${repoInfo.url}" target="_blank" rel="noreferrer noopener">View Repo on Github</a>`
    repoDisplayData.append(infoDiv);
    repoDisplayData.classList.remove("hide");
    reposDisplay.classList.add("hide");
}

