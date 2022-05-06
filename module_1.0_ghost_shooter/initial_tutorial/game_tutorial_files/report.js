"use strict";

(function () {

    window.C3Web.Reporting = {

        initialise: function () {

            var links = document.querySelectorAll("span.reportLink span.txt");
            for (var i = 0; i < links.length; i++) {
                var link = links[i];
                link.addEventListener("click", function (e) {
                    var thisLink = this;
                    C3Web.Reporting.reportLinkClick(e, thisLink);
                });
            }

        },

        reportLinkClick(e, link) {
            e.preventDefault();

            var mainLinkWrap = link.parentNode;
            var popup = mainLinkWrap.querySelector(".reportPop");
            if (mainLinkWrap.classList.contains("reported"))
            {
                if (popup !== null && popup !== undefined) {
                    popup.style.display = "none";
                }
                return;
            }

            // Get popup
            if (popup === null || popup === undefined) {
                C3Web.Reporting.initialisePopup(mainLinkWrap,
                    mainLinkWrap.getAttribute("data-title"),
                    mainLinkWrap.getAttribute("data-help"));
                popup = mainLinkWrap.querySelector(".reportPop");
            }


            // Hide/show popup on link click
            var visible = popup.style.display === "block";
            if (visible) {
                popup.style.display = "none";
            } else {
                popup.style.display = "block";
            }
        },

        initialisePopup(link, titleText, helpText) {

            var randomID = Math.random();
            link.setAttribute("data-random-id", randomID);

            var div = document.createElement('div');
            div.className = "reportPop";

            var html = C3Web.Reporting.getPopupHTML();
            html = html.split("{TITLE}").join(titleText);
            html = html.split("{HELP}").join(helpText);
            html = html.split("{ID}").join(randomID);
            div.innerHTML = html;

            link.appendChild(div);

            link.querySelector("button.smallButton").addEventListener("click",
                function (e) {
                    C3Web.Reporting.submitReport(e, link);
            });

            window.addEventListener('click', function (e) {
                if (!div.contains(e.target) && !link.contains(e.target)) {
                    div.style.display = "none";
                }
            });
        },

        getPopupHTML() {

            var popup = document.getElementById("ReportPopWrap");
            return popup.innerHTML;
        },

        submitReport(event, link) {
            event.preventDefault();

            // Get form data
            var randomID = link.getAttribute("data-random-id");
            var objectTypeID = link.getAttribute("data-object-type-id");
            var objectID = link.getAttribute("data-object-id");
            var additionalInfo = link.querySelector(".reportPop input[type=text]").value;
            var reportReasonID = "";
            var radios = document.getElementsByName("ReportReason" + randomID);
            for (var i = 0, length = radios.length; i < length; i++) {
                if (radios[i].checked) {
                    reportReasonID = radios[i].value;
                    break;
                }
            }

            // Post data
            {
                var xhr = new XMLHttpRequest();
                xhr.open("POST", "/handlers/reporting/report.ashx");
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                xhr.send(
                    "objectTypeID=" + encodeURIComponent(objectTypeID) +
                    "&objectID=" + encodeURIComponent(objectID) +
                    "&reasonID=" + encodeURIComponent(reportReasonID) + 
                    "&additionalInfo=" + encodeURIComponent(additionalInfo)
                );
            }

            // Close
            link.classList.add("reported");
            var popup = link.querySelector(".reportPop");
            popup.style.display = "none";
        }

    };


    C3Web.Reporting.initialise();

})();