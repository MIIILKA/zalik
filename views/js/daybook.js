async function main() {
    let users = await fetch("/api/journal/2018-2/users")
        .then(response => response.json());

    let lessons = await fetch("/api/journal/2018-2/lessons")
        .then(response => response.json());

    let tbody = document.querySelector(".tbody");
    let thead = document.querySelector(".thead");

    let today = new Date();
    let currentMonth = today.getMonth();

    let monthes = [
        'Січень'
    ];

    for (let i = users.length - 1; i>= 0; i--) {
        console.log(i);

        let marks = users[i].marks[monthes[currentMonth]]
        let markDays = Object.keys(marks)

        let marksHTML = "";

        for (let j = 0; i < 9; j++) {
            let userMarks = marks[marksDays[j]];

            if (userMarks) {
                marksHTML +=`
                <div class="cell">
                    <input type="text" class="mark mark-class_work" value="${userMarks[0]}">
                    <input type="text" class="mark mark-home_work" value="${userMarks[1]}">
                </div>
                `
            } else{
                marksHTML += `
                <div class="cell">
                    <input type="text" class="mark mark-class_work">
                    <input type="text" class="mark mark-home_work"">
                </div>
                `
            }
        }

        tbody.insertAdjacentHTML('afterBegin' , `
        <div class="row">
            <div class="title">${users[i].first_name}  ${users[i].second_name} </div>
            ${marksHTML}

        </div>
        `);
    }
}
main();
