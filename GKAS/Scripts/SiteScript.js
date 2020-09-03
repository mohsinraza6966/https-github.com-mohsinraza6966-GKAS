$(function () {
    SiteScript.Init();
});

SiteScript = {

    globalVar: {
        scrollTop: 0,
        howYouKnowWindow: null,
        CandidateSplashedVideoPopUpWindow: null,
        kendoWindowElement: undefined
    },

    Init: function () {

        //Turn off cache in ajax calls
        $.ajaxSetup({ cache: false });

        this.AdjustPageContentContainer();

        this.ShowNotificationMessage();

        this.OnOrientationChange();

        //Detect browser and show message if browser is not supported or version is old
        this.DetectBrowser();

        this.BindEvents();
        this.DetectResolution();
       // this.InjectSVG();

        this.CheckFloatingLabelsFocus();

    },

    BindEvents: function () {


        //Floating labels in Input Fields
        $('.floating-label-form input').off('focus');
        $('.floating-label-form input').on('focus', function () {
            $(this).closest('.text-field').addClass('has-focus');
        });

        $('.floating-label-form input').off('blur');
        $('.floating-label-form input').on('blur', function () {
            //$(this).closest('.text-field').removeClass('has-focus');
            SiteScript.CheckFloatingLabelsFocus();
        });

        $('.floating-label-form input').off('change');
        $('.floating-label-form input').on('change', function () {
            $wrapper = $(this).closest('.text-field');
            $value = $(this).val();
            if ($value) {
                $wrapper.addClass('has-value');
            } else {
                $wrapper.removeClass('has-value');
            }
        });




        //Show hide search filter panel in Admin side pages
        $(".filter_content").click(function () {
            if ($('.content_search').css('display') === 'block') {

                $(".content_search").slideUp("fast");
                //$(".filter_content span:first").text('Hide Filters');               
            }
            else {
                $(".content_search").slideDown("fast");
                //$(".filter_content span:first").text('Show Filters');

            }


        });


        //On hover hide/show top right dropdown menu

        //$('.dropdown').hover(function () {
        //    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeIn(200);
        //}, function () {
        //    $(this).find('.dropdown-menu').stop(true, true).delay(100).fadeOut(200);
        //});

        //Apply Hover on Activity Bar in Subject Activity

        $(".activity-group-nav ul .activity-group-nav-default").mouseenter(function () {

            if (!$(this).hasClass("activity-group-nav-current")) {

                $(this).find('.fa-dot-circle').css('color', '#03ebd1');
                $(this).find('.vline').css('background-position', 'bottom');
                $(this).find('.week-txt a').css('color', '#03ebd1');
            }
        });

        $(".activity-group-nav ul .activity-group-nav-default").mouseleave(function () {

            if (!$(this).hasClass("activity-group-nav-current")) {

                $(this).find('.fa-dot-circle').css('color', '#c0c0c0');
                $(this).find('.vline').css('background-position', 'center');
                $(this).find('.week-txt a').css('color', '#c0c0c0');
            }
        });


        //Bind side navigation panel button click event
        $('.icon-toggle-button').off('click');
        $('.icon-toggle-button').on('click', function (e) {


            var windowWidth = $(window).width();

            if ($('.orientation-left').length > 0) {

                //SiteScript.NavigationMenuSetting();

            } else {

                $('.site-nav-menu-container').removeClass('nav-menu-close');

            }

            //$('.site-nav-body').toggle('fast', 'swing', function () {
            //    SiteScript.AdjustPageContentContainer();

            //    if ($('.orientation-right').length > 0) {
            //        SiteScript.NavigationMenuSetting();
            //    }
            //});

            if (windowWidth > 768) {
                $('.candidate-menu .site-nav-body').toggleClass('left-menu-close sidemenu-close');
                $('.admin-menu .site-nav-body').toggleClass('left-menu-close sidemenu-close-admin');
                $('.program-name-side-menu').toggleClass('text-show');
            }
            else {
                $('.candidate-menu .site-nav-body').toggleClass('left-menu-close sidemenu-close-complete');
            }


            // handle page content adjustable with sidebar menu
            SiteScript.AdjustPageContentContainer();

            if ($('.orientation-right').length > 0) {
                //SiteScript.NavigationMenuSetting();
            }


        });


        //var evt = document.createEvent("HTMLEvents");
        //evt.initEvent("click", true, true);
        //if (document.getElementById("profile-down-menu")) {
        //    document.getElementById("profile-down-menu").dispatchEvent(evt);
        //}

        //Bind side navigation panel button click event
        $('.profile-down-menu').off('click');
        $('.profile-down-menu').on('click', function (e) {

            $('.dropdown-menu-right').toggle('fast', 'swing');

        });

        $(document).on("click", function (event) {
            var trigger = $(".profile-down-menu");
            if (trigger !== event.target && !trigger.has(event.target).length) {
                $(".dropdown-menu-right").slideUp("fast");
            }
        });


        //Stop zooming browser screen by shortcut keys
        $(document).keydown(function (event) {
            //

            if (event.ctrlKey == true && (event.which == '61' || event.which == '107' || event.which == '173' || event.which == '109' || event.which == '187' || event.which == '189')) {
                event.preventDefault();
            }
        });

        //stop zooming browser screen by ctrl + mousewheel
        $(window).bind('mousewheel DOMMouseScroll', function (event) {
            //

            if (event.ctrlKey == true) {
                event.preventDefault();
            }
        });

        $(window).resize(function () {
            SiteScript.OnOrientationChange();
        });

        $(window).scroll(function () {
            SiteScript.globalVar.scrollTop = $(this).scrollTop();
            if ($(window).scrollTop() > 50) {
                $(".navbar-inverse").addClass("active-header");

            } else {

                $(".navbar-inverse").removeClass("active-header");
            }
        });

        $('.activity-name').off('click');
        $('.activity-name').on('click', function () {


            $('.toggle-activity').hide();
            $(this).find('.toggle-activity').show('fast');
            //$(this).find('.toggle-activity').toggle('fast', 'swing');

            $(this).find('.fa-sort-up').show();
            $(this).find('.fa-caret-down').hide();


            $('.toggle-activity').each(function (index, element) {

                if ($(element).css("display") == "none") {
                    $(element).closest('li').find('.fa-sort-up').hide();
                    $(element).closest('li').find('.fa-caret-down').show();
                }
            });
        });

        $('.site-nav-menu-parent').find('li a').not(".no-spinner").on('click', function (e) {

            $('#pageContent').hide();
            $('#spinner').show();

        });


        //submit candidate "How did you know" answer
        
    },

    ShowHideLeftMenu: function (isShowMenu) {

        var appSetting = JSON.parse(localStorage["Kips.AppVar.AppSetting"]);
        var menuClosed = $('.candidate-menu .site-nav-body').hasClass('left-menu-close');

        //Show menu only if it is closed/hide. OR hide menu 
        if (isShowMenu && menuClosed) {

            $('.icon-toggle-button').first().click();
            //AdjustPageContentContainer

        } else if (!isShowMenu && !menuClosed) {
            $('.icon-toggle-button').first().click();
            //AdjustPageContentContainer
        }
    },

    CheckFloatingLabelsFocus: function () {

        if ($('.floating-label-form .login-field').val() === "") {
            $('.floating-label-form .login-field').closest('.text-field').removeClass('has-focus');
        }
        else {
            $('.floating-label-form .login-field').closest('.text-field').addClass('has-focus');
        }

    },


    AdjustPageContentContainer: function () {

        var widthwin = $(window).width();

        if ($('.orientation-left').hasClass('candidate-menu')) {
            if (widthwin > 768 && widthwin < 1550) {
                if (!$('.candidate-menu .site-nav-body').hasClass('sidemenu-close')) {

                    $(".candidate-parent-container .contentbox").css('margin-left', '175px');
                    $('.question-nav-subject').css('display', 'block');
                    $('.donut-chart-position').css('right', '35px');
                    $('.loadmore-separator').css('width', '63%');


                }
                else {

                    $(".candidate-parent-container .contentbox").css('margin-left', '0px');
                    $('.question-nav-panel').css('padding', '0px');
                    $('.question-nav-subject').css('display', 'none');
                    $('.donut-chart-position').css('right', '7px');
                    $('.loadmore-separator').css('width', '70%');

                }
            }

            if (widthwin > 1000 && widthwin < 1366) {
                if (!$('.candidate-menu .site-nav-body').hasClass('sidemenu-close')) {

                    $(".candidate-parent-container .contentbox").css('margin-left', '250px');
                    $('.question-nav-subject').css('display', 'block');
                    $('.donut-chart-position').css('right', '35px');
                    $('.loadmore-separator').css('width', '63%');


                }
                else {

                    $(".candidate-parent-container .contentbox").css('margin-left', '70px');
                    $('.question-nav-panel').css('padding', '0px');
                    $('.question-nav-subject').css('display', 'none');
                    $('.donut-chart-position').css('right', '7px');
                    $('.loadmore-separator').css('width', '70%');

                }
            }
        }
        else if ($('.orientation-left').hasClass('admin-menu')) {
            if (!$('.admin-menu .site-nav-body').hasClass('sidemenu-close-admin')) {
                $(".admin-parent-container .contentbox").css('margin-left', '250px');
            }
            else {
                $(".admin-parent-container .contentbox").css('margin-left', '0px');
            }
        }



        if (window.location.href.indexOf('Candidate/ActivityContent') > 0
            || window.location.href.indexOf('Candidate/SubjectActivity') > 0
            || window.location.href.indexOf('Candidate/KoogleSearchDetail') > 0) {

            $('.content-wrap').toggleClass("content-container");
        }
    },

    ApplyUrduTextEditor: function () {


        $('.urduTextEditor').each(function (index, element) {
            var urduEditorElement = $(element).data("kendoEditor");
            if (urduEditorElement != undefined) {
                $(urduEditorElement.window).UrduEditor("18px", urduEditorElement.element[0].name);
            } else {
                $(element).UrduEditor("18px");
            }
        });
    },

    DetectBrowser: function () {
        try {

            var showBrowserWarning = false;
            var version = parseFloat($.browser.version);

            // Internet Explorer 6-11
            var isIE = /*@cc_on!@*/false || !!document.documentMode;

            // Edge 20+
            var isEdge = !isIE && !!window.StyleMedia;

            // Chrome 1+
            var isChrome = !!window.chrome && !!window.chrome.webstore;

            // Opera 8.0+
            var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

            // Firefox 1.0+
            var isFirefox = typeof InstallTrigger !== 'undefined';

            // Safari 3.0+ "[object HTMLElementConstructor]" 
            var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);


            if ((isIE && version < 10)
                || (isChrome && version < 55)
                || (isFirefox && version < 53)
                || (isOpera && version < 45)
                || (isSafari && version < 10)) {

                showBrowserWarning = true;
            }

            if (!(isEdge
                || isIE
                || isChrome
                || isFirefox
                || isOpera
                || isSafari)) {

                showBrowserWarning = true;
            }

            //if (showBrowserWarning) {
            //    //SiteScript.MessageBox.ShowWarning("Your internet browser is not supported or outdated. Please updated your browser or switch to latest version of <a href='http://www.google.com/chrome'>Google Chrome</a> for a <span class='bold'>better</span> and <span class='bold'>safer</span> experience.");
            //    SiteScript.MessageBox.ShowWarning(SiteScript.GetApplicationMessage(Kips.AppConstants.ApplicationMessageKey.DetectBrowser_Warning));
            //}

        } catch (e) {

        }

    },

    DetectResolution: function () {

        var windowWidth = $(window).width();

        //hide left menu for small devices
        if (windowWidth < 768) {
            SiteScript.ShowHideLeftMenu(false);
        }
    },

    //NavigationMenuSetting: function () {


    //    if ($('.site-nav-menu-container').hasClass('nav-menu-close')) {
    //        Kips.AppVar.AppSetting.IsNavigationMenuPinned = false;
    //        $('.site-nav-menu-container').addClass('nav-menu-close');


    //    } else {
    //        Kips.AppVar.AppSetting.IsNavigationMenuPinned = true;

    //        $('.site-nav-menu-container').removeClass('nav-menu-close');
    //    }

    //    //Save settings so that next time after page load it could be get
    //    Kips.AppVar.SaveAppSetting();

    //},

    

    OnOrientationChange: function () {
        //

        var media = window.matchMedia("(orientation: portrait)");

        // If there are matches, we're in portrait
        if (media.matches) {
            // Portrait orientation            
            //SiteScript.MessageBox.ShowWarning(SiteScript.GetApplicationMessage(Kips.AppConstants.ApplicationMessageKey.OrientationChange_Warning));
        } else {
            // Landscape orientation
            //alert('landscape');
        }

        SiteScript.AdjustContainersWidthAndHeight();

    },

    AdjustContainersWidthAndHeight: function () {

        //Adjust height of navigation content in site menu
        var windowHeight = $(window).outerHeight();
        var windowWidth = $(window).outerWidth();

        var siteNavMenuContainer = $('.site-nav-menu-container');
        var siteNavMenuContainerHeight = siteNavMenuContainer.outerHeight();
        var logoHeight = siteNavMenuContainer.find('.kips-logo').outerHeight();
        var copyrightHeight = siteNavMenuContainer.find('.copyright-bar').outerHeight();
        var loginButtonBarHeight = siteNavMenuContainer.find('.login-button-bar').outerHeight();

        var siteNavMenu = siteNavMenuContainer.find('.site-nav-menu');
        var pageNavMenu = siteNavMenuContainer.find('.page-nav-menu');
        var calculatedHeight = 0;

        //if (windowHeight < 768) {
        calculatedHeight = siteNavMenuContainerHeight - logoHeight - copyrightHeight - 90;
        pageNavMenu.height(calculatedHeight);
        siteNavMenu.height(calculatedHeight - loginButtonBarHeight);
        //} else {
        //    pageNavMenu.css('height', '');
        //    siteNavMenu.css('height', '');
        //}

    },

    ShowNotificationMessage: function () {

        var messageJsonString = $('#hdnMessage').val();
        if (messageJsonString && Kips.UtilityFunctions.IsJsonString(messageJsonString)) {
            this.ShowMessage(JSON.parse(messageJsonString));
        }
    },

    AddRemoveCssClasses: function () {
        //Add css class to kendo UI dropdown list
        $("span.k-dropdown").removeClass('kendo-dropdown').addClass('kendo-dropdown');
        $("span.k-dropdown-wrap").removeClass('kendo-dropdown-wrap').addClass('kendo-dropdown-wrap');

        $(".k-editor span.k-dropdown").removeClass('kendo-dropdown');
        $("k-editor span.k-dropdown-wrap").removeClass('kendo-dropdown-wrap');

        //Add css class to kendo UI multiselect
        $("div.k-multiselect").removeClass('kendo-multiselect').addClass('kendo-multiselect');
    },

    //Capture ajax error globally 
    AjaxErrorHandler: function () {

        $(document).ajaxError(function (event, request, options) {

            //Redirect to access denied page if request is Forbidden
            if (request.status && request.status === 403) {
                window.location.replace(Kips.AppConstants.URL.Action.AccessDenied);
            }
        });
    },

    //apply tooltip on each element having title attribute
    ApplyKendoTooltip: function () {

        //Kendo UI tooltip
        $('body').find('*[title]').kendoTooltip({
            //width: 130,
            position: "top",
            animation: {
                open: {
                    effects: "fade:in"
                },
                close: {
                    effects: "fade:out",
                    duration: 0
                }
            }
        })//.show();

        //bootstrap tooltip
        //$('body').find('*[title]').tooltip('toggle');
    },

    //Show notification message box for specific interval of time. 
    //take two param, message and type. type could be, success,error,info,warning
    ShowMessage: function (objMessage) {
        if (objMessage == null)
            return;

        var className = '', iconName = '', messageBody = '', heading = '';

        switch (objMessage.Type) {

            case Kips.AppConstants.MessageType.Success:
                className = 'bg-success';
                iconName = 'far fa-check-circle'
                heading = 'Success';
                break;
            case Kips.AppConstants.MessageType.Info:
                className = 'bg-info';
                iconName = 'far fa-info-circle'
                heading = 'Info';
                break;
            case Kips.AppConstants.MessageType.Error:
                className = 'bg-danger';
                iconName = 'far fa-times-circle'
                heading = 'Error';
                break;
            case Kips.AppConstants.MessageType.Warning:
                className = 'bg-warning';
                iconName = 'far fa-exclamation-circle'
                heading = 'Warning';
                break;

            default:
                className = 'alert-info';
                heading = 'Info';
        }

        //Notification Messages        
        $('#notificationMessageContainer').empty();
        var $messagebox = $('<div/>');
        messageBody = '<button type="button" class="close" data-dismiss="alert">&times;</button><strong><h4><i class="' + iconName + '"></i>' + heading + '!</h4></strong>' + objMessage.Message;
        className = 'message-box alert ' + className;
        $messagebox.appendTo('#notificationMessageContainer').removeClass().addClass(className).html(messageBody).show().delay(5000).fadeOut(500);
    },

    MessageBox: {

        ShowSuccess: function (message) {
            SiteScript.ShowMessage({ Message: message, Type: 'Success' });
        },
        ShowError: function (message) {
            SiteScript.ShowMessage({ Message: message, Type: 'Error' });
        },
        ShowWarning: function (message) {
            SiteScript.ShowMessage({ Message: message, Type: 'Warning' });
        },
        ShowInfo: function (message) {
            SiteScript.ShowMessage({ Message: message, Type: 'Info' });
        }
    },

    ShowHideBusyOverlay: function (isShow, message) {
        //Notification Messages
        if (isShow) {
            $('.overlay-busy').show();
        } else {
            $('.overlay-busy').hide();
        }

        if (message && message.length > 0) {
            $('.overlay-busy').find('.message-container').show().text(message);
        }
        else {
            $('.overlay-busy').find('.message-container').empty().hide();
        }
    },

    AjaxFormEventHandler: {
        onAjaxError: function (xhr, status, entityName) {
            if (xhr.statusText == Kips.AppConstants.HttpStatusCode.Forbidden) {
                SiteScript.MessageBox.ShowError(Kips.AppConstants.HttpStatusCodeMessage.Forbidden);
            }
        },
    },

    KendoEventHandler: {
        //------------------- Kendo UI Tabstrip control event handler -----------------------------


        onReloadActiveTab: function (sender) {
            $(sender).data('kendoTabStrip').reload("li.k-state-active");
        },

        //this event fucntion will be called after data has been loaded using kendoui tabstrip control
        //This function is actually used for validating dynamic input fields
        onContentLoad: function (e) {

            var frm = $('form');
            frm.data("unobtrusiveValidation", null);
            frm.data("validator", null);
            $.validator.unobtrusive.parse(frm);

            //calling this function after loading dynamic content from tabstrip control
            SiteScript.AddRemoveCssClasses();

         

          
        },

        //this event will be called each time when tab is selected on clicked. 
        //it will reload tab window and refresh contents each time.
        onTabSelect: function (e) {
            //assign current tabstrip control
            tbStrip = e.sender;

            var index = $(tbStrip.items());
            tbStrip.reload(index);
        },

        //Show loading image as tab is selected in kendo ui tabstrip control
        ShowTabLoading: function (e) {
            var tabstripCtrl = e.sender;

            window.setTimeout(function () {
                kendo.ui.progress(tabstripCtrl.element, true);
            });
        },

        //Hide loading image 
        HideTabLoading: function (e) {
            var tabstrip = e.sender;

            window.setTimeout(function () {
                kendo.ui.progress(tabstrip.element, false);
            });
        },

        //------------------- End Kendo UI Tabstrip control event handler --------------------------

        //------------------- Kendo Upload event handlers --------------------------   
        onUploadError: function (e) {

            if (e.XMLHttpRequest.status == 500) {
                SiteScript.MessageBox.ShowError(e.XMLHttpRequest.statusText);
            }
        },

        //------------------- End Kendo Upload event handlers --------------------------   

        //------------------Kendo Charts Event Handlers-------------------------------

        onRedrawCharts: function (selector) {
            if (selector.data('kendoChart')) {
                selector.data('kendoChart').redraw();
            }
        },


    
        //Show/hide web site areas based on user's access level
       

        ShowOnlyProgramMenuForCandidateSpecificPages: function () {

            var showOnlyProgramMenu = false;

            switch (CurrentPageAction) {
                case "Attempt":
                    showOnlyProgramMenu = (ShowProgramMenu === 'True');
                    break;
                case "ActivityContent":
                    showOnlyProgramMenu = true
                    break;
                default:
                    showOnlyProgramMenu = false
            }


            if (showOnlyProgramMenu) {
                $('.site-nav-menu').find('li').hide();
                $('.site-nav-menu').find('.program-menu-container').show();
                $('.site-nav-menu').find('.program-menu-container li').show();
            }

        },

        //Print DOM element
        printDiv: function (divId, addCurrentPageStyleReferences, customStyle) {

            var cssLinks = '';
            if (addCurrentPageStyleReferences) {

                var cssLinksCollection = $.map($('head').find('link'), function (link, index) {
                    return link.outerHTML;
                });

                cssLinks = cssLinksCollection.join('');
            }

            if (customStyle == null) {
                customStyle = '';
            }

            ////Get the HTML of div having printable contents
            var divElements = $('#' + divId).html();
            var printWindow = window.open('', '_blank', 'height=500,width=700,top=100,left=100');
            printWindow.document.writeln('<html><head><title></title>' + cssLinks + customStyle + '</head><body>');
            //printWindow.document.writeln('</head><body<div class="print-cntr">');
            printWindow.document.writeln(divElements);
            printWindow.document.writeln('</body></html>');
            printWindow.document.close();
            printWindow.focus();

            setTimeout(function () { // necessary for Chrome
                printWindow.print();
                printWindow.close();
            }, 300);

            return true;
        },

        //Call this function from report success
        onReportSuccess: function () {
            $('#loading-cntr').hide();

            //Clear report column filter multiselect
            this.ClearMultiSelect('msReportColumnFilter');
        },

        onReportFailure: function () {
            $('#loading-cntr').hide();

            //Clear report column filter multiselect
            this.ClearMultiSelect('msReportColumnFilter');
        },

        CreateMultiSelect: function (id) {

            var idSelector = '#' + id;

            //Create multiselect for report column filter
            $(idSelector).kendoMultiSelect({
                autoClose: true,
                change: function (e) {

                    //this.wrapper.context.options[2].text

                    //array of all values in list
                    var arrAllValues = [];

                    $(this.element).find('option').each(function (index) {
                        arrAllValues.push(this.value);
                    });

                    //array of selected values in list
                    var arrSelectedValues = this.value();

                    //newly selected value
                    var value = arrSelectedValues[arrSelectedValues.length - 1];

                    //Show all columns           
                    $.each(arrAllValues, function (index, value) {
                        this.ShowHideColumn(value, true);
                    });

                    //Hide selected columns            
                    $.each(arrSelectedValues, function (index, value) {
                        this.ShowHideColumn(value, false);
                    });

                }
            });
        },

        ClearMultiSelect: function (id) {
            var idSelector = '#' + id;
            var ml = $(idSelector).data('kendoMultiSelect');

            if (ml) {
                //clear values
                ml.value({});
            }

        },

        ShowHideColumn: function (columnId, isShow) {
            if (columnId && columnId.length > 0) {

                var columnSelector = 'th#' + columnId;
                var tbl = $(columnSelector).closest('table');
                var columnIndex = tbl.find(columnSelector).index() + 1;
                var columnBody = 'tbody tr td:nth-child(' + columnIndex + ')';

                if (isShow) {
                    $(columnSelector).show();
                    tbl.find(columnBody).show();
                } else {
                    $(columnSelector).hide();
                    tbl.find(columnBody).hide();
                }
            }
        },

        ChangeProgressBarSetting: function (element, percentComplete, text, progressBarType) {

            element.css("width", percentComplete + "%")
                .attr("aria-valuenow", percentComplete)
                .text(text);

            element.removeClass(Kips.AppConstants.ProgressBarType.Success);
            element.removeClass(Kips.AppConstants.ProgressBarType.Info);
            element.removeClass(Kips.AppConstants.ProgressBarType.Warning);
            element.removeClass(Kips.AppConstants.ProgressBarType.Danger);

            element.addClass(progressBarType);
        },

        ApplyQtipOnValidationMessages: function () {
            // Run this function for all validation error messages
            $('.field-validation-error').each(function () {
                // Get the name of the element the error message is intended for
                // Note: ASP.NET MVC replaces the '[', ']', and '.' characters with an
                // underscore but the data-valmsg-for value will have the original characters
                var inputElem = '#' + $(this).attr('data-valmsg-for').replace('.', '_').replace('[', '_').replace(']', '_');

                var corners = ['left center', 'right center'];
                var flipIt = $(inputElem).parents('span.right').length > 0;

                // Hide the default validation error
                $(this).hide();

                // Show the validation error using qTip
                $(inputElem).filter(':not(.valid)').qtip({
                    content: { text: $(this).text() }, // Set the content to be the error message
                    position: {
                        my: corners[flipIt ? 0 : 1],
                        at: corners[flipIt ? 1 : 0],
                        viewport: $(window)
                    },
                    show: { ready: true },
                    hide: false,
                    style: { classes: 'ui-tooltip-red' }
                });
            });
        },

        CustomConfirmationBox: function (message, onOkCallback, onCancelCallback, customData, confirmButtonTitle, cancelButtonTitle) {

            var kendoWindow = $("<div />").kendoWindow({
                title: "Confirm",
                resizable: false,
                modal: true
            });

            this.globalVar.kendoWindowElement = kendoWindow.data("kendoWindow");

            this.globalVar.kendoWindowElement
                .content($("#confirmationBox").html())
                .center().open();



            if (confirmButtonTitle) {

                kendoWindow.find(".confirmation-ok-button").text(confirmButtonTitle);
            }

            if (cancelButtonTitle) {

                kendoWindow.find(".confirmation-cancel-button").text(cancelButtonTitle);
            }
            // Set confirmation message 

            $(".confirmation-message").text(message);

            // return kendoWindow;


            kendoWindow
                .find(".confirmation-ok-button,.confirmation-cancel-button")
                .click(function () {

                    if ($(this).hasClass("confirmation-ok-button")) {
                        // alert("Deleting record...");

                        if (onOkCallback) {
                            onOkCallback(customData);
                        }
                    }
                    else {
                        if (onCancelCallback) {
                            onCancelCallback(customData);
                        }
                    }

                    SiteScript.globalVar.kendoWindowElement.close();

                });

        },

        CustomConfirmationBoxClose: function () {
            if (this.globalVar.kendoWindowElement) {
                this.globalVar.kendoWindowElement.close();
            }
        },

     

        EnableBootstrapTooltip: function () {
            $('[data-toggle="tooltip"]').tooltip({
                container: 'body'
            });
        },

        GetMessage: function (messageKey) {


        },

        FocusSelectAllNumericBox: function () {

            $("input[type=text][data-role='numerictextbox']").on("focus", function () {
                var input = $(this);
                clearTimeout(input.data("selectTimeId")); //stop started time out if any

                var selectTimeId = setTimeout(function () {
                    input.select();
                    // To make this work on iOS, too, replace the above line with the following one. Discussed in https://stackoverflow.com/q/3272089
                    // input[0].setSelectionRange(0, 9999);
                });

                input.data("selectTimeId", selectTimeId);
            }).blur(function (e) {
                clearTimeout($(this).data("selectTimeId")); //stop started timeout
            });
        },

        DisableFormFields: function () {


            //Disable all form input and textarea controls
            $(".body-content input,.body-content textarea").prop("disabled", true);

            //disable all kendo dropdown list controls
            $.each($(".body-content input[data-role=dropdownlist]"), function (index, control) {
                $(control).data('kendoDropDownList').enable(false);
            });

            //disable all kendo multiselect list controls
            $.each($(".body-content select[data-role=multiselect]"), function (index, control) {
                $(control).data('kendoMultiSelect').enable(false);
            });

            $.each($(".body-content input[data-role=datetimepicker]"), function (index, control) {
                $(control).data('kendoDateTimePicker').enable(false);
            });

            //disable all kendo editors in
            $.each($(".body-content textarea[data-role=editor]"), function (index, control) {
                $($(control).data().kendoEditor.body).attr('contenteditable', false);
            });
        },
    }
}


