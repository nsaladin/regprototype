(function() {
    "use strict";

    var searchInput;
    var autocomplete;

    init();

    var addressForm = {
        street_number: 'street_number',
        route: 'route',
        locality: 'locality',
        administrative_area_level_1: 'administrative_area_level_1',
        postal_code: 'postal_code',
        country: 'country'
    };

    function init() {
        searchInput = document.getElementById('searchTextField');
        autocomplete = new google.maps.places.Autocomplete(searchInput);
        autocomplete.addListener('place_changed', fillInAddress);
    }

    searchInput.addEventListener("change", function() {
        var addr = searchInput.value;
        console.log(addr);
    });

    function fillInAddress() {
        var place = autocomplete.getPlace();

        for (var component in addressForm) {
            document.getElementById(component).value = '';
            document.getElementById(component).disabled = false;
        }

        for (var i = 0; i < place.address_components.length; i++) {
            var addressType = place.address_components[i].types[0];
            if (addressForm[addressType]) {
                var val = place.address_components[i].long_name;
                document.getElementById(addressType).value = val;
            }
        }
        document.getElementById("hidden_elements").style.display = 'block';

    }

})();
