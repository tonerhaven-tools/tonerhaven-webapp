import React, { useEffect } from 'react';

export default function LiveChat() {
  useEffect(() => {

    var s1 = document.createElement("script");
    s1.async = true;
    s1.src = 'https://embed.tawk.to/64ea7c4db2d3e13950ec4b90/1h8pvb4at';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    document.body.appendChild(s1);

    var removeBranding = function() {
      try {
        var element = document.querySelector("iframe[title*=chat]:nth-child(2)").contentDocument.querySelector(`a[class*=tawk-branding]`)
        if (element) {
          element.remove()
        }
      } catch (e) {
        console.log("Couldn't remove branding.");
      }
    }

    var tick = 100;
    const interval = setInterval(removeBranding, tick);

    return () => clearInterval(interval);
  }, []);

  return null;
}
