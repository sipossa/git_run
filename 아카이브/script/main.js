$(document).ready(function(){
	//사이즈 변수 선언(공통 사용)
	var winWidth = window.innerWidth || document.documentElement.clientWidth;//미디어쿼리 사이즈와 $(window).width()가 인식하는 px단위 사이즈가 달라서 선언한 변수 : clinentWidth 와 innerWidth의 사이즈는 동일하나 innerWidth는 익스플로러 9 미만 버전은 인식하지 못하므로 동시선언
    
    $('#fullpage').fullpage({
		licenseKey: '51E55F0A-96374A1C-B76A93E8-932650A1',
		anchors: ['main1','main2','main3','main4','footer'],
        animateAnchor :true,
		autoScrolling:true,
		keyboardScrolling :  true,
		responsiveWidth: 1025,
		scrollingSpeed: 800,
		onLeave: function(anchorLink, section){
			if(section.anchor=='main1'){
				$('nav ul li').removeClass('on');
				$('nav ul li').eq(0).addClass('on');
                $('#divHeader').removeClass('on');
                $('.search').addClass('effect');
                $('.topBtn').removeClass('on');
			}else{
				setTimeout(function(){
					$('.search').removeClass('effect');
				},400);
			}

			if(section.anchor=='main2'){
				$('nav ul li').removeClass('on');
				$('nav ul li').eq(1).addClass('on');
                $('nav').addClass('nav2');
                $('#divSearch').removeClass('effect');
                $('.noticeW').removeClass('effect');
                $('#divHeader').addClass('on');
                $('.mainCollection').addClass('effect');
                $('.topBtn').addClass('on');
			}else{
                $('nav').removeClass('nav2');
				setTimeout(function(){
					$('.mainCollection').removeClass('effect');
				},400);
			}
			
			if(section.anchor=='main3'){
				$('#divHeader').addClass('on');
				$('nav ul li').removeClass('on');
				$('nav ul li').eq(2).addClass('on');
                $('nav').addClass('nav3');
				$('.recommend').addClass('effect');
                $('.topBtn').addClass('on');
				setTimeout(function(){
					$('.notice').removeClass('effect');
					$('.popupZone').removeClass('effect');
				},400);	
			}else{
                $('nav').removeClass('nav3');
				setTimeout(function(){
					$('.recommend').removeClass('effect');
				},400);	
			}

			if(section.anchor=='main4'){
				$('nav ul li').removeClass('on');
				$('nav ul li').eq(3).addClass('on');
                $('nav').addClass('nav4');
                $('#divHeader').addClass('on');
				$('.notice').addClass('effect');
				$('.popupZone').addClass('effect');
                $('.topBtn').addClass('on');
			}else{
                $('nav').removeClass('nav4');
				
				
			}
            /*footer*/
			if(!(section.anchor=='footer')){
                
				if($(window).width()>1024){
					$('.footerBottom .familySite ul').slideUp();
					$('.footerBottom .familySite').removeClass('on');
				}
			}else{
                $('#divHeader').addClass('on');
				$('nav').addClass('nav4');
                $('nav ul li').removeClass('on');
				$('nav ul li').eq(3).addClass('on');
				$('.notice').addClass('effect');
				$('.popupZone').addClass('effect');
                $('.topBtn').addClass('on');
			}
		}
	});
    
	$(window).load(function(){
		$('.search').addClass('effect');
		$('.slide1W').addClass('on')
	});
	
	//header 상단고정
	var scroll = $(window).scrollTop();
	$(window).scroll(function(){
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		scroll = $(window).scrollTop();
		if(winWidth < 1025){
			if(scroll > 0){
				$('#divHeader').addClass('fixed');
			}else{
				$('#divHeader').removeClass('fixed');
			}
		}
	});	
	
	$(window).resize(function(){
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		scroll = $(window).scrollTop();
		if(winWidth < 1025){
			if(scroll > 0){
				$('#divHeader').addClass('fixed');
			}else{
				$('#divHeader').removeClass('fixed');
			}
		}
		
	});

	//divTopMenu
	$('#divTopMenu>div>ul>li>a.menuBtn').on('click focus',function(){
		$(this).parent().children('div').slideDown();
		$(this).parent().addClass('on');
		return false;

	});

	$('#divTopMenu>div>ul>li').mouseleave(function(){
		$(this).children('div').slideUp();
        $(this).removeClass('on');
	});


	$('#divTopMenu>div>ul>li>div>ul>li:last-child>a').focusout(function(){
		$('#divTopMenu>div>ul>li>div').slideUp();

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
	var winH = $(window).height();
	$('.blackBg').css('height',winH);
	
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
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		$('.blackBg').fadeOut();
		if(winWidth < 1025){
			$('html, body').css('overflow','visible');
		}	
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
		$('.blackBg').css('height',winH);
		$('.wholeMenu .wholeMenuList .menuList').css('height',winH)
		if($('.wholeMenu').hasClass('on')){
			$('html, body').css('overflow','hidden');
		};
	});
	
	//collectSlide
	$('.slide1W .slide1').slick({
		slide: 'div',
		variableWidth: true,
		infinite : true,
		slidesToShow : 3,	
		slidesToScroll : 1,	
		arrows : true, 		
		vertical : false,
		prevArrow : "<button type='button' class='slickPrev'>Previous</button>",
		nextArrow : "<button type='button' class='slickNext'>Next</button>",
		draggable : true,
		responsive: [
			{
                breakpoint: 720,
                settings: {
					arrows: false,
                    }
            },
		]
	});
	
	$('.slide2W .slide2').slick({
		slide: 'div',
		variableWidth: true,
		infinite : true,
		slidesToShow : 3,	
		slidesToScroll : 1,	
		arrows : true, 		
		vertical : false,
		prevArrow : "<button type='button' class='slickPrev'>Previous</button>",
		nextArrow : "<button type='button' class='slickNext'>Next</button>",
		draggable : true,
		responsive: [
			{
                breakpoint: 720,
                settings: {
					arrows: false,
                    }
            },
		]
	});
	$('.slide3W .slide3').slick({
		slide: 'div',
		variableWidth: true,
		infinite : true,
		slidesToShow : 3,	
		slidesToScroll : 1,	
		arrows : true, 		
		vertical : false,
		prevArrow : "<button type='button' class='slickPrev'>Previous</button>",
		nextArrow : "<button type='button' class='slickNext'>Next</button>",
		draggable : true,
		responsive: [
			{
                breakpoint: 720,
                settings: {
					arrows: false,
                    }
            },
		]
	});
	
	var slideCount = $('.mainCollection div.collectionBase .slideCon.on').slick("getSlick").slideCount;
	//alert(slideCount)
	$('.collectionBase .slideCon.on').on('init', function(event, slick){
				$('.collectionBase .slideCon.on .current').text(1);
				$('.collectionBase .slideCon.on .total').text('/' + slick.slideCount);
  	}); 
	
	$('.collectionBase .current').text(1);
	$('.collectionBase .total').text('/' + slideCount);

	 $('.collectionBase .slideCon.on').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
					var i = (currentSlide ? currentSlide : 0) + 1;
					//$(".count").text(i + '/' + slick.slideCount);
		 $('.mainCollection div.collectionBase>div.on .current').text(i);
		 $('.mainCollection div.collectionBase>div.on .total').text('/' + slick.slideCount);
	  });
	
	$(".collectionBase>div>a.slideBtn").click(function(){
		var total = $(this).parent().find('.slideCon').slick("getSlick").slideCount;
		$('.collectionBase .total').text('/' + total);
		//alert(total)
		$('.collectionBase .slideCon').removeClass('on');
		$('.collectionBase>div .moreBtn').removeClass('on');
		$(".collectionBase>div>a.slideBtn").removeClass("on");
		$(".collectionBase .collectionMoreW").removeClass("on");
		$(this).addClass('on');
		$(this).parent().addClass('on').siblings().removeClass('on');
		$(this).next().find('.moreBtn').addClass('on');
		$(this).next().next().addClass('on');
		$(this).next().next().next().addClass('on');
		 $('.collectionBase .slideCon.on').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
					var i = (currentSlide ? currentSlide : 0) + 1;
					//$(".count").text(i + '/' + slick.slideCount);
		 $('.mainCollection div.collectionBase>div.on .current').text(i);
		 $('.mainCollection div.collectionBase>div.on .total').text('/' + slick.slideCount);
	  });
		
		return false;
	});
	
	
	
	$('.recommendSlide').slick({
		slide: 'div',
		variableWidth: true,
		infinite : true,
		slidesToShow : 3,	
		slidesToScroll : 1,	
		arrows : true, 		
		vertical : false,
		prevArrow : "<button type='button' class='slickPrev2'>Previous</button>",
		nextArrow : "<button type='button' class='slickNext2'>Next</button>",
		draggable : true,
		responsive: [
            {
                breakpoint: 1025,
                settings: {
					//variableWidth: false,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    draggable : true,
                    }
            },
			{
                breakpoint: 720,
                settings: {
					arrows:false,
					//variableWidth: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    draggable : true,
                    }
            },
			]
	});
	
	var slideCount2 = $('.recommendSlide').slick("getSlick").slideCount;
	//alert(slideCount2)
	$('.recommendSlide').on('init', function(event, slick){
				$('.recommendMoreW .current').text(1);
				$('.recommendMoreW .total').text('/' + slick.slideCount);
  	}); 
	
	$('.recommendMoreW .current').text(1);
	$('.recommendMoreW .total').text('/' + slideCount2);

	 $('.recommendSlide').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){
					var i = (currentSlide ? currentSlide : 0) + 1;
					//$(".count").text(i + '/' + slick.slideCount);
		 $('.recommendMoreW .current').text(i);
		 $('.recommendMoreW .total').text('/' + slick.slideCount);
	  });
	
	//dotdotdot
	$('.recommend .slideCont .title').dotdotdot({ 
		ellipsis: "...",
		watch :"true",
        warp : "word",
	});
	
	$('.noticeCont .rightCon .tit').dotdotdot({ 
		ellipsis: "...",
		watch :"true",
        warp : "word",
	});
	
	$('.noticeCont .rightCon .detail').dotdotdot({ 
		ellipsis: "...",
		watch :"true",
        warp : "word",
	});

	
	//버튼효과
	$('.recommend .recommendMoreW .recommendMore').mouseenter(function(){
		$(this).addClass('on')
	});
	
	$('.recommend .recommendMoreW .recommendMore').mouseleave(function(){
		setTimeout(function(){
				$('.recommend .recommendMoreW .recommendMore').removeClass('on');
		},550);
	});
	
	//텍스트변경
	//var winWidth = window.innerWidth || document.documentElement.clientWidth;
	if(winWidth < 720){
		$('.recommendMore .txt').text('추천자료 더보기');
		
	}
	$(window).resize(function(){
		winWidth = window.innerWidth || document.documentElement.clientWidth;
		if(winWidth > 719){
			$('.recommendMore .txt').text('더보기');
		}
		if(winWidth < 720){
			$('.recommendMore .txt').text('추천자료 더보기');
		}
		
	});
	
	
	//popupZone
	var listCount = $(".popupZone li").length;
	console.log(listCount)
	//alert(listCount)
    var idx2=0;
	var intervalId;
	$(".popupZone .total").text(listCount);
	var nextIdx = function(){
		if(idx2>listCount-2){
			idx2 = 0;
		}else{
			idx2++;
		}
		return idx2;
	};
	var prevIdx = function(){
		if(idx2==0){
			idx2=listCount-1;
		}else{
			idx2--;
		}
		return idx2;
	};
    
    
	//자동플레이 함수
	var play2 = function(){
		nextIdx();
		$(".popupZone li").eq(idx2).show().siblings().hide();
        $(".popupZone li").eq(idx2).addClass("on").siblings().removeClass("on")
		var text=idx2;
		$(".popupZone .count").text(text+1);
	};
    
    
	//다음버튼
	$(".popupZone .controller .next").on("click",function(){
		play2();
		return false;
	});
	//이전버튼
	$(".popupZone .controller .prev").on("click",function(){
		prevIdx();
		$(".popupZone li").eq(idx2).show().siblings().hide();
		var text=idx2;
		$(".popupZone .count").text(text+1);
		return false;
	});
	var startFn = function(){
		intervalId = setInterval(function(){
			play2();
		},4000);
	};
	startFn();
	
	$('.popupZone .controller a.pause').click(function(){
			 $(this).hide();
			 $('.popupZone .controller a.play').show().css('display','inline-block');
			 $('.popupZone .controller a.play').focus();
			 clearInterval(intervalId);
			 return false;
		});
	
	 $('.popupZone .controller a.play').click(function(){
		 $(this).hide();
		 $('.popupZone .controller a.pause').show();
		 $('.popupZone .controller a.pause').focus();
		 if((".popupZone li").length > 1){
			startFn();
		 }
		 return false;
	 });
	
	
	//banner	
	var bannerNext = $('.banner .controller a.next');
	var bannerPrev = $('.banner .controller a.prev');
	var bannerPlay = $('.banner .controller a.play');
	var bannerPause = $('.banner .controller a.pause');
	var bannerUl = $('.bannerList ul');
	var bannerLi = $('.bannerList ul>li');
	var bannerWidth = $('.bannerList ul>li').outerWidth(true);
	var bannerCnt = $('.bannerList ul>li').length;
	var intervalBanner;
	//다음버튼 클릭 
	bannerNext.click(function(){
		stopBanner();
		playBanner();
		if($('.banner .controller a.pause').css('display')=='block'){
			playBanner2();
		}
		return false;
	});
	//이전버튼 클릭
	bannerPrev.click(function(){
		bannerUl = $('.bannerList ul');
		bannerLi = $('.bannerList ul > li');
		bannerWidth = $('.bannerList ul > li').outerWidth(true);
		bannerCnt = $('.bannerList ul > li').length;
		stopBanner();
		if($('.banner .controller a.pause').css('display')=='block'){
			playBanner2();
		}
		if(winWidth>767){
			if(!bannerUl.is(':animated')&&bannerCnt>4){
				bannerLi.last().prependTo(bannerUl);
				bannerUl.css('left',-bannerWidth);
				bannerUl.animate({'left':'0'},600);
			}
		}
		if(winWidth<768){
			if(!bannerUl.is(':animated')&&bannerCnt>2){
				bannerLi.last().prependTo(bannerUl);
				bannerUl.css('left',-bannerWidth);
				bannerUl.animate({'left':'0'},600);
			}
		}
		return false;
	});
	var playBanner = function(){
		bannerUl = $('.bannerList ul');
		bannerLi = $('.bannerList ul > li');
		bannerWidth = $('.bannerList ul > li').outerWidth(true);
		bannerCnt = $('.bannerList ul > li').length;
		if(winWidth>767){
			if(!bannerUl.is(':animated')&&bannerCnt>4){
				bannerUl.animate({'left':-bannerWidth},600,function(){
					bannerLi .first().appendTo(bannerUl);
					bannerUl.css('left','0');
				});
			}
		}
		if(winWidth<768){
			if(!bannerUl.is(':animated')&&bannerCnt>2){
				bannerUl.animate({'left':-bannerWidth},600,function(){
					bannerLi .first().appendTo(bannerUl);
					bannerUl.css('left','0');
				});
			}
		}
	};
	//재생 
	var playBanner2 = function(){
		intervalBanner = setInterval(function(){
			playBanner()},4500);
	};
	var stopBanner = function(){
		clearInterval(intervalBanner);
	};
	//일시정지버튼 클릭
	bannerPause.click(function(){
		stopBanner();
		$(this).hide();
		bannerPlay.show();
		bannerPlay.focus();
		return false;
	});
	//플레이버튼 클릭
	bannerPlay.click(function(){
		$(this).hide();
		bannerPause.show();
		bannerPause.focus();
		playBanner2();
		return false;
	});
	playBanner2();
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
    
});