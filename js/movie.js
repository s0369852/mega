'use strict';
(function($){

    /* 트레일러 영상 플레이어를 활성화 */
    /* youtube iframe API : https://developers.google.com/youtube/player_parameters */

    (function handleTrailer(){
        // 셀렉터 캐시 => 선택자를 미리 만들어 놓기 위해.
        /* 
            var selector = $(".selector"); => 선택자 만드는 기본적인 방법.
            기본적인 변수 선언방법
            var body = $("body"),
                overlay = $("blackout"),
                modal = $("#trailerModal"),
                showButton = $("#showTrailer"),
                hideButton = $("#hideTrailer"),
        */

        // 객체를 통한 변수 선언방법
        var $selector = {           // [] => 배열을 만들 때, {} => 객체를 만들 때
            body: $("body"),
            overlay: $("#blackout"),
            modal: $("#trailerModal"),
            showButton: $("#showTrailer"),
            hideButton: $("#hideTrailer"),
            // 여러가지 변수를 객체를 통해서 한꺼번에 만들 수 있다. 
        };

        // 플레이어 API 설정
        var player = {
            obj: null,  // 플레이어 오브젝트 -> null값 자리에 넣어서 컨트롤 하기 위함.
            query : {   // query는 매개변수 부분.
                theme: "dark",
                color: "white",
                controls: 1,
                autoplay: 1, // 플레이어가 로드 될 때 초기 동영상을 자동재생
                enablejsapi: 1, // JavaScriptAPI를 사용하도록 설정된다. 
                modestbranding: 0, // youtube 로고 감춤
                rel: 0, // 제목, 업로더 감춤
                showinfo: 0, // 제목, 업로더 감춤
                iv_load_policy: 3 // 특수효과 감춤
            },
            visible: false // false는 안보이게 한다. 
        };

        // 보이기 버튼, 숨기기 버튼 활성화
        $selector.showButton.on("click",showPlayer);
        $selector.hideButton.on("click",hidePlayer);

        // youtube API를 이용해서 iframe을 생성
        /* 기존 youtube에서 공유-> 동영상 퍼가기의 iframe을 사용하면 단점은 기본 youtube틀이 다 나오고 API를 디테일하게 컨트롤 할 수 없고, 코드를 다 넣어줘야 한다. */
        // 스크립트 코드로 만드는 법.
        function setPlayer(id){ 
            // setPlayer에서 가져온 data("youtube")값인  "F1239ZePXfM"를 id에 넣어준다. 
            /* 
            id라고 적은 것은 youtube영상 id => videoID => 영상마다 동영상 퍼가기의 iframe을 보면 id가 있다. https://www.youtube.com/embed/Vj8WvqM7kXs => Vj8WvqM7kXs 이게 ID 
            */
            player.obj = new YT.Player("trailer", { 
                // 아무것도 없는 obj:null 값에 새로운 trailer를 넣어 준것.
                width: 480,
                height: 282,
                videoId: id, // id라는 매개변수를 넣어준 것
                playerVars: player.query
            });

            // 처음 플레이어 크기 설정 
            resizePlayer();

            // 리사이즈 화면 회전시 플레이어 크기 다시 설정 
            $(window).on("resize orientationchange", function() {
                resizePlayer();
            });
            
        }

        function resizePlayer(){ // (화면크기를 자동으로 변경해주는 것 설정)
            var viewport = {}, frame = {}, modal = {};

            viewport.width = $(window).width(); // 화면 크기를 현재 widow의 크기로 구하기
            viewport.height = $(window).height(); // 화면 높이를 현재 widow의 크기로 구하기

            frame.width = viewport.width; // 프레임 크기를 화면의 크기로 구하기
            frame.height = frame.width / 1.6; // 프레임 높이 값은 화면 크기의 비율로 16 : 10 으로 조정.

            // modal을 띄워야 하니까 띄울려면 top값과 left값이 필요 -> position을 설정해 놨기 때문.
            modal.top = ((viewport.height - frame.height) / 2)+"px";  // (전체)화면 높이에서 (iframe의)프레임의 높이를 빼주고 나누기 2해주고(중앙으로 오게 하기 위해서) px단위 붙여주기. 
            modal.left = "0px"; // 어차피 좌우로는 붙어있어야 하니까 움직일 필요가 없으니까 0px

            $selector.modal.css(modal); // css로 .modal을 만들어 놓고, position: absolute만 준 이유는 script로 top, left값을 주기 위함이다. 
            
            player.obj.setSize(frame.width, frame.height); // obj가 null값이었던 것을 값을 넣어준 것.
        }

        // iframe 보이기
        function showPlayer(){ // 시작버튼을 누르면 이게 활성화
            if (!player.obj) { // obj가 null값이 아니면,
                setPlayer($selector.showButton.data("youtube")); // data-youtube="F1239ZePXfM" html코드에 적어놓은 data를 showButton을 누르면 가져온다. 
            }

            $selector.body.addClass("modal_on");
            $selector.overlay.show(); // $selector.overlay는 위에 변수로 설정을 해놨다. 
            player.visible = true; // visible을 true 작업을 해주니까 보인다. 
        };

        //  iframe 감추기 
        function hidePlayer(){ // 닫기버튼을 누르면 이게 활성화
            player.obj.stopVideo();
            $selector.overlay.hide();
            $selector.body.removeClass("modal_on");
            player.visible = false;
        };

    })();

})(jQuery);

// (function($){})(jQuery); -> 시작하자마자 jquery를 읽을 수 있도록 설정해준 것.