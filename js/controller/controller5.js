let carts = document.querySelectorAll('.add-2-cart');

let products = [
	{
		name:'Jojo Bizarre Adventure Poster',
		tag:'Item-7-jojoposter',
		price:500,
		inCart:0
	},
	{
		name:'Seven Deadly Sins Poster',
		tag:'Item-8-7dsposter',
		price:400,
		inCart:0
	}

]

for(let i=0; i < carts.length; i++){
	carts[i].addEventListener('click', () => {
		cartNumbers(products[i]);
		totalCost(products[i]);

	})
}

function onLoadCartNumbers(){
	let productNumbers = localStorage.getItem('cartNumbers');

	if(productNumbers){
		document.querySelector('.cart span').textContent = productNumbers;
	}
}

function cartNumbers(product){
	let productNumbers = localStorage.getItem('cartNumbers');
	productNumbers = parseInt(productNumbers);

	if(productNumbers){
		localStorage.setItem('cartNumbers', productNumbers + 1);
		document.querySelector('.cart span').textContent = productNumbers + 1;
	}
	else{
		localStorage.setItem('cartNumbers', 1);
		document.querySelector('.cart span').textContent = 1;
	}

	setItem(product);
	

}

function setItem(product){
	let cartItems = localStorage.getItem('productsInCart');
	cartItems = JSON.parse(cartItems);

	if(cartItems != null){

		if(cartItems[product.tag] == undefined){
			cartItems = {
				...cartItems,
				[product.tag]: product
			}
		}
		cartItems[product.tag].inCart += 1;
	}
	else{
		product.inCart = 1;
		cartItems = {
			[product.tag]: product

		}

	
	}
		localStorage.setItem("productsInCart", JSON.stringify
			(cartItems));
}

function totalCost(product){
	let cartCost = localStorage.getItem('totalCost');
	
	if(cartCost != null){
		cartCost = parseInt(cartCost);
		localStorage.setItem("totalCost", cartCost + product.price);
	}
	else{
		localStorage.setItem("totalCost", product.price);
	}

	

}

function displayCart(){
	let cartItems = localStorage.getItem("productsInCart");
	cartItems = JSON.parse(cartItems);
	let productContainer = document.querySelector
	(".products");
	let cartCost = localStorage.getItem('totalCost');

	if( cartItems && productContainer ){
		productContainer.innerHTML = '';
		Object.values(cartItems).map(item => {
			productContainer.innerHTML += `
			<div class="product">
				<ion-icon name="close-circle-outline" style="margin-top: 12%";></ion-icon>
					<img src="./images/${item.tag}.jpg">
						<span>${item.name}</span>
			</div>

			
			<div class="price">${item.price}</div>

			<div class="quantity">
				<ion-icon name="arrow-dropleft-circle"></ion-icon>
				<span>${item.inCart}</span>
				<ion-icon name="arrow-dropright-circle"></ion-icon>
			</div>
			<div class="total"><div>${item.inCart * item.price}</div>
			</div>
			`;
		});

		productContainer.innerHTML += `
		<div class="basketTotalContainer">
		<h4 class="TotalTitle">
			Total: 
		</h4>
		<h4 class="basketTotal">
			${cartCost}
			</h4>
		`

	}
}



onLoadCartNumbers();
displayCart();