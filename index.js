let myLeads = [];

const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const TabBtn = document.getElementById("tab-btn")
let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage;
    render(myLeads);
}


TabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
}) ;

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
});

inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value = ""; // Clear the input field
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});


function render(leads) {
    let listItems = "";
    for (let i = 0; i < leads.length; i++) {
        listItems += `
        <li>
            <a target='_blank' href='${leads[i]}'>
                ${leads[i]}
            </a>
        </li> 
        `
    }
    ulEl.innerHTML = listItems;
}


