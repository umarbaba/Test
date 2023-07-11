const projects = [
    {
        name: "general",
        properties: {
            customfield_10031: "Perform FSIA",
            issuetype: { id: 6 }
        }
    },
    {
        name: "CIT",
        properties: {
            "issuetype": { id: 6 }
        }
    },
    {
        name: "COE",
        properties: {  //properties are specific to userstory creation
            "issuetype": { id: 10258 },
            "parent": { "id": "test" } //need to replace the parent with actual value on userstory creation
        },
        subtaskProperties: {
            "issuetype": { id: 10262 }
        }
    }
]

module.exports = {
    projects
}