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
      'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.0.0-beta.2/leaflet.js'
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

    /*
    // Schedule update interval.
    var self = this;
    setInterval(function() {
      self.updateDom();
    }, 1000);
    */
  },

  // Override dom generator.
  getDom: function() {
    var wrapper = document.createElement('div');
    wrapper.className = 'map-container';

    var mapElement = document.createElement('div');
    mapElement.className = 'map';

    wrapper.appendChild(mapElement);

    var locations = {
        'Oakland': [37.8044, -122.2708, 15],
        'New York': [40.70531887544228, -74.00976419448853, 15],
        'Seattle': [47.5937, -122.3215, 15]
    };

    var map_start_location = locations['New York'];

    /*** Map ***/

    var map = L.map(mapElement, {
      maxZoom: 20,
      zoomControl: false
    });

    /*
    var layer = Tangram.leafletLayer({
      scene: '/modules/map/refill-style-more-labels.yaml',
      attribution: ''
    });

    L.marker(map_start_location).addTo(map)
      .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
      .openPopup();


    window.layer = layer;
    var scene = layer.scene;
    window.scene = scene;

    layer.options.attribution = '';
    */
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

    var key = 'pk.eyJ1IjoibWFkbW9kIiwiYSI6ImNpdHQxMGc4MDA0dXoydW9iZHlidmdtejEifQ.BVT-yz74yE13h4PQf1aALw';
    map.
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=' + key, {
      attribution: '',
      maxZoom: 20
    }).addTo(map);

    /*
    map.setZoom(0);
    for (var i = 0; i < 10000; i++) {
      setTimeout(function() {
        map.zoomIn(i/1000000);
      }, 30*i)
    }
    */

    //layer.addTo(map);

    // Return the wrapper to the dom.
    return wrapper;
  }

});


