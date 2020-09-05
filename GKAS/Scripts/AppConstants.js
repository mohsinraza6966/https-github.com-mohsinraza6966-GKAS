/// <reference path="../../bootstrap.js" />
Kips.AppConstants = {
    SessionTokenKey: "sessionToken",
    MessageType: {
        Error: "Error",
        Info: "Info",
        Warning: "Warning",
        Success: "Success"
    },
    ProgressBarType: {
        Success: "progress-bar-success",
        Info: "progress-bar-info",
        Warning: "progress-bar-warning",
        Danger: "progress-bar-danger"
    },
    TestType: {
        CAT: 1,
        CBT: 2,
        PBT: 3
    },
    ImageRequest: {
        AmazonS3: 1,
        Local: 2,

    },
    QuestionType: {
        Used: 1,
        Unused: 2,
        Both: 3
    },
    QuestionMode: {
        MCQMode: 1,
        ShortQuestionMode: 2,
        LongQuestionMode: 3,
        MultipleChoiceQuestion: "IsQuestionModeMCQ",
        ShortQuestion: "IsQuestionModeShortQuestion",
        LongQuestion: "IsQuestionModeLongQuestion",
    },
    AnswerType: {
        Single: 1,
        Multiple: 2,
    },
    QuestionConfiguration: {
        General: 1,
        EMHBase: 2
    },
    QuestionSelectionMode: {
        Automatic: 1,
        Manual: 2
    },
    QuestionTestType: {
        Simple: 1,
        Numerical: 2,
        Diagrammatical: 3,
        NumericalDiagrammatical: 4
    },
    QuestionSource: {
        PastPaper: "1",
        SelfGenerated: "2",
        BookExercise: "3"
    },
    EmploymentType: {
        Employeed: "Employeed",
        Business: "Business"
    },
    ParentOrGuard: {
        Parent: "Parent",
        Guardian: "Guardian"
    },
    PaymentPlan: {
        FullFeature: "1",
        CustomFeature: "2"
    },

    EditorType: {
        TextEditor: "TextEditor",
        EquationEditor: "EquationEditor"
    },

    ManipulateAction: {
        Move: "Move",
        Copy: "Copy"
    },
    ApprovalStatus: {
        Pending: 1,
        Approved: 2,
        Rejected: 3
    },
    FormMode: {
        Add: 1,
        Update: 2,
        Preview: 3
    },
    PhoneCallStatus: {
        Answered: "1",
        Busy: "2",
        WrongNumber: "3",
        NoResponse: "4",
        PhoneNumberOff: "5"
    },
    TextEditorId: {
        QuestionBody: "QuestionBody",
        Explanation: "Explanation",
        OptionA: "OptionA",
        OptionB: "OptionB",
        OptionC: "OptionC",
        OptionD: "OptionD",
        OptionE: "OptionE",
        Hint: "Hint",
    },
    CookieKeys: {
        APIAccessToken: "APIAccessToken"
    },
    CandidateTestContainerType: {
        TestAttempt: "testattempt",
        TestResult: "testresult",
        TestDetail: "testdetail"
    },
    ContentType: {
        Video: "1",
        Reading: "2",
    },
    ActivityType: {
        Video: "1",
        Reading: "2",
        Test: "3",
        ClassTest: "4",
    },
    MeetingStatus: {
        Scheduled: 1,
        Started: 2,
        Completed: 3,
        Cancelled: 4
    },
    LocalStorageKey: {
        AppMessages: "ApplicationMessages",
        AppMessagesUpdatedOn: "AppMessagesUpdatedOn",
        AppSetting: "Kips.AppVar.AppSetting",
        GridFilters: "kendo-grid-filters",
        ClientGridFiltersRemovedOn: "ClientGridFiltersRemovedOn",
        IsCandidateSplashedVideoWatched: "IsCandidateSplashedVideoWatched"
    },
    AmazonBucketFolder: {
        VideoLectures: "VideoLectures",
        Assignments: "Assignments",
        Readings: "Readings",
        EducationCertificate: "EducationCertificate",
        Thumbnail: 'Thumbnail'
    },
    SubjectNames: {
        Chemistry: "CHEMISTRY",
        Biology: "BIOLOGY",
        English: "ENGLISH",
        Math: "MATHEMATICS",
        Computer: "COMPUTER SCIENCE",
        Physics: "PHYSICS",
        Finals: "FINALS",
        Intelligence: "INTELLIGENCE",
        GeneralMath: "GENERAL MATHEMATICS"
    },
    RegistrationType: {
        Registration: "registration",
        Promo: "promo"
    },
    AttendanceDropDowns: {
        Institute: "institute",
        Region: "region",
        CampusType: "campustype",
        Campus: "campus",
        CampusClass: "campusclass"
    },
    CommonDropDowns: {
        Institute: "institute",
        Region: "region",
        CampusType: "campustype",
        Campus: "campus",
        CampusClass: "campusclass"
    },
    RequestFrom: {
        Koogle: "Koogle"
    },
    FilePrefix: {
        Assignment : "a",
        CandidateAssignment: "ca",
        ReviewAssignment :"ra",
    },
    RequestFor: {
        Page: "1",
        Report: "2",
        Dashboard: "3",
        LMSReport: "4",
        CampusReport: "5",
        LMSCampusReport: "6"
    },
    ApprovalStatusName: {
        Pending: "Pending",
        Approved: "Approved",
        Rejected: "Dashboard"
    },
    CounselingState: {
        FileStudy: 1,
        Completed: 2,
        Cancelled: 3
    },
    TestCategory: {
        OnlineTest: 1,
        ClassTest: 2
    },
    WebinarFolder: {
        Current: 1,
        Upcoming: 2,
        Past: 3
    },
    SubmissionType:
    {
        NoSubmission : 1,
        Attachment : 2,
        Text : 3,
    },

    URL: {
        Action: {
            AccessDenied: Kips.AppVar.AppHost + "/Error/AccessDenied",
            EquationEditorPartialView: Kips.AppVar.AppHost + "/Question/GetEquationEditorPartialView",
            QuestionPreviewPartialView: Kips.AppVar.AppHost + "/Question/QuestionPreviewPartialView",

            Question: {
                ChangeQuestionStatus: Kips.AppVar.AppHost + "/Question/ChangeQuestionStatus",
                DropQuestion: Kips.AppVar.AppHost + "/Question/DropQuestion",
                QuestionDescriptionPartialView: Kips.AppVar.AppHost + "/Question/QuestionDescriptionPartialView",
                QuestionsPreview: Kips.AppVar.AppHost + "/Question/QuestionsPreview",
            },
            SubjectQuestionDescription: {
                ChangeSubjectQuestionDescriptionStatus: Kips.AppVar.AppHost + "/QuestionDescription/ChangeSubjectQuestionDescriptionStatus"
            },
            Test: {
                GetSubjectsByTestCategory: Kips.AppVar.AppHost + "/Test/GetSubjectListByTestCategoryId",
                GetTopicsBySubjects: Kips.AppVar.AppHost + "/Test/GetTopicsBySubjectId",
                GetSubjectListByTestCategory: Kips.AppVar.AppHost + "/Test/GetSubjectsByTestCategoryId",
                GetSubjectTopicQuestionConfigurationPartialView: Kips.AppVar.AppHost + "/Test/GetSubjectTopicQuestionConfigurationPartialView",
                GetTestQuestionScoreAccordingToProgram: Kips.AppVar.AppHost + "/Test/GetTestQuestionScoreAccordingToProgram",
                GetTestProgramCascadingListViewModel: Kips.AppVar.AppHost + "/Test/GetTestProgramCascadingListViewModel",
                GetQuestionPaperTemplatePartialView: Kips.AppVar.AppHost + "/Test/GetQuestionPaperTemplatePartialView",
                DownloadQuestionPaper: Kips.AppVar.AppHost + "/Test/DownloadQuestionPaper",
                DeleteRevisionTestLog: Kips.AppVar.AppHost + "/Test/DeleteRevisionTestLog",
                DropTest: Kips.AppVar.AppHost + "/Test/DropTest",
                QuestionSelectionPreview: Kips.AppVar.AppHost + "/Test/QuestionSelectionPreview",
                GetAvailableQuestions: Kips.AppVar.AppHost + "/Test/GetAvailableQuestions",
            },
            SchemeOfStudy: {
                EditSOSPartialView: Kips.AppVar.AppHost + "/SchemeOfStudy/GetEditTestTopicParitalView",
                GetTestTopics: Kips.AppVar.AppHost + "/SchemeOfStudy/GetTopicsByTestId",
                SaveSchemeOfStudyDetail: Kips.AppVar.AppHost + "/SchemeOfStudy/SaveSchemeOfStudyDetail",
                GetProgramSubjectPartialView: Kips.AppVar.AppHost + "/SchemeOfStudy/GetProgramSubjectPartialView",
                GetAddEditSOSSubjectPartialView: Kips.AppVar.AppHost + "/SchemeOfStudy/GetAddEditSOSSubjectPartialView",
                SaveSOSSubject: Kips.AppVar.AppHost + "/SchemeOfStudy/SaveSOSSubject",
                GetAddActivityEncryptedUrl: Kips.AppVar.AppHost + "/SchemeOfStudy/GetAddActivityEncryptedUrl",
                ChangeSOSStatus: Kips.AppVar.AppHost + "/SchemeOfStudy/ChangeSOSStatus",
                ChangeSOSSubjectStatus: Kips.AppVar.AppHost + "/SchemeOfStudy/ChangeSOSSubjectStatus",
                AttachNewVideosInAllSOS: Kips.AppVar.AppHost + "/SchemeOfStudy/AttachNewVideosInSOS",
                GetOtherSchemeOfStudyStartDates: Kips.AppVar.AppHost + "/SchemeOfStudy/GetOtherSchemeOfStudyStartDates",
                GetCopySOSPartialView: Kips.AppVar.AppHost + "/SchemeOfStudy/GetCopySOSPartialView",
                GetTestQuestionScoreAccordingToSOS: Kips.AppVar.AppHost + "/SchemeOfStudy/GetTestQuestionScoreAccordingToSOS",
            },
            Student: {
                GetProvince: Kips.AppVar.AppHost + "/Student/GetProvinceByCampusID",
                GetCity: Kips.AppVar.AppHost + "/Student/GetCityByCampusID",
                SendEmail: Kips.AppVar.AppHost + "/Student/SendEmail",
                ChangeStatus: Kips.AppVar.AppHost + "/Student/ChangeStatus"
            },
            Account: {
                SetPassword: Kips.AppVar.AppHost + "/Account/SetPassword",
                ChangeUserStatus: Kips.AppVar.AppHost + "/Account/ChangeUserStatus",
                ConfirmUserEmail: Kips.AppVar.AppHost + "/Account/ConfirmUserEmail",
                ForgotPassword: Kips.AppVar.AppHost + "/Account/ForgotPassword",
                GetSiteUserEducationFormPartialView: Kips.AppVar.AppHost + "/Account/GetSiteUserEducationFormPartialView",
                GetSiteUserExperienceFormPartialView: Kips.AppVar.AppHost + "/Account/GetSiteUserExperienceFormPartialView",
                SiteUserEducationDelete: Kips.AppVar.AppHost + "/Account/SiteUserEducationDelete",
                SiteUserExperienceDelete: Kips.AppVar.AppHost + "/Account/SiteUserExperienceDelete"
            },
            Common: {
                GetVideoLecturePartialView: Kips.AppVar.AppHost + "/Common/GetVideoLecturePartialView",
                GetApplicationMessages: Kips.AppVar.AppHost + "/Common/GetClientSideMessages",
                GetProgramSOSStartDates: Kips.AppVar.AppHost + "/Common/GetProgramSOSStartDates",
                GetRegionListByInstitute: Kips.AppVar.AppHost + "/Common/GetRegionListByInstitute",
                GetCampusTypeListByInstitute: Kips.AppVar.AppHost + "/Common/GetCampusTypeListByInstitute",
                GetCampusListByInstitute: Kips.AppVar.AppHost + "/Common/GetCampusListByInstitute",
                GetCampusClassListByInstitute: Kips.AppVar.AppHost + "/Common/GetCampusClassListByInstitute",
                GetSessionListByInstitute: Kips.AppVar.AppHost + "/Common/GetSessionListByInstitute",
                GetProfileImagePartial: Kips.AppVar.AppHost + "/Common/GetProfileImagePartial",
                GetClassList: Kips.AppVar.AppHost + "/Common/GetClassList",
                GetProgramGroupList: Kips.AppVar.AppHost + "/Common/GetProgramGroupList",
                GetClassCandidateList: Kips.AppVar.AppHost + "/Common/GetClassCandidateList",
                GetCandidateProgramSubjectList: Kips.AppVar.AppHost + "/Common/GetCandidateProgramSubjectList",
                GetEnumSelectListItems: Kips.AppVar.AppHost + "/Common/GetEnumSelectListItems",
                GetNotificationFilterList: Kips.AppVar.AppHost + "/Common/GetNotificationFilterList",
                GetCandidateCampusInfo: Kips.AppVar.AppHost + "/Common/GetCandidateCampusInfo",
                GetProgramSubjectList: Kips.AppVar.AppHost + "/Common/GetProgramSubjectList",
                GetSOSSubjectList: Kips.AppVar.AppHost + "/Common/GetSOSSubjectList"
            },
            Subject: {
                PopulateTopicTreeView: Kips.AppVar.AppHost + "/Subject/GetTopicsTreeDatasource",
                CreateTopicPartialView: Kips.AppVar.AppHost + "/Subject/CreateTopicPartialView",
                EditTopicPartialView: Kips.AppVar.AppHost + "/Subject/EditTopicPartialView",
                ManageTopicTreePartialView: Kips.AppVar.AppHost + "/Subject/ManageTopicTreePartialView",
                CreateSubjectPartialView: Kips.AppVar.AppHost + "/Subject/CreateSubjectPartialView",
                EditSubjectPartialView: Kips.AppVar.AppHost + "/Subject/EditSubjectPartialView",
                SaveSubjectDetail: Kips.AppVar.AppHost + "/Subject/SaveSubject",
                DeleteTopic: Kips.AppVar.AppHost + "/Subject/DeleteTopic",
                DeleteSosTopic: Kips.AppVar.AppHost + "/Subject/DeleteSosTopic",
                ChangeTopicSortOrder: Kips.AppVar.AppHost + "/Subject/ChangeTopicSortOrder",
                ChangeTopicParent: Kips.AppVar.AppHost + "/Subject/ChangeTopicParent",
                ChangeSubjectStatus: Kips.AppVar.AppHost + "/Subject/ChangeSubjectStatus",
                SaveSOSSubjectTopics: Kips.AppVar.AppHost + "/Subject/SaveSOSSubjectTopics"
            },
            Program: {
                ChangeProgramStatus: Kips.AppVar.AppHost + "/Program/ChangeProgramStatus",
                ChangeProgramSubjectStatus: Kips.AppVar.AppHost + "/Program/ChangeProgramSubjectStatus",
                ChangeProgramSubjectChatStatus: Kips.AppVar.AppHost + "/Program/ChangeProgramSubjectChatStatus",
                AddEditProgramSubjectPartialView: Kips.AppVar.AppHost + "/Program/GetAddEditProgramSubjectPartialView",
                SaveProgramSubjectDetail: Kips.AppVar.AppHost + "/Program/SaveProgramSubjectDetail",
                GetProgramSubjectsPartial: Kips.AppVar.AppHost + "/Program/GetProgramSubjectsPartial"
            },
            Meeting: {
                ChangeTopicStatus: Kips.AppVar.AppHost + "/Meeting/ChangeTopicStatus",
                ChangeHostStatus: Kips.AppVar.AppHost + "/Meeting/ChangeHostStatus",
                SyncHost: Kips.AppVar.AppHost + "/Meeting/SyncHost",
                SyncAllHost: Kips.AppVar.AppHost + "/Meeting/SyncAllHost",
                GetHostparticipantCapacity: Kips.AppVar.AppHost + "/Meeting/GetHostparticipantCapacity",
                ChangeTopicClassStatus: Kips.AppVar.AppHost + "/Meeting/ChangeTopicClassStatus",
                RemoveTopicClass: Kips.AppVar.AppHost + "/Meeting/RemoveTopicClass",
                TopicClassPreviewPartialView: Kips.AppVar.AppHost + "/Meeting/TopicClassPreviewPartialView",
                UpdateMeetingStatus: Kips.AppVar.AppHost + "/Meeting/UpdateMeetingStatus",
                EndExistingHostMeeting: Kips.AppVar.AppHost + "/Meeting/EndExistingHostMeeting"
            },
            Assignment: {
                ChangeAssignmentStatus: Kips.AppVar.AppHost + "/Assignment/ChangeAssignmentStatus",
                //SaveAssignment: Kips.AppVar.AppHost + "/Assignment/SaveAssignment",
                //GetPreSignedAmazonS3Url: Kips.AppVar.AppHost + "/Assignment/GetPreSignedAmazonS3Url",
                GetAssignmentFileList: Kips.AppVar.AppHost + "/Assignment/GetAssignmentFileList",
                GetCandidateAssignmentFileList: Kips.AppVar.AppHost + "/Assignment/GetCandidateAssignmentFileReviewList",
                UploadAssignmentFile: Kips.AppVar.AppHost + "/File/UploadToAmazonS3"
            },
            File: {
                GetPreSignedAmazonS3Url: Kips.AppVar.AppHost + "/File/GetPreSignedAmazonS3Url",
            },
            Content: {
                ChangeSubjectContentStatus: Kips.AppVar.AppHost + "/Content/ChangeSubjectContentStatus",
                AddEditContent: Kips.AppVar.AppHost + "/Content/CreateContent",
                SaveContent: Kips.AppVar.AppHost + "/Content/SaveContent",
                UploadContentFile: Kips.AppVar.AppHost + "/File/UploadToAmazonS3",
                AddEditTranscriptContent: Kips.AppVar.AppHost + "/Content/CreateTranscriptContent",
                SaveTranscriptContent: Kips.AppVar.AppHost + "/Content/SaveTranscriptContent",
                GetContentVideoPartialView: Kips.AppVar.AppHost + "/Content/GetContentVideoPartialViewAsync",
                PopulateTopicContentList: Kips.AppVar.AppHost + "/Content/PopulateTopicContentList",
                GetContentVideo: Kips.AppVar.AppHost + "/Content/GetContentVideo",
                GetContentReadingPartialView: Kips.AppVar.AppHost + "/Content/GetContentReadingPartialView",
                UpdateContentStatusMarkRead: Kips.AppVar.AppHost + "/Content/UpdateContentStatusMarkRead",
                GetBulkVideoViewModel: Kips.AppVar.AppHost + "/Content/GetBulkVideoViewModel",
                BulkVideoSave: Kips.AppVar.AppHost + "/Content/BulkVideoSave",
                //GetPreSignedAmazonS3Url: Kips.AppVar.AppHost + "/Content/GetPreSignedAmazonS3Url",
                SaveContentRatingAsync: Kips.AppVar.AppHost + "/Content/SaveContentRatingAsync",
                GetContentAverageRatingAsync: Kips.AppVar.AppHost + "/Content/GetContentAverageRatingAsync",
                ReadingsPreview: Kips.AppVar.AppHost + "/Content/ReadingsPreview",
                GetFileMappingPartialView: Kips.AppVar.AppHost + "/Content/GetFileMappingPartialView"
            },
            SOSMixContent: {
                ChangeSOSMixContentStatus: Kips.AppVar.AppHost + "/SOSMixedContent/ChangeSOSMixContentStatus",
            },
            Calendar: {
                ChangeCalendarStatus: Kips.AppVar.AppHost + "/Calendar/ChangeCalendarStatus"
            },
            Tenant: {
                ChangeTenantStatus: Kips.AppVar.AppHost + "/Tenant/ChangeTenantStatus"
            },
            ERP: {
                ProgramMappingDestroy: Kips.AppVar.AppHost + "/ERP/ProgramMappingDestroy",
                UpdateERPStudent: Kips.AppVar.AppHost + "/ERP/UpdateERPStudent",
                RegisterERPStudent: Kips.AppVar.AppHost + "/ERP/RegisterERPStudent",
                RemoveERPStudent: Kips.AppVar.AppHost + "/ERP/RemoveERPStudent"
            },
            Candidate: {
                Koogle: Kips.AppVar.AppHost + "/Candidate/Koogle",
                GetMyProgramsPartialView: Kips.AppVar.AppHost + "/Candidate/GetMyProgramsPartialView",
                GetProgramRegistrationPartialView: Kips.AppVar.AppHost + "/Candidate/GetProgramRegistrationPartialView",
                GetProgramBuyPartialView: Kips.AppVar.AppHost + "/Candidate/GetProgramBuyPartialView",
                MoveNotifications: Kips.AppVar.AppHost + "/Candidate/MoveNotifications",
                ShowNotificationDetail: Kips.AppVar.AppHost + "/Candidate/ShowNotificationDetail",
                GetQuestionCount: Kips.AppVar.AppHost + "/Candidate/GetQuestionCount",
                ChangeUserStatus: Kips.AppVar.AppHost + "/Candidate/ChangeUserStatus",
                ChangePermanentUserStatus: Kips.AppVar.AppHost + "/Candidate/ChangePermanentUserStatus",
                SetPassword: Kips.AppVar.AppHost + "/Candidate/SetPassword",
                GetProgramCompletion: Kips.AppVar.AppHost + "/Candidate/GetProgramCompletion",
                GetProgramSummary: Kips.AppVar.AppHost + "/Candidate/GetProgramSummary",
                GetProgramProgress: Kips.AppVar.AppHost + "/Candidate/GetProgramProgress",
                GetProgramSubjectScoreSummaryForStackBarChart: Kips.AppVar.AppHost + "/Candidate/GetProgramSubjectScoreSummaryForStackBarChart",
                GetProgramTestAccuracy: Kips.AppVar.AppHost + "/Candidate/GetProgramTestAccuracy",
                GetProgramSubjectCompletionSummaryForDonutChart: Kips.AppVar.AppHost + "/Candidate/GetProgramSubjectCompletionSummaryForDonutChart",
                GetNotificationMessageCount: Kips.AppVar.AppHost + "/Candidate/GetNotificationMessageCount",
                GetCandidateProfileImagePartial: Kips.AppVar.AppHost + "/Candidate/GetCandidateProfileImagePartial",
                CandidateBuyWebinarDetail: Kips.AppVar.AppHost + "/Candidate/CandidateBuyWebinarDetail",
                GetCandidateAttendanceList: Kips.AppVar.AppHost + "/Candidate/GetCandidateAttendanceList",
                GetCandidateDateSheet: Kips.AppVar.AppHost + "/Candidate/GetCandidateDateSheet",
                CandidateTimeTable: Kips.AppVar.AppHost + "/Candidate/GetCandidateTimeTable",
                GetCampusTestResult: Kips.AppVar.AppHost + "/Candidate/GetCampusTestResult",
                ConfirmUserEmail: Kips.AppVar.AppHost + "/Candidate/ConfirmUserEmail",
                ProgramMigration: Kips.AppVar.AppHost + "/Candidate/ProgramMigration",
                GetProgramSchemeStartDate: Kips.AppVar.AppHost + "/Candidate/GetProgramSchemeStartDate",
                GetCandidatesRegistrationViewModel: Kips.AppVar.AppHost + "/Candidate/GetCandidatesRegistrationViewModel",
                VerifyCandidateRegistration: Kips.AppVar.AppHost + "/Candidate/VerifyCandidateRegistration",
                GetCandidateSubjects: Kips.AppVar.AppHost + "/Candidate/GetCandidateSubjects",
                GetCandidateLeaderBoard: Kips.AppVar.AppHost + "/Candidate/GetCandidateLeaderBoard",
                GetResendPasswordPartialView: Kips.AppVar.AppHost + "/Candidate/GetResendPasswordPartialView"
            },
            CandidateSOSActivity: {
                CandidateSOSSubjectActivityDays: Kips.AppVar.AppHost + "/Candidate/CandidateSOSSubjectActivityDays",
                CandidateSOSSubjectDayActivities: Kips.AppVar.AppHost + "/Candidate/CandidateSOSSubjectDayActivities"
            },
            Guardian: {
                GetGuardianAttendanceList: Kips.AppVar.AppHost + "/Guardian/GetGuardianAttendanceList",
                GetGuardianDateSheet: Kips.AppVar.AppHost + "/Guardian/GetGuardianDateSheet",
                GuardianTimeTable: Kips.AppVar.AppHost + "/Guardian/GetGuardianTimeTable",
                GetCampusTestResult: Kips.AppVar.AppHost + "/Guardian/GetCampusTestResult",
            },
            Counselor: {
                GetGuardianInfo: Kips.AppVar.AppHost + "/Counselor/GetGuardianInfo",
                GetCandidateCounselingSessionProgress: Kips.AppVar.AppHost + "/Counselor/GetCandidateCounselingSessionProgress",
                ChangeUnlockStatus: Kips.AppVar.AppHost + "/Counselor/ChangeUnlockStatus",
                GetCandidateLMSProgressReport: Kips.AppVar.AppHost + "/Counselor/GetCandidateLMSProgressReport",
                GetCandidateCampusProgressReport: Kips.AppVar.AppHost + "/Counselor/GetCandidateCampusProgressReport",
                GetCandidateAttendanceList: Kips.AppVar.AppHost + "/Counselor/GetCandidateAttendanceList",

                GetCandidateCounselingSessionProgressPartial: Kips.AppVar.AppHost + "/Counselor/GetCandidateCounselingSessionProgressPartial"
            },
            Attendance: {
                GetAttendancePartialView: Kips.AppVar.AppHost + "/Attendance/GetAttendancePartialView",
                GetAttendanceData: Kips.AppVar.AppHost + "/Attendance/GetAttendanceData"
            },
            Download: {
                DownloadFromAmazonS3: Kips.AppVar.AppHost + "/File/DownloadFromAmazonS3",
                DeleteFileFromAmazonS3: Kips.AppVar.AppHost + "/File/DeleteFileFromAmazonS3"
            },

            Webinar:
            {
                GetWebinarVideoPartial: Kips.AppVar.AppHost + "/Webinar/GetWebinarVideoPartial"
            },
            TimeTable: {
                GetTimeTableData: Kips.AppVar.AppHost + "/TimeTable/GetTimeTableData",
                EditTimeTable: Kips.AppVar.AppHost + "/TimeTable/Edit"
            },
            Notification: {
                NotificationPreviewPartialView: Kips.AppVar.AppHost + "/Notification/NotificationPreviewPartialView",
                SiteUserNotificationPreviewPartialView: Kips.AppVar.AppHost + "/Notification/SiteUserNotificationPreviewPartialView"
            },
            Report: {
                GetCandidatesTestsSummary: Kips.AppVar.AppHost + "/Report/GetCandidatesTestsSummary"
            },
            Teacher: {
                SaveCourseCoverageDetail: Kips.AppVar.AppHost + "/Teacher/SaveCourseCoverageDetail",
                CourseCoverageDetailApprovalStatusPartialView: Kips.AppVar.AppHost + "/Teacher/CourseCoverageDetailApprovalStatusPartialView",
                ShowTeacherNotificationDetail: Kips.AppVar.AppHost + "/Teacher/ShowTeacherNotificationDetail",
                MoveNotifications: Kips.AppVar.AppHost + "/Teacher/MoveNotifications",
                GetNotificationMessageCount: Kips.AppVar.AppHost + "/Teacher/GetNotificationMessageCount",
                ApproveAllCoverageDetailStatus: Kips.AppVar.AppHost + "/Teacher/ApproveAllCoverageDetailStatus",
            },
            Manage: {
                ChangePassword: Kips.AppVar.AppHost + "/Manage/ChangePassword"
            },
            RoleManager: {
                GetSaveRolePartialView: Kips.AppVar.AppHost + "/RoleManager/GetSaveRolePartialView",
                ToggleRoleStatus: Kips.AppVar.AppHost + "/RoleManager/ToggleRoleStatus"
            },
            SOSMixedContent: {
                SaveContent: Kips.AppVar.AppHost + "/SOSMixedContent/SaveContent"
            },
        },

        API: {
            CandidateService: {
                IsHowYouKnowAnswered: Kips.AppVar.AppHost + "/api/Candidateservice/IsHowYouKnowAnswered",
                SaveHowYouKnow: Kips.AppVar.AppHost + "/api/Candidateservice/SaveHowYouKnow"
            },
            CandidateTestService: {
                TestAttempt: Kips.AppVar.AppHost + "/api/CandidateTestService/GetTestAttempt",
                TestResultDetail: Kips.AppVar.AppHost + "/api/CandidateTestService/GetTestResultDetail",
                TestResult: Kips.AppVar.AppHost + "/api/CandidateTestService/GetTestResult",
                SaveTest: Kips.AppVar.AppHost + "/api/CandidateTestService/SaveTest",
                GetSOSProgress: Kips.AppVar.AppHost + "/api/CandidateTestService/GetSOSProgress",
                TestList: Kips.AppVar.AppHost + "/api/CandidateTestService/GetTestList"
            },
            GuardianService: {
                GetSOSProgress: Kips.AppVar.AppHost + "/api/GuardianService/GetSOSProgress"
            },
            CandidateNotificationService: {
                CandidateNotification: Kips.AppVar.AppHost + "/api/CandidateNotificationService/GetCandidateNotifications"
            },
            CandidateWebinarService: {
                GetWebinars: Kips.AppVar.AppHost + "/api/CandidateWebinarService/GetWebinars"
            },
            CandidateFeedbackService: {
                GetFeedback: Kips.AppVar.AppHost + "/api/CandidateFeedbackService/GetFeedBack",
                SaveFeedback: Kips.AppVar.AppHost + "/api/CandidateFeedbackService/SaveFeedback"
            }
        },
        Script: {
            //MathJax: "http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML",
            JQuery: Kips.AppVar.AppHost + "/Scripts/jquery-1.10.2.min.js",
            Bootstrap: Kips.AppVar.AppHost + "/Scripts/bootstrap.js",
            JqueryHotKeys: Kips.AppVar.AppHost + "/Scripts/jquery.hotkeys.min.js",
            Mousetrap: Kips.AppVar.AppHost + "/Scripts/mousetrap.min.js",
            MathJax: Kips.AppVar.AppHost + "/Scripts/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML",
            WirisEditor: "https://www.wiris.net/demo/editor/editor",
            Application: {
                Common: {
                    EquationEditorIframeManager: Kips.AppVar.AppHost + "/Scripts/Application/Common/EquationEditorIframeManager.js"
                }
            }
        },
        Style: {
            kendoEditorIframeStyle: Kips.AppVar.AppHost + "/Content/kendoEditorIframeStyle.css",
        },
    },
    HttpStatusCode: {
        Ok: 'OK',
        Forbidden: 'Forbidden',
        InternalServerError: 'Internal Server Error'
    },
    HttpStatusCodeMessage: {
        Forbidden: 'Sorry! Access is denied. You have no permission to perform this action.'//Kips.SiteScript.GetApplicationMessage(Kips.AppConstants.ApplicationMessageKey.HttpStatusCodeMessage_Forbidden_Error)//
    },
    ImagePath: {
        AjaxLoader: Kips.AppVar.AppHost + "/Content/images/ajax-loader.gif",
        NoImage: Kips.AppVar.AppHost + "/Content/images/noimage.png"
    },
    TimeIntervals: {

    },
    MouseCurrentPosition: {
        X: undefined,
        Y: undefined
    },
    ActiveStatus: {
        Active: "Active",
        InActive: "InActive"
    },
    EntityStatus: {
        All: -1,
        InActive: 0,
        Active: 1,
        Delete: 2
    },
    ActionType: {
        Add: "Add",
        Edit: "Edit",
        Delete: "Delete"
    },
    Commands: {
        Add: "Add",
        Edit: "Edit",
        Delete: "Delete",
        DeleteSosTopic: "DeleteSosTopic",
        Question: "Question",
        Content: "Content",
        Expand: "Expand",
        Collapse: "Collapse",
        CheckedAll: "CheckedAll",
        UnCheckedAll: "UnCheckedAll"
    },
    UserRole: {
        SuperAdmin: "superadmin",
        Admin: "admin",
        Student: "student",
        DataEntry: "dataentry",
        Teacher: "teacher",
        HODTeacher: "hod-teacher",
        CampusManager: "campus-manager"
    },
    NotificationCurrentView: {
        INBOX: 0,
        TRASH: 1,
        DELETE: 2
    },
    NotificationFilterType: {
        All: 1,
        Read: 2,
        UnRead: 3
    },
    ApplicationMessageKey: {
        Record_NotFound_Error: 61,
        DetectBrowser_Warning: 73,
        OrientationChange_Warning: 74,
        ResetPassword_Confirmation: 75,
        Candidate_SaveProfile_Warning: 76,
        Select_OnlyOneFile_Error: 77,
        Select_AtleastOneItem_Error: 78,
        Notification_MoveToTrash_Confirmation: 79,
        Notification_MoveToInbox_Confirmation: 80,
        Notification_Delete_Confirmation: 81,
        Candidate_FinishTest_Confirmation: 82,
        HttpStatusCodeMessage_OK_Success: 83,
        HttpStatusCodeMessage_InternalServer_Error: 84,
        HttpStatusCodeMessage_Forbidden_Error: 85,
        Transcript_Delete_Confirmation: 86,
        File_Delete_Confirmation: 87,
        Chat_EnableDisable_Confirmation: 88,
        Question_Delete_Confirmation: 89,
        Topic_Delete_Confirmation: 90,
        Test_Copy_Confirmation: 91,
        Test_ValidateSubject_Error: 92,
        Test_ValidateYearSession_Error: 93,
        Test_Select_Error: 94,
        StatusChange_Confirmation: 95,
        Operation_Error: 96,
        Question_SelectDescription_Error: 106,
        Topic_ChangePosition_Confirmation: 113,
        File_Format_Error: 116,
        File_Size_Error: 117,
        Revision_Test_Delete_Confirmation: 124,
        Webinar_SearchDate_Error: 125,
        User_Email_Confirmation: 128,
        Record_Add_Confirmation: 130,
        Record_Delete_Confirmation: 131,
        ProgramChange_Confirmation: 142,
        SendConfirmationEmail_Confirmation: 143,
        AttachVideo_Confirmation: 145,
        VideoAvailableSoon_Info: 149,
        Uploading_Error: 150,
        Upload_File_Error: 151,
        Invalid_Move_Error: 152,
        Test_Drop_Confirmation: 160,
        CourseCoverage_ApproveAll_Confirmation: 161,
        Validation_mp4_Required: 162,
        Validation_Candidate_FeedbackRating_Required: 163,
        Validation_SelectAnyOption_Required: 164,
        Duplicate_Questions_Selected_Error: 166,
        Record_Update_Confirmation: 169,
        Meeting_Start_Confirmation: 170,
        Meeting_Complete_Confirmation: 171,
        Meeting_SyncAll_Confirmation: 172,
        Meeting_SyncHost_Confirmation: 173,
        Meeting_Slot_AlreadyExist_Error: 174,
        Meeting_Subscribe_Confirmation: 175,
        Sync_Success: 176,
        MeetingClass_Limit_Reached: 177,
        Subscribe_Success: 178,
        Host_Meeting_Already_Running_Error: 179,
        MeetingClass_Cancelled_Error: 180,
        MeetingClass_Completed_Error: 181,
        MeetingClass_NotAvailable_Error: 182,
        Campus_Student_Expired_Error: 183,
        Validation_Candidate_FeedbackRating_AtleastOne_Required: 184,



    },
    WebinarCurrentView: {
        ByWebinar: 0,
        MyWebinar: 1
    },
    KendoTemplates: {
        MobilePhone: '####-#######'
    },
    VisitType: {
        Self: 1,
        OnCallVisit: 2
    },
    FormState: {
        TimeInterval: 1000
    }
}