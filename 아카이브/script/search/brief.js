$(document).ready(function(){
    
    var winWidth = window.innerWidth || document.documentElement.clientWidth;//미디어쿼리 사이즈와 $(window).width()가 인식하는 px단위 사이즈가 달라서 선언한 변수 : clinentWidth 와 innerWidth의 사이즈는 동일하나 innerWidth는 익스플로러 9 미만 버전은 인식하지 못하므로 동시선언
    
    
	var gap= [];
	var datasetTarget;
	var detailTimer;

	function mobileCheck(){
		var pc_device = "win16|win32|win64|mac|macintel";
		var this_device = navigator.platform;
		if(this_device){
			if(pc_device.indexOf(navigator.platform.toLowerCase()) < 0){
				return true;
			}else{
				return false;
			}
		}
	}

	function listSizeCheck(){
		$(".resultDetail ul.list > li").each(function(index){
			$(this).find(".dataset").each(function(){
				if ($(this).find(".infoBtn").hasClass("on")) {
					$(this).find(".infoBtn").removeClass("on");
					$(this).find("> .detail").slideToggle(300);
				}
			});
			$(this).find(".dataInfo").removeAttr("height");
			$(this).find(".dataInfo").height("auto");

			if($(this).find(".dataInfo").height() > 33){
				$(this).find(".dataInfo .dataset > .detail").css("top", 64);
				gap[index] = 64;
			}else{
				$(this).find(".dataInfo .dataset > .detail").css("top", 32);
				gap[index] = 32;
			}
		});
	}

	$(window).resize(function(){
		if(!mobileCheck()) listSizeCheck();
	});
	listSizeCheck();

	function detailReSize (){
		clearInterval(detailTimer);
		var _index = $(datasetTarget).closest("li").index();
		if($(datasetTarget).find(".detail").hasClass("dStyle")){
			if($(datasetTarget).find(".detail").html() != ""){
				return;
			}
			detailTimer = setInterval(function(){
				if($(datasetTarget).find(".detail").html() != ""){
					var _h = $(datasetTarget).find(".detail").height()+(gap[_index]+72);
					$(datasetTarget).closest(".dataInfo").animate({height: _h}, 200);
					clearInterval(detailTimer);
				}
			}, 10);
		}else{
			return;
		}
	}


	$(".resultDetail .detail.dStyle").on("click", ".close", function(){
		var _index = $(this).closest("li").index();
		$(this).closest(".dataset").find("> .infoBtn").removeClass("on");
		$(this).closest(".dataInfo").animate({height: gap[_index]}, 200);
		$(datasetTarget).find(".infoBtn").focus();
	});


	//목차보기
	$(".resultDetail .dataInfo .contentGuideBtn").on("click", function() {
		var _this = this;
		var _index = $(this).closest("li").index();
		$(".resultDetail .dataInfo .arrow").not($(this)).removeClass("on");
		$(this).closest("li").siblings().find(".detail").hide();
		$(".resultDetail li .dataInfo").removeAttr("height");
		$(".resultDetail li .dataInfo").height("auto");
		$(".resultDetail .detail").not(".contentGuide").hide();
		$(this).closest(".dataInfo").height(gap[_index]);
		datasetTarget = $(this).closest(".dataset");
		$(this).closest(".dataset").find(".detail").slideToggle(0, function(){
			if ($(_this).hasClass("on")) {
                $(this).closest('li').removeClass('on');
				$(_this).removeClass("on");
				$(_this).closest(".dataInfo").animate({height: gap[_index]}, 200);
			} else {
                $(".resultDetail>ul>li").removeClass('on');
                $(this).closest('li').addClass('on');
				$(_this).addClass("on");
				var _h = $(_this).closest(".dataset").find(".detail").height()+(gap[_index]+72)
				$(_this).closest(".dataInfo").animate({height: _h}, 200);

				detailReSize ();
			}
		});
        return false;
	});

	//검색상세 목차보기
	var itemH = $('.docPreviewBtn>div .itemCont').outerHeight();
	var docPreviewH = $('.docPreview').height();
	var clickH = itemH + docPreviewH
	$('.docPreviewBtn .previewBtn1').click(function(){
		if($(this).parent().parent().hasClass('on')){
			$(this).parent().parent().removeClass('on');
			$('.docPreview').css('height',docPreviewH);
			$('.docPreviewBtnW').css('bottom',0);
			$('.docPreviewBtn>div .itemCont').fadeOut();
		}else{
			$(this).parent().parent().addClass('on');
			$('.docPreview').css('height',clickH);
			$('.docPreviewBtnW').css('bottom',itemH + 3);
			$('.docPreviewBtn>div .itemCont').fadeIn();
		}
		
		return false;
	});


    //패싯    
    $('.facetList div>a.slideBtn').click(function(){
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
    
    $('.facetList div .docDown').click(function(){
		if($(this).parent().hasClass('show')){
			$(this).parent().removeClass('show');
		}else{
			$(this).parent().addClass('show');
			$(this).parent().addClass('on');
			$(this).parent().find('div').show();
			$(this).parent().find('div').children('a').css('display','block');
			$(this).hide();
			$(this).next().css('display','block');
			$('.docUp').focus();
		}
        return false;
	});
    $('.facetList div .docUp').click(function(){
        $(this).parent().find('div').children('a').css('display','none');
        // $(this).parent().find('div').children('a').eq(0).css('display','block');
        // $(this).parent().find('div').children('a').eq(1).css('display','block');
		if($(this).parent().hasClass('show2')){
			$(this).parent().find('div').children('a').slice(0,2).css('display','block')
		}
		if($(this).parent().hasClass('show3')){
			$(this).parent().find('div').children('a').slice(0,3).css('display','block')
		}
		if($(this).parent().hasClass('show4')){
			$(this).parent().find('div').children('a').slice(0,4).css('display','block')
		}
        $(this).hide();
        $(this).prev().css('display','block');
        $('.docDown').focus();
        return false;
	});
    
    var winH = $(window).height();
    var bodyH = $('body').height();
    var facetH = $('.facetList').outerHeight();
    winWidth = window.innerWidth || document.documentElement.clientWidth;
    if(winWidth < 720){
        $('.facetListW').css('height',winH);
        
    }    
    $('.blackBg').css('height',bodyH - 40);
    
    
    $('.facetBtn').click(function(){
       $('html, body').css('overflow','hidden');
       $('.facetListW').addClass('on');
       $('.blackBg').fadeIn();
		$('.blackBg').addClass('show');
       $('#html').focus();
    });
    
    $('.facetListClose, .blackBg').click(function(){
        $('html, body').css('overflow','visible');
        $('.facetListW').removeClass('on');
        $('.blackBg').fadeOut();
		$('.blackBg').removeClass('show');
        $(this).removeClass('on');
        $('.facetBtn').focus();
        return false;
   });
    
    $(window).resize(function(){
        winWidth = window.innerWidth || document.documentElement.clientWidth;
        $('html, body').css('overflow','visible');
        if(winWidth > 719){
            $('.relateKeyword').addClass('up');
            $('.facetList').addClass('up');
			if($('.wholeMenu').hasClass('on')){
				
			}else{
				$('.blackBg').addClass('up');
            	$('.blackBg').fadeOut();
			}
           
        }
        if(winWidth < 720){
            $('.relateKeyword').removeClass('up');
            $('.facetList').removeClass('up');
            $('.blackBg').removeClass('up');
            winH = $(window).height();
            $('.facetListW').css('height',winH);
        }
        
        
    });
    
    //생산기관 검색
    $('.detailSearch table tbody tr td .institutionSearch').click(function(){
        $('.detailSearchTable').slideDown();
        
    });
    
    //문서군 검색
    $('.docContent .group a.groupDown').click(function(){
		if($(this).hasClass('noChildren')){
			
		}else{
			if($(this).parent().parent().hasClass('on')){
				$(this).parent().parent().removeClass('on');
				$(this).parent().parent().children('ul').slideUp();
			}else{
				$(this).parent().parent().addClass('on');
				$(this).parent().parent().children('ul').slideDown();
			}
			return false;
		}
       
    });
    $('.docContent .group .series a.seriesDown').click(function(){
		if($(this).hasClass('noChildren')){
        
		}else{
			if($(this).parent().parent().hasClass('on')){
				$(this).parent().parent().removeClass('on');
				$(this).parent().parent().children('ul').slideUp();
			}else{
				$('.docContent .group .series>ul').slideUp();
				$('.docContent .group .series').removeClass('on');
				$(this).parent().parent().addClass('on');
				
				$(this).parent().parent().children('ul').slideDown();
			}
			return false;
		}
    });
    
    $('.docContent .group .series .file a.fileDown').click(function(){
		if($(this).hasClass('noChildren')){
			
		}else{
			if($(this).parent().parent().hasClass('on')){
				$(this).parent().parent().removeClass('on');
				$(this).parent().parent().children('ul').slideUp();
			}else{
				$('.docContent .group .series .file>ul').slideUp();
				$('.docContent .group .series .file').removeClass('on');
				$(this).parent().parent().addClass('on');
				$(this).parent().parent().children('ul').slideDown();
			}
			return false;
		}
        
    });
    
   //추천자료검색
    $('.subjectResearch>div.subjectDetail>p').dotdotdot({ 
		ellipsis: "...",
		watch :"true",
        warp : "word"
	});
	

	//상세검색
	
	$('.searchAddW1 .searchAdd').click(function(){
		$(".searchKeyword2").css('display', 'block');
		$(".searchAddW1").css('display', 'none');
		$(".flexible1").css('display', 'inline-block');
		return false;
	});
	$('.searchAddW2 .searchDelete').click(function(){
		$(".searchKeyword2").css('display', 'none');
		$(".searchAddW1").css('display', 'inline-block');
		$(".flexible1").css('display', 'none');
		return false;
	});
	
	$('.searchAddW2 .searchAdd').click(function(){
		$(".searchKeyword3").css('display', 'block');
		$(".searchAddW2").css('display', 'none');
		$(".flexible2").css('display', 'inline-block');
		return false;
	});
	$('.searchAddW3 .searchDelete').click(function(){
		$(".searchKeyword3").css('display', 'none');
		$(".searchAddW2").css('display', 'inline-block');
		$(".flexible2").css('display', 'none');
		return false;
	});
	
	$('.searchAddW3 .searchAdd').click(function(){
		$(".searchKeyword4").css('display', 'block');
		$(".searchAddW3").css('display', 'none');
		$(".flexible3").css('display', 'inline-block');
		return false;
	});
	$('.searchAddW4 .searchDelete').click(function(){
		$(".searchKeyword4").css('display', 'none');
		$(".searchAddW3").css('display', 'inline-block');
		$(".flexible3").css('display', 'none');
		return false;
	});
	
	$('.searchAddW4 .searchAdd').click(function(){
		$(".searchKeyword5").css('display', 'block');
		$(".searchAddW4").css('display', 'none');
		$(".searchAddW5 .searchAdd").css('display', 'none');
		$(".flexible4").css('display', 'inline-block');
		return false;
	});
	
	$('.searchAddW5 .searchDelete').click(function(){
		$(".searchKeyword5").css('display', 'none');
		$(".searchAddW4").css('display', 'inline-block');
		$(".flexible4").css('display', 'none');
		return false;
	});
			


	//카트담기
	$('.fuction .cart').click(function(e){
		e.preventDefault();
		$('.blackBg').fadeIn();
		$('.cartPop').fadeIn();
		$('#html').focus();
		
	});
	
	$('.cartPop .cartClose, .blackBg').click(function(){
		$('.blackBg').fadeOut();
		$('.cartPop').fadeOut();
		$('.fuction .cart').focus();
		return false;
	});
	
	
    
});