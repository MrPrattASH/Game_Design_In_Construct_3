"use strict";

(function () {

    window.C3Web.Voting = {

        tippySettings: {
            position: 'top',
            animation: 'shift',
            duration: 100,
            arrow: true,
            distance: 20,
            flipDuration: 0,
            dynamicTitle: true,
            popperOptions: {
                modifiers: {
                    preventOverflow: {
                        enabled: false
                    }
                }
            }
        },

        init: function () {

            var wrappers = document.querySelectorAll(".voteWrapper");
            for (var i = 0; i < wrappers.length; i++) {
                var wrapper = wrappers[i];
                C3Web.Voting.initWrapper(wrapper);
            }

        },

        initWrapper: function(wrapper) {
            
            var upvoteLink = wrapper.querySelectorAll("a.upvote")[0];
            tippy(upvoteLink, C3Web.Voting.tippySettings);
            upvoteLink.addEventListener("click", C3Web.Voting.upvoteClick, false);

            var downvoteLink = wrapper.querySelectorAll("a.downvote")[0];
            tippy(downvoteLink, C3Web.Voting.tippySettings);
            downvoteLink.addEventListener("click", C3Web.Voting.downvoteClick, false);

        },

        upvoteClick: function (event) {
            C3Web.Voting.performVote(event, true);
        },
        downvoteClick: function (event) {
            C3Web.Voting.performVote(event, false);
        },

        performVote: function (event, upvote) {

            event.preventDefault();
            if (currentUserID === 0) {
                window.location.href = secureRootDomain + "/register?return=" + encodeURIComponent(window.location.href);
                return;
            }

            var link = event.target.parentNode;
            var wrapper = link.parentNode;

            var currentScore = parseInt(wrapper.getAttribute("data-original-score"));
            var hasUpvoted = wrapper.getAttribute("data-original-has-upvoted") === "1";
            var hasDownvoted = wrapper.getAttribute("data-original-has-downvoted") === "1";
            if (hasUpvoted && upvote) return;
            if (hasDownvoted && !upvote) return;

            // Set score
            var scoreAdjustment = 0;
            {
                if (hasUpvoted) scoreAdjustment = -2;
                else if (hasDownvoted) scoreAdjustment = 2;
                else {
                    if (upvote) scoreAdjustment = 1;
                    else scoreAdjustment = -1;
                }
            }
            var newScore = currentScore + scoreAdjustment;
            C3Web.Voting.setScore(wrapper, newScore);

            // Set new class
            wrapper.classList.remove("upvoted");
            wrapper.classList.remove("downvoted");
            if (upvote) {
                wrapper.classList.add("upvoted");
            } else {
                wrapper.classList.add("downvoted");
            }

            // Set tooltips
            C3Web.Voting.setTooltips(wrapper);

            // Animate
            C3Web.Voting.animateLink(link);
            C3Web.Voting.animateScore(wrapper);

            var upvoteValue = "0";
            if (upvote) upvoteValue = "1";
            
            var objectTypeID = parseInt(wrapper.getAttribute("data-for-object-type"));
            var objectID = parseInt(wrapper.getAttribute("data-for-object-id"));

            var xhr = new XMLHttpRequest();
            xhr.open("POST", "/handlers/voting/vote.ashx");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.onload = function () {
                console.log(xhr.status);
                if (xhr.status !== 200) {
                    C3Web.Voting.resetToOriginalState(wrapper);
                } else {
                    var json = JSON.parse(xhr.responseText);
                    var success = json.request.status === "ok";
                    if (success === false) {
                        var msg = json.request.errorMessage;
                        alert(msg);
                        C3Web.Voting.resetToOriginalState(wrapper);
                    } else {
                        C3Web.Voting.setOriginalState(wrapper, newScore, upvote);
                    }
                }
            };
            xhr.onerror = function () {
                C3Web.Voting.resetToOriginalState(wrapper);
            };
            xhr.send(
                "objectTypeID=" + encodeURIComponent(objectTypeID) +
                "&objectID=" + encodeURIComponent(objectID) +
                "&upvote=" + encodeURIComponent(upvoteValue) +
                "&canonicalURL=" + encodeURIComponent(canonicalURL)
            );
        },

        // Animate link
        animateLink: function (link) {

            var animation = "rubberBand";
            link.classList.add("animated", animation);
            ("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend".split(" "))
                .forEach(function (e) {
                    link.addEventListener(e,
                        function () {
                            link.classList.remove("animated", animation);
                        },
                        false);
                });
        },

        // Animate score
        animateScore: function (wrapper) {
            
            var animation = "jackInTheBox";

            var scoreSpan = wrapper.querySelectorAll("span.score")[0];
            scoreSpan.classList.add("animated", animation);
            ("webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend".split(" "))
            .forEach(function (e) {
                scoreSpan.addEventListener(e,
                    function () {
                        scoreSpan.classList.remove("animated", animation);
                    },
                    false);
            });
        },

        // When vote succeeds, reset original state to new state
        setOriginalState: function (wrapper, score, upvoted) {
            wrapper.setAttribute("data-original-score", score);
            if (upvoted) {
                wrapper.setAttribute("data-original-has-upvoted", "1");
                wrapper.setAttribute("data-original-has-downvoted", "0");
            } else {
                wrapper.setAttribute("data-original-has-upvoted", "0");
                wrapper.setAttribute("data-original-has-downvoted", "1");
            }
        },

        // If vote fails, resets to original state
        resetToOriginalState: function(wrapper) {

            var originalScore = parseInt(wrapper.getAttribute("data-original-score"));
            var hasUpvoted = wrapper.getAttribute("data-original-has-upvoted") === "1";
            var hasDownvoted = wrapper.getAttribute("data-original-has-downvoted") === "1";

            wrapper.class = "voteWrapper";
            wrapper.classList.remove("upvoted");
            wrapper.classList.remove("downvoted");
            if (hasUpvoted) {
                wrapper.classList.add("upvoted");
            }else if (hasDownvoted) {
                wrapper.classList.add("downvoted");
            }
            C3Web.Voting.setScore(wrapper, originalScore);
            C3Web.Voting.setTooltips(wrapper);
        },

        // Set the displayed score
        setScore: function(wrapper, newScore) {
            wrapper.querySelectorAll("span.score")[0].innerHTML = newScore;
        },

        // When state changes, set tooltips to correct labels
        setTooltips: function(wrapper) {

            var upvoted = wrapper.classList.contains("upvoted");
            var downvoted = wrapper.classList.contains("downvoted");
            
            var upvoteLink = wrapper.querySelectorAll("a.upvote")[0];
            if (upvoted) {
                upvoteLink.setAttribute("title", "You upvoted this");
            } else {
                upvoteLink.setAttribute("title", "Upvote this");
            }

            var downvoteLink = wrapper.querySelectorAll("a.downvote")[0];
            if (downvoted) {
                downvoteLink.setAttribute("title", "You downvoted this");
            } else {
                downvoteLink.setAttribute("title", "Downvote this");
            }
        }
    };

    C3Web.Voting.init();
})();
