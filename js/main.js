/* ---- 공통 시작 ----- */

//마우스 애니메이션
var cursor = document.querySelector(".cursor");
var cursorScale = document.querySelectorAll(".cursor-scale");
var mouseX = 0;
var mouseY = 0;

gsap.to({}, 0.016, {
    repeat: -1,
    onRepeat: function () {
        gsap.set(cursor, {
            css: {
                left: mouseX,
                top: mouseY,
            },
        });
    },
});

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

cursorScale.forEach((link) => {
    link.addEventListener("mousemove", (e) => {
        cursor.classList.add("grow");
        if (link.classList.contains("small")) {
            cursor.classList.remove("grow");
            cursor.classList.add("grow-small");
        }
        if (link.classList.contains("modalWrap")) {
            if (e.target != document.querySelector(".modalWrap") && document.querySelector(".modalWrap").classList.contains("on")) {
                document.querySelector(".modalBox").classList.add("defaultCursor");
                cursor.style.display = "none";
            } else {
                document.querySelector(".modalBox").classList.remove("defaultCursor");
                cursor.style.display = "block";
            }
            cursor.classList.remove("grow");
            document.documentElement.style.cursor = "block";
        } else {
            cursor.style.display = "block";
            document.documentElement.style.cursor = "none";
        }
    });

    link.addEventListener("mouseleave", () => {
        cursor.classList.remove("grow");
        cursor.classList.remove("grow-small");
    });
});

//전체메뉴
function allMenu() {
    $(".allMenu").toggleClass("on");
}

/* ----- 공통 끝 ----- */

/* -----intro 시작 ----- */

//메인 타이틀 애니메이션
function text_ani() {
    var a = $(".line > span"),
        delayTime = 500;

    var func = function (i) {
        setTimeout(function () {
            var ai = $(a[i]);
            ai.addClass("on");
        }, delayTime);
    };

    for (var i = 0; i < a.length; i++) {
        func(i);
        delayTime += 30;
    }

    setTimeout(function () {
        $(".main_title").addClass("ani_end");
        $(".anchor, .scrollbtn").addClass("on");
    }, delayTime);
}
text_ani();

//anchor 페이지 이동 스크립트
$(".anchor li a, .scrollbtn, .allRight nav a").on("click", function (e) {
    e.preventDefault();
    var id = $(this).attr("href");
    var $id = $(id).offset().top;
    var headerH = $("header").height();
    $("html,body")
        .stop()
        .animate(
            {
                scrollTop: $id - headerH,
            },
            800
        );
});

/* -----intro 끝 ----- */

/* ----- project 시작 ----- */

//projects 슬라이드
var mySwiper = new Swiper(".swiper-container", {
    slidesPerView: "auto",
    speed: 1000,
    centeredSlides: true,
    loop: true,
    loopAdditionalSlides: 1,
});

//변수 초기화
var sh;
var ch;

//project 모달창
$("#projects .swiper-slide a").on("click", function (e) {
    e.preventDefault();
    //swiper 슬라이드가 loop 속성을 가지고 있으므로 realIndex 속성을 이용해 실제 index 값을 구한다.
    var idx = mySwiper.realIndex;

    $.ajax({
        url: "../lib/projects.json",
        dattype: "json",
        success: function (data) {
            if (data.length > 0) {
                var $status = data[idx].status;
                var $name = data[idx].name;
                var $thumbnail = data[idx].thumbnail;
                var $intro = data[idx].intro;
                var $period = data[idx].period;
                var $description = data[idx].description;
                var $description2 = data[idx].description2;
                var $description3 = data[idx].description3;
                var $link = data[idx].link;

                $(".projectStatus").text($status);
                $(".projectName").text($name);
                $(".projectIntro").text($intro);
                $(".projectPeriod").text($period);
                $(".projectDes").append($("<li/>").text($description), $("<li/>").text($description2), $("<li/>").text($description3));
                $(".projectLink").attr("href", $link);
                $(".modalImg img").attr("src", $thumbnail);
                $(".modalWrap").addClass("on");
            }
        },
    });
});

//모바일 헤더 스크립트
$(window).on("load, resize", function () {
    if (document.clientWidth >= 768) {
    }
});
//modalImg 높이값이 변함에 따라 $(document).on 메서드를 이용하여 mouseenter 기준으로 높이값을 변수에 저장
$(document).on("mouseenter", ".modalImg", function () {
    if (window.innerWidth < 768) {
        return;
    }
    sh = document.querySelector(".modalImg").scrollHeight;
    ch = document.querySelector(".modalImg").clientHeight;
    $(".modalImg")
        .stop()
        .animate(
            {
                scrollTop: sh - ch,
            },
            1600
        );
});

$(document).on("mouseleave", ".modalImg", function () {
    if (window.innerWidth < 768) {
        return;
    }
    $(".modalImg").stop().animate(
        {
            scrollTop: 0,
        },
        1600
    );
});

//projects 모달창 닫기
$(".modalClose").on("click", function () {
    $(".projectDes").empty();
    $(".modalWrap").removeClass("on");
    $(".cursor").css("display", "block");
});

//projects 롤링부분 끊어지지 않게 자식요소 복사
$(".client_wrap").each(function () {
    var this_clone = $(this).clone();
    $(this).parent(".client_name").append(this_clone);
});

//projects 롤링 애니메이션
var tl = gsap.timeline({ repeat: -1 });
gsap.to("#client1, #client3", { xPercent: -50, duration: 30, ease: "linear", repeat: -1 });
tl.to("#client2", { xPercent: -50, duration: 0, ease: "none" });
tl.to("#client2", { xPercent: 0, duration: 30, ease: "linear", repeat: -1 });

/* ----- project 끝 ----- */
