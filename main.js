function collectPerformanceData() {
    const navigationTiming = window.performance.timing; //On va récup les timing de chargement
    const resources = window.performance.getEntriesByType("resource");
    console.log("Navigation Timing:", navigationTiming);

    // Les différentes données mesurées pour juger la perfomance
    const navigationStart = navigationTiming.navigationStart;
    const loadEventEnd = navigationTiming.domContentLoadedEventEnd;
    const loadTime = loadEventEnd - navigationStart;
    const domReadyTime = navigationTiming.domContentLoadedEventEnd - navigationTiming.navigationStart;
    const redirectTime = navigationTiming.redirectEnd - navigationTiming.redirectStart;
    const appCacheTime = navigationTiming.domainLookupStart - navigationTiming.fetchStart;
    const dnsLookupTime = navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart;
    const tcpTime = navigationTiming.connectEnd - navigationTiming.connectStart;
    const requestTime = navigationTiming.responseStart - navigationTiming.requestStart;
    const responseTime = navigationTiming.responseEnd - navigationTiming.responseStart;

    // On reprend une taille approximative en octets des éléments de la page
    let totalSize = 0;

    resources.forEach((resource) => {
        totalSize += resource.encodedBodySize;
        console.log(`Type: ${resource.initiatorType}, Taille: ${resource.encodedBodySize} octets`);
    });
  
    // Objet reprenant les données de performance
    const performanceData = {
      loadTime,
      domReadyTime,
      redirectTime,
      appCacheTime,
      dnsLookupTime,
      tcpTime,
      requestTime,
      responseTime,
      totalSize
    };

    //console.log("Taille totale des ressources téléchargées :", totalSize, "octets");
  
    // Envoyer les données à l'extension ou à un serveur
    chrome.runtime.sendMessage({ performanceData });
  }
  
  // Exécuter la fonction lorsque la page a terminé de charger
  window.onload = function() {
    collectPerformanceData();
  };