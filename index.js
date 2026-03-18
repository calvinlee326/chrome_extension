let myLeads = [];

const inputBtn = document.getElementById("input-btn");
const inputEl = document.getElementById("input-el");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn = document.getElementById("tab-btn");
const leadCount = document.getElementById("lead-count");

try {
    const stored = JSON.parse(localStorage.getItem("myLeads"));
    if (Array.isArray(stored)) {
        myLeads = stored;
        render(myLeads);
    }
} catch (e) {
    // Corrupted storage — start fresh
    localStorage.removeItem("myLeads");
}

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (!tabs || tabs.length === 0) return;
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        render(myLeads);
    });
});

// Double-click required to prevent accidental deletion
deleteBtn.addEventListener("dblclick", function() {
    localStorage.removeItem("myLeads");
    myLeads = [];
    render(myLeads);
});

inputBtn.addEventListener("click", function() {
    const value = inputEl.value.trim();
    if (!value) return;
    myLeads.push(value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});

function isSafeUrl(url) {
    try {
        const parsed = new URL(url);
        return parsed.protocol === "https:" || parsed.protocol === "http:";
    } catch {
        return false;
    }
}

function render(leads) {
    leadCount.textContent = leads.length;
    ulEl.innerHTML = "";

    if (leads.length === 0) {
        const empty = document.createElement("li");
        empty.className = "empty-state";
        empty.textContent = "No leads saved yet.";
        ulEl.appendChild(empty);
        return;
    }

    for (const lead of leads) {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        a.textContent = lead;
        // Only set href for safe protocols to block javascript: URLs
        if (isSafeUrl(lead)) {
            a.href = lead;
        } else {
            a.href = "#";
            a.title = "Non-URL lead (click does nothing)";
        }
        li.appendChild(a);
        ulEl.appendChild(li);
    }
}


