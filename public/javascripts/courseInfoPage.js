const courseDetailPage = document.querySelector('.course-detail-container');

const displayCourseInfo = () => {
    const courseData = JSON.parse(sessionStorage.getItem("selectedCourse"));
    
    const infoPage = document.createElement('div');
    infoPage.classList.add('course-info-container');

    infoPage.innerHTML = `
                <section class="course-detail-left">
                    <div class="course-detail-left-top">
                        <span class="course-category">
                            ${courseData.category} >
                        </span>
                        <h1 class="course-Heading">
                            ${courseData.title}
                        </h1>
                        <p class="course-desc">
                            ${courseData.description}
                        </p>
                        <div class="detail-tags">
                            <span>${courseData.tag}</span>
                            <span>BestSeller</span>
                        </div>
                        <div class="course-createorLang">
                            <p>
                                <i class="ri-user-star-fill"></i>
                                <span class="course-creator">Instructor: </span>
                                ${courseData.instructor}
                            </p>
                            <p class="course-language">
                                <i class="fa-solid fa-globe"></i>
                                <span class="course-creator">Language: </span> 
                                English
                            </p>
                        </div>
                    </div>

                    <div class="floating-box">
                        <div class="float-left">
                            <i class="fa-solid fa-circle-check"></i>
                            <p>Premium</p>
                        </div>
                        <div class="float-right">
                            <p>
                                Access this course, plus 35+ more courses, with Learnify plan. 
                                <a href="/plans">See Plans & Pricing</a>
                            </p>
                            <p class="course-feature-float">
                                <i class="ri-team-fill"></i>
                                <span>Built by industry experts</span>
                            </p>
                            <p class="course-feature-float">
                                <i class="ri-smartphone-line"></i>
                                <span>Learn on your phone or tablet</span>
                            </p>
                        </div>
                    </div>

                    <div class="course-detail-left-bottom">
                        <ul class="whatLearnSection">
                            <h1>What you will Learn</h1>
                            <li>&#10004; ${courseData.what_you_will_learn[0]}</li>
                            <li>&#10004; ${courseData.what_you_will_learn[1]}</li>
                            <li>&#10004; ${courseData.what_you_will_learn[2]}</li>
                            <li>&#10004; ${courseData.what_you_will_learn[3]}</li>
                        </ul>
                        
                        <div class="course-detail-info">
                            <h1>Description</h1>
                            <p>
                                ${courseData.details}
                            </p>
                        </div>

                        <div class="course-prerequisites">
                            <h1>Prerequisites</h1>
                            <ul>
                                <li><i class="ri-verified-badge-line"></i> ${courseData.prerequisites[0]}</li>
                                <li><i class="ri-verified-badge-line"></i> ${courseData.prerequisites[1]}</li>
                                <li><i class="ri-verified-badge-line"></i> ${courseData.prerequisites[2]}</li>
                            </ul>
                        </div>

                        <div class="course-about">
                        <h1>This course includes:</h1>
                            <div class="course-content-list"> 
                                <div><i class="ri-clapperboard-ai-line"></i> ${courseData.course_duration} of content </div>
                                <div><i class="ri-code-s-slash-line"></i> Exercises </div>
                                <div><i class="ri-download-2-fill"></i> Downloadable resources</div>
                                <div><i class="ri-file-line"></i> Assignments </div>
                                <div><i class="ri-medal-line"></i> ${courseData.level}</div>
                                <div><i class="ri-user-line"></i> Instructor: ${courseData.instructor}</div>
                                <div><i class="ri-smartphone-line"></i> Mobile Support </div>
                            </div>

                        </div>
                    </div>

                    <a href="">Explore all courses -></a>
                </section>

                <section class="course-detail-right">
                    <div class="course-img-top">
                        <img src="${courseData.img}" alt="Course-Image">
                    </div>

                    <div class="course-info-bottom">
                        <p>
                            <i class="ri-shield-star-line"></i>
                            This Premium course is included in plans
                        </p>

                        <div class="course-price">
                            <div class="course-rate">
                                &#8377;${courseData.price}
                            </div>
                            <div class="course-discount">
                                34% off
                            </div>
                            <div class="course-pre-rate">
                                <del>
                                    &#8377;799
                                </del>
                            </div>
                        </div>

                        <span class="course-price-left">
                            <i class="ri-alarm-line"></i> 
                            <span>Few hours left at this price!</span>
                        </span>

                        <div class="course-btn-box">
                            <div class="wishOrCartBtns">
                                <div class="course-info-cart-btn">
                                    <a href="" id="cartToggleBtn">Add to cart</a>
                                </div>
                                <div class="course-info-wish-btn">
                                    <a href="/wishlist">
                                        <i class="ri-heart-line"></i>
                                    </a>
                                </div>
                            </div>

                            <div>
                                <a class="course-info-buy-now" href="">Buy Now</a>
                            </div>
                        </div>

                        <p class="course-access-time">
                            Full Lifetime Access
                        </p>

                        <hr>
                       
                        <div class="subscribeMore">
                            <h3>Subscribe to Learnify’s top courses</h3>

                            <p>Get this course, plus 35+ of our top-rated courses, with Individual Plan. 
                                <a href="/plans">Learn more</a>
                            </p>

                            <div class="subscribe-more-btn">
                                <a href="/plans">Start Subscription</a>
                            </div>

                            <span>Starting at ₹99 per month</span>
                        </div>



                    </div>
                </section>
    `
    courseDetailPage.appendChild(infoPage);
    
    const cartBtn = infoPage.querySelector('#cartToggleBtn');

    if (cartBtn) {
        cartBtn.addEventListener("click", (e) => {
            let exists = itemExistsOrNot(courseData);
            if(!exists){
                e.preventDefault();
            }
            
            const added = addToCartFunction(courseData); 
            if (added) {
                updateCartCount();
                cartBtn.innerText = "Go to Cart";
                cartBtn.href = "/cart";
            }
        });
        
        let existsCart = itemExistsOrNot(courseData);
        if (existsCart) {
            cartBtn.innerText = "Go to Cart";
            cartBtn.href = "/cart";
        }
    } 
};

const isPurchaseExists = (courseData) => {
    let purchasedCourse = JSON.parse(sessionStorage.getItem("purchasedCourse")) || [];
    return exists = purchasedCourse.find(item => item.id === courseData.id);
};  

const itemExistsOrNot = (courseData) => {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    return exists = cart.find(item => item.id === courseData.id);
}

const addToCartFunction = (course, e) => {
    let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    
    const existingCourse = cart.find(item => item.id === course.id);
    
    if(existingCourse){
        return false;
    }
    else{
        cart.push({
            id: course.id,
            title: course.title,
            price: course.price,
            image: course.img,
            instructor: course.instructor,
            tag: course.tag,
            level: course.level,
            courseDuration: course.course_duration
        });
    };
    
    sessionStorage.setItem("cart", JSON.stringify(cart));
    return true;
};

if(courseDetailPage){
    // sessionStorage.removeItem("cart");
    displayCourseInfo();
}

