//변수 초기화
var sh;
var ch;

$('#projects .swiper-slide a').on('click',function(e){
    e.preventDefault();
    //swiper 슬라이드가 loop 속성을 가지고 있으므로 realIndex 속성을 이용해 실제 index 값을 구한다.
    var idx = mySwiper.realIndex;

    $.ajax({
        url : "../lib/projects.json",
        dattype: "json",
        success: function(data){
            if(data.length > 0){
                var $status = data[idx].status;
                var $name = data[idx].name;
                var $thumbnail = data[idx].thumbnail;
                var $intro = data[idx].intro;
                var $period = data[idx].period;
                var $description = data[idx].description;
                var $description2 = data[idx].description2;
                var $description3 = data[idx].description3;
                var $link = data[idx].link;

                $('.projectStatus').text($status);
                $('.projectName').text($name);
                $('.projectIntro').text($intro);
                $('.projectPeriod').text($period);
                $('.projectDes').append(
                    $('<li/>').text($description),
                    $('<li/>').text($description2),
                    $('<li/>').text($description3)
                );
                $('.projectLink').attr('href',$link);
                $('.modalImg img').attr('src',$thumbnail);
                $('.modalWrap').addClass('on');
            }
        }
    })
});

//modalImg 높이값이 변함에 따라 $(document).on 메서드를 이용하여 mouseenter 기준으로 높이값을 변수에 저장
$(document).on('mouseenter', '.modalImg', function(){
    sh = document.querySelector('.modalImg').scrollHeight;
    ch = document.querySelector('.modalImg').clientHeight;
    $('.modalImg').stop().animate({
        scrollTop : sh - ch
    },1600);
});

$(document).on('mouseleave', '.modalImg', function(){
    $('.modalImg').stop().animate({
        scrollTop : 0
    },1600);
}); 

