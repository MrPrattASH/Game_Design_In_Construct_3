"use strict";

(function () {

    window.C3Web.Favourites = {
        init: function () {

            var wrappers = document.querySelectorAll(".favouriteWrap");
            for (var i = 0; i < wrappers.length; i++) {
                var wrapper = wrappers[i];
                C3Web.Favourites.initWrapper(wrapper);
            }

        },

        initWrapper: function(wrapper) {

            var tipOpts = {
                position: 'top',
                animation: 'shift',
                duration: 100,
                arrow: true,
                distance: 20,
                flipDuration: 0,
                popperOptions: {
                    modifiers: {
                        preventOverflow: {
                            enabled: false
                        }
                    }
                }
            };

            var favLink = wrapper.querySelectorAll("a[data-action='favourite']")[0];
            favLink.addEventListener("click", C3Web.Favourites.favLinkClick, false);
            tippy(favLink, tipOpts);

            var unFavLink = wrapper.querySelectorAll("a[data-action='unfavourite']")[0];
            unFavLink.addEventListener("click", C3Web.Favourites.unfavLinkClick, false);
            tippy(unFavLink, tipOpts);
            
        },

        favLinkClick: function (event) {
            C3Web.Favourites.linkClick(event, true);
        },
        unfavLinkClick: function (event) {
            C3Web.Favourites.linkClick(event, false);
        },

        linkClick: function (event, favourite) {
            event.preventDefault();

            if (currentUserID === 0) {
                window.location.href = secureRootDomain + "/register?return=" + encodeURIComponent(window.location.href);
                return;
            }

            var link = event.target.parentNode;
            var wrapper = link.parentNode;
            var favLink = wrapper.querySelectorAll("a[data-action='favourite']")[0];
            var unFavLink = wrapper.querySelectorAll("a[data-action='unfavourite']")[0];

            var favourites = parseInt(wrapper.getAttribute("data-total-favourites"));
            var objectTypeID = parseInt(wrapper.getAttribute("data-for-object-type"));
            var objectID = parseInt(wrapper.getAttribute("data-for-object-id"));

            var newFavCount = favourites;
            if (favourite === true) newFavCount++;
            else newFavCount--;

            // Star
            if (favourite === true) {
                wrapper.classList.add("favourited");
                favLink.style.display = "none";
                unFavLink.style.display = "inline";
            } else {
                wrapper.classList.remove("favourited");
                favLink.style.display = "inline";
                unFavLink.style.display = "none";
            }

            // Animate favourite
            if (favourite === true) {
                wrapper.classList.add("animated", "rubberBand");
                ("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend".split(" "))
                    .forEach(function(e) {
                        wrapper.addEventListener(e,
                            function() {
                                wrapper.classList.remove("animated", "rubberBand");
                            },
                            false);
                    });
            }

            // Count
            wrapper.setAttribute("data-total-favourites", newFavCount);
            wrapper.setAttribute("data-original-favourites", favourites);
            wrapper.querySelectorAll("span.countWrapper span")[0].innerHTML = newFavCount;

            var favValue = 1;
            if (favourite === false) favValue = 0;

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/handlers/favourites/do.ashx");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function () {
                var json = JSON.parse(xhr.responseText);

                var success = json.request.status === "ok";
                if (success === false) {
                    var msg = json.request.errorMessage;
                    alert(msg);
                }
            };
            xhr.send(
                "objectTypeID=" + encodeURIComponent(objectTypeID) +
                "&objectID=" + encodeURIComponent(objectID) +
                "&fav=" + encodeURIComponent(favValue) +
                "&canonicalURL=" + encodeURIComponent(canonicalURL)
            );
        }
    };

    C3Web.Favourites.init();
})();
