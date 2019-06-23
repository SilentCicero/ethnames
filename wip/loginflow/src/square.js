// Set the application ID
const applicationId = "sandbox-sq0idp-EcBv5547FSK_0PlJ4Wz1rg";
var paymentForm = null;

// get card nonce from payment form
function onGetCardNonce(evt) {
  evt.preventDefault();
  paymentForm.requestCardNonce();
}

function buildForm() {
  // Create and initialize a payment form object
  paymentForm = new SqPaymentForm({
    // Initialize the payment form elements
    applicationId: applicationId,
    inputClass: 'sq-input',

    // Customize the CSS for SqPaymentForm iframe elements
    inputStyles: [{
      fontSize: '20px',
      lineHeight: '24px',
      padding: '20px',
      backgroundColor: 'transparent',
    }],

    // Initialize the credit card placeholders
    cardNumber: {
      elementId: 'sq-card-number',
      placeholder: 'Card Number'
    },
    cvv: {
      elementId: 'sq-cvv',
      placeholder: 'CVV'
    },
    expirationDate: {
      elementId: 'sq-expiration-date',
      placeholder: 'MM/YY'
    },
    postalCode: {
      elementId: 'sq-postal-code',
      placeholder: 'Postal'
    },

    // SqPaymentForm callback functions
    callbacks: {
      cardNonceResponseReceived: function (errors, nonce, cardData) {
        if (errors) {
            // Log errors from nonce generation to the browser developer console.
            console.error('Encountered errors:');
            errors.forEach(function (error) {
                console.error('  ' + error.message);
            });
            alert('Encountered errors, check browser developer console for more details');
            return;
        }

        alert(`The generated nonce is:\n${nonce}`);
      }
    },
  });

  paymentForm.build();
}

module.exports = {
  onGetCardNonce,
  buildForm,
};
