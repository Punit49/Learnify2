const learningsSection = document.querySelector("learnings-section");

const showPurchasedCourses = () => {
    const purchasedCourse = JSON.parse(sessionStorage.getItem("purchasedCourse"));
    console.log(purchasedCourse);
};

if(learningsSection){
    showPurchasedCourses();
};