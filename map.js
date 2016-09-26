'use strict';

/* global Log, Module, config, L, Tangram */
/* Magic Mirror
 * Module: Map
 *
 * By John Wells https://github.com/user/madmod
 * MIT Licensed.
 */
Module.register('map', {
  // Module config defaults.
  defaults: {
  },

  // Define required scripts.
  getScripts: function() {
    return [
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-beta.2/leaflet.js',
      'https://mapzen.com/tangram/0.6/tangram.min.js'
    ];
  },

  // Define styles.
  getStyles: function() {
    return [
      'map_styles.css',
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-beta.2/leaflet.css'
    ];
  },

  // Define start sequence.
  start: function() {
    Log.info('Starting module: ' + this.name);

    // Schedule update interval.
    var self = this;
    setInterval(function() {
      self.updateDom();
    }, 1000);
  },

  // Override dom generator.
  getDom: function() {
    var wrapper = document.createElement('div');
    wrapper.className = 'map-container';

    var mapElement = document.createElement('div');
    mapElement.className = 'map';
    mapElement.id = 'map';


    var locations = {
        'Oakland': [37.8044, -122.2708, 15],
        'New York': [40.70531887544228, -74.00976419448853, 15],
        'Seattle': [47.5937, -122.3215, 15]
    };

    var map_start_location = locations['Oakland'];

    /*** Map ***/

    var map = L.map('map', {
      maxZoom: 20,
      zoomControl: false
    });

    var layer = Tangram.leafletLayer({
      scene: 'MMM-map/refill-style-more-labels.yaml',
      attribution: ''
    });

    L.marker([37.8044, -122.2708]).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();


    window.layer = layer;
    var scene = layer.scene;
    window.scene = scene;

    layer.options.attribution = '';
    map.attributionControl.setPrefix('');

    /*
    map.touchZoom.disable();
    map.doubleClickZoom.disable();
    map.scrollWheelZoom.disable();
    map.boxZoom.disable();
    map.keyboard.disable();
    */

    // setView expects format ([lat, long], zoom)
    map.setView(map_start_location.slice(0, 3), map_start_location[2]);

    /*
    map.setZoom(0);
    for (var i = 0; i < 10000; i++) {
      setTimeout(function() {
        map.zoomIn(i/1000000);
      }, 30*i)
    }
    */

    function long2tile(lon,zoom) { return (Math.floor((lon+180)/360*Math.pow(2,zoom))); }
    function lat2tile(lat,zoom)  { return (Math.floor((1-Math.log(Math.tan(lat*Math.PI/180) + 1/Math.cos(lat*Math.PI/180))/Math.PI)/2 *Math.pow(2,zoom))); }

    /***** Render loop *****/

    window.addEventListener('load', function () {
        // Scene initialized
        layer.on('init', function() {
        });
        layer.addTo(map);
    });


    /*
    if (placement === 'left' || placement === 'right') {
      digitalWrapper.style.display = 'inline-block';
      digitalWrapper.style.verticalAlign = 'top';
      analogWrapper.style.display = 'inline-block';
      if (placement === 'left') {
        analogWrapper.style.padding = '0 20px 0 0';
        wrapper.appendChild(analogWrapper);
        wrapper.appendChild(digitalWrapper);
      } else {
        analogWrapper.style.padding = '0 0 0 20px';
        wrapper.appendChild(digitalWrapper);
        wrapper.appendChild(analogWrapper);
      }
    } else {
      digitalWrapper.style.textAlign = 'center';
      if (placement === 'top') {
        analogWrapper.style.padding = '0 0 20px 0';
        wrapper.appendChild(analogWrapper);
        wrapper.appendChild(digitalWrapper);
      } else {
        analogWrapper.style.padding = '20px 0 0 0';
        wrapper.appendChild(digitalWrapper);
        wrapper.appendChild(analogWrapper);
      }
    }
    */

    // Return the wrapper to the dom.
    return wrapper;
  }

});


