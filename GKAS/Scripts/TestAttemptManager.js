var testAttemptFormManager = new TestAttemptFormManager();

$(function () {
    testAttemptFormManager.Init();
});

function TestAttemptFormManager() {

    that: this;
    var CandidateTestContainerType= {
        TestAttempt: "testattempt",
        TestResult: "testresult",
        TestDetail: "testdetail"
    }
    
    var globalVar = {
        AppHost: "http://localhost/GKAS/",
        TestAttemptViewModel: undefined,
        questionHintWindow: undefined,
        TotalQuestionCount: 0,
        CurrentQuestionIndex: -1,
        CurrentCATQuestion: 1,
        QuestionList: [],
        TempStartTime: undefined,
        ViewResultDetail: false,
        CandidateTestInterval: undefined,
        CurrentCandidateTestContainerType: "testresult",
        CandidateTestService: {
            TestAttempt: "http://localhost/GKAS/api/CandidateTestService/GetTestAttempt",
            TestResultDetail:"http://localhost/GKAS/api/CandidateTestService/GetTestResultDetail",
            TestResult: "http://localhost/GKAS/api/CandidateTestService/GetTestResult",
            SaveTest: "http://localhost/GKAS/api/CandidateTestService/SaveTest",
            GetSOSProgress:"http://localhost/GKAS/api/CandidateTestService/GetSOSProgress",
            TestList: "http://localhost/GKAS/api/CandidateTestService/GetTestList"
        },
    };

    var domElement = {}

    this.Init = function () {
        InitializeVariables();
        Initialization();
        BindEvents();
    }

    function InitializeVariables() {

        domElement = {
            container: $('.container'),
            siteNavMenu: $('.site-nav-menu'),
            siteNavMenuParent: $('.site-nav-menu-parent'),
            pageNavMenu: $('.page-nav-menu'),
            divQuestionBody: $('#divQuestionBody'),
            divQuestionOptionA: $('#divQuestionOptionA'),
            divQuestionOptionB: $('#divQuestionOptionB'),
            divQuestionOptionC: $('#divQuestionOptionC'),
            divQuestionOptionD: $('#divQuestionOptionD'),
            divQuestionOptionE: $('#divQuestionOptionE'),
            lblQuestionNumber: $('#lblQuestionNumber'),
            lblQuestionNumberShort: $('#lblQuestionNumberShort'),
            divQuestionNavigationPanel: $('#divQuestionNavigationPanel'),
            divQuestionOption: $('.div-question-option'),
            divOptionA: $('#divOptionA'),
            divOptionB: $('#divOptionB'),
            divOptionC: $('#divOptionC'),
            divOptionD: $('#divOptionD'),
            divOptionE: $('#divOptionE'),

            hintContainer: $('#hintContainer'),
            hintDescription: $('#hintDescription'),
            hintDescriptionWindow: $('#hintDescriptionWindow'),
            hintWindow: $('.hint-class'),

            divCandidateAnswer: $('#divCandidateAnswer'),
            divdurationremainingquestion: $('#divdurationremainingquestion'),
            rdoA: $('#rdoA'),
            rdoB: $('#rdoB'),
            rdoC: $('#rdoC'),
            rdoD: $('#rdoD'),
            rdoE: $('#rdoE'),
            btnNext: $('#btnNext'),
            btnPrev: $('#btnPrev'),
            btnFinish: $('#btnFinish'),
            CandidateTestAttemptContainer: $('#CandidateTestAttemptContainer'),
            CandidateTestResultContainer: $('#CandidateTestResultContainer'),

            lblTestName: $('#lblTestName'),
            lblTestSubjects: $('#lblTestSubjects'),
            lblTestTopics: $('#lblTestTopics'),
            lblTestDate: $('#lblTestDate'),
            divSubjectTestResult: $('#divSubjectTestResult'),
            divTestTopicResult: $('#divTestTopicResult'),
            lnkResultDetail: $('#lnkResultDetail'),

            StartTestContainer: $('#StartTestContainer'),
            lblProgramName: $('#lblProgramName'),
            lblTestHeading: $('#lblTestHeading'),
            lblSubjectName: $('#lblSubjectName'),
            lblTopics: $('#lblTopics'),
            lblTotalQuestions: $('#lblTotalQuestions'),
            lblDuration: $('#lblDuration'),
            lblUnattemptedQuestions: $('#lblUnattemptedQuestions'),
            lblTotalCorrectQuestions: $('#lblTotalCorrectQuestions'),
            lblTotalIncorrectQuestions: $('#lblTotalIncorrectQuestions'),
            btnStartTest: $('#btnStartTest'),

            divTestDuration: $('#divTestDuration'),
            divRemainingTime: $('#divRemainingTime'),
            //CandidateResultPieChart: $('#CandidateResultPieChart'),
            TestResultPieChart: $('#TestResultPieChart'),
            //CandidateResultColumnChart: $('#CandidateResultColumnChart'),
            lblTotalMarks: $('#lblTotalMarks'),
            lblTotalPercentage: $('#lblTotalPercentage'),
            hfTestId: $('#hfTestId'),
            hfSOSId: $('#hfSOSId'),
            hfCandidateSOSId: $('#hfCandidateSOSId'),
            hfTestType: $('#hfTestType'),
            hfShowExplanation: $('#hfShowExplanation'),
            hfShowHint: $('#hfShowHint'),
            hfShowDetailResult: $('#hfShowDetailResult'),
            hfShowCorrectAnswer: $('#hfShowCorrectAnswer'),

            hfUserId: $('#hfUserId'),
            hfViewResult: $('#hfViewResult'),
            candidateTestContainer: $('.student-test-container'),

            questionNavPanel: $('.question-nav-panel'),
            lblProgramHeading: $('.test-category-heading'),
            hfIsTestAttempted: $('#hfIsTestAttempted'),

            btnTabularResult: $('#lnkTabularResult'),
            btnPieResult: $('#lnkPieResult'),
            btnBarResult: $('#lnkBarResult'),

            candidateResultView: $('.student-result-view'),
            divTabularView: $('#divTabularView'),
            divPieChart: $('#divPieChart'),
            //divBarChart: $('#divBarChart'),

            lblTestQuestionCountForResult: $('#lblTestQuestions'),
            lblTestDurationForResult: $('#lblTestDuration'),

            divTestStopWatch: $('#divTestStopWatch'),
            divTestCircleTime: $('#divTestCircleTime'),
            divTestResultLegend: $('#divTestResultLegend'),
            divTestResultLegendMain: $('#divTestResultLegendMain'),
            divRemainingQuestions: $('#divRemainingQuestions'),

            testAttemptQuestionHeader: $('.test-attempt-question-header'),
            testAttemptQuestionBody: $('.test-attempt-question-body'),
            testAttemptQuestionFooter: $('.test-attempt-question-footer'),

            btnCancelTest: $('#btnCancelTest'),
            btnBack: $('#btnBack'),
            //circle_animation: $('.circle_animation'),
            btnFirst: $('#btnFirst'),
            btnLast: $('#btnLast'),

            lnkBtnBack: $('#lnkBtnBack'),

            hdnBackUrl: $('#hdnBackUrl'),
            divQuestionDetail: $('#divQuestionDetail'),
            lblQuestionExplantion: $('#lblQuestionExplantion'),

            makeRadio: $('input[type=checkbox][data-makeRadio]'),
            hfStartTime: $('#hfStartTime'),

            kendoTopicTestResult: $('#kendoTopicTestResult'),
            kendoSubjectTestResult: $('#kendoSubjectTestResult')

        };
    }

    function Initialization() {
        debugger
        // if view result param is true then show test result section //
        if (domElement.hfViewResult.val() == "result") {
            GetCandidateTestResult();
        }
        else if (domElement.hfViewResult.val() == "detail") {



            PrepareResultScreen();
            ViewCandidateTestResultDetail();
            domElement.divTestCircleTime.html(''); //$('#divTestCircleTime').html('');
            appendQuestionNavigationPanelInSiteMenu();
            //domElement.divTestResultLegend.show();
            domElement.divTestResultLegendMain.show();
        }
        else {
            domElement.divTestResultLegend.hide();
            //"CAT"
            if (domElement.hfTestType.val() == "1") {
                domElement.btnFirst.hide();
                domElement.btnLast.hide();
                domElement.btnPrev.hide();
                GetQuestionForCAT();

                ShowHideAnswerOptions(globalVar.CurrentQuestionIndex, '', '', '');
            }
            else {
                GetQuestionsListForTest();

                ShowHideAnswerOptions(globalVar.CurrentQuestionIndex, '', '', '');
            }
        }

        CreateQuestionHintWindow();
        //remove bottom space 
        $('.body-content').css('padding-bottom', '0');
        $('[data-toggle="popover"]').popover();
    }

    function BindEvents() {

        domElement.lnkBtnBack.off('click');
        domElement.lnkBtnBack.on('click', function (e) {

            if (window.history.length > 1) {

                e.preventDefault();
                window.location.href = domElement.hdnBackUrl.val();
            }
            else {
                window.location.href = domElement.hdnBackUrl.val();
            }
        });

        domElement.btnNext.off('click');
        domElement.btnNext.on('click', (function () {
            NextQuestion();
        }));

        domElement.btnPrev.off('click');
        domElement.btnPrev.on('click', (function () {
            PrevQuestion();
        }));

        domElement.btnFinish.off('click');
        domElement.btnFinish.on('click', (function () {
            FinishTest();
        }));

        domElement.divQuestionOption.find('input[type=checkbox]').off('click');
        domElement.divQuestionOption.find('input[type=checkbox]').on('click', function () {


            var checked = $(this).is(':checked');
            $('[data-makeRadio="true"]').prop('checked', false);

            if (checked) {
                $(this).prop('checked', true);

                //apply question attempted class on current question navigation link
                $('.question-number-current-nav').addClass('question-attempted');
            }
            else {

                $('.question-number-current-nav').removeClass('question-attempted');
            }

            var candidateAnswer = GetCandidateAnswer();

            var objQuestion = globalVar.QuestionList[globalVar.CurrentQuestionIndex];
            var endTime = new Date();
            $.each(globalVar.TestAttemptViewModel.TestQuestionsList, function () {
                if (this.QuestionId == objQuestion.QuestionId) {
                    this.CandidateAnswer = candidateAnswer;
                    this.StartTime = globalVar.TempStartTime;
                    this.EndTime = endTime.toISOString();
                    //this.EndTime = new Date();
                }
            });

            UpdateRemainingQuestions();
        });


        domElement.lnkResultDetail.off('click');
        domElement.lnkResultDetail.on('click', (function () {

            // domElement.divTestCircleTime.html(''); //$('#divTestCircleTime').html('');
            $('#divTestStopWatchMain').html('');
            PrepareResultScreen();
            ViewCandidateTestResultDetail();
            appendQuestionNavigationPanelInSiteMenu();
            //domElement.divTestResultLegend.show();
            domElement.divTestResultLegendMain.show();
        }));

        domElement.btnStartTest.off('click');
        domElement.btnStartTest.on('click', (function () {
           // "CAT"
            if (domElement.hfTestType.val() == "1") {

                StartCatTest();
            } else {
                StartTest();
            }
        }));

        domElement.btnTabularResult.off('click');
        domElement.btnTabularResult.on('click', (function () {
            ShowHideResultViews(domElement.divTabularView);
            SetSelectedResultType(this.id);
        }));

        domElement.btnPieResult.off('click');
        domElement.btnPieResult.on('click', (function () {
            ShowHideResultViews(domElement.divPieChart);
            SetSelectedResultType(this.id);
            //domElement.CandidateResultPieChart.data('kendoChart').redraw();
        }));

        //domElement.btnBarResult.off('click');
        //domElement.btnBarResult.on('click', (function () {
        //    ShowHideResultViews(domElement.divBarChart);
        //    SetSelectedResultType(this.id);
        //    domElement.CandidateResultColumnChart.data('kendoChart').redraw();
        //}));

        domElement.btnCancelTest.off('click');
        domElement.btnCancelTest.on('click', function (e) {
            e.preventDefault();
            window.history.back();
        });

        domElement.btnBack.off('click');
        domElement.btnBack.on('click', (function () {
            BackToResultView();
            //SetSelectedResultType(domElement.btnTabularResult.attr('id'));
        }));

        $(window).resize(function () {
            AdjustContainersWidthAndHeight();
            RedrawCharts();
        });

        $(window).on("orientationchange", function () {
            AdjustContainersWidthAndHeight();
            RedrawCharts();
        });

        domElement.btnFirst.off('click');
        domElement.btnFirst.on('click', (function () {
            FirstQuestion();
        }));

        domElement.btnLast.off('click');
        domElement.btnLast.on('click', (function () {
            LastQuestion();
        }));

        domElement.hintDescription.off('click');
        domElement.hintDescription.on('click', (function () {
            PopulateQuestionHintWindow(this);
        }));

    }

    function CreateQuestionHintWindow() {

        domElement.hintDescriptionWindow.kendoWindow({
            width: "615px",
            height: "570px",
            title: "Hint",
            content: "",
            resizable: true,
            visible: false,
            modal: true,
            iframe: false,
            draggable: true,
            pinned: false,
            //content : "Hellow",
            actions: ["Close"],
        });

        globalVar.questionHintWindow = domElement.hintDescriptionWindow.data('kendoWindow');
    }

    function PopulateQuestionHintWindow(sender) {
        globalVar.questionHintWindow.content($(sender).attr('data-content'));
        globalVar.questionHintWindow.center().open();
    }

    function GetCandidateAnswer() {
        var val = [];
        debugger
        $('.div-question-option input[type=checkbox]:checked').each(function (i) {
            val[i] = $(this).val();
        });
        return val.join(",");
    }

    function AdjustContainersWidthAndHeight() {

        var adjustTestAttemptPadding = 20;
        var adjustTestResultPadding = 100;
        var windowHeight = $(window).outerHeight();
        var windowWidth = $(window).outerWidth();

        //Adjust candidate test attempt body container height
        var timeCircleHeight = domElement.divTestCircleTime.outerHeight();
        var footerBarHeight = domElement.CandidateTestAttemptContainer.find('.test-attempt-question-footer').outerHeight();
        var footerBarWidth = domElement.CandidateTestAttemptContainer.find('.test-attempt-question-footer').outerWidth();
        var testAttemptQuestionHeaderHeight = domElement.CandidateTestAttemptContainer.find('.test-attempt-question-header').outerHeight();
        var bodyHeight = 0;
        var extraHeight = 31;

        //calculate body height for test detail screen
        if (globalVar.CurrentCandidateTestContainerType && globalVar.CurrentCandidateTestContainerType ==CandidateTestContainerType.TestDetail) {

            bodyHeight = windowHeight - testAttemptQuestionHeaderHeight - footerBarHeight - extraHeight;
        } else { //calculate body height for test attempt screen 
            bodyHeight = windowHeight - timeCircleHeight - footerBarHeight - adjustTestAttemptPadding;
        }

        var phoneHeaderHeight = 0
        //calculate body height for small devices like smart phone
        if (windowWidth < 768) {

            phoneHeaderHeight = 60;
            bodyHeight = windowHeight - phoneHeaderHeight - 25;
            bodyWidth = windowWidth - footerBarWidth - 40;
            domElement.CandidateTestAttemptContainer.find('.test-attempt-question-body').width(bodyWidth);
        }

        //console.log($(window).width());
        //console.log($(window).height());
        $('.mainBody').css('height', $(window).height());

        $('.candidate-parent-container').css('padding-left', '0px');
        $('.candidate-parent-container').css('padding-right', '0px');

        if ($(window).width() < 415) {
            $('.test-attempt-question-body').css('height', $(window).height() - 249);
            $('.test-attempt-question-body').css('padding-bottom', '0px');
            $('.test-view-btn').css('margin-bottom', '5px');
            $('.test-attempt-question-footer').css('padding-top', '10px');
        } else {
            $('.test-attempt-question-body').css('height', $(window).height() - 278);
        }

        $('.test-attempt-container').css('height', $(window).height() - 65);
        $('.test-attempt-container').css('padding-bottom', '0px');
        $('.test-attempt-container').css('margin-top', '5px');


        $('.test-attempt-question-footer').css('bottom', '0px !important');


        //domElement.CandidateTestAttemptContainer.find('.test-attempt-question-body').height(windowHeight - 384);
        //domElement.CandidateTestAttemptContainer.find('.test-attempt-question-body').height($(window).height() - 350);

        //Adjust candidate test result body container height
        var headerHeight = domElement.CandidateTestResultContainer.find('.test-attempt-question-header').outerHeight();
        footerBarHeight = domElement.CandidateTestResultContainer.find('.test-attempt-question-footer').outerHeight();
        bodyHeight = windowHeight - headerHeight - footerBarHeight - adjustTestResultPadding;

        //calculate body height for small devices like smart phone 
        if (windowWidth < 768) {

            phoneHeaderHeight = 60;
            bodyHeight = windowHeight - phoneHeaderHeight - 25;
            bodyWidth = windowWidth - footerBarWidth - 70;
            domElement.CandidateTestResultContainer.find('.test-attempt-question-body').width(bodyWidth);

        } else {
            domElement.CandidateTestResultContainer.find('.test-attempt-question-body').css('width', '');
        }

        //domElement.CandidateTestResultContainer.find('.test-attempt-question-body').height(bodyHeight);

        //set footer bar width. This is common bar in test attempt, result and detail view
        //domElement.testAttemptQuestionFooter.width(domElement.container.width());
    }

    function GetQuestionsListForTest() {
        var testId = domElement.hfTestId.val();
        var userId = domElement.hfUserId.val();
        var actionUrl = globalVar.CandidateTestService.TestAttempt + "?TestId=" + testId +"";

        ServiceManager.Get(actionUrl, true, GetQuestionsListForTestCallBack, testId, userId);
    }

    function GetQuestionsListForTestCallBack(response, param) {


        if (response && response.length > 0 && response[0]) {

            globalVar.TestAttemptViewModel = response[1];
            debugger;
            // globalVar.TestAttemptViewModel = response[1];
            globalVar.TotalQuestionCount = response[1].TotalQuestions;
            globalVar.QuestionList = response[1].TestQuestionsList;
            CreateQuestionsNavigationPanel(globalVar.QuestionList, response[1].ShowSubjectGrouping, response[1].SingleSubjectName, false);

            ShowStartTestInformation();
        }
    }

    function ShowQuestion(currentQuestion) {

        if (currentQuestion < globalVar.TotalQuestionCount) {
            globalVar.CurrentQuestionIndex = currentQuestion;
            var objQuestionList = globalVar.QuestionList[currentQuestion];
            if (domElement.hfViewResult.val() != "result") {

                globalVar.TempStartTime = new Date();
                globalVar.TempStartTime = globalVar.TempStartTime.toISOString();

                //"CAT"
                if (domElement.hfTestType.val() == "1") {
                    domElement.lblQuestionNumber.text("Question " + globalVar.CurrentCATQuestion + " of " + globalVar.TotalQuestionCount);
                    domElement.lblQuestionNumberShort.text(globalVar.CurrentCATQuestion + "/" + globalVar.TotalQuestionCount);
                } else {
                    domElement.lblQuestionNumber.text("Question " + (currentQuestion + 1) + " of " + globalVar.TotalQuestionCount);
                    domElement.lblQuestionNumberShort.text((currentQuestion + 1) + "/" + globalVar.TotalQuestionCount);
                }
            }

            domElement.divQuestionBody.html(objQuestionList.Body);

                $('.question-detail').attr('dir', 'ltr');
                if ($('.question-detail').hasClass('jnnfont')) {
                    $('.question-detail').removeClass('jnnfont');
                }

                if ($('.test-attempt-question-body').hasClass('urdu-font')) {
                    $('.test-attempt-question-body').removeClass('urdu-font');
                }

                if (!$('.test-attempt-question-body').hasClass('english-font')) {
                    $('.test-attempt-question-body').addClass('english-font');
                }

            

                domElement.hintWindow.attr('dir', 'ltr');
          

            // Show question options on the basis of option count in the questions //


            domElement.testAttemptQuestionBody.find('.lbl-question-opt').empty();
            domElement.testAttemptQuestionBody.find('.question-opt').hide();

            domElement.hintContainer.hide();

            if (objQuestionList.Hint && domElement.hfShowHint.val() == 'true') {
                domElement.hintContainer.show();
                domElement.hintDescription.attr('data-content', objQuestionList.Hint || 'No hint available');

                if (domElement.hfViewResult.val() != '') {
                    domElement.lblQuestionNumberShort.css('top', '8px');
                } else {
                    domElement.lblQuestionNumberShort.css('top', '-3px');
                }

            } else {
                domElement.lblQuestionNumberShort.css('top', '10px');
            }



            if (objQuestionList.OptionCount > 0) {
                $('#lblOptA').html(objQuestionList.OptionA);
            }
            if (objQuestionList.OptionCount > 1) {
                $('#lblOptB').html(objQuestionList.OptionB);
            }
            if (objQuestionList.OptionCount > 2) {
                $('#lblOptC').html(objQuestionList.OptionC);
            }
            if (objQuestionList.OptionCount > 3) {
                $('#lblOptD').html(objQuestionList.OptionD);
            }
            if (objQuestionList.OptionCount > 4) {
                $('#lblOptE').html(objQuestionList.OptionE);
            }

            domElement.testAttemptQuestionBody.find('.lbl-question-opt').each(function () {
                if ($(this).html() != "") {
                    $(this).parent().show();
                }
            });


            domElement.divQuestionBody.animate({ left: '100px', top: '100px' }, 1000);

            if (objQuestionList.Explanation != null && objQuestionList.Explanation != "" && domElement.hfViewResult.val() != '' && domElement.hfShowExplanation.val() === 'true') {
                domElement.divQuestionDetail.show();
                domElement.lblQuestionExplantion.html(objQuestionList.Explanation).text(); // Showing Question explanation in case of result detail //
            } else {
                domElement.divQuestionDetail.hide();
                domElement.lblQuestionExplantion.html("");
            }

            ShowHideAnswerOptions(objQuestionList.OptionCount, objQuestionList.CandidateAnswer || '', objQuestionList.CorrectAnswers, objQuestionList.AnswerType);
        }

        if (domElement.hfTestType.val() == "CBT") {
            MakeCurrentQuestionNumberSelectedInNavigation();
            UpdateRemainingQuestions();
        }
    }

    function NextQuestion() {

        //"CAT"
        debugger
        if (domElement.hfTestType.val() == "1" && domElement.hfViewResult.val() != "result") {
            GetQuestionForCAT();
        }
        else {
            NextQuestionIterate();
        }
    }

    function NextQuestionIterate() {
        if (globalVar.TotalQuestionCount > 0) {
            if (globalVar.CurrentQuestionIndex < globalVar.TotalQuestionCount) {

                if (globalVar.CurrentQuestionIndex == globalVar.TotalQuestionCount - 1) {
                    //alert('No more questions');
                }
                else {
                    globalVar.CurrentQuestionIndex++;
                    ShowQuestion(globalVar.CurrentQuestionIndex);
                }
            }
        }
    }

    function PrevQuestion() {

        if (globalVar.TotalQuestionCount > 0) {
            if (globalVar.CurrentQuestionIndex > 0) {
                globalVar.CurrentQuestionIndex--;
                ShowQuestion(globalVar.CurrentQuestionIndex);
            }
            else {
                globalVar.CurrentQuestionIndex = 0;
                //alert('No more questions');
            }
        }
    }


    function GetQuestionForCAT() {
        debugger
        var questId = 0
        if (globalVar.QuestionList.length != 0) {
            questId = globalVar.QuestionList[0].QuestionId;
        }
        var candidateAnswer = GetCandidateAnswer();
        $('.div-question-option input[type=checkbox]:checked').prop('checked', false)
        var testId = domElement.hfTestId.val();
        var userId = domElement.hfUserId.val();


        var currentTime = new Date().toISOString();
        var actionUrl =globalVar.CandidateTestService.TestAttempt + "?TestId= " + testId + "&QuestionId=" + questId + "&CandidateAnswer=" + candidateAnswer + "&StartTime=" + currentTime + "&EndTime=" + currentTime;

        ServiceManager.Get(actionUrl, true, GetQuestionForCATCallBack, testId, userId);
    }

    function GetQuestionForCATCallBack(response, param) {
        debugger;
        if (response && response.length > 0 && response[0]) {

            globalVar.TestAttemptViewModel = response[1];
            globalVar.QuestionList = response[1].TestQuestionsList || [];

            if (globalVar.QuestionList.length == 0) {
                ShowStartTestInformation();
                CreateQuestionsNavigationPanelForCAT(globalVar.TotalQuestionCount);
            }
            else {
                globalVar.CurrentCATQuestion = response[1].TestQuestionsList[0].CurrentCATCount;
                var hasNextQuestion = response[1].TestQuestionsList[0].HasNextQuestion;
                MakeCurrentCATQuestionNumberSelectedInNavigation();
                UpdateRemainingQuestions();

                if (!hasNextQuestion) {
                    domElement.btnNext.hide();
                }
                ShowQuestion(0);
            }
        }
    }


    function CreateQuestionsNavigationPanelForCAT(totalQuestion) {

        var subjectContainer = $("<div class='question-nav-subject-container'>");
        var elSubjectName = $("<div class='question-nav-subject'>").text('');
        subjectContainer.empty().append(elSubjectName);
        domElement.divQuestionNavigationPanel.empty().append(subjectContainer);

        for (i = 1; i <= totalQuestion; i++) {

            var questionLink = '';
            questionLink = $("<a class='question-number-nav-link question-number-nav'>").text(i);
            subjectContainer.append(questionLink);
        }
    }

    function BackToResultView() {

        if (domElement.hfViewResult.val() == "detail" && domElement.lblTotalMarks.text() == "") {
            GetCandidateTestResult();
        }
        else {
            //ShowHideResultViews(domElement.divTabularView);
            ShowHideTestContainer(domElement.CandidateTestResultContainer);
        }

        domElement.siteNavMenu.show();
        domElement.pageNavMenu.hide();
        domElement.siteNavMenuParent.show();

        AdjustContainersWidthAndHeight();
    }

    function FinishTest() {
       // CustomConfirmationBox("Are you sure, you want to finish this test ?", onFinishTestOkCallback, undefined, undefined, 'Finish');

        if (confirm("Are you sure, you want to finish this test ?") == true) {
        onFinishTestOkCallback();
        } else {
            return;
    }
    }

    function onFinishTestOkCallback() {

        clearInterval(globalVar.CandidateTestInterval);  // clear interval //
        domElement.divTestCircleTime.html(''); //$('#divTestCircleTime').html(''); // Clear timer html //

        testAttemptFormManager.SaveCandidateTest();
        domElement.hfIsTestAttempted.val('true');
    }

    function MakeCurrentQuestionNumberSelectedInNavigation() {
        domElement.questionNavPanel.find('.question-number-nav-link').removeClass('question-number-current-nav');
        domElement.questionNavPanel.find('.question-number-nav-link:eq(' + globalVar.CurrentQuestionIndex + ')').addClass('question-number-current-nav');
    }

    function MakeCurrentCATQuestionNumberSelectedInNavigation() {

        domElement.questionNavPanel.find('.question-number-nav-link').removeClass('question-number-current-nav');
        domElement.questionNavPanel.find('.question-number-nav-link:eq(' + (globalVar.CurrentCATQuestion - 1) + ')').addClass('question-number-current-nav');
    }

    function ShowHideAnswerOptions(optionsCount, CandidateAnswers, correctAnswers, answerType) {
        debugger;
        answerType = 1; //Single
        domElement.divOptionA.closest('.question-option-box').hide();
        domElement.divOptionB.closest('.question-option-box').hide();
        domElement.divOptionC.closest('.question-option-box').hide();
        domElement.divOptionD.closest('.question-option-box').hide();
        domElement.divOptionE.closest('.question-option-box').hide();

        var makeRadioButton = false;
        if (answerType == 1) {
            makeRadioButton = true;
        }

        if (optionsCount == 2) {
            domElement.divOptionA.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
            domElement.divOptionB.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
        } else if (optionsCount == 3) {
            domElement.divOptionA.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
            domElement.divOptionB.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
            domElement.divOptionC.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
        } else if (optionsCount == 4) {
            domElement.divOptionA.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
            domElement.divOptionB.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
            domElement.divOptionC.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
            domElement.divOptionD.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
        } else if (optionsCount == 5) {
            domElement.divOptionA.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
            domElement.divOptionB.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
            domElement.divOptionC.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
            domElement.divOptionD.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
            domElement.divOptionE.closest('.question-option-box').show().find('input:checkbox').attr("checked", false).attr("data-makeRadio", makeRadioButton);
        }

        $(":checkbox").prop('checked', false)
        if (CandidateAnswers != "") {
            $.each(CandidateAnswers.split(','), function (index, CandidateAnswer) {
                $("input[name=answer][value=" + CandidateAnswer + "]").prop('checked', true);
            });

        }

        if (globalVar.ViewResultDetail) {
            $("input[name=answer]").prop('disabled', true);
            debugger
            SetAnswerStatusWithColorForResult(CandidateAnswers, correctAnswers, optionsCount);
        }
    }

    function CreateQuestionsNavigationPanel(questionsCollection, showSubjectGrouping, singleSubjectName, forResult) {

        var index = 1;

        if (questionsCollection.length > 0) {
            var subjectQuestions = questionsCollection;

            var subjectContainer = $("<div class='question-nav-subject-container'>");
            var elSubjectName = $("<div class='question-nav-subject'>").text(singleSubjectName == null ? '' : singleSubjectName);
            var elUnderLine = $("<hr class='hr-bottom-line-subject'>").appendTo(elSubjectName);

            subjectContainer.append(elSubjectName);
            domElement.divQuestionNavigationPanel.append(subjectContainer);

            // iterate each question to make it clickable link //
            subjectQuestions.forEach(function (objQuestion) {

                var questionLink = '';
                if (forResult) {
                    questionLink = ReturnQuestionLinkWithResultStatus(objQuestion.QuestionAnswerStatus, objQuestion.QuestionId, index);
                }
                else {
                    questionLink = $("<a class='question-number-nav-link question-number-nav' questionId='" + objQuestion.QuestionId + "'>").text(index);
                }
                //var questionLink = $("<a class='question-number-nav-link question-number-nav' questionId='" + objQuestion.QuestionId + "'>").text(index);
                questionLink.off('click');
                questionLink.on('click', (function () {
                    ShowQuestionFromPanel(objQuestion.QuestionId);
                }));

                subjectContainer.append(questionLink);
                index++;
            });
        }
        //appendQuestionNavigationPanelInSiteMenu();
    }

    function ShowQuestionFromPanel(questionId) {

        var questionIndex = globalVar.QuestionList.map(function (e) { return e.QuestionId; }).indexOf(questionId);
        //var questionIndex = globalVar.QuestionList.indexOf(questionId);
        ShowQuestion(questionIndex);
    }

    this.SaveCandidateTest = function () {


        var testId = domElement.hfTestId.val();
        var SoSId = domElement.hfSOSId.val();
        var CandidateSOSId = domElement.hfCandidateSOSId.val();
        var userId = domElement.hfUserId.val();
        var actionUrl = globalVar.CandidateTestService.SaveTest;

        var testStartTime = domElement.hfStartTime.val();
        var testEndTime = new Date();
        testEndTime = testEndTime.toISOString();

        var candidateAttemptedTest = {
            UserId: userId,
            TestId: testId,
            //SOSId: SoSId,
            //CandidateSOSId: CandidateSOSId,
            StartTime: testStartTime,
            EndTime: testEndTime,
            AttemptedQuestionList: []
        };

        globalVar.TestAttemptViewModel.TestQuestionsList.forEach(function (question) {
            var attemptedQuestion = {
                QuestionId: question.QuestionId,
                CandidateAnswer: question.CandidateAnswer,
                StartTime: question.StartTime,
                EndTime: question.EndTime
            };

            candidateAttemptedTest.AttemptedQuestionList.push(attemptedQuestion);

        });

        //"CAT"
        if (domElement.hfTestType.val() =="1" ) {
            var questId = 0
            if (globalVar.QuestionList.length != 0) {
                questId = globalVar.QuestionList[0].QuestionId;
            }
            var candidateAnswer = GetCandidateAnswer();
            //globalVar.TestAttemptViewModel.QuestionId = questId;
            //globalVar.TestAttemptViewModel.CandidateAnswer = candidateAnswer;

            candidateAttemptedTest.CATQuestionId = questId;
            candidateAttemptedTest.CATCandidateAnswer = candidateAnswer;
        }

        //ServiceManager.Post(actionUrl, JSON.stringify(globalVar.TestAttemptViewModel), true, SaveCandidateTestCallBack, testId, null, true);

        ServiceManager.Post(actionUrl, JSON.stringify(candidateAttemptedTest), true, SaveCandidateTestCallBack, testId, null, true, "Saving test...");
    }

    function SaveCandidateTestCallBack(response, param) {




        if (response && response.length > 0 && response[0]) {
            //alert('test is saved successfully');
            ShowCandidateTestResult(response[1]);
        }
        else {
            var obj = JSON.parse(response[1]);
            SiteScript.MessageBox.ShowError(obj.Message); //SiteScript.GetApplicationMessage(Kips.AppConstants.ApplicationMessageKey.DetectBrowser_Warning)
        }
    }

    function StartCatTest() {

        globalVar.CurrentCandidateTestContainerType = CandidateTestContainerType.TestAttempt;

        ShowHideTestContainer(domElement.CandidateTestAttemptContainer);
        GetQuestionForCAT();
        SetTestTiming();

        appendQuestionNavigationPanelInSiteMenu();

        //SiteScript.ChangeNavigationMenuState(true);

        AdjustContainersWidthAndHeight();

        var currentDateTime = new Date();
        domElement.hfStartTime.val(currentDateTime.toISOString());
    }

    function StartTest() {

        globalVar.CurrentCandidateTestContainerType = CandidateTestContainerType.TestAttempt;

        ShowHideTestContainer(domElement.CandidateTestAttemptContainer);

        NextQuestion();
        SetTestTiming();

        appendQuestionNavigationPanelInSiteMenu();

        //SiteScript.ChangeNavigationMenuState(true);

        AdjustContainersWidthAndHeight();

        var currentDateTime = new Date();
        domElement.hfStartTime.val(currentDateTime.toISOString());
    }

    function ShowHideTestContainer(showContainer) {
        var delay = 0;
        domElement.candidateTestContainer.hide();

        showContainer.fadeIn(delay);
    }

    function appendQuestionNavigationPanelInSiteMenu() {
        domElement.siteNavMenuParent.hide();
        domElement.pageNavMenu.show();
        domElement.questionNavPanel.show().appendTo(domElement.pageNavMenu);
    }

    function ShowCandidateTestResult(candidateResult) {
        debugger
        globalVar.CurrentCandidateTestContainerType = CandidateTestContainerType.TestResult;

        ShowHideTestContainer(domElement.CandidateTestResultContainer);
        domElement.lblTestName.html(candidateResult.TestName);
        //here topics and subjects
        domElement.lblTestSubjects.text(candidateResult.SubjectNames);
        domElement.lblTestDate.text(GetFormattedDate(candidateResult.TestDate));
        domElement.lblTestQuestionCountForResult.text(candidateResult.TotalQuestions);
        domElement.lblTestDurationForResult.text(candidateResult.AverageTestTime + " " + candidateResult.DurationUnit);
        domElement.lblTotalCorrectQuestions.text(candidateResult.TotalCorrect);
        domElement.lblTotalIncorrectQuestions.text(candidateResult.TotalIncorrect);
        domElement.lblUnattemptedQuestions.text(candidateResult.NotAttempted);

        var serialNumber = 0; // this is dynamic tabular result view //
        domElement.divSubjectTestResult.empty();


        var model = [{ Subjects: [] }];
        model[0].Subjects = (candidateResult.Subjects || []);

        var template = kendo.template(domElement.kendoSubjectTestResult.html());

        if (model) {
            domElement.divSubjectTestResult.html(kendo.render(template, model));

            //setTimeout(function () { SiteScript.InjectSVG(); }, 1000);
            //SiteScript.InjectSVG();
        }

        domElement.lblTotalMarks.text(candidateResult.TotalMarks);
        domElement.lblTotalPercentage.text(candidateResult.TotalPercentage);
        domElement.lblProgramHeading.text("Test Result");

        var srNo = 0;
        domElement.divTestTopicResult.empty();

        if (candidateResult.Topics.length == 0) {
            domElement.divTestTopicResult.hide();

        }
        else {

            var modelTopicResult = [{ Topics: [] }];
            modelTopicResult[0].Topics = (candidateResult.Topics || []);

            var topicTemplate = kendo.template(domElement.kendoTopicTestResult.html());

            if (modelTopicResult) {
                domElement.divTestTopicResult.html(kendo.render(topicTemplate, modelTopicResult));
            }

            domElement.divTestTopicResult.show();
            Kips.UtilityFunctions.EnableBootStrapToolTip();

        }
        createPieChart(candidateResult.TotalCorrect, candidateResult.TotalIncorrect, candidateResult.NotAttempted);
        //CreatePieChartForCandidateResult(candidateResult.Subjects);
        //CreateColumnChartForCandidateResult(candidateResult.Subjects);

        //ShowHideResultViews(domElement.divTabularView);
        //SetSelectedResultType(domElement.btnTabularResult.attr('id'));

        domElement.siteNavMenu.show();
        domElement.pageNavMenu.hide();
        domElement.siteNavMenuParent.show();

        AdjustContainersWidthAndHeight();
    }

    function ViewCandidateTestResultDetail() {

        globalVar.CurrentCandidateTestContainerType = CandidateTestContainerType.TestDetail;

        var elHeading = $('<div class="heading">Detail View</div>');
        $('#divTestTimeDetail').empty().append(elHeading);
        var testId = domElement.hfTestId.val();
        var candidateSOSId = domElement.hfCandidateSOSId.val();
        var actionUrl =globalVar.CandidateTestService.TestResultDetail + "?TestId=" + testId +"";
        ServiceManager.Get(actionUrl, true, ViewCandidateTestResultDetailCallBack, testId, candidateSOSId);

        AdjustContainersWidthAndHeight();
    }

    function ViewCandidateTestResultDetailCallBack(response, param) {

        if (response && response.length > 0 && response[0]) {

            globalVar.TestAttemptViewModel = response[1];
            globalVar.TotalQuestionCount = response[1].TestQuestionsList.length;
            globalVar.QuestionList = response[1].TestQuestionsList;
            domElement.divQuestionDetail.show();
            domElement.divdurationremainingquestion.hide();
            CreateQuestionsNavigationPanel(globalVar.QuestionList, response[1].ShowSubjectGrouping, response[1].SingleSubjectName, true);
            domElement.hfViewResult.val("result");
            ShowNavigationButtons();
            NextQuestionIterate();
            domElement.lblProgramHeading.text(globalVar.TestAttemptViewModel.ProgramName);
        }
    }

    function CreateQuestionsNavigationPanelForResult(questionsCollection, showSubjectGrouping, singleSubjectName) {

        var index = 1;

        if (showSubjectGrouping) {

            var grouped = Enumerable.From(questionsCollection)
                .GroupBy(
                    function (QuestionList) { return QuestionList.SubjectName; }, // Key selector
                    function (QuestionList) { return QuestionList; }, // Element selector
                    function (SubjectName, grouping) { // Result selector
                        return {
                            SubjectName: SubjectName,
                            QuestionList: grouping.source
                        };
                    })
                .ToArray();

            grouped.forEach(function (question) {

                var subjectQuestions = question.QuestionList;
                var subjectContainer = $("<div class='question-nav-subject-container'>");
                var elSubjectName = $("<div class='question-nav-subject'>").text(question.SubjectName);
                var elUnderLine = $("<hr class='hr-bottom-line-subject'>").appendTo(elSubjectName);

                subjectContainer.append(elSubjectName);

                subjectQuestions.forEach(function (objQuestion) {

                    var questionLink = ReturnQuestionLinkWithResultStatus(objQuestion.QuestionAnswerStatus, objQuestion.QuestionId, index);

                    questionLink.off('click');
                    questionLink.on('click', (function () {
                        ShowQuestionFromPanel(objQuestion.QuestionId);
                    }));

                    subjectContainer.append(questionLink);
                    index++;
                });

                domElement.divQuestionNavigationPanel.append(subjectContainer);
            });
        }
        else {

            var subjectQuestions = questionsCollection;
            var subjectContainer = $("<div class='question-nav-subject-container'>");
            var elSubjectName = $("<div class='question-nav-subject'>").text(singleSubjectName == null ? '' : singleSubjectName);
            var elUnderLine = $("<hr class='hr-bottom-line-subject'>").appendTo(elSubjectName);

            subjectContainer.append(elSubjectName);

            subjectQuestions.forEach(function (objQuestion) {

                var questionLink = ReturnQuestionLinkWithResultStatus(objQuestion.QuestionAnswerStatus, objQuestion.QuestionId, index);

                questionLink.off('click');
                questionLink.on('click', (function () {
                    ShowQuestionFromPanel(objQuestion.QuestionId);
                }));

                subjectContainer.append(questionLink);
                index++;
            });

            domElement.divQuestionNavigationPanel.append(subjectContainer);
        }

        //appendQuestionNavigationPanelInSiteMenu();
    }

    function ReturnQuestionLinkWithResultStatus(questionStatus, questionId, index) {

        var questionLinkclassName = "question-number-nav";
        if (questionStatus == 'Not Attempt') {
            questionLinkclassName = "question-number-nav-skipped";
        } else if (questionStatus == 'Wrong Answer') {
            questionLinkclassName = "question-number-nav-wrong";
        } else if (questionStatus == 'Correct Answer') {
            questionLinkclassName = "question-number-nav-correct";
        }
        var questionLink = $("<a class='question-number-nav-link " + questionLinkclassName + "'  questionId='" + questionId + "'>").text(index);

        return questionLink;
    }

    function PrepareResultScreen() {

        ShowHideTestContainer(domElement.CandidateTestAttemptContainer);
        globalVar.ViewResultDetail = true;

        globalVar.TestAttemptViewModel = undefined;
        globalVar.TotalQuestionCount = 0;
        globalVar.QuestionList = [];
        globalVar.CurrentQuestionIndex = -1;
        domElement.divQuestionNavigationPanel.html('');
        domElement.btnFinish.hide();
        domElement.btnBack.show();
    }

    function ShowStartTestInformation() {

        ShowHideTestContainer(domElement.StartTestContainer);

        var testInformation = globalVar.TestAttemptViewModel;
        globalVar.TotalQuestionCount = testInformation.TotalQuestions;

        domElement.lblProgramName.text(testInformation.ProgramName);
        //var isTestNameInUrdu = Kips.UtilityFunctions.HasArabicCharacters(testInformation.TestName);
        domElement.lblTestHeading.html(testInformation.TestName);
        domElement.lblSubjectName.text(testInformation.SubjectNames);
        domElement.lblTopics.text(testInformation.TopicNames == '' ? 'N/A' : testInformation.TopicNames);
        domElement.lblTotalQuestions.text(testInformation.TotalQuestions);
        domElement.lblDuration.text(testInformation.Duration);
        domElement.lblProgramHeading.text(testInformation.ProgramName);

    }

    function SetAnswerStatusWithColorForResult(CandidateAnswers, correctAnswers, optionsCount) {
        debugger;
        var incorrectAnswerClass = "incorrect-answer-icon";

        //show question options as per parameter optionsCount value 
        domElement.testAttemptQuestionFooter.find('.question-option-box .div-question-option:lt(' + optionsCount + ')').show().toggleClass("noanswer-icon");

        //apply class on other than correct answer question option box


        domElement.testAttemptQuestionFooter.find('.div-question-option:lt(' + optionsCount + ') input[type=checkbox]').closest('.div-question-option')
            .show().removeClass("correct-answer-icon").removeClass("incorrect-answer-icon").addClass("noanswer-icon");

        $.each(correctAnswers.split(','), function (index, correctAnswer) {
            //apply class on correct answer question option box
            domElement.testAttemptQuestionFooter.find('.div-question-option:lt(' + optionsCount + ') input[type=checkbox][value ^=' + correctAnswer + ']').closest('.div-question-option')
                .show().removeClass("correct-answer-icon").removeClass("incorrect-answer-icon").removeClass("noanswer-icon").addClass("correct-answer-icon");

            //domElement.testAttemptQuestionFooter.find('.div-question-option:lt(' + optionsCount + ') input[type=checkbox][value !=' + correctAnswer + ']').closest('.div-question-option')
            //    .show().removeClass("correct-answer-icon").removeClass("incorrect-answer-icon").addClass("noanswer-icon");
        });

        $.each(getUniqueFromLeft(CandidateAnswers.split(','), correctAnswers.split(',')), function (index, CandidateAnswer) {

            if (CandidateAnswer == 'A') {
                domElement.divOptionA.show().toggleClass(incorrectAnswerClass);
            } else if (CandidateAnswer == 'B') {
                domElement.divOptionB.show().toggleClass(incorrectAnswerClass);
            } else if (CandidateAnswer == 'C') {
                domElement.divOptionC.show().toggleClass(incorrectAnswerClass);
            } else if (CandidateAnswer == 'D') {
                domElement.divOptionD.show().toggleClass(incorrectAnswerClass);
            } else if (CandidateAnswer == 'E') {
                domElement.divOptionE.show().toggleClass(incorrectAnswerClass);
            }

        });
    }

    function getUniqueFromLeft(left, right) {
        var res = [];
        $.grep(left, function (element) {
            if ($.inArray(element, right) == -1) res.push(element)
        });

        //$.grep(right, function (element) {
        //    if ($.inArray(element, left) == -1) res.push(element);
        //});
        return res;
    }

    function SetTestTiming() {

        var duration = 10;// globalVar.TestAttemptViewModel.Duration;

        var totalTime = duration + " Min";
        domElement.divTestDuration.text(totalTime);
        TestStopWatch(duration);
    }

    function SetTimeFormat(minutes, seconds) {
        var _minutes = minutes < 10 ? "0" + minutes : minutes;
        var _seconds = seconds < 10 ? "0" + seconds : seconds;
        domElement.divRemainingTime.text(_minutes + ':' + _seconds + " Min");

        if (minutes < 5 && !domElement.divRemainingTime.hasClass('red')) {
            domElement.divRemainingTime.addClass('red');
        }

    }

    function ShowNavigationButtons() {
        domElement.btnBack.show();
        domElement.btnFirst.show();
        domElement.btnLast.show();
        domElement.btnNext.show();
        domElement.btnPrev.show();
    }

    function CreatePieChartForCandidateResult(subjectsResult) {
        var pieChart = domElement.CandidateResultPieChart.data('kendoChart');

        var chartSeries = [];


        subjectsResult.forEach(function (res) {


            var subjectResult1 = {

                data: [{
                    category: res.SubjectName,
                    value: res.Percentage.toFixed(2),
                    color: res.Color
                },
                {
                    category: "",
                    value: (100 - res.Percentage.toFixed(2)),

                    color: "#ECEBEB"
                }]
            };
            chartSeries.push(subjectResult1);
        }
        );

        pieChart.setOptions({
            series: chartSeries,
            legend: {
                visible: false
            },
            seriesDefaults: {
                margin: 8,
                type: "donut",
                startAngle: 150,
                holeSize: 55,
                padding: 90,
                overlay: {
                    gradient: "none"
                },

                labels: {
                    template: "#=  value#%",
                    align: "circle",
                    visible: false,
                    color: "white",
                    background: "transparent"
                }
            },
            tooltip: {
                visible: true,
                //template: "#= category #: \n #= value#%",
                template: " # if(category == ''){# remaning #}else{# #=category# #} # : \n #= value#%",
                color: "#62737D"
            },
            chartArea: {
                width: 380,
                height: 380
            }
        });
        pieChart.redraw();
    }

    //function CreateColumnChartForCandidateResult(subjectResult) {
    //    var columnChart = domElement.CandidateResultColumnChart.data('kendoChart');


    //    var data = [];
    //    var subjects = [];

    //    subjectResult.forEach(function (res) {
    //        //var value = [];
    //        var objColumnChartData1 = {
    //            category: res.SubjectName,
    //            value: res.NotAttempted,
    //            group: 'Unattempted',
    //            name: 'Unattempted',
    //            valueColor: "#FBDD04"
    //            //data: [res.NotAttempted, res.CorrectQuestions, res.WrongQuestions],
    //        };
    //        var objColumnChartData2 = {
    //            category: res.SubjectName,
    //            value: res.CorrectQuestions,
    //            group: 'Correct',
    //            name: 'Unattempted',
    //            valueColor: "#008000"
    //            //data: [res.NotAttempted, res.CorrectQuestions, res.WrongQuestions],
    //        };
    //        var objColumnChartData3 = {
    //            category: res.SubjectName,
    //            value: res.WrongQuestions,
    //            group: 'Incorrect',
    //            name: 'Unattempted',
    //            valueColor: "#FF0000"
    //            //data: [res.NotAttempted, res.CorrectQuestions, res.WrongQuestions],
    //        };

    //        data.push(objColumnChartData1);
    //        data.push(objColumnChartData2);
    //        data.push(objColumnChartData3);
    //    });


    //    subjectResult.forEach(function (res) {
    //        subjects.push(res.SubjectName);
    //    });

    //    columnChart.setOptions({

    //        dataSource: {
    //            data: data,
    //            group: {
    //                field: "group"
    //            },
    //            sort: {
    //                field: "category",
    //                dir: "asc"
    //            }
    //        },
    //        legend: {
    //            position: "top"
    //            //offsetX: -220,
    //            //offsetY: -300
    //        },
    //        seriesColors: ["#008000", "#FF0000", "#FBDD04"],
    //        // theme: "blueOpal",
    //        transitions: false,
    //        series: [{
    //            colorField: "valueColor",
    //            type: "column",
    //            field: "value",
    //            categoryField: "category",
    //            animation: {
    //                type: "fadeIn",
    //                duration: 5000
    //            }
    //        }],
    //        tooltip: {
    //            visible: true,
    //            template: "#= series.name #: #= value #"
    //        },
    //        chartArea: {
    //        }
    //    });
    //    columnChart.redraw();


    //}

    function RedrawCharts() {
        if (domElement.hfViewResult.val() == "result") {
            domElement.TestResultPieChart.data('kendoChart').redraw();
        }
    }

    function GetColorBySubjectName(subject) {

        var colorCode = "";
        var subjectColors = [
            { subject: "Mathematics", color: "#4fc5f7" },
            { subject: "English", color: "#addfad" },
            { subject: "Chemistry", color: "#e64c65" },
            { subject: "Biology", color: "#10a8ab" },
            { subject: "Physics", color: "#fbb150" },
            { subject: "Computer Science", color: "#c2cb30" },
            { subject: "Intelligence", color: "#3c5b88" },
        ];
        //var data = jQuery.parseJSON(subjectColors);
        $.each(subjectColors, function (i, item) {
            if (item.subject == subject) {
                colorCode = item.color;
                return false;
            }
        });
        return colorCode;
    }

    function GetCandidateTestResult() {

        var testId = domElement.hfTestId.val();
        var candidateSOSId = domElement.hfCandidateSOSId.val();
        var showResult = domElement.hfViewResult.val();

        var actionUrl = globalVar.CandidateTestService.TestResult + "?TestId=" + testId+"";
        ServiceManager.Get(actionUrl, true, ShowCandidateTestResultCallBack, testId, true, true, ".loader");
    }

    function ShowCandidateTestResultCallBack(response, param) {

        if (response && response.length > 0 && response[0]) {
            ShowCandidateTestResult(response[1]);
        }
    }

    function GetRemaininigQuestions() {

        var remainingCounter = 0;

        $.each(globalVar.TestAttemptViewModel.TestQuestionsList, function () {
            if (this.CandidateAnswer == '' || this.CandidateAnswer == null) {
                remainingCounter = remainingCounter + 1;
            }
        });

        return remainingCounter;
    }

    function UpdateRemainingQuestions() {
        var remainingQuestions = 0;
        var text = '';
        if (domElement.hfTestType.val() == "1" && domElement.hfViewResult.val() != "result") {
            remainingQuestions = globalVar.TotalQuestionCount - globalVar.CurrentCATQuestion;
            text = remainingQuestions.toString();
            domElement.divRemainingQuestions.text(text);
        }
        else {
            remainingQuestions = GetRemaininigQuestions();
            text = remainingQuestions.toString();
            domElement.divRemainingQuestions.text(text);
        }

    }

    this.IsTestSaved = function () {
        if (domElement.hfIsTestAttempted.val() == "false") {
            return false;
        } else {
            return true;
        }
    }

    function ShowHideResultViews(showResultView) {
        domElement.candidateResultView.hide();
        showResultView.fadeIn(300);
    }

    function GetFormattedDate(date) {

        var dt = new Date(date).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        });

        return dt;

    }

    function TestStopWatch(testDuration) {

        var durationInMinutes = testDuration;
        var time = durationInMinutes * 60 | 0; //1800;
        //var initialOffset = '440';
        var initialOffset = 1;
        var i = 1;
        var secondsCounter = 60;

        /* Need initial run as interval hasn't yet occured... */
        //    domElement.circle_animation.css('stroke-dashoffset', initialOffset - (1 * (initialOffset / time)));
        //$('.circle_animation').css('stroke-dashoffset', initialOffset - (1 * (initialOffset / time)));

        // Set the date we're counting down to
        var countDownDate = new Date();
        countDownDate.setMinutes(countDownDate.getMinutes() + durationInMinutes);
        countDownDate = countDownDate.getTime();

        var interval = setInterval(function () {

            // Get todays date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            domElement.divTestStopWatch.text(minutes + ":" + seconds);

            // If the count down is over, write some text 
            if (distance < 0) {
               CustomConfirmationBoxClose();
                onFinishTestOkCallback();
                clearInterval(interval);
            }
            /*
            if (i == 1) {
                durationInMinutes = durationInMinutes - 1;
            }

            if (secondsCounter == 1) {
                durationInMinutes = durationInMinutes - 1;
                secondsCounter = 60;
            }

            if (durationInMinutes >= 0) {

                if (secondsCounter < 10) {
                    domElement.divTestStopWatch.text(durationInMinutes == 0 ? (durationInMinutes + ':0' + secondsCounter + ' Sec') : (durationInMinutes + ':0' + secondsCounter));
                }
                else {
                    domElement.divTestStopWatch.text(durationInMinutes == 0 ? (durationInMinutes + ':' + secondsCounter + ' Sec') : (durationInMinutes + ':' + secondsCounter));
                }

            }

            //if (durationInMinutes == 0 && secondsCounter <= 1)
            //{
            //    i = time;
            //    alert("time equal");
            //}
            
            if (i == time) {
                
                //domElement.circle_animation.css('stroke-dashoffset', (i + 1) * (440 / time));
                onFinishTestOkCallback();
                clearInterval(interval);
                //domElement.divTestCircleTime.html('');

                //if (testAttemptFormManager.IsTestSaved() == false) {

                //    testAttemptFormManager.SaveCandidateTest();
                //}

                return;
            }
            //domElement.circle_animation.css('stroke-dashoffset', initialOffset - ((i + 1) * (initialOffset / time)));
            // domElement.circle_animation.css('stroke-dashoffset', (i + 1) * (440 / time));
            //domElement.circle_animation.css('stroke-dashoffset', i * (440 / time));
            i++;
            secondsCounter--;*/
        }, 1000);

        globalVar.CandidateTestInterval = interval;
    }

    function SetSelectedResultType(btnId) {

        domElement.testAttemptQuestionFooter.find('.button-bar').find('a[id=' + btnId + ']').addClass('btn-purple');
        domElement.testAttemptQuestionFooter.find('.button-bar').find('a[id != ' + btnId + ']').removeClass('btn-purple');
    }

    function FirstQuestion() {

        if (globalVar.TotalQuestionCount > 0) {

            globalVar.CurrentQuestionIndex = 0;
            ShowQuestion(globalVar.CurrentQuestionIndex);

        }
    }

    function LastQuestion() {
        if (globalVar.TotalQuestionCount > 0) {

            globalVar.CurrentQuestionIndex = globalVar.TotalQuestionCount - 1;
            ShowQuestion(globalVar.CurrentQuestionIndex);
        }
    }
    function createPieChart(TotalCorrect, TotalIncorrect, NotAttempted) {

        domElement.TestResultPieChart.kendoChart({
            title: {
                position: "bottom"

            },
            legend: {
                visible: true,
                offsetX: 0,
                offsetY: -25,
                position: "bottom",
                labels: {
                    font: "12px Poppins-Regular",
                    color: "#6e6e6e "
                }
            },
            legendItemClick: function (e) {
                //prevent toggling the series visibility on legend item click
                e.preventDefault();
            },
            chartArea: {
                background: "transparent",
                height: 350
            },
            seriesDefaults: {
                labels: {
                    visible: true,
                    position: "center",
                    background: "transparent",
                    template: "#= value#"
                },
                overlay: {
                    gradient: "none"
                }
            },
            series: [{
                type: "pie",
                startAngle: 150,
                data: [{
                    category: "Correct",
                    value: TotalCorrect == 0 ? null : TotalCorrect,
                    color: "#10E1BA"
                }, {
                    category: "Incorrect",
                    value: TotalIncorrect == 0 ? null : TotalIncorrect,
                    color: "#ff94ab"
                }, {
                    category: "Unattempted",
                    value: NotAttempted == 0 ? null : NotAttempted,
                    color: "#c3ccd2"
                }]
            }],
            tooltip: {
                visible: true,
                format: "{0}%",
                template: "#= category #: \n #= value#"
            },
            visual: function (e) {
                //create the default visual
                var visual = e.createVisual();
                //scale it so that it has the predefined size
                visual.transform(kendo.geometry.transform().scale(1, 11 / e.rect.size.height, e.rect.center()));
                return visual;
            }
        });
        domElement.TestResultPieChart.data('kendoChart').redraw();
    }
    function CustomConfirmationBox (message, onOkCallback, onCancelCallback, customData, confirmButtonTitle, cancelButtonTitle) {

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

    }

    function CustomConfirmationBoxClose() {
        if (this.globalVar.kendoWindowElement) {
            this.globalVar.kendoWindowElement.close();
        }
    }

}