using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GKAS.Models
{
    public class TestViewModel
    {
        public long TestId { get; set; }
        public string Name { get; set; }
        public long SubjectId { get; set; }
        public int QuestionCount { get; set; }
        public int Duration { get; set; }
        public int Status { get; set; }

        public bool IsAttempted { get; set; }

        public string Subject { get; set; }

    }

    public class CandidateTestResultViewModel
    {
        public string ProgramName { get; set; }
        public long TestId { get; set; }
        public string TestName { get; set; }
        public DateTime? TestDate { get; set; }
        public List<SubjectsResult> Subjects { get; set; }
        public List<TopicsResult> Topics { get; set; }
        public decimal TotalMarks { get; set; }
        public decimal? TotalPercentage { get; set; }
        public int TotalQuestions { get; set; }
        public int Duration { get; set; }
        public string DurationUnit { get; set; }
        public int NotAttempted { get; set; }
        public int TotalCorrect { get; set; }
        public int TotalIncorrect { get; set; }
        public string SubjectNames { get; set; }
        public string TopicNames { get; set; }
        public bool IsFLP { get; set; }
        public bool ShowHint { get; set; }
        public bool ShowExplanation { get; set; }

        public bool ShowCorrectAnswer { get; set; }

        public bool ShowDetailResult { get; set; }

        public int? AverageTestTime { get; set; }
    }

    public class SubjectsResult
    {
        public string SubjectName { get; set; }
        public decimal Score { get; set; }
        public decimal? Percentage { get; set; }
        public string Color { get; set; }
        public string Icon { get; set; }
        public int CorrectQuestions { get; set; }
        public int NotAttempted { get; set; }
        public int WrongQuestions { get; set; }
        public int TotalMarks { get; set; }

    }

    public class TopicsResult
    {
        public string TopicName { get; set; }
        public int NotAttempted { get; set; }
        public int WrongQuestions { get; set; }
        public int CorrectQuestions { get; set; }
        public int TotalQuestions { get; set; }
        public int Score { get; set; }
        public decimal? Percentage { get; set; }
        public int TotalMarks { get; set; }
    }

    public class CandidateTestResultRequestDto
    {
        /// <summary>
        /// Use Gettestlist api to get testId
        /// </summary>

        //[RequiredLocalized(ApplicationMessage.Enumeration.ApplicationMessageKey.Validation_Select)]
        public long TestId { get; set; }

        /// <summary>
        /// Use Getmyprograms api to get CandidateSOSId
        /// </summary>
        //[ApiExplorerSettings(IgnoreApi = true)]
        //public long CandidateSOSId { get; set; } = 0;

        //[ApiExplorerSettings(IgnoreApi = true)]
        //public long UserId { get; set; } = 0;
    }

    public class CandidateTestAttemptDto
    {
        /// <summary>
        /// Use GetTestAttempt api to get testId
        /// </summary>
        //[RequiredLocalized(ApplicationMessage.Enumeration.ApplicationMessageKey.Validation_Select)]
        public long TestId { get; set; }
        /// <summary>
        /// Use GetTestAttempt api to get candidateSOSId
        /// </summary>
       // [RequiredLocalized(ApplicationMessage.Enumeration.ApplicationMessageKey.Validation_Select)]
       
        //[RequiredLocalized(ApplicationMessage.Enumeration.ApplicationMessageKey.Validation_Select)]
        public List<AttemptedQuestion> AttemptedQuestionList { get; set; }
        /// <summary>
        /// Time must be in UTC (GMT) format.
        /// </summary>
        //[RequiredLocalized(ApplicationMessage.Enumeration.ApplicationMessageKey.Validation_Select)]
        public string StartTime { get; set; }

        /// <summary>
        /// Time must be in UTC (GMT) format.
        /// </summary>
        //[RequiredLocalized(ApplicationMessage.Enumeration.ApplicationMessageKey.Validation_Select)]
        public string EndTime { get; set; }


        public CandidateTestAttemptDto()
        {
            //AttemptedQuestionList = new List<AttemptedQuestion>();
        }
    }

    public class AttemptedQuestion
    {
        /// <summary>
        ///Get questionId by GetTestAttempt api while attempting test
        /// </summary>
        ///Required
        public long QuestionId { get; set; }

        /// <summary>
        /// Candidate answer can contains ',' and may also be an empty string
        /// </summary>
        public string CandidateAnswer { get; set; }

        public string StartTime { get; set; }

        public string EndTime { get; set; }
    }

    public class TestAttemptDto
    {
        //[RequiredLocalized(ApplicationMessage.Enumeration.ApplicationMessageKey.Validation_Select)]
        public long TestId { get; set; }


        public long CandidateSOSId { get; set; }
        public long ProgramId { get; set; }
        public string SingleSubjectName { get; set; }
        public string TestName { get; set; }
        public int Duration { get; set; }
        public string DurationUnit { get; set; }
        public string TestType { get; set; }
        public string ProgramName { get; set; }
        public bool ShowSubjectGrouping { get; set; }
        public int TotalQuestions { get; set; }
        public string SubjectNames { get; set; }

        public string TopicNames { get; set; }
        public List<string> SubjectNamesList { get; set; }
        public List<string> TopicNamesList { get; set; }
        public bool ShowHint { get; set; }
        public bool ShowExplanation { get; set; }

        public bool ShowCorrectAnswer { get; set; }

        public bool ShowDetailResult { get; set; }

        public List<TestQuestionDto> TestQuestionsList { get; set; }
    }

    //[ModelName("TestQuestionDTO")]
    public class TestQuestionDto
    {
        public long QuestionId { get; set; }
        public string Body { get; set; }
        public string OptionA { get; set; }
        public string OptionB { get; set; }
        public string OptionC { get; set; }
        public string OptionD { get; set; }
        public string OptionE { get; set; }
        public string Hint { get; set; }
        public int OptionCount { get; set; }
        //public string CorrectAnswerList { get; set; }
        public string CorrectAnswers { get; set; }
        public string CandidateAnswer { get; set; }
        public string SubjectName { get; set; }
        public string Explanation { get; set; }
        public string QuestionAnswerStatus { get; set; }
        /// <summary>
        ///	Uses this "GetAnswerTypeEnum" api to get AnswerType
        /// </summary>
        public AnswerType AnswerType { get; set; }
        /// <summary>
        ///	Uses this "GetTestQuestionTypeEnum" api to get QuestionType
        /// </summary>
        public TestQuestionType QuestionType { get; set; }

        public int CurrentCATCount { get; set; }

        public bool HasNextQuestion { get; set; }

        public bool IsPicked { get; set; }

        public int? DifficultyLevel { get; set; }

        public long TopicId { get; set; }

        public DateTime? StartTime { get; set; }
        public DateTime? EndTime { get; set; }
    }
    public class CandidateTestQuestionRequestDto
    {
        /// <summary>
        /// Use GetTestList api to get testId
        /// </summary>
       // [RequiredLocalized(ApplicationMessage.Enumeration.ApplicationMessageKey.Validation_Select)]
        public long TestId { get; set; }

        //[ApiExplorerSettings(IgnoreApi = true)]
        //public long UserId { get; set; } = 0;
        /// <summary>
        /// Use GetMyPrograms api to get CandidateSOSId
        /// </summary>
        //public long CandidateSOSId { get; set; } = 0;

        public long QuestionId { get; set; } = 0;

        public string CandidateAnswer { get; set; } = "";

        /// <summary>
        /// Time must be in UTC (GMT) format.
        /// </summary>
        public string StartTime { get; set; }
        /// <summary>
        /// Time must be in UTC (GMT) format.
        /// </summary>
        public string EndTime { get; set; }
    }

    public enum AnswerType
    {
        Single = 1,
        Multiple = 2,
    }
    public enum LevelOfDifficulty
    {
        Easy = 1,
        Medium,
        Hard
    }
    public enum TestQuestionType
    {
        //[Display(Name = "Simple")]
        Simple = 1,
        //[Display(Name = "Numerical")]
        Numerical = 2,
        //[Display(Name = "Diagrammatical")]
        Diagrammatical = 3,
        //[Display(Name = "Numerical + Diagrammatical")]
        NumericalDiagrammatical = 4
    }

    public  class TestTopic
    {
        public long TestTopicId { get; set; }
        public long TestId { get; set; }
        public Nullable<long> SubjectId { get; set; }
        public long TopicId { get; set; }
        public int EasyCount { get; set; }
        public int MediumCount { get; set; }
        public int HardCount { get; set; }
        public int TotalQuestion { get; set; }
        public int NumericalQuestionCount { get; set; }
        public int DiagramaticalQuestionCount { get; set; }
        public int QuestionMode { get; set; }
        public int PastPaperCount { get; set; }
        public int SelfGeneratedCount { get; set; }
        public int BookExerciseCount { get; set; }

    }

    public  class TestSubject
    {
        public long TestSubjectId { get; set; }
        public long TestId { get; set; }
        public long SubjectId { get; set; }
        public Nullable<int> SortOrder { get; set; }

    }

    public class CATTestModel
    {
        public List<CATConfigurationModel> CATConfigurationList { get; set; } = new List<CATConfigurationModel>();
        public List<CATAttemptedQuestionModel> CATAttemptedQuestionList { get; set; } = new List<CATAttemptedQuestionModel>();
        public List<TestQuestionDto> CATTestQuestionList { get; set; } = new List<TestQuestionDto>();
        public TestQuestionDto TestQuestion { get; set; }
        public Dictionary<long, int> TopicQuestionCountDictionary { get; set; }
        public int TotalQuestion { get; set; }
        public int CurrentCount { get; set; } = 0;
        public long TestId { get; set; }
    }

    public class CATConfigurationModel
    {
        public long? Index { get; set; }
        public int DifficultyLevel { get; set; }
        public int DecissionCount { get; set; }
        public int DecissionPercentage { get; set; }
        public bool CurrentLevel { get; set; }
        public bool StartLevel { get; set; }
        public int CurrentLevelIteration { get; set; }

        public int NextLevel { get; set; }
        public int PreviousLevel { get; set; }
    }

    public class CATAttemptedQuestionModel
    {
        public long QuestionId { get; set; }
        public int DifficultyLevel { get; set; }
        public string Answer { get; set; }
        public string CandidateAnswer { get; set; }
        public bool IsCorrectAnswer { get; set; }
        public string StartTime { get; set; }
        public string EndTime { get; set; }
        public bool IsProcessed { get; set; } = false;
    }
    public enum TestType
    {
        CAT = 1,
        CBT,
        PBT
    }

}