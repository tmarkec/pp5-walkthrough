var stripe = Stripe('pk_test_51MvgJBJHKVQkHL7vZp6wh1IDXiDu8QAdCTIFcHqsGA8pNaoI1N3GdkTjQeYdVuiHdAw0D4j9N7Uv2fL7I4lQGDFK00aQNgiFB0');
var elements = stripe.elements();

var style = {
    base: {
        color: '#000',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
            color: '#aab7c4'
        }
    },
    invalid: {
        color: '#dc3545',
        iconColor: '#dc3545'
    }
};
var card = elements.create('card', {style: style});
card.mount('#card-element');


// handle realtime validation
card.on('change', ({error}) => {
    let displayError = document.getElementById('card-errors');
    if (error) {
      displayError.textContent = error.message;
    } else {
      displayError.textContent = '';
    }
  });