

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


document.querySelector('.add-student').addEventListener('click', () => {
	document.querySelector('.modal').classList.add('show');
});
document.querySelector('.aaaa').addEventListener('click', () => {
	document.querySelector('.modal').classList.remove('show');
});






function clear(){
	let photo = document.getElementsByClassName('forfilter');
	let i = 0;
	while (i < photo.length){
		photo[i].classList.add('forfilter_none');
		i++;
	}
	let type = document.getElementsByClassName('filter__type');
	let a = 0;
	while(a < type.length){
		type[a].classList.remove('filter__type_active');
		a++;
	}
}
function filter0(){
	let photo = document.getElementsByClassName('forfilter');
	clear();
  for( let i = 0; i < photo.length; i++){
    photo[i].classList.remove('forfilter_none');
  }
	document.getElementsByClassName('text-all')[0].classList.add('filter__type_active');
}
function filter1(){
	let photo = document.getElementsByClassName('forfilter');
	clear();
  for( let i = 0; i < photo.length; i++){
    if(document.querySelectorAll('.statuss')[i].innerText == "Учень" ) {
      photo[i].classList.remove('forfilter_none');
    }
  }
	document.getElementsByClassName('text-alizarin')[0].classList.add('filter__type_active');
}
function filter2(){
	let photo = document.getElementsByClassName('forfilter');
	clear();
  for( let i = 0; i < photo.length; i++){
    if(document.querySelectorAll('.statuss')[i].innerText == "Тато учня" ) {
      photo[i].classList.remove('forfilter_none');
    }
    if(document.querySelectorAll('.statuss')[i].innerText == "Мама учня" ) {
      photo[i].classList.remove('forfilter_none');
    }
  }
	document.getElementsByClassName('text-wisteria')[0].classList.add('filter__type_active');
}
function filter3(){
	let photo = document.getElementsByClassName('forfilter');
	clear();
  for( let i = 0; i < photo.length; i++){
    if(document.querySelectorAll('.statuss')[i].innerText == "Випускник" ) {
      photo[i].classList.remove('forfilter_none');
    }
  }
	document.getElementsByClassName('text-emerland')[0].classList.add('filter__type_active');
}














async function main(){

  let comment = await fetch('/api/newcomm')
    .then(response => response.json());

  let main = document.querySelector('.block-cover')

  for (let i = comment.length - 1; i>= 0; i--){
    main.insertAdjacentHTML('afterBegin', `
          <div class="box item forfilter">
            <div class="col-auto-other">
						  <div class="ava">
                <img class="logoava" src="img/logo.png">
              </div>
						  <div class="name">${comment[i].name} ${comment[i].surname}</div>
						  <div class="statuss">${comment[i].whou}</div>
              <img class="ssstars" src="img/ssstars.png">
            </div>
						<div class="commentt">${comment[i].comment}</div>
					</div>
    ` )
  }
}
main()

document.querySelector('.add-student1').addEventListener('click', async function() {
	
  let comment = await fetch('/api/newcomm')
    .then(response => response.json());

  let main = document.querySelector('.block-cover')

  for (let i = comment.length - 1; i>= 0; i--){
    main.insertAdjacentHTML('afterBegin', `
          <div class="box item forfilter">
            <div class="col-auto-other">
						  <div class="ava">
                <img class="logoava" src="img/logo.png">
              </div>
						  <div class="name">${comment[i].name} ${comment[i].surname}</div>
						  <div class="statuss">${comment[i].whou}</div>
              <img class="ssstars" src="img/ssstars.png">
            </div>
						<div class="commentt">${comment[i].comment}</div>
					</div>
    ` )
  }
  
});