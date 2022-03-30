"use strict";

(function () {

    var themeToggler;
    var themeCookieName = "SiteTheme";
    var notificationsLoaded = false;
    var mobile = false;
    var notificationClickHandlerInit = false;

    window.C3Web = {


        notificationDropDownInit: function() {



            var bell = document.getElementById("NotificationsBellWrapper");
            if (!bell) return;

            var allUnreadButton = document.getElementById("MarkAllNotificationsUnread");
            if (allUnreadButton) {
                allUnreadButton.addEventListener("click",
                    function(e) {
                        e.preventDefault();

                        if (!notificationsLoaded) return;

                        
                        var popupContent = document.getElementById("PopUpNotificationsContent");
                        var lis = popupContent.querySelectorAll("li.unread");
                        for (var i = 0; i < lis.length; i++) {
                            lis[i].classList.remove("unread");
                        }

                        var unreadCount = document.getElementById("UnreadCount");
                        unreadCount.innerText = "You're up to date!";

                        var bellWrap = document.getElementById("NotificationsBellWrapper");
                        bellWrap.classList.remove("hasUnread");
                        while (bellWrap.firstChild) {
                            bellWrap.removeChild(bellWrap.firstChild);
                        }
                        bellWrap.innerHTML = "<img src=\"" + allUnreadButton.getAttribute("data-bell-img") + "\" width=\"48\" height=\"48\" />";
                        
                        fetch("/handlers/notifications/markunread.json");
                    }
                );
            }

            var clickPops = document.querySelectorAll(".popper.clickPop");
            for (var c = 0; c < clickPops.length; c++) {

                var clickPop = clickPops[c];
                var parentNode = clickPop.parentNode;
                parentNode.addEventListener("touchstart", function (e) {
                    mobile = true;
                });
                parentNode.addEventListener("click",
                    function (e) {

                        {
                            var clickedLink = e.target;
                            var clickedParent = clickedLink.parentNode;
                            var cont = false;

                            if (
                                clickedLink.classList.contains("notificationBellWrap") ||
                                clickedLink.classList.contains("notificationBellWrap") ||
                                clickedParent.classList.contains("notificationBellWrap") ||
                                clickedParent.classList.contains("notificationBellWrap") ||
                                clickedLink.classList.contains("theAv") ||
                                clickedParent.classList.contains("theAv")
                            ) {
                                cont = true;
                            }
                            if (!cont) return;
                        }
                        
                        var clickPopper = this.querySelectorAll(".popper")[0];
                        if (clickPopper.classList.contains("notificationPopper")) {
                            C3Web.showNotifications();

                            if (mobile === true) {
                                e.preventDefault();
                                e.stopPropagation();
                            }

                        } else {
                            e.preventDefault();
                            e.stopPropagation();
                        }

                        var display = clickPopper.style.display;
                        if (display === "" || display === "none") {
                            clickPopper.style.display = "block";
                        } else {
                            clickPopper.style.display = "none";
                        }
                    }
                );
                parentNode.addEventListener("mouseleave",
                    function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        var clickPopper = this.querySelectorAll(".popper")[0];
                        var display = clickPopper.style.display;
                        if (display === "block") {
                            clickPopper.style.display = "none";
                        }

                    }
                );
                parentNode.addEventListener("mouseenter",
                    function (e) {
                        e.preventDefault();
                        e.stopPropagation();
                        if (mobile) return;
                        var clickPopper = this.querySelectorAll(".popper")[0];
                        if (clickPopper.classList.contains("notificationPopper")) {
                            C3Web.showNotifications();
                        }
                        var display = clickPopper.style.display;
                        if (display === "" || display === "none") {
                            clickPopper.style.display = "block";
                        }
                    }
                );
            }


        },


        showNotifications: function() {
             if (notificationsLoaded) return;
                    notificationsLoaded = true;

                    fetch("/handlers/notifications/get.json")
                        .then(response => response.json())
                        .then(data => {

                            var popupContent = document.getElementById("PopUpNotificationsContent");
                            popupContent.replaceChildren();
                            
                            // Failed, probably not logged in
                            if (data.success === false) {

                                var li = document.createElement("li");
                                li.innerHTML = "<span class=\"notificationFail\">Failed to load your notifications.  Please refresh this page.</span>";
                                popupContent.appendChild(li);

                            } else {

                                var lastRead = new Date(data.lastRead);
                                var notifications = data.notifications;
                                var totalUnread = parseInt(data.unread);

                                var unreadCounter = 0;
                                for (var n = 0; n < notifications.length; n++) {

                                    var notification = notifications[n];
                                    var notificationDate = new Date(notification.unixDate);
                                    var unread = lastRead <= notificationDate;
                                    if (unread) unreadCounter++;
                                    var li = document.createElement("li");
                                    if (notification.relatedObjectID) {
                                        li.setAttribute("data-related-object-id", notification.relatedObjectID);
                                    }
                                    if (notification.relatedObjectTypeID) {
                                        li.setAttribute("data-object-disabled-object-type", notification.relatedObjectTypeID);
                                    }
                                    li.setAttribute("data-notification-id", notification.id);
                                    li.setAttribute("data-type-id", notification.typeID);
                                    if (notification.disabledType) {
                                        li.setAttribute("data-disabled-type", "1");
                                    } else {
                                        li.setAttribute("data-disabled-type", "0");
                                    }

                                    if (notification.canDisableForObject) {
                                        li.setAttribute("data-can-disable-object", "1");
                                    } else {
                                        li.setAttribute("data-can-disable-object", "0");
                                    }
                                    if (notification.isDisabledObject) {
                                        li.setAttribute("data-object-disabled", "1");
                                    } else {
                                        li.setAttribute("data-object-disabled", "0");
                                    }

                                    if (notification.skip) {
                                        li.style.display = "none";
                                    }
                                    if (unread) {
                                        li.classList.add("unread");
                                    }

                                    var target = " target=\"_blank\" ";
                                    if (!notification.newWindow) {
                                        target = "";
                                    }

                                    var url = notification.finalURL;
                                    var anchorOpen = "<a href=\"" + url + "\" " + target + ">";
                                    var anchorClose = "</a>";
                                    if (url === "") {
                                        anchorOpen = "";
                                        anchorClose = "";
                                    }

                                    var iconClass = "";
                                    if (notification.animatedIcon) {
                                        iconClass = " class=\"animated\" ";
                                    }

                                    var parentCat = "";
                                    if (notification.parentCategory) {
                                        parentCat = "<span class=\"parentCat\">" +
                                            notification.parentCategory +
                                            "</span>";
                                    }

                                    var subMenu = "";
                                    if (!notification.hideSubMenu) {
                                        subMenu =
                                            "<a class=\"notificationSubMenu\" href=\"#\"><span></span><span></span><span></span></a>";
                                    }
                                    
                                    li.innerHTML = 
                                        "<div>" + anchorOpen + "<img no-referrer=\"none\" " + iconClass + " loading=\"lazy\" src=\"" + notification.iconURL + "\" width=\"48\" height=\"48\">" + anchorClose + "</div>" + 
                                        "<div>" +
                                        "<div class=\"titleContainer\">" +
                                        "<div>" +
                                        anchorOpen + "<img no-referrer=\"none\" " + iconClass + " loading=\"lazy\" src=\"" + notification.iconURL + "\" width=\"48\" height=\"48\">" + anchorClose + 
                                        "</div>" +
                                        "<div>" +
                                        "<div class=\"notificationTitle\">" + 
                                        parentCat + 
                                        anchorOpen + notification.title + anchorClose +
                                        "<div class=\"notificationDate\">" + notification.timeAgo + "</div>" + 
                                        "</div>" +
                                        "</div>" +
                                        "<div>" + subMenu + "</div>" +
                                        "</div>" +
                                        "<div class=\"notificationContent\">" + notification.htmlContent + "</p>" +
                                        "</div>" +
                                        "</div>";

                                    popupContent.appendChild(li);
                                }
                                
                                var unreadCount = document.getElementById("UnreadCount");
                                if (totalUnread === 0) {
                                    unreadCount.innerText = "You're up to date!";
                                } else if (unreadCount < totalUnread) {
                                    unreadCount.innerText = "Showing " + unreadCounter + " of " + totalUnread + " unread";
                                } else {
                                    unreadCount.innerText = "Showing all " + unreadCounter + " unread";
                                }

                                if (totalUnread > 0) {
                                    document.getElementById("MarkAllNotificationsUnread").style.display = "block";
                                }

                                C3Web.loadNotificationSubMenus();
                            }
                        }
                    );

        },

        notificationSubMenuClick: function(e) {

            var clickedLink = this;
            if (e.target.classList.contains("notificationSubMenu") || (!e.target.classList.contains("sMenu") && e.target.parentNode.classList.contains("notificationSubMenu"))) {
                e.preventDefault();
                e.stopPropagation();
                var subMenu = clickedLink.querySelectorAll(".sMenu");
                if (subMenu && subMenu.length === 1) {
                    clickedLink.removeChild(subMenu[0]);
                    clickedLink.classList.remove("selected");
                } else {
                    
                    C3Web.hideAllNotificationSubMenus();


                    var mainLi = this;
                    while (!mainLi.hasAttribute("data-notification-id")) {
                        mainLi = mainLi.parentNode;
                    }

                    clickedLink.classList.add("selected");

                    var dropDown = document.createElement("div");
                    dropDown.classList.add("sMenu");
                    var menuItems = document.createElement("ul");

                    var item1Container = document.createElement("li");
                    var item1 = document.createElement("a");
                    item1.setAttribute("href", "#");
                    item1.innerHTML = "Delete this notification";

                    item1.addEventListener("click",
                        function (e) {

                            var link = this;
                            e.preventDefault();
                            e.stopPropagation();
                            var notificationID = link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                                .parentNode.parentNode.getAttribute("data-notification-id");


                            var notifications = document.querySelectorAll("[data-notification-id='" + notificationID + "']");
                            for (var n = 0; n < notifications.length; n++) {
                                var notification = notifications[n];
                                notification.parentNode.removeChild(notification);
                            }
                            fetch("/handlers/notifications/delete.json?ID=" + notificationID)
                                .then(response => response.json())
                                .then(data => {
                            });

                        });

                    item1Container.appendChild(item1);
                    menuItems.appendChild(item1Container);

                    if (mainLi.getAttribute("data-can-disable-object") === "1") {
                        var item2Container = document.createElement("li");
                        var item2 = document.createElement("a");
                        item2.setAttribute("href", "#");


                        if (mainLi.getAttribute("data-object-disabled") === "1") {
                            item2.innerHTML = "Re-enable updates on this";
                        } else {
                            item2.innerHTML = "Don't get updates on this";
                        }

                        item2.addEventListener("click",
                            function (ev) {

                                var link = this;
                                ev.preventDefault();
                                ev.stopPropagation();

                                var forLi = link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                                    .parentNode.parentNode;

                                var disable = forLi.getAttribute("data-object-disabled");
                                if (disable === "0") disable = "1";
                                else disable = "0";

                                var forNotificationTypeID = forLi.getAttribute("data-type-id");
                                var forObjectID = forLi.getAttribute("data-related-object-id");
                                var forObjectTypeID = forLi.getAttribute("data-object-disabled-object-type");

                                fetch("/handlers/notifications/disableobject.json?typeID=" + forNotificationTypeID + "&disable=" + disable + "&objectID=" + forObjectID)
                                    .then(response => response.json())
                                    .then(data => {
                                        }
                                );

                                // Change lis
                                var lisToChange = document.querySelectorAll("[data-related-object-id='" + forObjectID + "']");
                                for (var n = 0; n < lisToChange.length; n++) {
                                    var liToChange = lisToChange[n];
                                    if (liToChange.hasAttribute("data-object-disabled-object-type")) {
                                        if (liToChange.getAttribute("data-object-disabled-object-type") === forObjectTypeID) {
                                            liToChange.setAttribute("data-object-disabled", disable);
                                        }
                                    }
                                }


                                C3Web.hideAllNotificationSubMenus();
                            }
                        );
                        item2Container.appendChild(item2);
                        menuItems.appendChild(item2Container);
                    }
                    
                    var item3Container = document.createElement("li");
                    var item3 = document.createElement("a");
                    item3.setAttribute("href", "#");

                    var typeDisabled = mainLi.getAttribute("data-disabled-type") === "1";
                    if (typeDisabled) {
                        item3.innerHTML = "Enable this notification type";
                    } else {
                        item3.innerHTML = "Disable this notification type";
                    }
                    item3.addEventListener("click",
                        function (ev) {

                            var link = this;
                            ev.preventDefault();
                            ev.stopPropagation();

                            var forLi = link.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode
                                .parentNode.parentNode;

                            var disable = forLi.getAttribute("data-disabled-type");
                            if (disable === "0") disable = "1";
                            else disable = "0";

                            var forTypeID = forLi.getAttribute("data-type-id");

                            fetch("/handlers/notifications/typesetting.json?typeID=" + forTypeID + "&disable=" + disable)
                                .then(response => response.json())
                                .then(data => {
                                }
                            );

                            // Change lis
                            var lisToChange = document.querySelectorAll("[data-type-id='" + forTypeID + "']");
                            for (var n = 0; n < lisToChange.length; n++) {
                                var liToChange = lisToChange[n];
                                liToChange.setAttribute("data-disabled-type", disable);
                            }

                            C3Web.hideAllNotificationSubMenus();
                        }
                    );

                    item3Container.appendChild(item3);
                    menuItems.appendChild(item3Container);

                    var item4Container = document.createElement("li");
                    var item4 = document.createElement("a");
                    item4.setAttribute("href", secureRootDomain + "/" + currentLanguageURLPart + "/notification-settings");
                    item4.innerHTML = "Notification settings";
                    item4Container.appendChild(item4);
                    menuItems.appendChild(item4Container);
                    
                    dropDown.appendChild(menuItems);
                    clickedLink.appendChild(dropDown);
                }
            }
        },

        loadNotificationSubMenus: function() {

            var menus = document.querySelectorAll("a.notificationSubMenu");
            for (var i = 0; i < menus.length; i++) {
                var menu = menus[i];
                menu.removeEventListener("click", C3Web.notificationSubMenuClick);
                menu.addEventListener("click", C3Web.notificationSubMenuClick);
            }

            if (!notificationClickHandlerInit) {
                notificationClickHandlerInit = true;

                document.addEventListener("click", function (e) {

                    if (e.target.classList.contains("notificationSubMenu") || (!e.target.classList.contains("sMenu") && e.target.parentNode.classList.contains("notificationSubMenu"))) {
                        return;
                    }

                    if (!e.target.classList.contains("sMenu")) {
                        C3Web.hideAllNotificationSubMenus();
                    }

                });
            }

        },

        hideAllNotificationSubMenus: function () {
            var menus = document.querySelectorAll("a.notificationSubMenu");
            for (var i = 0; i < menus.length; i++) {
                var menu = menus[i];
                menu.classList.remove("selected");
                var subMenu = menu.querySelectorAll(".sMenu");
                if (subMenu && subMenu.length > 0) {
                    menu.removeChild(subMenu[0]);
                }
            }
        },

        loadDeferredCSS: function () {

            for (var i = 0; i < deferredCSS.length; i++) {
                var cssURL = deferredCSS[i];
                var stylesheet = document.createElement("link");
                stylesheet.href = cssURL;
                stylesheet.rel = "stylesheet";
                stylesheet.type = "text/css";
                document.getElementsByTagName("head")[0].appendChild(stylesheet);
            }
        },


        langSel(link) {

            var parent = link.parentNode;
            var selector = parent.getElementsByClassName("languageSelector")[0];

            var initialised = selector.classList.contains("selector");
            if (!initialised) {

                document.addEventListener('click', function (e) {
                    var el = e.target.closest("li.language");
                    if (!el) {
                        selector.classList.remove("show");
                    }
                });

                var links = selector.querySelectorAll("a");
                for (var i = 0; i < links.length; i++) {
                    links[i].onclick = function(event) {

                        event.preventDefault();

                        var link = this;
                        if (link.classList.contains("selected")) {
                            selector.classList.remove("show");
                            return;
                        }

                        // Set language
                        var languageID = link.getAttribute("data-language-ID");
                        var xhr = new XMLHttpRequest();
                        xhr.open("POST", "/handlers/language/set.ashx");
                        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                        xhr.onload = function () {
                            if (xhr.status === 200) {

                                // Get URL fragment
                                var urlFragment = link.getAttribute("data-url-fragment");
                                var newURL = canonicalURL;
                                if (urlFragment !== "") {
                                    newURL = "/" + urlFragment + newURL;
                                }
                                // Homepage
                                if (canonicalURL === "/") {

                                    // Default language
                                    if (urlFragment === "") {
                                        newURL = "";
                                    } else {
                                        newURL = "/" + urlFragment;
                                    }
                                }

                                var langText = link.innerText;
                                var selectedLink = link.parentNode.parentNode.querySelectorAll("a.selected")[0];
                                selectedLink.classList.remove("selected");
                                link.classList.add("selected");
                                var tick = selectedLink.querySelectorAll("span")[0];
                                link.insertBefore(tick, link.firstChild);

                                parent.querySelectorAll("span.currLang")[0].innerText = langText;
                                selector.classList.remove("show");

                                window.location.href = secureRootDomain + newURL;

                            }
                        }
                        xhr.send("languageID=" + encodeURIComponent(languageID));
                    };
                }


                selector.classList.add("initialised");
            }

            var visible = selector.classList.contains("show");
            if (visible) {
                selector.classList.remove("show");
            } else {
                selector.classList.add("show");
            }

            return false;
        },
        
        replaceAll: function(original, find, replacement) {
            return original.split(find).join(replacement);
        },

        isOnMobile: function () {
            return (window.innerWidth <= 800 && window.innerHeight <= 600);
        },

        // Get canonical URL
        getCanonicalURL: function() {
            return document.querySelector("link[rel='canonical']").getAttribute("href");
        },

        // Get query string param
        getQuerystring: function getParameterByName(name, url) {
            if (!url) {
                url = window.location.href;
            }
            name = name.replace(/[\[\]]/g, "\\$&");
            var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return "";
            return decodeURIComponent(results[2].replace(/\+/g, " "));
        },

        // Get cookie value
        readCookie: function(name) {
            var nameEq = name + "=";
            var ca = document.cookie.split(";");
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === " ") c = c.substring(1, c.length);
                if (c.indexOf(nameEq) === 0) return c.substring(nameEq.length, c.length);
            }
            return null;
        },
        writeCookie: function (key, value, days) {
            const date = new Date();
            days = days || 365;
            date.setTime(+ date + (days * 86400000));
            window.document.cookie = key + "=" + value + "; expires=" + date.toGMTString() + "; secure; path=/";
            return value;
        },

        // Show an error on a DOM element
        showError: function(sender, message) {

            C3Web.hideError(sender);

            var errorClass = "error field";
            var error = document.createElement("div");
            error.innerHTML = message;
            error.className = errorClass;
            C3Web.insertAfter(error, sender);
        },

        // Hide error on a DOM element
        hideError: function(sender) {
            var nextSibling = sender.nextSibling;
            if (nextSibling != null && nextSibling.className === "error field") {
                sender.parentNode.removeChild(nextSibling);
            }
        },

        // Insert an element directly after another
        insertAfter: function(newElement, targetElement) {
            var parent = targetElement.parentNode;
            if (parent.lastChild == targetElement) {
                parent.appendChild(newElement);
            } else {
                parent.insertBefore(newElement, targetElement.nextSibling);
            }
        },
        
        // OVERLAYS
        initOverlay: function () {

            var overlays = document.querySelectorAll("div.overlay");
            for (var i = 0; i < overlays.length; i++) {
                var overlay = overlays[i];

                overlay.addEventListener("click", C3Web.overlayClick, false);
            }
        },
        overlayClick: function (event) {
            var link = event.target;
            if (link.classList.contains("overlay") && !link.classList.contains("uncloseable")) {
                link.style.display = "none";
            }
        },
        closeAllOverlays: function (event) {
            event.preventDefault();
            var overlays = document.querySelectorAll("div.overlay");
            for (var i = 0; i < overlays.length; i++) {
                var overlay = overlays[i];
                overlay.style.display = "none";
            }
        },

        // Auto focus
        doAutoFocus: function () {
            
            var e = document.querySelector(".autoFocus");
            if (e === null || e === undefined) return;
            var val = e.value;
            e.value = "";
            e.focus();
            e.value = val;
        },


        closeUserMenu(link) {

            // Open menu
            var mobile = document.querySelectorAll(".topNav .accountLinks .popper")[0];
            var isMobileMenu =
                (mobile.currentStyle ? mobile.currentStyle.display : getComputedStyle(mobile, null).display) === "none";
            if (isMobileMenu) {
                C3Web.showMobileTopMenu("LoggedInMenu");
                return false;
            }

            var popup = link.parentNode.getElementsByClassName("popper")[0];
            if (popup === undefined) return false;
            
            var visibility = popup.style.visibility;
            var visible = visibility !== "hidden";
            if (visible) {
                popup.style.visibility = "hidden";
            } else {
                popup.style.visibility = "visible";
            }

            link.onmouseout = function() {
                popup.style.visibility = "";
                link.onmouseout = null;
            };

            return false;
        },

        showPopper(clickedLink) {

        },

        showMobileTopMenu(selectedMenuElID) {

            var mobileMenuContent = document.getElementById("MobileMenuContent");
            mobileMenuContent.style.visibility = "visible";
            mobileMenuContent.style.zIndex = "3";

            var closer = mobileMenuContent.getElementsByClassName("closer")[0];
            closer.style.WebkitTransition = "transform 700ms";
            closer.style.MozTransition = "transform 500ms";
            closer.style.webkitTransform = "scale(1)";
            closer.style.transform = "scale(1)";

            var homelink = mobileMenuContent.getElementsByClassName("homelink")[0];
            homelink.style.WebkitTransition = "transform 700ms";
            homelink.style.MozTransition = "transform 500ms";
            homelink.style.webkitTransform = "scale(1)";
            homelink.style.transform = "scale(1)";
            

            var inner = mobileMenuContent.getElementsByClassName("mobileInner")[0]; 
            inner.style.width = "90%";

            var hider = mobileMenuContent.getElementsByClassName("mobileHider")[0];
            hider.style.opacity = "1";
            hider.style.display = "block";

            if (selectedMenuElID !== undefined && selectedMenuElID !== null) {
                C3Web.openSpecifiedMobileMenuSubMenu(selectedMenuElID);
            }

            return false;
        },

        openSpecifiedMobileMenuSubMenu(menuLiID) {

            var topMenu = document.getElementById("TopMobileMenu");
            var selectedLis = topMenu.querySelectorAll("li.selected");
            for (var i = 0; i < selectedLis.length; i++) {
                selectedLis[i].classList.remove("selected");
            }

            var openMenu = document.getElementById(menuLiID);
            if (openMenu !== undefined && openMenu !== null) {
                openMenu.classList.add("selected");
            }
        },

        hideMobileTopMenu() {
            var mobileMenuContent = document.getElementById("MobileMenuContent");

            var closer = mobileMenuContent.getElementsByClassName("closer")[0];
            closer.style.WebkitTransition = "transform 200ms";
            closer.style.MozTransition = "transform 200ms";
            closer.style.webkitTransform = "scale(0)";
            closer.style.transform = "scale(0)";

            var homelink = mobileMenuContent.getElementsByClassName("homelink")[0];
            homelink.style.WebkitTransition = "transform 200ms";
            homelink.style.MozTransition = "transform 200ms";
            homelink.style.webkitTransform = "scale(0)";
            homelink.style.transform = "scale(0)";



            var inner = mobileMenuContent.getElementsByClassName("mobileInner")[0];
            inner.style.width = "0";

            var hider = mobileMenuContent.getElementsByClassName("mobileHider")[0];
            hider.style.opacity = "0";
            

            setTimeout(function () {
                mobileMenuContent.style.zIndex = "-100";
                mobileMenuContent.style.visibility = "hidden";
                hider.style.display = "none";

            }, 200);


            return false;
        },

        mobileSubMenu(link) {

            var parent = link.parentNode;

            var subMenu = parent.getElementsByClassName("subMenu")[0];
            if (subMenu === undefined) return false;

            if (parent.classList.contains("selected")) {
                parent.classList.remove("selected");
            } else {

                // Remove all other selected
                var list = parent.parentNode;
                var selected = list.querySelectorAll("li.selected");
                for (var i = 0; i < selected.length; i++) {
                    selected[i].classList.remove("selected");
                }
                parent.classList.add("selected");
            }
            

            return false;

        },

        loadThemes() {

            if (!enableThemes) return;

            themeToggler = document.getElementById("ThemeToggler");
            themeToggler.addEventListener("change", C3Web.themeChanged);

            // If no cookie set, go dark if user pref set
            var cookieValue = C3Web.readCookie(themeCookieName);

            if (cookieValue === null) {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    themeToggler.checked = true;
                    C3Web.themeChanged();
                }
            } else {
                var darkTheme = C3Web.readCookie(themeCookieName) === "1";
                if (darkTheme) {
                    themeToggler.checked = true;
                }
            }
        },

        themeChanged: function() {
            
            var cookieValue, disable;
            const styleSheets = document.querySelectorAll("link[data-dark-theme=\"1\"]");

            // Dark
            if (themeToggler.checked) {
                disable = false;
                cookieValue = "1";
            }
            // Light
            else {
                disable = true;
                cookieValue = "0";
            }

            for (let i = 0; i < styleSheets.length; i++) {
                styleSheets[i].disabled = disable;
            }
            C3Web.writeCookie(themeCookieName, cookieValue, 360);
        }

    };

    document.addEventListener("DOMContentLoaded", C3Web.loadThemes);
    document.addEventListener("DOMContentLoaded", C3Web.doAutoFocus);
    document.addEventListener("DOMContentLoaded", C3Web.initLazyLoadImages);
    document.addEventListener("DOMContentLoaded", C3Web.initOutlinkTracking);
    document.addEventListener("DOMContentLoaded", C3Web.loadDeferredCSS);
    document.addEventListener("DOMContentLoaded", C3Web.initOverlay);
    document.addEventListener("DOMContentLoaded", C3Web.notificationDropDownInit);

})();