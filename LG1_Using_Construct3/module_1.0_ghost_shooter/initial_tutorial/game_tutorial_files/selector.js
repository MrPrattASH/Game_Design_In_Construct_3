"use strict";

(function () {

    var currentRegion = 0;

    window.C3Web.RegionSelector = {

        regionLinkClick: function (event) {
            event.preventDefault();
            var overlay = document.getElementById("RegionOverlay");
            var content = overlay.querySelector(".overlayContent");

            var contentLoaded = content.classList.contains("loaded");
            var contentLoading = content.classList.contains("loading");
            if (!contentLoaded && !contentLoading) {

                var regionContent = content.querySelector(".regionContent");

                // Close bar
                {
                    var closeDiv = document.createElement("div");
                    closeDiv.setAttribute("class", "closeBar");

                    var closeLink = document.createElement("a");
                    closeLink.setAttribute("href", "#");
                    closeLink.setAttribute("title", "Close this window");
                    closeLink.addEventListener("click", C3Web.closeAllOverlays, false);


                    var cross = document.createElement("img");
                    cross.setAttribute("width", "28");
                    cross.setAttribute("height", "28");
                    cross.setAttribute("src", defaultStaticResourceDomain + "/images/v" + resourceVersion + "/global/close.svg");
                    closeLink.appendChild(cross);

                    var crossHover = document.createElement("img");
                    crossHover.setAttribute("width", "28");
                    crossHover.setAttribute("height", "28");
                    crossHover.setAttribute("src", defaultStaticResourceDomain + "/images/v" + resourceVersion + "/global/close-hover.svg");
                    closeLink.appendChild(crossHover);

                    closeDiv.appendChild(closeLink);
                    regionContent.appendChild(closeDiv);
                }

                // Header
                {
                    var header = document.createElement("h3");
                    header.innerHTML = "Select Region";
                    regionContent.appendChild(header);
                }

                // Loading image
                {
                    var loadingDiv = document.createElement("div");
                    loadingDiv.setAttribute("class", "loading");

                    var spinner = document.createElement("img");
                    spinner.setAttribute("width", "128");
                    spinner.setAttribute("height", "128");
                    spinner.setAttribute("src", defaultStaticResourceDomain + "/images/v" + resourceVersion + "/loading.svg");
                    spinner.setAttribute("class", "spinner");
                    loadingDiv.appendChild(spinner);

                    var p = document.createElement("p");
                    p.innerHTML = "One moment....";
                    loadingDiv.appendChild(p);

                    regionContent.appendChild(loadingDiv);
                }

                content.classList.add("loading");

                // Load content
                {
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "/handlers/region/regionselector.ashx");
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                    xhr.onload = function () {
                        if (xhr.status === 200) {

                            var json = JSON.parse(xhr.responseText);

                            var ipRegion = parseInt(json.ipRegion);
                            var ipContinent = json.ipRegionContinent;
                            var ipRegionName = json.ipRegionName;

                            currentRegion = parseInt(json.currentRegion);
                            var currentContinent = json.currentContinent;

                            // Main country wrapper
                            var countriesWrapper = document.createElement("div");
                            countriesWrapper.setAttribute("class", "countriesWrapper");


                            // Detected region
                            {
                                if (ipRegion !== currentRegion) {
                                    var p = document.createElement("p");
                                    p.setAttribute("class", "detectedRegion");
                                    p.innerHTML = "Back to ";

                                    var a = document.createElement("a");
                                    a.innerHTML = ipRegionName;
                                    a.setAttribute("href", "#");
                                    a.setAttribute("data-id", ipRegion);
                                    a.addEventListener("click", C3Web.RegionSelector.changeRegion, false);
                                    p.appendChild(a);


                                    regionContent.appendChild(p);
                                }
                            }

                            // Continent top nav
                            {
                                var continentMenu = document.createElement("ul");
                                continentMenu.setAttribute("class", "continentMenu");

                                for (var i = 0; i < json.continents.length; i++) {

                                    var continentName = json.continents[i].name;
                                    var continentCode = json.continents[i].code;

                                    var li = document.createElement("li");
                                    if (currentContinent === continentCode) {
                                        li.setAttribute("class", "selected");
                                    }
                                    li.setAttribute("data-continent", continentCode);

                                    var a = document.createElement("a");
                                    a.setAttribute("href", "#");
                                    a.setAttribute("title", continentCode);
                                    a.setAttribute("data-continent", continentCode);
                                    a.addEventListener("click", C3Web.RegionSelector.changeContinent, false);
                                    a.innerHTML = continentName;

                                    li.appendChild(a);
                                    continentMenu.appendChild(li);
                                }

                                regionContent.appendChild(continentMenu);
                            }

                            // Countries list
                            {
                                for (var i = 0; i < json.continents.length; i++) {

                                    var continentCode = json.continents[i].code;

                                    var colWrapper = document.createElement("div");
                                    colWrapper.setAttribute("class", "countryColWrapper");
                                    colWrapper.setAttribute("data-continent", continentCode);

                                    var list = document.createElement("ul");

                                    for (var c = 0; c < json.continents[i].countries.length; c++) {

                                        var country = json.continents[i].countries[c];
                                        var countryName = country.name;
                                        var countryId = parseInt(country.id);
                                        var localName = country.localName;

                                        var li = document.createElement("li");
                                        if (currentRegion === countryId) {
                                            li.setAttribute("class", "selected");
                                        }
                                        var a = document.createElement("a");
                                        a.innerHTML = countryName;
                                        a.setAttribute("tooltip", localName);
                                        a.setAttribute("href", "#");
                                        a.setAttribute("data-id", countryId);
                                        a.addEventListener("click", C3Web.RegionSelector.changeRegion, false);
                                        li.appendChild(a);

                                        list.appendChild(li);
                                    }
                                    colWrapper.appendChild(list);
                                    
                                    if (continentCode !== currentContinent) {
                                        colWrapper.style.display = "none";
                                    }

                                    countriesWrapper.appendChild(colWrapper);
                                }
                            }

                            regionContent.appendChild(countriesWrapper);

                            content.classList.add("loaded");
                            content.classList.remove("loading");

                            content.querySelector("div.loading").style.display = "none";;

                        } else {
                            console.log(xhr.status);
                        }
                    }
                    xhr.send(encodeURIComponent("t=t"));
                }

            }
            overlay.style.display = "block";
        },
        changeRegion: function (event) {
            event.preventDefault();
            var link = event.target;

            var clickedCountryCode = parseInt(link.getAttribute("data-id"));
            if (currentRegion === clickedCountryCode) {
                C3Web.closeAllOverlays(event);
            } else {

                document.querySelector("div.regionContent div.loading").style.display = "block";
                document.querySelector("div.regionContent .continentMenu").style.display = "none";
                document.querySelector("div.regionContent .countriesWrapper").style.display = "none";
                document.querySelector("div.regionContent h3").innerHTML = "Changing Region..."

                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/handlers/region/change.ashx");
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.onload = function() {
                    if (xhr.status === 200) {
                        location.reload();
                    }
                }
                xhr.send("countryCode=" + encodeURIComponent(clickedCountryCode) + "&canonicalURL=" + encodeURIComponent(canonicalURL));
            }
        },
        changeContinent: function (event) {
            event.preventDefault();

            var link = event.target;
            var continent = link.getAttribute("data-continent");

            // Manage continent menu
            {
                var continentLinks = document.querySelectorAll("ul.continentMenu li.selected");
                for (var i = 0; i < continentLinks.length; i++) {
                    var continentLink = continentLinks[i];
                    continentLink.classList.remove("selected");
                }
                var newSelected = document.querySelector("ul.continentMenu li[data-continent='" + continent + "']");
                newSelected.classList.add("selected");
            }

            // Manage countries list
            {
                var lists = document.querySelectorAll("div.countryColWrapper");
                for (var i = 0; i < lists.length; i++) {
                    var list = lists[i];
                    list.style.display = "none";
                }
                var listToShow = document.querySelector("div.countryColWrapper[data-continent='" + continent + "']");
                listToShow.style.display = "block";
            }
        },
        initRegionSelector: function () {
            if (document.readyState === "complete") {
                var link = document.getElementById("RegionSelectorLink");
                if (link) {
                    link.addEventListener("click", C3Web.RegionSelector.regionLinkClick, false);
                }
                return true;
            } else {
                return setTimeout(C3Web.RegionSelector.initRegionSelector, 1);
            }
        }
    };


    C3Web.RegionSelector.initRegionSelector();

})();