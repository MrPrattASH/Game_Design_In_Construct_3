"use strict";

(function() {
    window.C3Web.Social = {
        openPopup: function(evt, shareURL) {
            var sender = evt.currentTarget;
            evt.preventDefault();

            var url = sender.getAttribute("href");
            var popupWindowWidth = sender.getAttribute("data-pop-width");
            var popupWindowHeight = sender.getAttribute("data-pop-height");
            var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
            var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
            var width = window.innerWidth
                ? window.innerWidth
                : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            var height = window.innerHeight
                ? window.innerHeight
                : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
            var left = ((width / 2) - (popupWindowWidth / 2)) + dualScreenLeft;
            var top = ((height / 2) - (popupWindowHeight / 2)) + dualScreenTop;
            window.open(url,
                "_blank",
                "width=" +
                popupWindowWidth +
                ",height=" +
                popupWindowHeight +
                ",resizable=1,scrollbars=1,status=0,titlebar=0,toolbar=0,menubar=0,left=" +
                left +
                ",top=" +
                top);
            var shareBrand = sender.getAttribute("data-share-brand");
            if (ga) {
                ga("send", "social", shareBrand, "PopupShare", shareURL);
            }
        },

        initClickListeners: function() {
            var containers = document.querySelectorAll("ul.socialShare");
            for (var i = 0; i < containers.length; i++) {
                var container = containers[i];
                var shareURL = container.getAttribute("data-url");

                var socialLinks = container.querySelectorAll("li a");
                for (var x = 0; x < socialLinks.length; x++) {
                    var socialLink = socialLinks[x];
                    socialLink.addEventListener("click", function (event) { C3Web.Social.openPopup(event, shareURL) }, false);
                }
            }
        }
    };
    C3Web.Social.initClickListeners();
})();