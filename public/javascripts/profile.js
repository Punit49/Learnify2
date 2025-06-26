const profileSections = document.querySelectorAll('.profileSections');
const profileTags = document.querySelectorAll(".profileTags");

profileTags.forEach((tag) => {

    // Handling Side profile tags
    tag.addEventListener('click', (e) => {
        profileTags.forEach((tag) => {
            if(tag.classList.contains('profileActive')){
                tag.classList.remove('profileActive');
            }
        });
        tag.classList.add('profileActive');

        // Handling profile content section
        profileSections.forEach((section) => {
            if(section.classList.contains("activeSection")){
                section.classList.remove("activeSection");
            }
        });

        if(tag.classList.contains('editProfileTag')){
            let profileActive = document.querySelector('.editProfileSection');
            profileActive.classList.add('activeSection');
        };

        if(tag.classList.contains('subscriptionProTag')){
            let profileActive = document.querySelector('.subscriptionProSec');
            profileActive.classList.add('activeSection');
        };

        if(tag.classList.contains('wishlistProTag')){
            let profileActive = document.querySelector('.wishlistProfile');
            profileActive.classList.add('activeSection');
        };

        if(tag.classList.contains('cartProTag')){
            let profileActive = document.querySelector('.cartProfile');
            profileActive.classList.add('activeSection');
        };

        if(tag.classList.contains('courseProTag')){
            let profileActive = document.querySelector('.courseProfile');
            profileActive.classList.add('activeSection');
        };

        if(tag.classList.contains('faqProTag')){
            let profileActive = document.querySelector('.faqProfile');
            profileActive.classList.add('activeSection');
        };

        if(tag.classList.contains('abtProTag')){
            let profileActive = document.querySelector('.aboutUsProfile');
            profileActive.classList.add('activeSection');
        };
    });
});