$(function(){


    $("#Wrap").fullpage({
        navigation: true,
        easing: 'easeOutBounce',
        afterLoad: function(origin, destination, direction){
            $(".section").eq(destination.index).addClass("on").siblings().removeClass("on");
        },
        
        

    });









});