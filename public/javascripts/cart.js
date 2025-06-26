const cartContainer = document.querySelector(".cart-container");
const carSectionLeft  = document.querySelector(".cart-section-left");
const cartCountTop = document.querySelector(".cart-count-top");
let totalPriceBox = document.querySelector(".total-price");
const cartRightSection = document.querySelector(".cart-section-right");

const showcartData = () => {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    let cartCount = cart.length;

    if(cart && cartCount > 0){
        let totalPrice = 0;
        cartRightSection.style.display = "block";

        let cartCourseCount = document.createElement("p");
        let cartN = cartCount > 1? "Courses" : "Course";

        cartCourseCount.innerHTML = `${cartCount} ${cartN} in Cart`
        cartCountTop.appendChild(cartCourseCount);

        cart.forEach(course => {
            console.log(course)

            let courseCard = document.createElement("div");
            courseCard.classList.add("course-cart-cards");
            courseCard.innerHTML =  `
                    <div class="cart-image">
                        <img src="${course.image}" alt="Course Image">
                    </div>
                    <div class="cart-course-content">
                        <div class="cart-main-content"> 
                            <div class="cart-course-title">
                                ${course.title}
                            </div>
                            <div class="cart-course-instructor">
                                <p>By: ${course.instructor} </p>
                                <div class="detail-tags">
                                    <span>${course.tag}</span>
                                    <span>Premium</span>
                                </div>
                            </div>
                            
                            <div class="cart-course-price">
                                &#8377;${course.price}
                            </div>
                            <div class="cart-course-features">
                                <span>${course.courseDuration}</span>
                                <span><i class="ri-download-2-fill"></i> Downloadable</span>
                                <span>${course.level}</span>
                            </div>
                        </div>
                        <div class="removeBtn">
                            <i class="fa-solid fa-trash"></i>
                        </div>
                    </div>
            `

            totalPrice += Number(course.price);
            console.log(totalPrice);
            carSectionLeft.appendChild(courseCard);

            let removeCourseCart = courseCard.querySelector(".removeBtn");
            removeCourseCart.addEventListener("click", (e) => {
                removeFromCart(course);
            });

        });
        totalPriceBox.innerText = totalPrice;
        return true;
    }
    
    cartRightSection.style.display = "none";
    cartContainer.innerHTML += `
        <div class="cartEmpty">
            <p>Your Cart Is empty</p>
            <a href="/courses">Explore Courses <i class="ri-graduation-cap-line"></i> -></a>
        </div>
    `
}

if(cartContainer){
    showcartData();
}

const removeFromCart = (course) => {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];

    if(cart){
        cart = cart.filter(item => item.id !== course.id);
        sessionStorage.setItem("cart", JSON.stringify(cart));
        location.reload(true);
    }
    
    updateCartCount();
}