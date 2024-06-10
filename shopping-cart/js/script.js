let products = [
    {title:"آیفون ۱۲ پرومکس", price: "40000000", count:1 , src:"./images/iphone1.jpg"},
    {title: "قاب آیفون ۱۳", price: "500000", count:1 , src:"./images/phoneGuard1.jpg"},
];

    // Creating & Appending products

        products.forEach((item) => {

            let productRow = document.createElement("div");
            productRow.classList.add('row','justify-content-center', 'mb-3', 'mt-3', 'product-row')
            let colRow1 = document.createElement("div");
            colRow1.classList.add('col-1','d-flex','justify-content-center','align-items-center')
            let colIcon1 = document.createElement("i");
            colIcon1.classList.add('fa-solid', 'fa-xmark', 'deleteIcon')
            colRow1.appendChild(colIcon1)
            productRow.appendChild(colRow1)
            document.getElementsByClassName("productsContainer")[0].appendChild(productRow)
    
            colIcon1.addEventListener("click",(deleteItems));
    
            let colRow2 = document.createElement("div");
            colRow2.classList.add('col-2','d-flex', 'justify-content-center')
            let imgWrapper = document.createElement("div");
            imgWrapper.className = "img-wrapper";
            let image = document.createElement("img");
            image.src = `${item.src}`;
            imgWrapper.appendChild(image)
            colRow2.appendChild(imgWrapper)
            productRow.appendChild(colRow2)
    
            let colRow3 = document.createElement("div");
            colRow3.classList.add('col-2', 'd-flex', 'justify-content-start', 'align-items-center')
            let productNameWrapper = document.createElement("div");
            productNameWrapper.className = "product-name";
            let h6Name = document.createElement("h6");
            h6Name.className = "mb-4";
            h6Name.innerText = `${item.title}`;
            let spanPrice = document.createElement("span");
            spanPrice.innerText = `${item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}  تومان`;
            productNameWrapper.appendChild(h6Name)
            productNameWrapper.appendChild(spanPrice)
            colRow3.appendChild(productNameWrapper)
            productRow.appendChild(colRow3)
    
            let colRow4 = document.createElement("div");
            colRow4.classList.add('col-5', 'd-flex', 'justify-content-around', 'align-items-center', 'countOfProducts')
            let counterWrapper =  document.createElement("div");
            counterWrapper.className = "counter";
            let caretUp = document.createElement("i");
            caretUp.classList.add('fa-solid', 'fa-caret-up')
            let count = document.createElement("h5");
            count.className = "numberOfProducts";
            count.innerText = `${item.count}`;
            let caretDown = document.createElement("i");
            caretDown.classList.add('fa-solid', 'fa-caret-down')
            let mainPriceWrapper = document.createElement("div");
            mainPriceWrapper.classList.add( 'd-flex', 'flex-row', 'justify-content-between')
            let mainPrice = document.createElement("p");
            mainPrice.className = "mainPrice";
            mainPrice.innerText = `${parseInt(item.price) * item.count}`;
            let toman = document.createElement("p");
            toman.innerText = "تومان";
            toman.classList.add('mb-0', 'me-2')
            counterWrapper.appendChild(caretUp)
            counterWrapper.appendChild(count)
            counterWrapper.appendChild(caretDown)
            colRow4.appendChild(counterWrapper)
            mainPriceWrapper.appendChild(mainPrice)
            mainPriceWrapper.appendChild(toman)
            colRow4.appendChild(mainPriceWrapper)
            productRow.appendChild(colRow4)
            
            let lineDiv = document.createElement("div");
            lineDiv.className = "hrLine";
            productRow.appendChild(lineDiv)
    
            document.querySelector(".btn").addEventListener("click",(deleteButton))
        });
    
    // delete items by delete icon
    function deleteItems(e) {
        let index = e.target
        index.parentElement.parentElement.remove();
        myFunction();
        if (document.getElementsByClassName('deleteIcon').length === 0) {
            var messageText = document.createElement('p');
            messageText.className = "emptyCartText";
            messageText.innerText = 'کالایی در سبد خرید شما موجود نمی‌باشد.';
            document.body.appendChild(messageText);
            document.querySelector(".btn").remove();
            document.querySelector(".sumOfPrices").remove();
        }
    }

    // deleting items with delete button
    function deleteButton() {
        products = [];
        document.querySelector(".productsContainer").remove();
        document.querySelector(".sumOfPrices").remove();
        document.querySelector(".deleteButtonLine").remove();

        let messageText = document.createElement('p');
        messageText.className = "emptyCartText";
        messageText.innerText = 'کالایی در سبد خرید شما موجود نمی‌باشد.';
        document.body.appendChild(messageText);

        updateProductsLength();
    }
    document.querySelector(".btn").addEventListener("click",()=>{
        if(products.length === 0){
            let cartIcon = document.querySelector(".numWrapper span");
            cartIcon.innerText = products.length;
        }
    });

    // the number of the shopping cart on top
    let shoppingCart = document.querySelector(".numWrapper span");
    shoppingCart.innerText = products.length;
    function deleteItems(index){
        let productRows = document.querySelectorAll(".product-row")
        products.splice(index,1)
        let content = document.querySelector(".product-row").remove();
        updateProductsLength();
        if(products.length === 0){
            let messageText = document.createElement('p');
            messageText.className = "emptyCartText";
            messageText.innerText = 'کالایی در سبد خرید شما موجود نمی‌باشد.';
            document.body.appendChild(messageText);
            document.querySelector(".sumOfPrices").remove();
            document.querySelector(".deleteButtonLine").remove();

        }
        if(products.length == 1 && (productRows.length - 1) == 1){
            let shoppingCart = document.querySelector(".numWrapper span");
            shoppingCart.innerText = products.length;
        }
        else{
            let shoppingCart = document.querySelector(".numWrapper span");
            shoppingCart.innerText = products.length
        }
    }
        function updateProductsLength(){
            return products.length;
        }

    // decrease & increase the count
    let countElements = document.querySelectorAll('.countOfProducts');
    
    countElements.forEach(function (countElement, index) {
        let decreaseElement = countElement.querySelector('.fa-caret-down');
        let increaseElement = countElement.querySelector('.fa-caret-up');
        let valueElement = countElement.querySelector('.numberOfProducts');
        let totalElement = countElement.querySelector('.mainPrice');
    
     decreaseElement.addEventListener('click', function () {
            decreaseValue(index, valueElement);
            updateTotal(index, valueElement, totalElement);
            updateSumOFTotalPrice();
        });
    increaseElement.addEventListener('click', function () {
            increaseValue(index, valueElement);
            updateTotal(index, valueElement, totalElement);
            updateSumOFTotalPrice();
        });
        updateTotal(index, valueElement, totalElement, updateSumOFTotalPrice() );
    });
    function decreaseValue(index, valueElement) {
         if (products[index].count > 1) {
             products[index].count--;
             valueElement.innerText = products[index].count;
        }
    }
    function increaseValue(index, valueElement) {
       if (products[index].count < 9) {
            products[index].count++;
            valueElement.innerText = products[index].count;
       }
    }
    function updateTotal(index , valueOfElement ,totalAmount){
        let totalPrice = products[index].price * products[index].count;
        totalAmount.innerText = totalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    // update the total price
    function updateSumOFTotalPrice() {
        let sumTotalPrice = 0;
        let totalPriceSumNumber = document.querySelector(".sumOfOrders h6");
        products.forEach(function(product) {
            sumTotalPrice =  sumTotalPrice + parseInt(product.price) * product.count;
        });
        totalPriceSumNumber.innerText = sumTotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + '  تومان' 
    }


    // dark mode and saving it to local storage
    let switchIcons = document.querySelector(".fa-moon");
    function darkMode() {
        document.body.classList.toggle("darkMode");
        
        if(document.body.classList.contains("darkMode")) {
            switchIcons.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('darkTheme', 'enabled');
        } else {
            switchIcons.classList.add('fas', 'fa-moon');
            localStorage.setItem('darkTheme', 'disabled');
        }
    }
    if(localStorage.getItem('darkTheme') === 'enabled') {
        document.body.classList.add("darkMode");
        switchIcons.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.remove("darkMode");
        switchIcons.classList.add('fas', 'fa-moon');
    }
    