import _throttle from 'lodash/throttle';

(function storeLocator () {
  let map = null;
  let markers = [];
  const mapElement = document.querySelector('.store-locator--map');
  const markerElements = Array.from(document.querySelectorAll('.store-locator--map .store-locator--marker'));
  const resultsElement = document.querySelector('.store-locator--results');
  // get options passed from php
  const options = JSON.parse(mapElement.dataset.options);

  let args = {
    center: options.center || {
      lat: -28.076406,
      lng: 153.443729
    },
    zoom: options.zoom || 14,
    scrollwheel: options.scrollwheel === undefined ? true : options.scrollwheel,
    draggable: options.draggable || false,
    disableDefaultUI: options.disableDefaultUI || false
  };

  function initMap () {
    map = new google.maps.Map(mapElement, args);
    markerElements.forEach(markerEl => addMarker(markerEl, map));
    addListeners();
  }

  function addListeners () {
    map.addListener('bounds_changed', _throttle(updateVisible, 200));
  }

  function updateVisible () {
    const bounds = map.getBounds();
    markers.forEach(marker => {
      const isVisible = bounds.contains(marker.getPosition());
      marker.setVisible(isVisible);
      if (!isVisible) marker.infowindow.close();
    });
    renderResults();
  }

  function renderResults () {
    let results = [];
    markers.forEach(marker => {
      if (!marker.visible) return;
      let markerHTML = `
        <div class="store-locator--results--item">
          ${marker.infowindow.content}
        </div>
      `;
      results.push(markerHTML);
    });
    resultsElement.innerHTML = results.join('');
  }

  function addMarker( markerEl, map ) {
    const center = JSON.parse(markerEl.dataset.center);
    const latlng = new google.maps.LatLng( center.lat, center.lng );
    const marker = new google.maps.Marker({
      position: latlng,
      map: map
    });
    markers.push( marker );
    if( markerEl.innerHTML ) {
      marker.infowindow = new google.maps.InfoWindow({
        content: markerEl.innerHTML
      });
      google.maps.event.addListener(marker, 'click', function() {
        marker.infowindow.open( map, marker );
      });
    }
  }

  initMap();
})();