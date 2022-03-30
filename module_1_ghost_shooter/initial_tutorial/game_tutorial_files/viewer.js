"use strict";

(function () {

    window.C3Web.ArticleViewer = {
        init: function() {

            // Print link
            var tabWraps = document.querySelectorAll(".articleRender .tabWrap");
            for (var i = 0; i < tabWraps.length; i++) {
                var tabWrap = tabWraps[i];

                var tabLinks = tabWrap.querySelectorAll("ul.tabs li a.tabLink");
                for (var l = 0; l < tabLinks.length; l++) {
                    var tabLink = tabLinks[l];
                    C3Web.ArticleViewer.onClickTabLink(tabLink);
                }

                var firstLink = tabLinks[0];
                if (firstLink !== undefined && firstLink !== null) {
                    firstLink.click();
                }

            }

        },


        onClickTabLink: function (tabLink) {

            tabLink.addEventListener("click",
                function (event) {
                    event.preventDefault();

                    // Select menu item
                    var ul = tabLink.parentNode.parentNode;
                    var links = ul.querySelectorAll("a.tabLink");
                    for (var l = 0; l < links.length; l++) {

                        var link = links[l];
                        link.parentNode.classList.remove("selected");

                    }
                    tabLink.parentNode.classList.add("selected");

                    var html = tabLink.parentNode.querySelectorAll(".tabInnerContent")[0].innerHTML;
                    var container = tabLink.parentNode.parentNode.parentNode.querySelectorAll(".tabContent")[0];

                    if (ul.classList.contains("firstClicked")) {

                        container.style.opacity = 0;
                        setTimeout(function() {
                            container.innerHTML = html;
                            container.style.opacity = 1;
                        },
                        200);
                    } else {
                        container.innerHTML = html;
                        container.style.opacity = 1;
                        ul.classList.add("firstClicked");
                    }
                    
                }
            );

        }
    };
    C3Web.ArticleViewer.init();
})();
