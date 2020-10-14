'use strict';

// 배너 이미지 슬라이드
var mySwiper = new Swiper('.swiper-container', {
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }, 
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    }, 
    autoplay: {
        delay: 5000,
    },
});

// 영화차트 이미지 슬라이드
var swiper = new Swiper('.swiper-container2', {
    // 슬라이드가 제각기 따로 움직이고 싶다면 이름을 달리해주면 된다. 
    slidesPerView: 4,
    spaceBetween: 24,
    mousewheel: {
        invert: true,
    },
    // keyboard: {
    //     enabled: true,
    //     onlyInViewport: false,
    // },
    autoplay: {
        delay: 3000,
    },
    breakpoints: {
        // when window width is >= 600px
        600: {
            slidesPerView: 1.4,
            spaceBetween: 24
        },
        // when window width is >= 768px
        768: {
            slidesPerView: 2,
            spaceBetween: 24
        },
        // when window width is >= 960px
        960: {
            slidesPerView: 3,
            spaceBetween: 24
        }
    }
});

// 영화차트 탭 메뉴
var movBtn = $(".movie_title > ul > li");
var movCont = $(".movie_chart > div");
    // 버튼도 4개 컨텐츠도 4개.

movCont.hide().eq(0).show();
/*
    .eq() : 순서대로 정한다.
    첫번째의 컨텐츠만 나오도록 설정함. 
*/

movBtn.click(function(e){
    e.preventDefault();
    var target = $(this);
    /*  
        this는 자기 자신이라는 뜻, 버튼 클릭한 곳으로 가게 된다.
        사용자가 몇번째 버튼을 클릭했는지 확인할 수 있다. 
    */
    var index = target.index();
    /*
        사용자가 몇번째 버튼을 클릭했는지 우리는 눈으로 볼 수 가 없으니까,
        index라는 메서드를 이용해서 이 target한테 번호를 매겨준다. 
    */
    movBtn.removeClass("active");
    // js코드를 짤때는 제거를 먼저시켜준다음에 실행하도록 해야 한다. 
    target.addClass("active");
    movCont.css("display","none");
    // 안보이게 하기위해서 .hide를 써도 되지만, css를 써도 상관없다.
    movCont.eq(index).css("display","block");
    // movCont(컨텐츠)의 번호(변수 index -> target.index())의 해당되는 것만 보여주게 만들어 준 것.
});

// 공지사항 탭 메뉴
var tapMenu = $(".notice");

// 컨텐츠 내용을 숨겨주세요!
tapMenu.find("ul > li > ul").hide();
// 먼저 찾아야 한다. ul 안에 있는 ul을 찾은 다음, 숨긴다.
tapMenu.find("li.active > ul").show();
// 여기서 li에 .active가 붙은거의 자식 ul만 보여지게 작업을 한다. 

function tabList(e){
    e.preventDefault();
    // a태그의 href="#"의 기능을 차단 시켜준다. 
    var target = $(this);
    // 누가 정해질지 모르니가 변수로 target을 만든다.
    target.next().show().parent("li").addClass("active").siblings("li").removeClass("active").find("ul").hide();
    /*
        여기서 next는 a태그의 형제인 ul (next() => 옆태그(형제태그)). ul태그를 show(보여주고) ul태그의 parent, 즉 부모 태그를 찾을 것이다. parent("li") => li라는 부모를 찾는다. 
        addClass로 .active를 붙여주고, siblings("li")=> 그 형제인 li들을 찾아서, removeClass로 .active를 지워준다.
        find로 ul을 찾아서 hide로 지워준다. 
    */

    /*
        1. 버튼(a태그)을 클릭하면 부모관계의 li에게 .active를 추가시켜주고, 부모의 형제인 다른 li한테 있는 .active는 삭제시켜준다. 
        2. 그리고 a태그의 형제관계인 ul을 보여줄 것이다. .active가 삭제된 li의 자식태그인 ul은 안보이게 해준다.
    */

    // 버튼을 클릭하면 형제의 ul을 우선 보여주고, 
    // 부모의 li태그에 클래스를 추가하고,
    // 선택된 li를 제외한 다른 형제들(li)의 클래스를 제거하고, 
    // 제거한 자식의 ul 태그를 숨겨준다. 
}

tapMenu.find("ul > li > a").click(tabList).focus(tabList);
// tabMenu( = .notice)에 find를 이용해서 ul > li > a태그를 클릭했을 때, tabList를 실행한다.  
// tab키를 눌렀을때 전체공지탭에서 아래 내용을 읽어야 하기때문에, focus(tabList)를 준다. 