"use strict";

(function () {

    var videoMarkupHTML = null;
    var writtenMarkupHTML = null;
    var writtenMarkupTxt = "";
    var videoMarkupTxt = "";

    window.C3Web.TutorialsNew = {
        
        init: function () {

            var i, dropDown;

            // When order is changed
            var orderDropDowns = document.querySelectorAll(".tutOrderDD");
            for (i = 0; i < orderDropDowns.length; i++) {
                dropDown = orderDropDowns[i];
                dropDown.addEventListener("change", function () {
                    document.getElementById("ChangeOrderBtn").click();
                });
            }

            // Mobile nav DD
            var mobileNavDropDown = document.getElementById("MobileNavMenuDD");
            if (mobileNavDropDown !== undefined && mobileNavDropDown !== null) {
                mobileNavDropDown.addEventListener("change",function() {

                    var url = mobileNavDropDown.options[mobileNavDropDown.selectedIndex].getAttribute("data-url");
                    var redir = secureRootDomain + "/" + currentLanguageURLPart + url;
                    window.location.href = redir;
                });
            }

            // Filter changed
            var filterDropDowns = document.querySelectorAll(".filterDD");
            for (i = 0; i < filterDropDowns.length; i++) {
                dropDown = filterDropDowns[i];
                dropDown.addEventListener("change", function () {
                    document.getElementById("ChangeFilterBtn").click();
                });
            }

            // Tutorial form content type changed
            var contentDropDown = document.querySelector(".tutForm select.ctDD");
            if (contentDropDown !== null && contentDropDown !== undefined) {
                contentDropDown.addEventListener("change", function() {
                    var isVideo = this.value === "2";
                    C3Web.TutorialsNew.setVideoSpecificFormElementVisibility(isVideo);
                });

                var currentlyIsVideo = contentDropDown.value === "2";
                C3Web.TutorialsNew.setVideoSpecificFormElementVisibility(currentlyIsVideo);
            }

            // Translation box changed
            var translationOf = document.getElementById("TranslationOf");
            if (translationOf !== null && translationOf !== undefined) {

                "change keyup keydown".split(" ").forEach(function(e) {
                    translationOf.addEventListener(e,
                        function() {

                            var valueLength = translationOf.value.length;
                            C3Web.TutorialsNew.setNotForTranslationElementsVisibility(valueLength === 0);

                        });
                });

                var currentValueLength = translationOf.value.length;
                C3Web.TutorialsNew.setNotForTranslationElementsVisibility(currentValueLength === 0);
            }
        },

        setNotForTranslationElementsVisibility(visible) {
            var notForTranslationElements = document.querySelectorAll(".notForTranslations");
            var style = "block";
            if (visible === false) {
                style = "none";
            }
            for (var i = 0; i < notForTranslationElements.length; i++) {
                var element = notForTranslationElements[i];
                element.style.display = style;
            }
        },

        getMarkupInnerHTML(markupWrap) {
            var wrap = document.createElement('div');
            wrap.appendChild(markupWrap.cloneNode(true));
            return wrap.innerHTML;
        },

        setVideoSpecificFormElementVisibility(visible) {

            // Markup
            {
                var allMarkupWrap = document.getElementById("AllMarkupWrap");
                var videoMarkup = document.getElementById("VideoMarkupWrap");
                var writtenMarkup = document.getElementById("WrittenMarkupWrap");

                // Show video tutorial
                if (visible) {

                    // Hide written markup
                    if (writtenMarkup !== null) {

                        writtenMarkupTxt = writtenMarkup.getElementsByClassName("markupInput")[0].value;
                        writtenMarkupHTML = C3Web.TutorialsNew.getMarkupInnerHTML(writtenMarkup);
                        writtenMarkup.parentNode.removeChild(writtenMarkup);
                    }

                    // Show video markup
                    if (videoMarkup === null) {

                        var child = document.createElement('div');
                        child.innerHTML = videoMarkupHTML;
                        child = child.firstChild;
                        allMarkupWrap.appendChild(child);

                        allMarkupWrap.getElementsByClassName("markupInput")[0].value = videoMarkupTxt;

                    }

                // Show written
                } else {

                    // Hide video markup
                    if (videoMarkup !== null) {
                        videoMarkupTxt = videoMarkup.getElementsByClassName("markupInput")[0].value;
                        videoMarkupHTML = C3Web.TutorialsNew.getMarkupInnerHTML(videoMarkup);
                        videoMarkup.parentNode.removeChild(videoMarkup);
                    }

                    // Show written markup
                    if (writtenMarkup === null) {

                        var child = document.createElement('div');
                        child.innerHTML = writtenMarkupHTML;
                        child = child.firstChild;
                        allMarkupWrap.appendChild(child);

                        allMarkupWrap.getElementsByClassName("markupInput")[0].value = writtenMarkupTxt;

                    }

                }

                if (window.C3Web.MarkupEditor !== undefined) {
                    window.C3Web.MarkupEditor.initClickListeners();
                }

            }

            var videoEls = document.querySelectorAll(".videoSpecificForm");
            for (var i = 0; i < videoEls.length; i++) {
                var videoEl = videoEls[i];
                if (visible === true) {
                    videoEl.style.display = "block";
                } else {
                    videoEl.style.display = "none";
                }
            }

            var writtenEls = document.querySelectorAll(".writtenSpecificForm");
            for (var i = 0; i < writtenEls.length; i++) {
                var writtenEl = writtenEls[i];
                if (visible === false) {
                    writtenEl.style.display = "block";
                } else {
                    writtenEl.style.display = "none";
                }
            }
        }
        
    };

    C3Web.TutorialsNew.init();

})();