$(document).ready(function() {
    const $cardHolder = $('#cardHolder');
    const $cardNumber = $('#cardNumber');
    const $expiryDate = $('#expiryDate');
    
    const $cardHolderDisplay = $('#cardHolderDisplay');
    const $cardNumberDisplay = $('#cardNumberDisplay');
    const $cardExpiryDisplay = $('#cardExpiryDisplay');
    const $cardType = $('#cardType');
    
    // Format card number with spaces
    $cardNumber.on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        let formattedValue = '';
        
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        
        $(this).val(formattedValue);
        
        // Update card display
        if (value.length === 0) {
            $cardNumberDisplay.text('•••• •••• •••• ••••');
        } else {
            $cardNumberDisplay.text(formattedValue.padEnd(19, ' '));
        }
        
        // Detect card type
        detectCardType(value);
    });
    
    // Format expiry date
    $expiryDate.on('input', function() {
        let value = $(this).val().replace(/\D/g, '');
        
        if (value.length > 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        
        $(this).val(value);
        
        // Update card display
        if (value.length === 0) {
            $cardExpiryDisplay.text('MM/AA');
        } else {
            $cardExpiryDisplay.text(value);
        }
    });
    
    // Update card holder
    $cardHolder.on('input', function() {
        if ($(this).val().length === 0) {
            $cardHolderDisplay.text('NOM PRÉNOM');
        } else {
            $cardHolderDisplay.text($(this).val().toUpperCase());
        }
    });
    
    // Form submission
    $('#creditCardForm').on('submit', function(e) {
        e.preventDefault();
        alert('Informations de paiement soumises avec succès !');
    });
    
    // Detect card type based on first digits
    function detectCardType(number) {
        let logoUrl = '';

        $cardNumber.css('border-color', null);
        
        if (number.startsWith('4')) {
            logoUrl = 'assets/img/v.png';
            $cardType.removeClass().addClass('card-type card-v');
        } else if (number.startsWith('5')) {
            logoUrl = 'assets/img/m.png';
            $cardType.removeClass().addClass('card-type card-m');
        }else{
            $cardNumber.css('border-color', 'red');
        }
        
        if (logoUrl) {
            $cardType.css('background-image', `url('${logoUrl}')`);
        }
    }

    // Call detectCardType on window resize to adjust logo size
    $(window).on('resize', function() {
        detectCardType($cardNumber.val());
    });
});