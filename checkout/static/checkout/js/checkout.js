// var stripePublicKey = $('#id_stripe_public_key').text().slice(1, -1);
// var clientSecret = $('#id_client_secret').text().slice(1, -1);
// var stripe = Stripe(stripePublicKey);
// var elements = stripe.elements();

// var style = {
//     base: {
//         color: '#000',
//         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//         fontSmoothing: 'antialiased',
//         fontSize: '16px',
//         '::placeholder': {
//             color: '#aab7c4'
//         }
//     },
//     invalid: {
//         color: '#dc3545',
//         iconColor: '#dc3545'
//     }
// };
// var card = elements.create('card', {style: style});
// card.mount('#card-element');


// // handle realtime validation
// card.on('change', ({error}) => {
//     let displayError = document.getElementById('card-errors');
//     if (error) {
//       displayError.textContent = error.message;
//     } else {
//       displayError.textContent = '';
//     }
//   });
var stripe = Stripe('pk_test_51MvgJBJHKVQkHL7vZp6wh1IDXiDu8QAdCTIFcHqsGA8pNaoI1N3GdkTjQeYdVuiHdAw0D4j9N7Uv2fL7I4lQGDFK00aQNgiFB0');
var elements = stripe.elements();
var elements = stripe.elements();
var style = {
  base: {
    color: "#32325d",
  }
};

var card = elements.create("card", { style: style });
card.mount("#card-element");
card.on('change', ({error}) => {
    let displayError = document.getElementById('card-errors');
    if (error) {
      displayError.textContent = error.message;
    } else {
      displayError.textContent = '';
    }
  });

var form = document.getElementById('order-form');

form.addEventListener('submit', function(ev) {
  ev.preventDefault();
  card.update({ 'disabled': true});
    $('#submit-button').attr('disabled', true);
    $('#payment-form').fadeToggle(100);
    $('#loading-overlay').fadeToggle(100);

  stripe.confirmCardPayment(clientSecret, {
    payment_method: {
      card: card,
    
    }
  }).then(function(result) {
    if (result.error) {
 
      console.log(result.error.message);
      card.update({ 'disabled': false});
            $('#submit-button').attr('disabled', false);
            $('#payment-form').fadeToggle(100);
            $('#loading-overlay').fadeToggle(100);
    } else {
    
      if (result.paymentIntent.status === 'succeeded') {
        form.submit();
      }
    }
  });
});