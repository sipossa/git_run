$(document).ready(function(){
	
    //사이즈 변수 선언(공통 사용)
	var winWidth = window.innerWidth || document.documentElement.clientWidth;//미디어쿼리 사이즈와 $(window).width()가 인식하는 px단위 사이즈가 달라서 선언한 변수 : clinentWidth 와 innerWidth의 사이즈는 동일하나 innerWidth는 익스플로러 9 미만 버전은 인식하지 못하므로 동시선언

	/*탑메뉴 상단 고정*/
	var scroll = $(window).scrollTop();
    var header1H = $('.header1').height();
	$(window).scroll(function(){
		scroll = $(window).scrollTop();
		if(scroll > header1H){
			$('.header2').addClass('fixed');
			$('#divContentsW').addClass('on');
            $('.snsLogin').fadeOut();
		}else{
			$('.header2').removeClass('fixed');
			$('#divContentsW').removeClass('on');

		}
	});

    
    //탑메뉴
    $('#divTopMenu>div>ul>li>a').on('click focus',function(){
        $(this).parent().parent().animate({'height':'350px'},300);
        
        return false;
	});
	$('#divHeader').on('mouseleave', function(){
		
        $('#divTopMenu>div>ul').animate({'height':'0'},300);
        $('#divTopMenu>div>ul>li').removeClass('on');
	});
    $('#divTopMenu>div>ul>li>ul>li>a').on('mouseover',function(){
		$(this).parent().parent().parent().addClass('on').siblings().removeClass('on');
	});

	$('#divTopMenu>div>ul>li:last-child>ul>li:last-child>a').focusout(function(){
		$('#divTopMenu>div>ul').animate({'height':'0'},300);
        $('#divTopMenu>div>ul>li').removeClass('on');
	});

	//프로필
	$('.globalMenu .profile a').click(function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$('.userInfo').fadeOut();
		}else{
			$(this).addClass('on');
			$('.userInfo').fadeIn();
		}
		return false;
	});
    
	//전체메뉴
	$('.wholeMenuBtn').click(function(){
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		var winH = $(window).height();
		$('html, body').css('overflow','hidden');
		if($('.wholeMenu').hasClass('on')){
			$('.blackBg').fadeOut();
			//!$('.blackBg').removeClass('up');
			$('.wholeMenu').removeClass('on');
			$('html, body').css('overflow','visible');
		}else{				
			$('.blackBg').fadeIn();
			$('.wholeMenu').addClass('on');
			setTimeout(function(){
				$('.wholeMenuClose').addClass('on');
			},400);
			
			$('.wholeMenu>div>div').show().animate({right:'0'},500,'easeOutExpo');
			$('.wholeMenu .wholeMenuList .menuList').css('height',winH);
		}
		
		return false;
	});
	
	$('.wholeMenuClose, .blackBg').click(function(){
		$('.blackBg').fadeOut();
		$('html, body').css('overflow','visible');
		$('.wholeMenuClose').removeClass('on')
		$('.wholeMenu>div>div').animate({right:'-100%'},500,'easeOutExpo',function() {
				$('.wholeMenu').removeClass('on');
				$('.wholeMenu>div>div').hide();
		});
		
		return false;
	});
	
	
	$('.wholeMenu .wholeMenuList .menuList>ul>li>a').click(function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).siblings().slideUp();
		}else{
			$('.wholeMenu .wholeMenuList .menuList>ul>li>ul>li').removeClass('on');
			$('.wholeMenu .wholeMenuList .menuList>ul>li>ul>li>ul').slideUp();
			$(this).parent().addClass('on');
			$(this).siblings().slideDown();
		}
		
		return false;
	});
	
	
	$(window).resize(function(){
		var winH = $(window).height();
		$('.wholeMenu .wholeMenuList .menuList').css('height',winH)
		
	});
    //컬렉션
    $('.complilationCon .complilationList>ul>li .complilationInfo p').dotdotdot({ 
		ellipsis: "...",
		watch :"true",
        warp : "word"
	});
    $('.collectionCon ul>li>div a.txtBox span.txt').dotdotdot({ 
		ellipsis: "...",
		watch :"true",
        warp : "word"
	});

	//familySite
	$('.footerBottom .familySite>a').click(function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$('.footerBottom .familySite ul').slideUp();
			return false;
		}else{
			$(this).parent().addClass('on');
			$('.footerBottom .familySite ul').slideDown();
			return false;
		}
	});

     
    
    //연구소편찬자료 패싯
    $('.complilationCon .complilationfacet .filed .filedBtn').click(function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).next().slideUp();
			return false;
		}else{
			$(this).parent().addClass('on');
			$(this).next().slideDown();
			return false;
		}
	});
    
    //연구소 패싯 모바일 펼치기
    var winH = $(window).height();
    var bodyH = $('body').height();
    winWidth = window.innerWidth || document.documentElement.clientWidth;
    if(winWidth < 720){
        $('.complilationfacet').css('height',winH);
        $('.complilationfacet>div').css('height',winH);
    }    
    $('.blackBg').css('height',bodyH -40);
    
    $('.filedFacetBtn').click(function(){
       $('html, body').css('overflow','hidden');
       $('.complilationfacet').addClass('on');
       $('.blackBg').fadeIn();
       $('#html').focus();
    });
    
    
    $('.filedClose, .blackBg').click(function(){
        $('html, body').css('overflow','visible');
        $('.complilationfacet').removeClass('on');
        $('.blackBg').fadeOut();
        $(this).removeClass('on');
        $('.filedFacetBtn').focus();
        return false;
   });
    
    $(window).resize(function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;
		if($('.relateKeyword').css('display') == 'block'){
			$('html, body').css('overflow','visible');
		}
        
        if(winWidth > 719){
            $('.complilationfacet').addClass('up');
			if($('.wholeMenu').hasClass('on')){
				$('.blackBg').css('display','block');
			}else{
				$('.blackBg').fadeOut();
				//$('.blackBg').addClass('up');
			}
            $('.complilationfacet>div').css('height','auto');
        }
        if(winWidth < 720){
            $('.complilationfacet').removeClass('up');
            $('.blackBg').removeClass('up');
            winH = $(window).height();
            $('.complilationfacet>div').css('height',winH);
        }
        
        
    });
    
    $('.recordTable tbody tr td.title a.txtBtn').click(function(){
        if($(this).parent().parent().hasClass('on')){
	       $(this).parent().parent().removeClass('on');
            $(this).parent().children('.commentW').slideUp();
        }else{
            $('.recordTable tbody tr td.title').removeClass('on');
            $(this).parent().parent().addClass('on');
            $(this).parent().children('.commentW').slideDown();
        }
        return false;
        
    });
	
	$(window).scroll(function(){
		if($(window).scrollTop() > 180){
			$('.topBtn').addClass('on');
		}else{
			$('.topBtn').removeClass('on');
		}
	});

	//btn TOP
	$('.topBtn').click(function(){
		$('html,body').animate({scrollTop:0},400);
		return false;
	});
	
	//탭메뉴
	if($('#divTabMenu').length > 0){
		var winWidth = window.innerWidth || document.documentElement.clientWidth;
		$("#divTabMenu").mThumbnailScroller({
			type:"click-50",
			theme:"buttons-out"
		});
		$("#divTabMenu").mThumbnailScroller("scrollTo", $('#divTabMenu .on'));	
		if($('#divTabMenu > div ul').width()>$('#divTabMenu > div').width()){
			$("#divTabMenu > div").addClass('long');
		}else{
			$("#divTabMenu").mThumbnailScroller("destroy");
		}
		//resize
		$(window).resize(function(){
			$("#divTabMenu").mThumbnailScroller({
				type:"click-50",
				theme:"buttons-out"
			});
			$("#divTabMenu").mThumbnailScroller("scrollTo", $('#divTabMenu .on'));	
			if($('#divTabMenu > div ul').width()>$('#divTabMenu > div').width()){
				$("#divTabMenu > div").addClass('long');
			}else{
				$("#divTabMenu > div").removeClass('long');
				$("#divTabMenu").mThumbnailScroller("destroy");
			}
		});
	}
	
	$('.comment>ul>li .commentDetail a.viewBtn').click(function(){
		if($(this).parent().hasClass('on')){
			$(this).parent().removeClass('on');
			$(this).text('펼쳐보기');
		}else{
			$(this).parent().addClass('on');
			$(this).text('접어보기');
		}
		return false;
		
	});
	
	$('.commentBtn a.edit').click(function(){
		$(this).parent().parent().parent().find('.commentPop').fadeIn();
		$('.blackBg').fadeIn();
		$('#html').focus();
	});
	
	$('.commentPop .commentPopTop .popClose, .blackBg').click(function(){
		$('.commentPop').fadeOut();
		$('.blackBg').fadeOut();
		$('.commentBtn a.edit').focus();
		return false;
	});
	
	$('.comment .commentInputW .commentInput').click(function(){
		$(this).parent().parent().find('#commentWrite').fadeIn();
		$('.blackBg').fadeIn();
		$('#html').focus();
	});
	
	$('#commentWrite .commentPopTop .popClose, .blackBg').click(function(){
		$('#commentWrite').fadeOut();
		$('.blackBg').fadeOut();
		$('.comment .commentInputW .commentInput').focus();
		return false;
	});

	//다국어 입력
	$('.otherLagnBtn').click(function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$('.languageWrap').hide();
		}else{
			$(this).addClass('on');
			$('.languageWrap').show();
		}
		
		return false;
	});

	//반출
	$('.outgoing').click(function(){
		if($(this).hasClass('on')){
			$(this).removeClass('on');
			$('.outGoingCont').hide();
		}else{
			$(this).addClass('on');
			$('.outGoingCont').show();
		}
		return false;
	});
    
});
