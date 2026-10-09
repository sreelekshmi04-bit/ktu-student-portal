function toggleMenu() {
    document.getElementById("sidebar").classList.toggle("open");
}

function searchSite() {
    const input = document.getElementById("searchInput");
    const message = document.getElementById("searchMessage");
    const query = input.value.trim().toLowerCase();

    if (query === "") {
        message.textContent = "Please enter something to search.";
        return;
    }

    if (query.includes("exam") || query.includes("timetable")) {
        window.location.href = "exam.html";
    } else if (query.includes("result") || query.includes("grade")) {
        window.location.href = "results.html";
    } else if (query.includes("calendar")) {
        document.getElementById("calendar").scrollIntoView({
            behavior: "smooth"
        });
    } else {
        message.textContent =
            "No matching section found. Try searching for exams, results or calendar.";
    }
}

document.getElementById("searchInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchSite();
    }
});

function filterExams() {
    const query = document.getElementById("examSearch").value.toLowerCase().trim();
    const programme = document.getElementById("programme").value;
    const semester = document.getElementById("semester").value;
    const items = document.querySelectorAll(".exam-item");
    let count = 0;

    items.forEach(function(item) {
        const text = item.textContent.toLowerCase();
        const program = item.dataset.programme;
        const sem = item.dataset.semester;

        const matchesSearch = text.includes(query);
        const matchesProgramme = programme === "all" ||
            program === "all" || program === programme;
        const matchesSemester = semester === "all" ||
            sem === "all" || sem === semester;

        if (matchesSearch && matchesProgramme && matchesSemester) {
            item.style.display = "flex";
            count++;
        } else {
            item.style.display = "none";
        }
    });

    document.getElementById("examMessage").textContent =
        count === 0 ? "No matching sample entries found." : "";
}

document.getElementById("examSearch").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        filterExams();
    }
});

document.getElementById("programme").addEventListener("change", filterExams);
document.getElementById("semester").addEventListener("change", filterExams);

function showResults() {
    const programme = document.getElementById("resultProgramme").value;
    const semester = document.getElementById("resultSemester").value;
    const message = document.getElementById("resultMessage");

    if (programme === "cse" && semester === "2") {
        document.getElementById("sgpa").textContent = "8.90";
        document.getElementById("cgpa").textContent = "9.13";
        message.textContent =
            "Showing sample Semester 2 results for Computer Science.";
    } else {
        document.getElementById("sgpa").textContent = "—";
        document.getElementById("cgpa").textContent = "—";
        message.textContent =
            "No sample results are available for this selection.";
    }
}

function downloadResults() {
    const table = document.getElementById("marksTable");
    let csv = "Subject,Marks,Grade,Status\n";

    Array.from(table.rows).forEach(function(row) {
        const values = Array.from(row.cells).map(function(cell) {
            return '"' + cell.textContent.trim().replace(/"/g, '""') + '"';
        });
        csv += values.join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "sample-ktu-results.csv";
    link.click();

    URL.revokeObjectURL(url);
}
