let tbody = document.querySelector('.tbody');
const addEventListeners = (element, events, handler) => {
	events.forEach(e => element.addEventListener(e, handler, true));
}
addEventListeners(tbody, ['focus', 'blur'], (event) => {
	let {target, type} = event;
	if (target.classList.contains('mark')) {
		let parent = target.parentElement.parentElement;
		if (type === 'focus') {
			parent.classList.add('focus');
		} else {
			parent.classList.remove('focus');
		}
	}
});


document.querySelector('.add-student').addEventListener('click', (event) => {
  event.preventDefault();
	document.querySelector('.modal').classList.add('show');
});

document.querySelector('.add-student').addEventListener('click', () => {
	document.querySelector('#new_user').classList.add('show');
});

document.querySelector('.aaaa').addEventListener('click', () => {
	document.querySelector('.modal').classList.remove('show');
  
});

document.querySelector('.aaaa').addEventListener('click', () => {
	document.querySelector('#new_user').classList.remove('show');
});



async function main(){
  let group = window.location.pathname;

  let users = await fetch(`/api${group}/users`).then(response => response.json());

  let lessons = await fetch(`/api${group}/lessons`).then(response => response.json());

  let tbody = document.querySelector('.tbody');
  let thead = document.querySelector('.thead');

  let today = new Date();
  let currentMonth = today.getMonth();
  let monthes = [
    'Січень',
    'Лютий',
    'Березень',
    'Квітень',
    'Травень',
    'Червень',
    'Липень',
    'Серпень',
    'Вересень',
    'Жовтень',
    'Листопад',
    'Грудень'
  ];

  for (let i = users.length - 1; i >= 0; i--){
    
    console.log(users[i])
    
    let marks = users[i].marks[monthes[currentMonth]];

    
    let marksDays = Object.keys(marks);

    let marksHTML = '';

    for (let j = 0; j < 9; j++){
      let userMarks = marks[marksDays[j]];
      
      if (userMarks) {
        marksHTML += `
        <div class="cell">
          <input type="text" name="${marksDays[j]}" class="mark mark-class_work" value="${userMarks[0]}">
          <input type="text" name="${marksDays[j]}" class="mark mark-home_work" value="${userMarks[1]}">
        </div>
        `
      } else {
        marksHTML += `
        <div class="cell">
          <input type="text" class="mark mark-class_work">
          <input type="text" class="mark mark-home_work">
        </div>
        `
      }
    }

    tbody.insertAdjacentHTML('afterBegin', `
      <div class="row">
        <div class="title">${users[i].first_name} ${users[i].second_name}</div>
        ${marksHTML}
      </div>
    `);
  }
};
main();

