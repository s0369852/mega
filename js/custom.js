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

// 영화차트 탭 메뉴
var movBtn = $(".movie_tilte > ul > li");
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