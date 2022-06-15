let basket = document.querySelector(".basket");
let basket__button = document.querySelector(".basket-button");
let basket__items = document.querySelector(".basket .basket-items");

function get__total() {
	let total = 0;
	let basket__item = document.querySelectorAll(".basket .basket-item");
	let order__total = document.querySelector(".basket .basket-order-total");
	for (let item of basket__item) {
		let price__elem = item.querySelector(".total");
		let price = +price__elem.innerText.replace(" грн.", "").replaceAll(" ", "");
		total += price;
	}
	order__total.innerText = total + " грн.";
}
function get__basketNotify() {
	let basket__item = document.querySelectorAll(".basket .basket-item");
	let basketNotify = document.querySelector(".basket-notify");
	basketNotify.innerText = basket__item.length;
}
function buyItem(number) {
	let item = document.querySelector(".item-" + number);
	let price = item.querySelector(".price").innerText;
	let title = item.querySelector(".title").innerText;
	let image = item.querySelector(".image").getAttribute("src");
	basket__items.innerHTML += `
		<div class="basket-item">
			<div class="basket-description">
				<img class="basket-image" src="${image}">
				<div class="basket-title">
					<h3 class="basket-name">${title}</h3>
					<p class="basket-price">${price}</p>
				</div>
			</div>
			<div class="filter">
				<button class="filter-button filter-minus">–</button>
				<input class="filter-input" type="text" value="1" disabled>
				<button class="filter-button filter-plus">+</button>
			</div>
			<p class="total">${price}</p>
		</div>`;
	get__basketNotify();
}

basket.onclick = (event) => {
	let target = event.target;
	if (target.classList.contains("filter-button")) {
		let item = target.parentNode.parentNode;
		let action = target.classList.contains("filter-minus") ? -1 : 1;
		let price__elem = item.querySelector(".basket-price");
		let price = +price__elem.innerText.replace(" грн.", "").replaceAll(" ", "");
		let total = item.querySelector(".total");
		let number = item.querySelector(".filter-input");
		number.value = +number.value + action;
		total.innerText = price * number.value + " грн.";
		get__total();
	}
	if (target.classList.contains("close")) {
		basket.classList.remove("show");
	}
	if (target.classList.contains("basket-order-buy")) {
		alert("Замовлення успішно створено");
	}
	if (target.classList.contains("basket-order-clear")) {
		basket__items.innerHTML = null;
		get__basketNotify();
		get__total();
	}
};
basket__button.onclick = () => {
	basket.classList.toggle("show");
	get__total();
};


