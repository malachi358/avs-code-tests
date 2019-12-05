//<== JQUERY $ WRAPPER ==>
(function ($, root, undefined) {
	
	$(function () {
		
		'use strict';
		
		// DOM ready, take it away

		// $(document).on('click', 'button.btn-link', function (event) {
		//     //event.preventDefault();
		//     if ( $(this).attr('aria-expanded') === 'true') {
		//     	console.log('yes');
		//     	$(this).find('.card-arrow').toggleClass("flipper")
		//     } else {

		//     }
		// });

		// $(document).ready(function (event) {
		//     //event.preventDefault();
		//     if ( $('button.btn-link').attr('aria-expanded') === 'true') {
		//     	console.log('yesithas');
		//     	$(this).find('.card-arrow').addClass("flipper")
		//     } else {

		//     }
		// });

		// Detect request animation frame
		var scroll = window.requestAnimationFrame ||
		             // IE Fallback
		             function(callback){ window.setTimeout(callback, 1000/60)};
		var elementsToShow = document.querySelectorAll('.show-on-scroll'); 

		function loop() {

		    Array.prototype.forEach.call(elementsToShow, function(element){
		      if (isElementInViewport(element)) {
		        element.classList.add('bottle-is-visible');
		      } else {
		       	element.classList.remove('bottle-is-visible'); 

		      }
		    });

		    scroll(loop);
		}

		// Call the loop for the first time
		loop();

		// Helper function from: http://stackoverflow.com/a/7557433/274826
		function isElementInViewport(el) {
		  // special bonus for those using jQuery
		  if (typeof jQuery === "function" && el instanceof jQuery) {
		    el = el[0];
		  }
		  var rect = el.getBoundingClientRect();
		  return (
		    (rect.top <= 0
		      && rect.bottom >= 0)
		    ||
		    (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
		      rect.top <= (window.innerHeight || document.documentElement.clientHeight))
		    ||
		    (rect.top >= 0 &&
		      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
		  );
		};



		$('document').ready(function()
{
    /* validation */
    $("#register-form").validate({
        rules:
        {
            user_name: {
                required: true,
                minlength: 3
            },
            password: {
                required: true,
                minlength: 8,
                maxlength: 15
            },
            cpassword: {
                required: true,
                equalTo: '#password'
            },
            user_email: {
                required: true,
                email: true
            },
        },
        messages:
        {
            user_name: "Enter a Valid Username",
            password:{
                required: "Provide a Password",
                minlength: "Password Needs To Be Minimum of 8 Characters"
            },
            user_email: "Enter a Valid Email",
            cpassword:{
                required: "Retype Your Password",
                equalTo: "Password Mismatch! Retype"
            }
        },
        submitHandler: submitForm
    });
    /* validation */

    /* form submit */
    function submitForm()
    {
        var data = $("#register-form").serialize();

        $.ajax({

            type : 'POST',
            url  : 'register.php',
            data : data,
            beforeSend: function()
            {
                $("#error").fadeOut();
                $("#btn-submit").html('<span class="glyphicon glyphicon-transfer"></span> &nbsp; sending ...');
            },
            success :  function(data)
            {
                if(data==1){

                    $("#error").fadeIn(1000, function(){


                        $("#error").html('<div class="alert alert-danger"> <span class="glyphicon glyphicon-info-sign"></span> &nbsp; Sorry email already taken !</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Create Account');

                    });

                }
                else if(data=="registered")
                {

                    $("#btn-submit").html('Signing Up');
                    setTimeout('$(".form-signin").fadeOut(500, function(){ $(".signin-form").load("successreg.php"); }); ',5000);

                }
                else{

                    $("#error").fadeIn(1000, function(){

                        $("#error").html('<div class="alert alert-danger"><span class="glyphicon glyphicon-info-sign"></span> &nbsp; '+data+' !</div>');

                        $("#btn-submit").html('<span class="glyphicon glyphicon-log-in"></span> &nbsp; Create Account');

                    });

                }
            }
        });
        return false;
    }
    /* form submit */

});


	});//End jQuery($) Function;
})(jQuery, this);
