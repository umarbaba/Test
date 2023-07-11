window.addEventListener('load', init)

let baseURL = `https://cumulocity.atlassian.net/`

let pItracId = null;


let parentItracDetails = null;

function init() {
    createBtn = document.querySelector('#createBtn');
    createBtn.addEventListener('click', main)
    createBtn = document.querySelector('#continueBtn');
    createBtn.addEventListener('click', createUserStoryAndSubtasks)
    naBtn = document.querySelector('#naBtn');
    naBtn.addEventListener('click', addNotApplicable)

    questions = document.querySelector("#questions")
    questions.addEventListener('change', checkForCreateButtonEnable)

    document.querySelector('#cancelBtn').addEventListener('click', () => {
        window.history.back();
    })
    document.querySelector('#cancelBtn2').addEventListener('click', () => {
        window.history.back();
    })
    let queryParams = getQueryParams();
    if (queryParams.iTrac != undefined && queryParams.iTrac.trim() != '') {
        //document.querySelector('#popupHeader').innerHTML = `Create Code Roll-ins : <a  href="${baseURL}/browse/${queryParams.iTrac}">${queryParams.iTrac}`;
        if (queryParams.baseURL != undefined && queryParams.baseURL.trim() != '') {
            baseURL = queryParams.baseURL;
        }
        if (queryParams.reporter != undefined && queryParams.reporter.trim() != '') {
            reporter = queryParams.reporter;
        }
        document.querySelector('#popupHeader').innerHTML = `Feature Security Impact Analysis : <a  href="${baseURL}/browse/${queryParams.iTrac}">${queryParams.iTrac}`;
        pItracId = queryParams.iTrac;
    }
}

function addNotApplicable() {
    if (!pItracId) {
        console.log("parent ")
        document.querySelector('.errorMessage').innerHTML = "Missing 'Epic id', please provide it in query params like :<p>?iTrac=TME-20475</p> "
        document.querySelector('.errorMessageBox').style.display = 'block';
        document.querySelector('.contentContainer').style.display = 'none';
    }
    else {
        showLoader()
        let label = "FSIA-NA"

        addLabelToParentEpic(label).then(res => {
            document.querySelector('#successMessage').innerHTML = `<b>'${label}'</b> label has been added successfully to Epic <b>${pItracId}</b>.`

            document.querySelector('.contentContainer').style.display = 'none';
            document.querySelector('.successMessageBox').style.display = 'block';
            hideLoader();
        }).catch(err => {
            hideLoader();
            document.querySelector('.errorMessage').innerHTML = "Could not add 'FSIA-NA' label to parent EPIC <p> Internal server error</p> "
            document.querySelector('.errorMessageBox').style.display = 'block';
            document.querySelector('.contentContainer').style.display = 'none';
        })
    }
}

function addLabelToParentEpic(label) {
    return new Promise((resolve, reject) => {
        fetch(`/updateLabel/${pItracId}/?baseUrl=${baseURL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "update": {
                    "labels": [
                        {
                            "add": label
                        }
                    ]
                }
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                res.json().then(resBody => {
                    return resolve(resBody)
                });
            } else {
                return reject(res)
            }
        })
    });
}

function main() {
    if (!pItracId) {
        console.log("parent ")
        document.querySelector('.errorMessage').innerHTML = "Missing 'Epic id', please provide it in query params like :<p>?iTrac=TME-20475</p> "
        document.querySelector('.errorMessageBox').style.display = 'block';
        document.querySelector('.contentContainer').style.display = 'none';
    }
    else {
        showLoader()
        isUserStoryAlreadyCreated().then(res => {
            if (res) {

                document.querySelector('#notificationMessage').innerHTML = `<span><b>'Security guidance'</b> user story is already created for Epic <b>${pItracId}</b></span>.<br> 
                <br><p>Do you still want to create.<p>`

                document.querySelector('.contentContainer').style.display = 'none';
                document.querySelector('.notificationBox').style.display = 'block';
                hideLoader()
            }
            else {
                createUserStoryAndSubtasks()
            }
        }).catch(err => {
            hideLoader()
        })
    }
}


function createUserStoryAndSubtasks() {
    let data = []
    showLoader()
    questions = document.querySelector("#questions")
    allParents = questions.querySelectorAll(".parent")
    allParents.forEach(item => {
        checkbox = item.querySelector(".parentCheckbox")
        if (checkbox.checked) {
            let status = false
            let obj = { text: item.querySelector("label").innerText, subQuestions: [] }

            allchilds = item.querySelectorAll("li")
            if (allchilds.length == 0) {
                status = true
            }
            else {
                for (let i = 0; i < allchilds.length; i++) {
                    childcheckbox = allchilds[i].querySelector("input")

                    if (childcheckbox.checked) {
                        obj.subQuestions.push({ text: allchilds[i].querySelector("label").innerText })
                        status = true
                    }
                }
            }
            if (status) {
                data.push(obj)
            }
        }
    })
    console.log(data)
    //linkUserStoryAndEpic("TME-20475", "TME-21244")	
    createdItracs = {}

    document.querySelector('.subtaskList').innerHTML = '';
    createUserStory(data).then(async (res) => {
        let userStoryKey = res.key
        createdItracs.userStory = res.key
        createdItracs.subtasks = []
        try {
            await linkUserStoryAndEpic(pItracId, userStoryKey)
            await addLabelToParentEpic("FSIA-Done")

        }
        catch (err) {
            console.log(err)
        }
        try {
            let createdSubtasks = await createSubTasks(data, userStoryKey)
            createdItracs.subtasks = createdSubtasks
        }
        catch (err) { }

        let link = document.createElement('a');
        link.href = `${baseURL}/browse/` + createdItracs.userStory;
        link.innerHTML = createdItracs.userStory
        link.setAttribute('target', '_blank')

        document.querySelector('.userStory').append(link)

        createdItracs.subtasks.forEach(subtask => {
            let link = document.createElement('a');
            link.href = `${baseURL}/browse/` + subtask;
            link.innerHTML = subtask
            link.setAttribute('target', '_blank')
            let list = document.createElement('li');
            list.append(link);
            document.querySelector('.subtaskList').append(list)
        })
        document.querySelector('.contentContainer').style.display = 'none';
        document.querySelector('.notificationBox').style.display = 'none';
        document.querySelector('.successMessageBox').style.display = 'none';
        document.querySelector('.errorMessageBox').style.display = 'none';

        document.querySelector('.messageBox').style.display = 'block';
        hideLoader();
    }).catch(err => {
        hideLoader();

        document.querySelector('.errorMessage').innerHTML = "Could not create user story and its subtasks <p> Internal server error</p> "
        document.querySelector('.errorMessageBox').style.display = 'block';
        document.querySelector('.contentContainer').style.display = 'none';
    })
}

function isUserStoryAlreadyCreated() {
    return new Promise((resolve, reject) => {
        fetch(`/is-userstory-created-already/${pItracId}/?baseUrl=${baseURL}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                res.json().then(resBody => {
                    return resolve(resBody.alreadyCreated)
                });
            } else {
                return reject(res)
            }
        })
    });
}

function linkUserStoryAndEpic(epicKey, userStoryKey) {
    return new Promise((resolve, reject) => {
        fetch(`/add_userstory_to_Epic?baseUrl=${baseURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fields": {
                    epicKey: epicKey,
                    userStoryKey: userStoryKey,
                }
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                return resolve(res)

            } else {
                return reject(res)
            }
        })
    })
}

async function createSubTasks(data, parentKey) {
    let createdTasks = []
    for (let subtask of data) {
        let task = await createSubTask(subtask, parentKey)
        createdTasks.push(task.key)
    }
    return createdTasks
}

function createSubTask(subtaskData, parentKey) {

    return new Promise((resolve, reject) => {
        fetch(`/create_subtask?baseUrl=${baseURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fields": {
                    parentKey: parentKey,
                    subtaskData: subtaskData,
                }
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                res.json().then(resBody => {
                    return resolve(resBody)
                });
            } else {
                return reject(res)
            }
        })
    })
}

function createUserStory(data) {
    return new Promise((resolve, reject) => {
        fetch(`/create_userstory?baseUrl=${baseURL}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "fields": {
                    parentId: pItracId,
                    data: data,
                }
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                res.json().then(resBody => {
                    return resolve(resBody)
                });
            } else {
                return reject(res)
            }
        }).catch(err => {
            return reject(err)
        })
    });
}

function checkForCreateButtonEnable() {
    //webInterface = document.querySelector("")
    let status = false;
    questions = document.querySelector("#questions")
    allParents = questions.querySelectorAll(".parent")
    allParents.forEach(item => {
        checkbox = item.querySelector(".parentCheckbox")
        if (checkbox.checked) {
            allchilds = item.querySelectorAll("li")
            if (allchilds.length <= 0) {
                status = true
            }
            for (let i = 0; i < allchilds.length; i++) {
                childcheckbox = allchilds[i].querySelector("input")
                if (childcheckbox.checked) {
                    status = true
                    break;
                }
            }
        }
    })
    createBtn = document.querySelector("#createBtn")
    if (status) {
        createBtn.disabled = false
        naBtn.disabled = true
    }
    else {
        createBtn.disabled = true
        naBtn.disabled = false
    }
}

function markIfAlreadyCreated(tempVersionCheckBoxTemplate, currentVersion, pItracDetails) {
    let alreadyCreated = false;
    let index = pItracDetails.subTaskData.subTaskVersions.indexOf(currentVersion);
    if (index >= 0) {
        alreadyCreated = true;
        let itracDetails = pItracDetails.subTaskData.subTasks[index];
        tempVersionCheckBoxTemplate = tempVersionCheckBoxTemplate.replace(/{{extra-label}}/ig, `&nbsp;&nbsp; <a target="_blank" href="${baseURL}/browse/${itracDetails.key}">${itracDetails.key}</a>`);
        tempVersionCheckBoxTemplate = tempVersionCheckBoxTemplate.replace(/{{disabled}}/ig, `disabled`);
        tempVersionCheckBoxTemplate = tempVersionCheckBoxTemplate.replace(/{{extraCheckBoxLabel}}/ig, `labelWithItrac`);
        tempVersionCheckBoxTemplate = tempVersionCheckBoxTemplate.replace(/{{checked}}/ig, ``);
    }
    tempVersionCheckBoxTemplate = tempVersionCheckBoxTemplate.replace(/{{extraCheckBoxLabel}}/ig, ``);


    return {
        tempVersionCheckBoxTemplate,
        alreadyCreated
    };
}

let versionCheckBoxTemplate = `
<li class="versionOption">
    <input type="checkbox" name="{{version}}" id="uid-{{timestamp}}" class="versionCheckbox" {{disabled}} {{checked}} > &nbsp;
    <label for="uid-{{timestamp}}" class="checkboxLabel {{extraCheckBoxLabel}}"> {{version}} {{extra-label}} </label>
</li>
`;




function getProductVersionMap() {
    return new Promise((resolve, reject) => {
        fetch('product-version-map.json').then(res => res.json()).then(responseBody => {
            resolve(responseBody)
        }).catch(err => {
            console.log(err)
            reject(err)
        })
    })
}

function updateParentItracLabels() {
    return new Promise((resolve, reject) => {
        fetch(`/updateLabel/${pItracId}/?baseUrl=${baseURL}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "update": {
                    "labels": [
                        {
                            "add": "coderollinyes"
                        }
                    ]
                }
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                res.json().then(resBody => {
                    return resolve(resBody)
                });
            } else {
                return reject(res)
            }
        })
    });
}

function addWatchers(iTracId, watchers) {
    return new Promise((resolve, reject) => {
        fetch(`/addWatchers/${iTracId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                watchers
            })
        }).then(res => {
            if (res.status == 200) {
                resolve()
            } else {
                reject();
            }
        }).catch(err => {
            reject();
        })
    })
}

function getParentItracDetails(iTracId) {
    return new Promise((resolve, reject) => {
        fetch(`/get-itrac-info/${iTracId}?baseUrl=${baseURL}`).then(res => {
            return res.json();
        }).then(responseBody => {

            if (responseBody.errorMessages != undefined) {
                return reject(responseBody.errorMessages)
            }
            else {

                let subTaskData = {
                    subTaskVersions: [],
                    subTasks: []
                }
                if (responseBody.fields.subtasks && responseBody.fields.subtasks.length > 0) {
                    responseBody.fields.subtasks.forEach(eachSubtask => {
                        if (eachSubtask.fields.issuetype.id == '8' || eachSubtask.fields.issuetype.id == '9') {
                            if (eachSubtask.fields.summary.match(/Code Roll-in for .* version .+/) && eachSubtask.fields.summary.match(/version\s(.*)$/)) {
                                let version = eachSubtask.fields.summary.match(/version\s(.*)$/)[1];
                                subTaskData.subTaskVersions.push(version.trim().toLowerCase());
                                subTaskData.subTasks.push(eachSubtask)
                            }
                        }
                    })

                }

                resolve({
                    key: responseBody.key,
                    summary: responseBody.fields.summary,
                    description: responseBody.fields.description,
                    labels: responseBody.fields.labels,
                    status: responseBody.fields.status,
                    project: responseBody.fields.project,
                    productCode: responseBody.fields.customfield_10240,
                    severity: responseBody.fields.customfield_10000,
                    reportedVersion: responseBody.fields.customfield_10299,
                    watchers: responseBody.watchers,
                    subTaskData,
                })
            }

        }).catch(err => {
            reject(err)
        })
    })
}


function showLoader() {
    document.querySelector('.loader').style.display = 'flex';
}

function hideLoader() {
    document.querySelector('.loader').style.display = 'none';
}

function getQueryParams() {
    let queryString = document.location.href;
    var query = {};
    if (queryString.includes('?')) {
        queryString = queryString.replace(/^.*?\?/, '')

        var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
        for (var i = 0; i < pairs.length; i++) {
            var pair = pairs[i].split('=');
            query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
        }
    }

    return query;
}