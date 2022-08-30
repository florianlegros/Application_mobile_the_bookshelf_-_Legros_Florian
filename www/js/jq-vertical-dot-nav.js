(function($) {

    var default_options = {
        align: "right",
        scroll_speed: 1000,
        dot_size: 10,
        dot_style: "circle",
        dot_color: "#666",
        nav_color: "#fff"
    }


    $.fn.verticalDotNav = function(options) {

        $.extend(default_options, options);

        var nav_height,
            nav_pos_top,
            jq_dots,
            jq_nav,
            nav_styles = {},
            assignStyles,
            nav = "<ul class='vertical-dot-nav'>",
            dot_styles = {},
            sections_arr = [],
            window_height = $(window).height(),
            click_scroll = false;


        this.each(function(index) {
            var container = $(this),
                container_offset = container.offset().top;

            sections_arr.push({
                name: "section-" + index,
                offset: container_offset,
                ref: container
            });
            chapter = index + 1
            nav += "<li class='dot' data-target='section-" + index + "'></li>";
        });

        nav += "</ul>";

        $("body").append(nav);

        jq_nav = $(".vertical-dot-nav"),
            jq_dots = $(".vertical-dot-nav .dot");

        nav_height = jq_nav.height();
        nav_pos_top = (window_height / 2) - (nav_height / 2);

        jq_dots.css(dot_styles);
        jq_nav.css(nav_styles);

        assignStyles = function(target) {
            jq_dots.removeClass("active");
            jq_dots.css("background-color", "transparent");
            target.addClass("active");
            target.css("background-color", default_options.dot_color);
        }

        jq_dots.each(function(index) {

            $(this).on("mouseover", function() {
                $(this).css("background-color", default_options.dot_color);
            }).on("mouseout", function() {
                if ($(this).hasClass("active") === false) {
                    $(this).css("background-color", "transparent");
                }
            })

            $(this).on("click", function() {

                var target_section = sections_arr[index].offset - 70;
                var target = $(this);

                click_scroll = true;
                assignStyles(target);

                $('html,body').animate({
                    scrollTop: target_section
                }, default_options.scroll_speed);

                setTimeout(function() {
                    click_scroll = false;
                }, default_options.scroll_speed);
            })
        })

        var checkScrollPos = function() {

            var scroll_pos = $(window).scrollTop() + 200;

            if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
                target_dot = $(".vertical-dot-nav .dot[data-target='" + sections_arr[sections_arr.length - 1].name + "']");
                assignStyles(target_dot);

            } else {
                for (var i = sections_arr.length - 1; i > -1; i--) {
                    if (sections_arr[i].offset <= scroll_pos) {

                        target_dot = $(".vertical-dot-nav .dot[data-target='" + sections_arr[i].name + "']");
                        assignStyles(target_dot);

                        return;
                    }
                }
            }
        }



        $(window).scroll(function() {
            if (click_scroll) {
                return;
            } else {
                checkScrollPos();
            }
        })

        checkScrollPos();
        return this;
    };


}(jQuery));