'use strict';

(function () {
  var domLoadHandler = function () {
    window.sections.activate();
    window.hamburger.activate();
  };

  document.addEventListener('DOMContentLoaded', domLoadHandler);
})();
