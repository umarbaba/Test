const express = require('express');
const fetch = require('node-fetch');
const descData = require('./data')
const bodyParser = require('body-parser');
const http = require('http');
const fs = require("fs");
const https = require("https");
const FormData = require('form-data');
const projectConfig = require('./project-config')
const environment = require('./environment');


const request = require('request');

const path = require('path');
const { response } = require('express');
const expressApp = express();

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;

let cumulocityJiraUrl = `https://cumulocity.atlassian.net/`;
//let authCred = `Basic c2FnLXNlY3VyaXR5OkM0QTluaXN1Q0lKeGxMUVQ=`;//sag-security:C4A9nisuCIJxlLQT
//test
let authCred = `Basic Y2MtamlyYS1mc2lhLWludGVncmF0aW9uQHNvZnR3YXJlYWcuY29tOkdiR0wwek5qb3RQczRzczRtdDRoRkZDRA==`
expressApp.use((express.static(path.join(__dirname, 'statics'))));
expressApp.use(bodyParser.json());

expressApp.put(`/updateLabel/:itracID`, (req, clientRes) => {
    let iTracId = (req.params.itracID);
    if (req.query.baseUrl != undefined && req.query.baseUrl.trim() != '') {
        url = req.query.baseUrl || cumulocityJiraUrl;
    }

    fetch(`${url}/rest/api/2/issue/${iTracId}`, {
        method: 'PUT',
        headers: {
            Authorization: authCred,
            'Content-Type': 'application/json',
            'Content-Length': req.headers['content-length'],
            Accept: `*/*`,
        },
        body: JSON.stringify(req.body)
    }).then(res => {
        if (res.status >= 200 && res.status < 300) {
            return clientRes.send(res);
        } else {
            return clientRes.status(res.status).send();
        }
    })

})

expressApp.get('/is-userstory-created-already/:itracID', (req, clientResponse) => {
    let iTracId = (req.params.itracID);

    if (req.query.baseUrl != undefined && req.query.baseUrl.trim() != '') {
        url = req.query.baseUrl || cumulocityJiraUrl;
    }
    else {
        url = cumulocityJiraUrl
    }
    getEpicIssues(url, iTracId).then(response => {
        status = false
        for (let issue of response.issues) {
            if (issue.fields.summary.trim().toLowerCase() == "security guidance") {
                status = true;
                break;
            }
        }
        clientResponse.send({ "alreadyCreated": status })
    }).catch(err => {
        clientResponse.status(500).send(err);
    })
});

expressApp.get('/get-itrac-info/:itracID', (req, clientResponse) => {
    let iTracId = (req.params.itracID);

    if (req.query.baseUrl != undefined && req.query.baseUrl.trim() != '') {
        url = req.query.baseUrl || cumulocityJiraUrl;
    }
    getItracInfo(url, iTracId).then(response => {
        clientResponse.send(response)
    }).catch(err => {
        clientResponse.status(500).send(err);
    })
});

function getEpicIssues(url, iTracId) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/rest/agile/1.0/epic/${iTracId}/issue?fields=description,labels,status,project,customfield_10240,customfield_10000,customfield_10299,subtasks,summary,assignee,customfield_12300,fixVersions`, {
            method: 'GET',
            headers: {
                Authorization: authCred,
                'Content-Type': 'application/json',
                Accept: `application/json`,
            }
        }).then(res => {
            if (res.status >= 400 && res.status < 500) {
                fetch(`${url}/rest/api/3/search?jql=(("Epic Link"=${iTracId})OR(parent=${iTracId}))&&fields=description,labels,status,project,customfield_10240,customfield_10000,customfield_10299,subtasks,summary,assignee,customfield_12300,fixVersions`, {
                    method: 'GET',
                    headers: {
                        Authorization: authCred,
                        'Content-Type': 'application/json',
                        Accept: `application/json`,
                    }
                }).then(res => {
                    return resolve(res.json())
                })
            }
            else {
                resolve(res.json())
            }

        }).catch(err => {
            reject(err)
        })
    })
}
function getItracInfo(url, iTracId) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/rest/api/2/issue/${iTracId}?fields=description,labels,status,project,customfield_10240,customfield_10000,customfield_10299,subtasks,summary,assignee,customfield_12300,fixVersions,customfield_11200`, {
            method: 'GET',
            headers: {
                Authorization: authCred,
                'Content-Type': 'application/json',
                Accept: `application/json`,
            }
        }).then(res => {
            return res.json()
        }).then(responseBody => {
            getWatchers(url, iTracId).then(watchers => {
                responseBody.watchers = watchers;
                resolve(responseBody)
                //clientResponse.send(responseBody);
            })
        }).catch(err => {
            reject(err)
        })
    })
}

function getWatchers(url, itracId) {
    return new Promise((resolve, reject) => {
        fetch(`${url}/rest/api/2/issue/${itracId}/watchers`, {
            method: 'GET',
            headers: {
                Authorization: authCred
            }
        }).then(response => response.json()).then(watchers => {
            if (watchers.watchCount > 0) {
                return resolve(watchers.watchers)
            } else {
                return resolve([])
            }
        }).catch(err => {
            return resolve([]);
        })
    })
}

function createNewSubtask(iTracURL, userData) {
    return new Promise((resolve, reject) => {
        let config = {};

        //config = JSON.parse(fs.readFileSync(__dirname + '/static/config.json'));
        fields = {}
        fields.summary = userData.summary
        fields.description = userData.description
        if (userData.assignee) {
            fields.assignee = { name: userData.assignee.displayName }
        }
        fields.labels = userData.labels
        //fields.customfield_11680 = userData.parentId
        //fields.customfield_13880 = userData.parentSummary
        // fields.issuetype = { id: "5" }     //5 for trendminer
        if (iTracURL.toLowerCase().includes("cumulocity")) {
            fields.issuetype = { id: 10 }
        }
        else {
            fields.issuetype = { id: 5 }
            fields.customfield_12300 = { "value": "Security", "id": "12300" }
        }
        fields.project = { "id": userData.projectId }
        //fields.customfield_12300 = { "value": userData.team }
        fields.parent = { key: userData.parentKey }
        // fields.fixVersions = userData.fixVersions




        let allProjectsData = projectConfig.projects
        let currentProjectData = allProjectsData.filter(entry => {
            let status = false
            if (userData.parentKey.includes(entry.name)) {
                status = true
            }
            return status
        })
        currentProjectData = currentProjectData.length > 0 ? currentProjectData[0] : allProjectsData[0]
        if (currentProjectData.hasOwnProperty("subtaskProperties")) {
            let subtaskProperties = currentProjectData["subtaskProperties"]
            for (let property in subtaskProperties) {
                fields[property] = subtaskProperties[property]
            }
        }
        fetch(`${iTracURL}rest/api/2/issue/`, {
            method: 'POST',
            headers: {
                Authorization: authCred,
                'Content-Type': 'application/json',
                Accept: `*/*`
            },
            body: JSON.stringify({
                "update": {},
                "fields": fields
            })
        }).then(res => {
            if (res.status >= 200 && res.status < 300) {
                res.json().then(resBody => {
                    return resolve(resBody)
                });
            } else {
                return resolve(res);
            }
        }).catch(err => {
            return reject(err)
        })
    });
}

function createNewUserStory(iTracURL, userData) {
    return new Promise((resolve, reject) => {
        let config = {};
        //config = JSON.parse(fs.readFileSync(__dirname + '/static/config.json'));
        fields = {}
        fields.summary = userData.summary
        fields.description = userData.description
        if (userData.assignee) {
            fields.assignee = { name: userData.assignee.displayName }
        }
        fields.labels = userData.labels

        //6 for cumulocity// 7 for trendminer
        fields.project = { "id": userData.projectId }
        if (iTracURL.toLowerCase().includes("cumulocity")) {
            //fields.issuetype = { id: 6 }


            //fields.customfield_10031 = "Perform FSIA"  //Acceptance Criterion
            fields.fixVersions = userData.fixVersions
            //fields.customfield_11200 = userData.team //team

            let projectsData = projectConfig.projects
            let currentProjectData = projectsData.filter(entry => {
                let status = false
                if (userData.parentId.includes(entry.name)) {
                    status = true
                }
                return status
            })
            let currentProperties = currentProjectData.length > 0 ? currentProjectData[0].properties : projectsData[0].properties

            for (let property in currentProperties) {
                fields[property] = currentProperties[property]
            }
            if (fields.hasOwnProperty("parent")) {
                fields["parent"] = { "id": userData.parentItracId }
            }


        }
        else {  //for trendminer
            fields.issuetype = { id: 7 }
            fields.customfield_12300 = { "value": "Security", "id": "12300" } //team

        }
        createUserstory(iTracURL, fields).then(res => {
            if (res.statusCode >= 200 && res.statusCode <= 300) {
                return resolve(JSON.parse(res.body))

            }
            else if (res.statusCode >= 400 && res.statusCode < 500) {
                delete fields.fixVersions
                createUserstory(iTracURL, fields).then(res => {
                    if (res.statusCode >= 200 && res.statusCode <= 300) {
                        return resolve(JSON.parse(res.body))
                    }
                    else {
                        return resolve(res);
                    }
                }).catch(err => {
                    return reject(err)
                })
            } else {
                return resolve(res);
            }
        }).catch(err => {
            reject(err)
        })

    });
}

function createUserstory(iTracURL, fields) {
    return new Promise((resolve, reject) => {
        request.post({
            uri: `${iTracURL}/rest/api/2/issue/`,
            method: 'POST',
            headers: {
                Authorization: authCred,
                'Content-Type': 'application/json',
                Accept: `application/json`
            },
            body: JSON.stringify({
                "update": {},
                "fields": fields
            })
        }, function (err, res, body) {

            if (err) {
                return reject(err);
            }
            else {
                return resolve(res);
            }

        })
    })
}

expressApp.post('/add_userstory_to_Epic', async (req, res) => {
    body = req.body
    let userData = {}
    userData.epicKey = body.fields.epicKey
    userData.userStoryKey = body.fields.userStoryKey
    let reqbody = {
        "issues": [userData.userStoryKey]
    }
    let iTracURL = req.query.baseUrl || cumulocityJiraUrl

    // checking whether issue is already linked to epic
    // In next Gen projects of jira issue gets linked to epic on the time of creation by adding the parent property in fields
    try {
        let EpicChildIssues = await getEpicIssues(iTracURL, userData.epicKey)
        let status = false
        for (let issue of EpicChildIssues.issues) {
            if (issue.key.trim() == userData.userStoryKey.trim()) {
                status = true;
                break;
            }
        }
        if (status) {
            return res.status(200).json('success');
        }
        else {
            fetch(`${iTracURL}rest/agile/1.0/epic/${userData.epicKey}/issue/`, {
                method: 'POST',
                headers: {
                    Authorization: authCred,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqbody)
            }).then(result => {
                if (result.status >= 200 && result.status < 300) {
                    return res.status(200).json('success');
                } else {
                    return res.status(500).send(res);
                }
            }).catch(err => {
                return res.status(500).send(err);
            })
        }
    }
    catch (err) {
        return res.status(500).send(err);
    }
})

function updateParentItracLabels(iTracURL, itracKey) {
    return new Promise((accept, reject) => {
        let update = {
            "labels": [
                {
                    "add": "impactanalysisyes"
                }
            ]
        }
        request.put({
            uri: `${iTracURL}/rest/api/2/issue/${itracKey}`,
            method: 'PUT',
            headers: {
                Authorization: authCred,
                'Content-Type': 'application/json',
                Accept: `application/json`
            },
            body: JSON.stringify({
                "update": update,
                "fields": {}
            })
        }, function (err, res, body) {

            if (err) {
                return reject(err.body);
            }
            if (res.statusCode >= 200 && res.statusCode <= 300) {
                return accept()
            } else {
                return reject();
            }

        })
    })
}

expressApp.post('/create_userstory', (req, res) => {
    body = req.body
    let userData = {}
    userData.summary = "Security guidance"
    userData.parentId = body.fields.parentId
    userData.description = getDescriptionForUserStory(body.fields.data)
    let url = req.query.baseUrl || cumulocityJiraUrl
    getItracInfo(url, userData.parentId).then(async (itracInfo) => {
        //console.log(itracInfo)
        userData.assignee = itracInfo.fields.assignee
        userData.labels = ["impactanalysisyes", "security"]
        userData.parentSummary = itracInfo.fields.summary
        userData.projectId = itracInfo.fields.project.id
        userData.fixVersions = itracInfo.fields.fixVersions
        userData.parentItracId = itracInfo.id
        //userData.team = itracInfo.fields.customfield_11200?.id
        try {
            let status = await updateParentItracLabels(url, userData.parentId)
        }
        catch (err) { }
        createNewUserStory(url, userData).then(result => {
            res.send(result)
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

expressApp.post('/create_subtask', (req, res) => {
    body = req.body
    let userData = {}
    userData.summary = body.fields.subtaskData.text.replace(/\s\s*/g, " ")
    userData.parentKey = body.fields.parentKey
    userData.description = getDescriptionForSubtask(body.fields.subtaskData)
    let url = req.query.baseUrl || cumulocityJiraUrl
    getItracInfo(url, userData.parentKey).then(itracInfo => {
        //console.log(itracInfo)
        userData.assignee = itracInfo.fields.assignee
        userData.labels = ["impactanalysisyes", "security"]
        userData.parentSummary = itracInfo.fields.summary
        userData.projectId = itracInfo.fields.project.id
        userData.fixVersions = itracInfo.fields.fixVersions
        //userData.team = itracInfo.fields.customfield_12300.value

        createNewSubtask(url, userData).then(result => {
            res.send(result)
        }).catch(err => {
            res.status(500).send(err);
        })
    }).catch(err => {
        res.status(500).send(err);
    })
})

function getDescriptionForSubtask(subtaskData) {
    let description = ""

    //description += subtaskData.text
    //description += "\n"
    subtaskData.subQuestions.forEach(subQuestion => {
        description += "\t" + subQuestion.text.replace(/\s\s*/g, " ") + "\n"
    })
    description += "\n\n"

    descData.quest.forEach(question => {
        if (question.text.trim().toLowerCase().replace(/\s/g, '') == subtaskData.text.trim().toLowerCase().replace(/\s/g, '')) {
            if (subtaskData.subQuestions.length > 0) {
                question.items.forEach(item => {
                    subtaskData.subQuestions.forEach(selectedsubquest => {
                        if (selectedsubquest.text.trim().toLowerCase().replace(/\s/g, '') == item.text.trim().toLowerCase().replace(/\s/g, '')) {
                            description += item.guide + "\n"
                        }
                    })
                })
            }
            else {
                description += question.guide + "\n"
            }
        }
    })

    return description
}

function getDescriptionForUserStory(data) {
    let description = "Options selected in the questionnaire:\n\n"
    data.forEach(entry => {
        description += entry.text
        description += "\n"
        entry.subQuestions.forEach(subQuestion => {
            description += "\t . " + subQuestion.text.replace(/\s\s*/g, " ") + "\n"
        })
        description += "\n"
    })
    description += "\n\n For further details on the individual topic kindly refer to the corresponding sub-task."
    return description
}


expressApp.post('/addWatchers/:itracID', (req, res) => {

    let iTracId = (req.params.itracID);
    let promiseList = [];

    req.body.watchers.forEach(watcher => {
        promiseList.push(addWatchers(iTracId, watcher.name));
    });

    Promise.all(promiseList).then(_ => {


        res.json({
            'status': 'ok'
        })

    }).catch(err => {
        res.status(500).json({
            'status': 'failed'
        })
    })

    //console.log(req.body.watchers)
})

function addWatchers(itracId, userName) {
    return new Promise((resolve, reject) => {

        fetch(`${cumulocityJiraUrl}/rest/api/2/issue/${itracId}/watchers`,
            {
                "method": "POST",
                "headers": {
                    "accept": "*/*",
                    "content-type": "application/json",
                    Authorization: authCred
                },
                "body": `"${userName}"`,
            }
        ).then(response => {
            if (response.status >= 200 && response.status < 300) {
                resolve();
            } else {
                reject(response.status)
            }
        }).catch(err => {
            reject(err)
        })
    });
}

// const httpServer = http.createServer(expressApp);
// httpServer.listen(9090, () => {
//     console.log('Sub task creator is up at 9090')
// })

function httpToHttpsUpgradeHandler(req, res) {
    res.setHeader('Location', `https://${environment.serverNameOnly}:${environment.httpsServerPort}${req.url || '/'}`);
    res.writeHead(301);
    res.end('');
}
const httpsOptions = {
    key: fs.readFileSync(path.join(__dirname, "cert", "localhost.key")),
    cert: fs.readFileSync(path.join(__dirname, "cert", "localhost.cert")),
};

const httpServer = http.createServer(httpToHttpsUpgradeHandler)
httpServer.listen(environment.httpServerPort, _ => {
    console.log(`HTTP to HTTPs upgrade server is up at port ${environment.httpServerPort}`)
})
const httpsServer = https.createServer(httpsOptions, expressApp)
httpsServer.listen(environment.httpsServerPort, _ => {
    console.log(`Server is up at ${environment.httpsServerPort}`)
})





//   const httpsServer = https.createServer(httpsOptions, expressApp);
//   httpsServer.listen(9090, (_) => {
//     console.log(`Server is up ${9090}`);
//   });



expressApp.post('/addAttachment', (req, res) => {
    return new Promise((resolve, reject) => {
        const filePath = "C://log.txt"
        const form = new FormData();
        const stats = fs.statSync(filePath);
        const fileSizeInBytes = stats.size;
        const fileStream = fs.createReadStream(filePath);

        form.append('file', fileStream, { knownLength: fileSizeInBytes });

        request.post({
            uri: `https://itrac.eur.ad.sag/rest/api/2/issue/PSRT-4668/attachments/`,
            method: 'POST',
            headers: {
                Authorization: "Basic aXRyYWNjbG91ZG9wczpPcHMkQ2xvdWQz",
                //'Content-Type': 'application/json',
                Accept: `application/json`,
                'X-Atlassian-Token': 'no-check',
                //'Content-Type': 'application/octet-stream'
            },
            body: form
        }, function (err, res, body) {

            if (err) {
                return reject(err);
            }
            if (res.statusCode >= 200 && res.statusCode <= 300) {
                return resolve(JSON.parse(res.body))

            } else {
                return resolve(res);
            }

        })
    })
})