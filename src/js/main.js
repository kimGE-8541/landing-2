const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");
const closeBtn = document.querySelector("#closeBtn");
const overlay = document.querySelector("#overlay");

menuBtn.addEventListener("click", () => {
    mobileMenu.classList.remove("translate-x-full");
    menuBtn.classList.add("hidden");
    closeBtn.classList.remove("hidden");
    overlay.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
    mobileMenu.classList.add("translate-x-full");
    menuBtn.classList.remove("hidden");
    closeBtn.classList.add("hidden");
    overlay.classList.add("hidden");
});




const header = document.getElementById("header");

function updateHeader() {

    // 1024px 이하에서는 항상 흰색
    if (window.innerWidth <= 768) {
        header.classList.add("bg-white");
        header.classList.add("shadow-sm");
        header.classList.remove("bg-transparent");
        return;
    }

    // PC에서는 스크롤에 따라 변경
    if (window.scrollY > 200) {
        header.classList.add("bg-white");
        header.classList.add("shadow-sm");
        header.classList.remove("bg-transparent");
    } else {
        header.classList.add("bg-transparent");
        header.classList.remove("bg-white");
        header.classList.remove("shadow-sm");
    }
}

// 스크롤 시 실행
window.addEventListener("scroll", updateHeader);

// 화면 크기 변경 시 실행
window.addEventListener("resize", updateHeader);

// 페이지가 처음 열릴 때도 실행
updateHeader();


const program = document.querySelector(".accodian");

const items = document.querySelectorAll(".item");
const images = document.querySelectorAll(".program-img");

let current = 0;
let timer;

// 하나 열기
function openItem(index) {

    items.forEach((item, i) => {

        item.classList.remove("active");

        item.querySelector(".answer").style.maxHeight = null;

        if (i === index) {

            item.classList.add("active");

            const answer = item.querySelector(".answer");

            answer.style.maxHeight = answer.scrollHeight + "px";

        }

    });

    images.forEach(image => {
        image.classList.remove("active");
    });

    images[index].classList.add("active");

    current = index;

}

// 자동재생
function startAutoPlay() {

    timer = setInterval(() => {

        let next = current + 1;

        if (next >= items.length) {

            next = 0;

        }

        openItem(next);

    }, 3000);

}

// 자동재생 다시 시작
function restartAutoPlay() {

    clearInterval(timer);

    startAutoPlay();

}

// 클릭
items.forEach((item, index) => {

    item.querySelector(".question").addEventListener("click", () => {

        openItem(index);

        restartAutoPlay();

    });

});

// 마우스 올리면 정지
program.addEventListener("mouseenter", () => {

    clearInterval(timer);

});

// 마우스 나가면 다시 시작
program.addEventListener("mouseleave", () => {

    startAutoPlay();

});

// 시작
openItem(0);

startAutoPlay();


const swiper = new Swiper('.swiper', {
    slidesPerView: 3,
    spaceBetween: 24,
    slidesPerGroup: 3,
    grabCursor: true,
    loop: true,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    autoplay: true,
    breakpoints: {

        // 0 ~ 767px
        0: {
            slidesPerView: 1.5,
            slidesPerGroup: 1,
            spaceBetween: 16,
            centeredSlides: true
        },

        // 768px 이상
        768: {
            slidesPerView: 3,
            spaceBetween: 24,
        },
    }
});

const phone = document.getElementById("phone");

phone.addEventListener("input", (e) => {

    let value = e.target.value.replace(/\D/g, "");

    value = value.substring(0, 11);

    if (value.length < 4) {
        e.target.value = value;
    } else if (value.length < 8) {
        e.target.value = value.replace(/(\d{3})(\d+)/, "$1-$2");

    } else {
        e.target.value = value.replace(/(\d{3})(\d{4})(\d+)/, "$1-$2-$3");
    }

});