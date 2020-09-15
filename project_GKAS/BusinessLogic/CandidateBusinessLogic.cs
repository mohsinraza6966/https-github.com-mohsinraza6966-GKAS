
using GKAS;
using Repository;
using System.Collections;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using System.Web;

namespace KIPS.BusinessLogic
{
    public class TestBusinessLogic : IDisposable
    {
        protected GKASEntities db = null;
        public ApplicationUserManager UserManager => HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
        public TestBusinessLogic(GKASEntities context)
        {
            db = context;
            db.Database.CommandTimeout = 180; 
            
        }
        public void Dispose()
        {
            Dispose(true);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db.Database.Connection.State == System.Data.ConnectionState.Open)
                {
                    db.Database.Connection.Close();
                }

                db.Dispose();
                db = null;
            }
        }

       
        public long GetLoggedInUserId()
        {
            long userId = 0;
            var claimsIdentity = HttpContext.Current.User.Identity as ClaimsIdentity;
            if (claimsIdentity != null)
            {
                // the principal identity is a claims identity.
                // now we need to find the NameIdentifier claim
                var userIdClaim = claimsIdentity.Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier);

                if (userIdClaim != null)
                {
                    long.TryParse(userIdClaim.Value, out userId);
                    //long.TryParse(db.SiteUsers.ToList().Find(u => u.UserId == Convert.ToInt64(userIdClaim.Value)).UserId.ToString(), out userId);
                }
            }

            return userId;
        }
       

      

       
        public bool IsTestAttemptedForTestReview(long testId)
        {
            long userId = GetLoggedInUserId();
            return (db.CandidateTests.Any(c => c.TestId == testId && c.UserId == userId));
        }

        public bool isTestAttempted(long testId)
        {
            return (db.CandidateTests.Any(c => c.TestId == testId));
        }


        


       

       
        public void SaveTest(TestViewModel viewModel)
        {
            using (var dbContextTransaction = db.Database.BeginTransaction())
            {
                try
                {
                    var model = new Test();
                    if (viewModel.TestId > 0)
                    {
                        model = db.Tests.FirstOrDefault(q => q.TestId == viewModel.TestId);
                    }
                    //  model.TestId = viewModel.TestId;
                    model.Name = viewModel.Name?.Trim();
                    model.ProgramId = viewModel.ProgramId;
                    model.ColorTable = viewModel.ColorTable;
                    model.Color = (viewModel.ColorTable) ? viewModel.Colors.FirstOrDefault() : (int)Colors.White;
                    model.InstituteId = viewModel.InstituteId;
                    model.TestType = viewModel.TestType;
                    model.Duration = viewModel.Duration;
                    model.SOSId = viewModel.SOSId;
                    model.EasyScore = viewModel.EasyScore;
                    model.IncorrectScore = viewModel.IncorrectScore;
                    model.MediumScore = viewModel.MediumScore;
                    model.HardScore = viewModel.HardScore;
                    model.TestVariation = viewModel.TestVariation;
                    model.QuestionConfiguration = viewModel.QuestionConfiguration; // in case of CAT questionConfiguration will be set to General
                    model.QuestionCount = viewModel.SubjectTopicMCQQuestionInformation.QuestionCount + viewModel.SubjectTopicLongQuestionInformation.QuestionCount + viewModel.SubjectTopicShortQuestionInformation.QuestionCount;
                    model.QuestionSet = viewModel.QuestionSet;
                    model.QuestionType = viewModel.QuestionType; // in case of CAT questionType will be set to All
                    model.QuestionTestType = viewModel.QuestionTestType; // in case of CAT QuestionTestType will be set to Simple
                    model.RollNumberTable = viewModel.RollNumberTable;
                    model.QuestionSelectionMode = (int)viewModel.QuestionSelectionMode;
                    model.RollNumberLength = viewModel.RollNumberLength;
                    model.IsFLP = viewModel.IsFLP;
                    model.CourseGroupId = (viewModel.IsFLP) ? viewModel.CourseGroupId : null;
                    model.TestConfigId = (viewModel.TestType == (int)(TestType.CAT)) ? viewModel.TestConfiguration : null;
                    model.ShowSubjectGrouping = viewModel.ShowSubjectGrouping;
                    model.TenantId = tenantId;
                    model.TestYear = DateTime.Now.Year;
                    model.IsQuestionModeMCQ = (viewModel.TestType != (int)TestType.PBT) ? true : viewModel.IsQuestionModeMCQ;
                    model.IsQuestionModeShortQuestion = (viewModel.TestType == (int)TestType.PBT) ? viewModel.IsQuestionModeShortQuestion : false;
                    model.IsQuestionModeLongQuestion = (viewModel.TestType == (int)TestType.PBT) ? viewModel.IsQuestionModeLongQuestion : false;
                    model.QuestionSource = (viewModel.QuestionSourceList != null) ? string.Join(",", viewModel.QuestionSourceList) : "";
                    model.ShowExplanation = viewModel.ShowExplanation;
                    model.ShowCorrectAnswer = viewModel.ShowCorrectAnswer;
                    model.ShowDetailResult = viewModel.ShowDetailResult;
                    model.ShowHint = viewModel.ShowHint;
                    model.TestCategory = (int)viewModel.TestCategory;

                    if (model.TestId == 0)
                    {
                        model.CreatedDate = DateTime.Now;
                        model.CreatedBy = GetLoggedInUserId();
                        model.Status = (int)EntityStatus.Active;

                        db.Tests.Add(model);
                    }
                    else
                    {
                        model.ModifiedDate = DateTime.Now;
                        model.ModifiedBy = GetLoggedInUserId();
                        model.Status = (int)EntityStatus.Active;
                        db.Entry(model).State = EntityState.Modified;
                    }

                    db.SaveChanges();

                    // saving and removing subject ordering //
                    if (model.ShowSubjectGrouping.Value)
                    {
                        List<long> lstSubjectOrder = viewModel.SubjectGroupOrder.Split(',').Select(long.Parse).ToList();
                        if (lstSubjectOrder.Count > 0)      //  if Subject Grouping is checked then subjects will be saved in TestSubject by sortable order
                        {
                            db.TestSubjects.RemoveRange(db.TestSubjects.Where(x => x.TestId == model.TestId));
                            var order = 1;
                            foreach (long id in lstSubjectOrder)
                            {
                                TestSubject subjectOrder = new TestSubject()
                                {
                                    TestId = model.TestId,
                                    SubjectId = id,
                                    SortOrder = order
                                };

                                db.TestSubjects.Add(subjectOrder);
                                order += 1;
                            }
                        }
                    }
                    else  // if Subject grouping is not selected then subjects will be saved in TestSubject as they were selected
                    {
                        db.TestSubjects.RemoveRange(db.TestSubjects.Where(x => x.TestId == model.TestId));
                        var order = 1;
                        foreach (long id in viewModel.SubjectIdList)
                        {
                            TestSubject subjectOrder = new TestSubject()
                            {
                                TestId = model.TestId,
                                SubjectId = id,
                                SortOrder = order
                            };

                            db.TestSubjects.Add(subjectOrder);
                            order += 1;
                        }
                    }

                    // saving and removing topics //
                    if (viewModel?.TopicIdList?.Count > 0)
                    {
                        db.TestTopics.RemoveRange(db.TestTopics.Where(x => x.TestId == model.TestId));

                        if (viewModel.SubjectTopicMCQQuestionInformation.QuestionCount != 0)
                        {
                            foreach (var item in viewModel.SubjectTopicMCQQuestionInformation.SubjectTopicQuestionList.Where(c => c.ParentSubject != 1))  // Saving TestTopic Configuration of all the selected topic
                            {
                                if (model.QuestionConfiguration == (int)QuestionConfiguration.EMH)
                                {
                                    TestTopic testTopic = new TestTopic()
                                    {
                                        TestId = model.TestId,
                                        TopicId = item.TopicId,
                                        EasyCount = item.EasySelectedCount,
                                        HardCount = item.HardSelectedCount,
                                        MediumCount = item.MediumSelectedCount,
                                        TotalQuestion = item.EasySelectedCount + item.MediumSelectedCount + item.HardSelectedCount,
                                        DiagramaticalQuestionCount = 0,
                                        NumericalQuestionCount = 0,
                                        BookExerciseCount = 0,
                                        PastPaperCount = 0,
                                        SelfGeneratedCount = 0,
                                        QuestionMode = (int)QuestionMode.MCQ
                                    };

                                    if (testTopic.TotalQuestion > 0)
                                    {
                                        db.TestTopics.Add(testTopic);
                                    }
                                }
                                else
                                {
                                    TestTopic testTopic = new TestTopic()
                                    {
                                        TestId = model.TestId,
                                        TopicId = item.TopicId,
                                        EasyCount = 0,
                                        HardCount = 0,
                                        MediumCount = 0,
                                        TotalQuestion = item.TotalSelectedCount,
                                        DiagramaticalQuestionCount = item.DiagramSelectedQuestion,
                                        NumericalQuestionCount = item.NumericalSelectedQuestion,
                                        SelfGeneratedCount = item.SelfGeneratedSelectedQuestion,
                                        PastPaperCount = item.PastPaperSelectedQuestion,
                                        BookExerciseCount = item.BookExerciseSelectedQuestion,
                                        QuestionMode = (int)QuestionMode.MCQ
                                    };

                                    if (testTopic.TotalQuestion > 0)
                                    {
                                        db.TestTopics.Add(testTopic);
                                    }
                                }
                            }
                        }

                        if (viewModel.SubjectTopicShortQuestionInformation.QuestionCount != 0)
                        {
                            foreach (var item in viewModel.SubjectTopicShortQuestionInformation.SubjectTopicQuestionList.Where(c => c.ParentSubject != 1))  // Saving TestTopic Configuration of all the selected topic
                            {
                                if (model.QuestionConfiguration == (int)QuestionConfiguration.EMH)
                                {
                                    TestTopic testTopic = new TestTopic()
                                    {
                                        TestId = model.TestId,
                                        TopicId = item.TopicId,
                                        EasyCount = item.EasySelectedCount,
                                        HardCount = item.HardSelectedCount,
                                        MediumCount = item.MediumSelectedCount,
                                        TotalQuestion = item.EasySelectedCount + item.MediumSelectedCount + item.HardSelectedCount,
                                        DiagramaticalQuestionCount = 0,
                                        NumericalQuestionCount = 0,
                                        BookExerciseCount = 0,
                                        PastPaperCount = 0,
                                        SelfGeneratedCount = 0,
                                        QuestionMode = (int)QuestionMode.ShortQuestion
                                    };

                                    if (testTopic.TotalQuestion > 0)
                                    {
                                        db.TestTopics.Add(testTopic);
                                    }
                                }
                                else
                                {
                                    TestTopic testTopic = new TestTopic()
                                    {
                                        TestId = model.TestId,
                                        TopicId = item.TopicId,
                                        EasyCount = 0,
                                        HardCount = 0,
                                        MediumCount = 0,
                                        TotalQuestion = item.TotalSelectedCount,
                                        DiagramaticalQuestionCount = item.DiagramSelectedQuestion,
                                        NumericalQuestionCount = item.NumericalSelectedQuestion,
                                        SelfGeneratedCount = item.SelfGeneratedSelectedQuestion,
                                        PastPaperCount = item.PastPaperSelectedQuestion,
                                        BookExerciseCount = item.BookExerciseSelectedQuestion,
                                        QuestionMode = (int)QuestionMode.ShortQuestion
                                    };

                                    if (testTopic.TotalQuestion > 0)
                                    {
                                        db.TestTopics.Add(testTopic);
                                    }
                                }
                            }
                        }
                        if (viewModel.SubjectTopicLongQuestionInformation.QuestionCount != 0)
                        {
                            foreach (var item in viewModel.SubjectTopicLongQuestionInformation.SubjectTopicQuestionList.Where(c => c.ParentSubject != 1))  // Saving TestTopic Configuration of all the selected topic
                            {
                                if (model.QuestionConfiguration == (int)QuestionConfiguration.EMH)
                                {
                                    TestTopic testTopic = new TestTopic()
                                    {
                                        TestId = model.TestId,
                                        TopicId = item.TopicId,
                                        EasyCount = item.EasySelectedCount,
                                        HardCount = item.HardSelectedCount,
                                        MediumCount = item.MediumSelectedCount,
                                        TotalQuestion = item.EasySelectedCount + item.MediumSelectedCount + item.HardSelectedCount,
                                        DiagramaticalQuestionCount = 0,
                                        NumericalQuestionCount = 0,
                                        BookExerciseCount = 0,
                                        PastPaperCount = 0,
                                        SelfGeneratedCount = 0,
                                        QuestionMode = (int)QuestionMode.LongQuestion
                                    };

                                    if (testTopic.TotalQuestion > 0)
                                    {
                                        db.TestTopics.Add(testTopic);
                                    }
                                }
                                else
                                {
                                    TestTopic testTopic = new TestTopic()
                                    {
                                        TestId = model.TestId,
                                        TopicId = item.TopicId,
                                        EasyCount = 0,
                                        HardCount = 0,
                                        MediumCount = 0,
                                        TotalQuestion = item.TotalSelectedCount,
                                        DiagramaticalQuestionCount = item.DiagramSelectedQuestion,
                                        NumericalQuestionCount = item.NumericalSelectedQuestion,
                                        SelfGeneratedCount = item.SelfGeneratedSelectedQuestion,
                                        PastPaperCount = item.PastPaperSelectedQuestion,
                                        BookExerciseCount = item.BookExerciseSelectedQuestion,
                                        QuestionMode = (int)QuestionMode.LongQuestion
                                    };

                                    if (testTopic.TotalQuestion > 0)
                                    {
                                        db.TestTopics.Add(testTopic);
                                    }
                                }
                            }
                        }
                    }
                    else
                    {
                        db.TestTopics.RemoveRange(db.TestTopics.Where(x => x.TestId == model.TestId));
                    }

                    db.SaveChanges();

                    // sp call IN CASE OF TestType = CBT, PBT

                    if (model.TestType != (int)(TestType.CAT))
                    {
                        db.TestQuestions.RemoveRange(db.TestQuestions.Where(x => x.TestId == model.TestId));
                        db.SaveChanges();

                        //Working for Manual Test Save
                        if (viewModel.QuestionSelectionMode == Enumeration.QuestionSelectionMode.Manual)
                        {
                            SaveManualQuestions(viewModel.SubjectTopicMCQQuestionInformation, model.ProgramId, model.TestId, model.SOSId, (Enumeration.QuestionType)model.QuestionType);
                            SaveManualQuestions(viewModel.SubjectTopicShortQuestionInformation, model.ProgramId, model.TestId, model.SOSId, (Enumeration.QuestionType)model.QuestionType);
                            SaveManualQuestions(viewModel.SubjectTopicLongQuestionInformation, model.ProgramId, model.TestId, model.SOSId, (Enumeration.QuestionType)model.QuestionType);
                        }
                        else
                        {
                            db.TestQuestion_Insert(model.TestId);  // Inserting questions in TestQuestion based on configuration of Test and TestTopic
                        }
                    }

                    model.MaxScore = GetMaximumScore(model.TestId);

                    db.Entry(model).State = EntityState.Modified;
                    db.SaveChanges();

                    if (model.TestType == (int)(TestType.PBT))
                    {
                        if (viewModel.ColorTable)
                        {
                            viewModel.Colors.Remove(viewModel.Colors.FirstOrDefault());
                        }
                        else
                        {
                            viewModel.Colors = new List<int> { (int)Colors.White };
                        }

                        InsertChildPBTTest(model.TestId, viewModel.Colors);
                    }

                    dbContextTransaction.Commit();
                }
                catch (QuestionAlreadyUsedException ex)
                {
                    dbContextTransaction.Rollback();
                    throw;
                }
                catch (System.Exception ex)
                {
                    dbContextTransaction.Rollback();
                    throw;
                }
            }
        }

       
       
        public int GetMaximumScore(long testId)
        {

            var test = db.Tests.FirstOrDefault(c => c.TestId == testId);
            int score = 0;

            if (test != null)
            {
                if (test.TestType != (int)(TestType.CAT))
                {
                    var questionList = db.TestQuestions.Where(c => c.TestId == testId).Select(c => c.Question).ToList();

                    foreach (var question in questionList)
                    {
                        if (question.QuestionType == (int)LevelOfDifficulty.Easy)
                        {
                            score += (int)test.EasyScore;
                        }
                        else if (question.QuestionType == (int)LevelOfDifficulty.Medium)
                        {
                            score += (int)test.MediumScore;
                        }
                        else
                        {
                            score += (int)test.HardScore;
                        }
                    }
                }
                else if (test.TestType == (int)(TestType.CAT))
                {
                    var testConfiguration = db.CATConfigurationDetail_Get(test.TestConfigId).OrderBy(c => c.Currentlevel).GroupBy(c => c.DifficultyLevel).Select(c => c.Last()).ToList();

                    var config = testConfiguration.Select(c => new CATConfigurationModel()
                    {
                        Index = c.rowIndex,
                        DifficultyLevel = (int)Enum.Parse(typeof(LevelOfDifficulty), c.DifficultyLevel),
                        CurrentLevel = c.Currentlevel == 1 ? true : false,
                        StartLevel = c.StartLevel == 1 ? true : false,
                        DecissionCount = c.DecissionCount,
                        DecissionPercentage = c.DecissionPercentage,
                        CurrentLevelIteration = 0,
                        NextLevel = NextDifficultyLevel(c.DifficultyLevel),
                        PreviousLevel = PreviousDifficultyLevel(c.DifficultyLevel)
                    }).ToList();

                    var currentLevel = config.FirstOrDefault(c => c.CurrentLevel == true && c.StartLevel == true);

                    score = CalculateCATMaxScore(config, currentLevel, score, 0, test);
                }
            }

            return score;
        }

        public int CalculateCATMaxScore(List<CATConfigurationModel> config, CATConfigurationModel currentLevel, int score, int count, Test test)
        {

            for (int i = 0; i < currentLevel.DecissionCount; i++)
            {
                if (count == test.QuestionCount)
                {
                    return score;
                }

                if (currentLevel.DifficultyLevel == (int)LevelOfDifficulty.Easy)
                {
                    score += (int)test.EasyScore;
                }
                else if (currentLevel.DifficultyLevel == (int)LevelOfDifficulty.Medium)
                {
                    score += (int)test.MediumScore;
                }
                else
                {
                    score += (int)test.HardScore;
                }

                count++;
            }

            currentLevel = config.FirstOrDefault(c => c.DifficultyLevel == currentLevel.NextLevel);

            return CalculateCATMaxScore(config, currentLevel, score, count, test);
        }

       

        public List<QuestionViewModel> GetQuestionsForTestPreview(long testId)
        {
            var lstQuestions = db.QuestionsForTestPreview_Get(testId).ToList().Select(c => new QuestionViewModel()
            {
                QuestionId = c.QuestionId,
                QuestionBody = c.QuestionBody,

                OptionA = (string.IsNullOrEmpty(c.OptionA)) ? "" : c.OptionA,
                OptionB = (string.IsNullOrEmpty(c.OptionB)) ? "" : c.OptionB,
                OptionC = (string.IsNullOrEmpty(c.OptionC)) ? "" : c.OptionC,
                OptionD = (string.IsNullOrEmpty(c.OptionD)) ? "" : c.OptionD,
                OptionE = (string.IsNullOrEmpty(c.OptionE)) ? "" : c.OptionE,
                Explanation = (string.IsNullOrEmpty(c.Explanation)) ? "" : c.Explanation,
                Hint = (string.IsNullOrEmpty(c.Hint)) ? "" : c.Hint,
                OptionCount = c.OptionCount ?? 0,
                CorrectAnswers = c.CorrectAnswer,
                SubjectName = c.Subject
            }).ToList();
            return lstQuestions;

        }

        public string GetSubjects(long testId)
        {
            List<TestSubject> subjectIds = db.TestSubjects.Where(ci => ci.TestId == testId).ToList();
            List<long> lstSubjectIds = new List<long>();
            foreach (var t in subjectIds)
            {
                lstSubjectIds.Add(t.SubjectId);
            }

            var subjects = string.Empty;
            var lstSubjects = db.Subjects.Where(r => lstSubjectIds.Contains(r.SubjectId)).Select(s => s.Name).ToList();


            if (lstSubjects.Count > 0)
            {
                subjects = lstSubjects.Aggregate((x, y) => x + ", " + y);
            }

            return subjects;
        }

        public string GetTopics(long testId)
        {
            List<TestTopic> topicIds = db.TestTopics.Where(ci => ci.TestId == testId).ToList();
            List<long> lstTopicsIds = new List<long>();
            foreach (var t in topicIds)
            {
                lstTopicsIds.Add(t.TopicId);
            }

            var topics = string.Empty;
            var lstTopics = db.Subjects.Where(r => lstTopicsIds.Contains(r.SubjectId)).Select(s => s.Name).ToList();


            if (lstTopics.Count > 0)
            {
                topics = lstTopics.Aggregate((x, y) => x + ", " + y);
            }

            return topics;
        }

     
        public TestAttemptDto GetTestAttemptInformation(long testId)
        {
            var obj = db.Tests.FirstOrDefault(t => t.TestId == testId);

            var objTestAttemptViewModel = new TestAttemptDto();
            objTestAttemptViewModel.TestId = obj.TestId;

            objTestAttemptViewModel.ProgramName = obj.Program.Name;
            objTestAttemptViewModel.TestName = obj.Name;
            objTestAttemptViewModel.Duration = obj.Duration;
            objTestAttemptViewModel.DurationUnit = "min";
            objTestAttemptViewModel.TestType = Enum.GetName(typeof(TestType), obj.TestType);
            objTestAttemptViewModel.ShowHint = obj.ShowHint;
            objTestAttemptViewModel.ShowExplanation = obj.ShowExplanation;
            objTestAttemptViewModel.ShowCorrectAnswer = obj.ShowCorrectAnswer;
            objTestAttemptViewModel.ShowDetailResult = obj.ShowDetailResult;
            objTestAttemptViewModel.ShowSubjectGrouping = obj.ShowSubjectGrouping ?? false;
            objTestAttemptViewModel.ProgramId = obj.ProgramId;
            objTestAttemptViewModel.SingleSubjectName = (obj.TestSubjects.Count() > 1) ? "" : obj.TestSubjects.FirstOrDefault().Subject.Name;

            if (objTestAttemptViewModel != null)
            {
                objTestAttemptViewModel.TestQuestionsList = GetTestQuestionsList(testId, obj.ShowHint, obj.ShowExplanation);
                objTestAttemptViewModel.TotalQuestions = objTestAttemptViewModel.TestQuestionsList.Count;

                objTestAttemptViewModel.SubjectNames = GetSubjects(testId);
                objTestAttemptViewModel.TopicNames = GetTopics(testId);
                objTestAttemptViewModel.TopicNamesList = objTestAttemptViewModel.TopicNames.Split(',').Select(p => p.Trim()).ToList();
                objTestAttemptViewModel.SubjectNamesList = objTestAttemptViewModel.SubjectNames.Trim().Split(',').Select(p => p.Trim()).ToList();
            }

            return objTestAttemptViewModel;
        }

        #region Candidate Test Attempt and Test Result Screen
        public TestAttemptDto GetQuestionsForTestAttempt(long testId, long candidateSOSId)
        {
            TestAttemptDto objTestAttemptViewModel = null;

            string cacheItemKey = CachePrefix.ForTest + testId.ToString();

            if (CacheManager.Contains(cacheItemKey))
            {
                objTestAttemptViewModel = CacheManager.GetItem(cacheItemKey) as TestAttemptDto;
            }
            else
            {
                objTestAttemptViewModel = GetTestAttemptInformation(testId);
                CacheManager.SetItem(cacheItemKey, objTestAttemptViewModel);
            }

            objTestAttemptViewModel.CandidateSOSId = candidateSOSId;

            return objTestAttemptViewModel;
        }

        public List<TestQuestionDto> GetTestQuestionsList(long testId, bool showHint = true, bool showExplanation = true)
        {
            var lstQuestions = db.QuestionsForTestPreview_Get(testId).Select(c => new TestQuestionDto()
            {
                QuestionId = c.QuestionId,
                Body = c.QuestionBody,
                OptionA = (string.IsNullOrEmpty(c.OptionA)) ? "" : c.OptionA,
                OptionB = (string.IsNullOrEmpty(c.OptionB)) ? "" : c.OptionB,
                OptionC = (string.IsNullOrEmpty(c.OptionC)) ? "" : c.OptionC,
                OptionD = (string.IsNullOrEmpty(c.OptionD)) ? "" : c.OptionD,
                OptionE = (string.IsNullOrEmpty(c.OptionE)) ? "" : c.OptionE,
                Explanation = "",//showExplanation ? ((string.IsNullOrEmpty(c.Explanation)) ? "" : c.Explanation) : "",
                Hint = showHint ? ((string.IsNullOrEmpty(c.Hint)) ? "" : c.Hint) : "",
                OptionCount = c.OptionCount ?? 0,
                CorrectAnswers = "",
                AnswerType = (AnswerType)c.AnswerType,
                QuestionType = (TestQuestionType)c.QuestionType,
                CandidateAnswer = "",
                SubjectName = c.Subject,
                TopicId = (int?)c.TopicId
            }).ToList();
            return lstQuestions;
        }

        public bool IsTestResultAvailable(long? candidateSOSId, long testId)
        {
            return db.CandidateTests.Any(
                    s => s.TestId == testId);
        }
        /// <summary>
        /// This function returns the datetime object containing the maximum estimated time that can be taken by user to 
        /// attempt the test and handle the scenario when time taken by user to attempt the test is greater than total test estimated time. 
        /// </summary>
        /// <param name="startTime">DateTime when user started to attempt the test </param>
        /// <param name="testId">TestId  of attempted test</param>
        /// <returns></returns>
        public DateTime? CalculateActualTestEndTime(DateTime startTime, long testId, DateTime? endTime)
        {
            //maximum time that a user can take to attempt the test
            var totalEstimatedTestTimeInSecond = db.Tests.Where(c => c.TestId == testId).FirstOrDefault().Duration * 60;
            var estimatedTestEndTime = startTime.AddSeconds(totalEstimatedTestTimeInSecond);

            return DateTime.Compare(endTime ?? DateTime.Now, estimatedTestEndTime) > 0 ? estimatedTestEndTime.ToUniversalTime() : endTime;
        }

        public CandidateTestResultViewModel SaveCandidateTest(CandidateTestAttemptDto objCandidateTestAttemptViewModel)
        {
            var userId = GetLoggedInUserId();
            // use this check to through exception incase of attempted question list is less then the total no. of questions in test.
            //var testQuestionCount = db.TestQuestions.Count(c => c.TestId == objCandidateTestAttemptViewModel.TestId);
            //if(testQuestionCount != objCandidateTestAttemptViewModel.AttemptedQuestionList.Count)
            //{

            //}
            CandidateTestResultViewModel objCandidateTestResult = new CandidateTestResultViewModel();
            //List<CandidateTestDetail> lstTestDetail = new List<CandidateTestDetail>();

            // check if student has already attempted test //
            if (IsTestResultAvailable(objCandidateTestAttemptViewModel.CandidateSOSId, objCandidateTestAttemptViewModel.TestId))
            {
                objCandidateTestResult = CandidateTestResult(objCandidateTestAttemptViewModel.TestId, objCandidateTestAttemptViewModel.CandidateSOSId);
            }
            else
            {
                //var candidateSchemeOfStudyId = //db.CandidateSchemeOfStudies.Where(s => s.UserId == userId).FirstOrDefault().SOSId;
                var model = new CandidateTest();
                model.TestId = objCandidateTestAttemptViewModel.TestId;
                model.UserId = userId;

                if (objCandidateTestAttemptViewModel.StartTime.HasValue())
                {
                    model.StartTime = Convert.ToDateTime(objCandidateTestAttemptViewModel.StartTime).ToUniversalTime();
                }

                if (objCandidateTestAttemptViewModel.EndTime.HasValue())
                {
                    model.EndTime = Convert.ToDateTime(objCandidateTestAttemptViewModel.EndTime).ToUniversalTime();
                }

                model.EndTime = CalculateActualTestEndTime(model.StartTime ?? DateTime.Now, objCandidateTestAttemptViewModel.TestId, Convert.ToDateTime(objCandidateTestAttemptViewModel.EndTime).ToUniversalTime());
                model.CreatedDate = model.EndTime;

                //using (var dbContextTransaction = db.Database.BeginTransaction())
                //{

                db.CandidateTests.Add(model);
                //db.SaveChanges();

                foreach (var question in objCandidateTestAttemptViewModel.AttemptedQuestionList)
                {
                    model.CandidateTestDetails.Add(new CandidateTestDetail
                    {
                        CandidateTestId = model.CandidateTestId,
                        QuestionId = question.QuestionId,
                        StartTime = string.IsNullOrEmpty(question.StartTime) ? (DateTime?)null : Convert.ToDateTime(question.StartTime).ToUniversalTime(),
                        EndTime = string.IsNullOrEmpty(question.EndTime) ? (DateTime?)null : Convert.ToDateTime(question.EndTime).ToUniversalTime(),
                        Answer = string.IsNullOrEmpty(question.CandidateAnswer) ? question.CandidateAnswer.ToUpper() : string.Join(",", (question.CandidateAnswer.Split(',').ToList().OrderBy(x => x))).ToUpper()
                    });
                }

              

                db.SaveChanges();


                objCandidateTestResult = CandidateTestResult(objCandidateTestAttemptViewModel.TestId, objCandidateTestAttemptViewModel.CandidateSOSId);

                // save CandidateSchemeOfStudySubject  TotalTestAttempted subject wise 

                //to gain sosId of candidate
                if (objCandidateTestAttemptViewModel.CandidateSOSId > 0)
                {
                    UpdateCandidateSOSSubjectTotalTestAttempted(objCandidateTestAttemptViewModel.CandidateSOSId, objCandidateTestAttemptViewModel.TestId);
                }
                //}
            }

            return objCandidateTestResult;
        }
       
      
        public CandidateTestResultViewModel CandidateTestResult(long testId, long? candidateSOSId)
        {
            candidateSOSId = candidateSOSId == 0 ? null : candidateSOSId;

            var testInformation = db.CandidateTests.Where(st => st.TestId == testId && st.CandidateSchemeOfStudyId == candidateSOSId).Select(s => new CandidateTestResultViewModel()
            {
                TestName = s.Test.Name,
                TestDate = s.CreatedDate,
                ProgramName = s.Test.Program.Name,
                TotalQuestions = s.Test.QuestionCount,
                Duration = s.Test.Duration,
                IsFLP = s.Test.IsFLP,
                ShowHint = s.Test.ShowHint,
                ShowExplanation = s.Test.ShowExplanation,
                ShowCorrectAnswer = s.Test.ShowCorrectAnswer,
                ShowDetailResult = s.Test.ShowDetailResult,
                AverageTestTime = s.AverageQuestionTime
            }).FirstOrDefault();

            CommonBusinessLogic commonBusinessLogic = new CommonBusinessLogic(db);

            var objCandidateTestResult = new CandidateTestResultViewModel
            {
                TestId = testId,
                TestName = testInformation?.TestName,
                TestDate = testInformation?.TestDate,
                IsFLP = testInformation.IsFLP,
                ProgramName = testInformation?.ProgramName,
                TotalQuestions = (testInformation == null) ? 0 : testInformation.TotalQuestions,
                Duration = (testInformation == null) ? 0 : testInformation.Duration,
                AverageTestTime = (testInformation == null) ? 0 : testInformation.AverageTestTime,
                DurationUnit = "sec",
                ShowHint = testInformation.ShowHint,
                ShowCorrectAnswer = testInformation.ShowCorrectAnswer,
                ShowDetailResult = testInformation.ShowDetailResult,
                ShowExplanation = testInformation.ShowExplanation,

                Subjects = db.CandidateTestResult_Get(testId, candidateSOSId, GetLoggedInUserId()).Select(r => new SubjectsResult()
                {
                    SubjectName = r.SubjectName,
                    Score = r.Score ?? 0,
                    Percentage = r.Percentage ?? 0,
                    CorrectQuestions = r.CorrectQuestions ?? 0,
                    WrongQuestions = r.WrongQuestions ?? 0,
                    NotAttempted = r.NotAttempted ?? 0,
                    TotalMarks = r.TotalMarks ?? 0,
                    Color = r.Color,
                    Icon = commonBusinessLogic.GenerateAmazonImageURL(r.Icon, AmazonBucketFolder.SubjectImage)
                }).ToList(),

                Topics = (testInformation.IsFLP) ? new List<TopicsResult>() : db.CandidateTestTopicsResult_Get(testId, candidateSOSId, GetLoggedInUserId()).Select(r => new TopicsResult()
                {
                    TopicName = r.TopicName,
                    NotAttempted = r.NotAttempted ?? 0,
                    WrongQuestions = r.WrongQuestions ?? 0,
                    CorrectQuestions = r.CorrectQuestions ?? 0,
                    Score = r.Score ?? 0,
                    Percentage = r.Percentage ?? 0,
                    TotalMarks = r.TotalMarks ?? 0,
                    TotalQuestions = (r.CorrectQuestions ?? 0) + (r.WrongQuestions ?? 0) + (r.NotAttempted ?? 0)
                }).ToList()
            };

            objCandidateTestResult.TotalMarks = objCandidateTestResult.Subjects.Sum(x => x.Score); // this is total obtained marks. //
            var marksForPercentage = (objCandidateTestResult.TotalMarks * 100);

            // obtained markts of all subject * 100 and divided by total Marks of all subject //
            objCandidateTestResult.TotalPercentage = marksForPercentage > 0 ? (marksForPercentage / objCandidateTestResult.Subjects.Sum(x => x.TotalMarks)) : 0;

            objCandidateTestResult.NotAttempted = objCandidateTestResult.Subjects.Sum(x => x.NotAttempted);
            objCandidateTestResult.TotalCorrect = objCandidateTestResult.Subjects.Sum(x => x.CorrectQuestions);
            objCandidateTestResult.TotalIncorrect = objCandidateTestResult.Subjects.Sum(x => x.WrongQuestions);
            objCandidateTestResult.SubjectNames = GetSubjects(testId);
            objCandidateTestResult.TopicNames = GetTopics(testId);

            return objCandidateTestResult;
        }

        public TestAttemptDto GetCandidateTestResultDetails(long testId, long candidateSOSId)
        {
            var objTestAttemptViewModel = db.Tests.Where(t => t.TestId == testId).AsEnumerable().Select(s => new TestAttemptDto()
            {
                TestId = s.TestId,
                CandidateSOSId = candidateSOSId,
                TestName = s.Name,
                Duration = s.Duration,
                ShowExplanation = s.ShowExplanation,
                ShowDetailResult = s.ShowDetailResult,
                ShowHint = s.ShowHint,
                ShowCorrectAnswer = s.ShowCorrectAnswer,
                DurationUnit = "min",
                TestType = Enum.GetName(typeof(TestType), s.TestType),
                ProgramName = s.Program.Name,
                ShowSubjectGrouping = s.ShowSubjectGrouping ?? false,
                ProgramId = s.ProgramId,
                SingleSubjectName = (s.TestSubjects.Count() > 1) ? "" : s.TestSubjects.FirstOrDefault().Subject.Name// s.TestSubjects.FirstOrDefault().Subject.Name
            }).FirstOrDefault();

            if (!objTestAttemptViewModel.ShowDetailResult)
            {
                throw new TestResultDetailAccessException("No Access on Test Result Detail");
            }

            if (objTestAttemptViewModel != null)
            {
                objTestAttemptViewModel.TestQuestionsList = GetTestQuestionsListForResultDetail(testId, candidateSOSId, objTestAttemptViewModel.ShowSubjectGrouping);
                objTestAttemptViewModel.TotalQuestions = objTestAttemptViewModel.TestQuestionsList.Count;
                objTestAttemptViewModel.SubjectNames = GetSubjects(testId);//GetCommaSeperatedSubjects(objTestAttemptViewModel.TestCategoryId, objTestAttemptViewModel.TestType, objTestAttemptViewModel.SingleSubjectName);
                objTestAttemptViewModel.TopicNames = GetTopics(testId); //GetCommaSeperatedTopics(testId);
            }

            return objTestAttemptViewModel;
        }

        public List<TestQuestionDto> GetTestQuestionsListForResultDetail(long testId, long? candidateSOSId, bool showSubjectGrouping)
        {
            candidateSOSId = candidateSOSId == 0 ? null : candidateSOSId;

            var lstQuestions = db.CandidateTestResultDetail_Get(testId, candidateSOSId, GetLoggedInUserId()).ToList().Select(c => new TestQuestionDto()
            {
                QuestionId = c.QuestionId,
                Body = c.QuestionBody,
                CorrectAnswers = c.CorrectAnswer,
                OptionCount = c.OptionCount ?? 0,
                Explanation = (string.IsNullOrEmpty(c.Explanation)) ? "" : c.Explanation,
                Hint = (string.IsNullOrEmpty(c.Hint)) ? "" : c.Hint,
                OptionA = (string.IsNullOrEmpty(c.OptionA)) ? "" : c.OptionA,
                OptionB = (string.IsNullOrEmpty(c.OptionB)) ? "" : c.OptionB,
                OptionC = (string.IsNullOrEmpty(c.OptionC)) ? "" : c.OptionC,
                OptionD = (string.IsNullOrEmpty(c.OptionD)) ? "" : c.OptionD,
                OptionE = (string.IsNullOrEmpty(c.OptionE)) ? "" : c.OptionE,
                CandidateAnswer = c.Answer,
                SubjectName = c.Subject,
                QuestionAnswerStatus = c.QuestionAnswerStatus,
                StartTime = c.StartTime,
                EndTime = c.EndTime
            }).ToList();

            return lstQuestions;
        }

        public List<SelectListItem> GetTestConfigurationList()
        {
            var list = db.TestConfigurations.Where(c => c.Status == (int)EntityStatus.Active)
                .Select(item => new SelectListItem()
                {
                    Text = item.Name.ToString(),
                    Value = item.TestConfigId.ToString()
                }).ToListReadUncommitted();

            return list;
        }

    
        #region CAT Execution

        public void PopulateCATTestModel(long testId)
        {

            var model = new CATTestModel();
            model.CATTestQuestionList = GetCATQuestionsList(testId);
            model.CATConfigurationList = GetCATConfigurationDetails(testId);
           

            model.TotalQuestion = db.Tests.FirstOrDefault(c => c.TestId == testId).QuestionCount;

            model.TestId = testId;

            System.Web.HttpContext.Current.Session["CATTestModel"] = model;
        }

       
        public List<TestQuestionDto> GetCATQuestionsList(long testId)
        {
            var lstQuestions = db.CATQuestion_Get(testId).Select(c => new TestQuestionDto()
            {
                QuestionId = c.QuestionId,
                //Body = c.QuestionBody,
                //OptionA = c.OptionA,
                //OptionB = c.OptionB,
                //OptionC = c.OptionC,
                //OptionD = c.OptionD,
                //OptionE = c.OptionE,
                //Explanation = c.Explanation,
                //Hint = c.Hint,
                //OptionCount = c.OptionCount ?? 0,
                CorrectAnswers = c.CorrectAnswer,
                //  CandidateAnswer = "",
                // SubjectName = c.SubjectName,
                AnswerType = (AnswerType)c.AnswerType,
                DifficultyLevel = c.DifficultyLevel,
                TopicId = c.TopicId,
                IsPicked = false
            }).ToList();

            return lstQuestions;
        }

        public List<CATConfigurationModel> GetCATConfigurationDetails(long testId)
        {
            var testConfigId = db.Tests.Where(c => c.TestType == (int)Enumeration.TestType.CAT && c.TestId == testId).FirstOrDefault().TestConfigId;

            var catConfiglist = db.CATConfigurationDetail_Get(testConfigId).Select(c => new CATConfigurationModel()
            {
                Index = c.rowIndex,
                DifficultyLevel = (int)Enum.Parse(typeof(LevelOfDifficulty), c.DifficultyLevel),
                CurrentLevel = c.Currentlevel == 1 ? true : false,
                StartLevel = c.StartLevel == 1 ? true : false,
                DecissionCount = c.DecissionCount,
                DecissionPercentage = c.DecissionPercentage,
                CurrentLevelIteration = 0,
                NextLevel = NextDifficultyLevel(c.DifficultyLevel),
                PreviousLevel = PreviousDifficultyLevel(c.DifficultyLevel)
            }).ToList();

            return catConfiglist;
        }

        public int NextDifficultyLevel(string currentLevel)
        {
            if ((int)Enum.Parse(typeof(LevelOfDifficulty), currentLevel) == (int)LevelOfDifficulty.Easy)
            {
                return (int)LevelOfDifficulty.Medium;
            }
            else
            {
                return (int)LevelOfDifficulty.Hard;
            }
        }

        public int PreviousDifficultyLevel(string currentLevel)
        {
            if ((int)Enum.Parse(typeof(LevelOfDifficulty), currentLevel) == (int)LevelOfDifficulty.Hard)
            {
                return (int)LevelOfDifficulty.Medium;
            }
            else
            {
                return (int)LevelOfDifficulty.Easy;
            }
        }

        public List<TestQuestionDto> GetNextCATQuestion(long questionId, string candidateAnswer, string startTime, string endTime)
        {
            List<TestQuestionDto> questionList = new List<TestQuestionDto>();
            if (HttpContext.Current.Session["CATTestModel"] != null)
            {
                var model = (CATTestModel)HttpContext.Current.Session["CATTestModel"];

                if (model.CATAttemptedQuestionList.Count == 0) // Start Level
                {
                    // Get Starter Level and set to Current Level

                    var currentLevel = model.CATConfigurationList.FirstOrDefault(c => c.StartLevel == true && c.CurrentLevel == true);

                    var objTopic = model.TopicQuestionCountDictionary.FirstOrDefault(c => c.Value != 0);

                    var pickQuestion = model.CATTestQuestionList.FirstOrDefault(c => c.DifficultyLevel == currentLevel.DifficultyLevel && c.TopicId == objTopic.Key);


                    model.CATTestQuestionList.FirstOrDefault(c => c.QuestionId == pickQuestion.QuestionId && c.TopicId == pickQuestion.TopicId).IsPicked = true;

                    model.TopicQuestionCountDictionary[objTopic.Key] = objTopic.Value - 1;

                    model.TestQuestion = GetQuestion(pickQuestion.QuestionId);

                    model.CATAttemptedQuestionList.Add(new CATAttemptedQuestionModel()
                    {
                        QuestionId = pickQuestion.QuestionId,
                        Answer = pickQuestion.CorrectAnswers,
                        DifficultyLevel = (int)pickQuestion.DifficultyLevel
                    });

                    model.CATConfigurationList.FirstOrDefault(c => c.Index == currentLevel.Index).CurrentLevelIteration += 1;
                    model.CurrentCount += 1;
                    model.TestQuestion.CurrentCATCount = model.CurrentCount;
                    model.TestQuestion.HasNextQuestion = (model.CurrentCount < model.TotalQuestion) ? true : false;
                    questionList.Add(model.TestQuestion);
                }
                else
                {
                    // Decission Based on :
                    // Either the Attempted List exceeds the max No of Questions
                    // Count of Current Level.
                    // Get Result of Last Count # of Questions and took decission

                    if (model.CATAttemptedQuestionList.Count < model.TotalQuestion)
                    {
                        string answer = (candidateAnswer == null) ? "" : string.Join(",", candidateAnswer.OrderBy(x => x)).ToUpper();

                        var currentQuestion = model.CATAttemptedQuestionList.FirstOrDefault(c => c.QuestionId == questionId && c.IsProcessed == false);

                        if (currentQuestion != null)
                        {
                            currentQuestion.IsCorrectAnswer = currentQuestion.Answer.ToUpper() == answer ? true : false;
                            currentQuestion.CandidateAnswer = answer;
                            currentQuestion.StartTime = startTime;
                            currentQuestion.EndTime = endTime;
                            currentQuestion.IsProcessed = true;
                        }

                        var currentLevel = model.CATConfigurationList.FirstOrDefault(c => c.CurrentLevel == true);
                        int nextLevel = currentLevel.DifficultyLevel;
                        bool jumpToNextLevel = true;

                        var objTopic = model.TopicQuestionCountDictionary.FirstOrDefault(c => c.Value != 0);


                        // Get last (current level decission count) number of items from attempted question list
                        var attemptedQuestion = model.CATAttemptedQuestionList.Skip(model.CATAttemptedQuestionList.Count - currentLevel.DecissionCount).ToList();

                        if (attemptedQuestion.Count(c => c.DifficultyLevel == currentLevel.DifficultyLevel) == currentLevel.DecissionCount)
                        {
                            var wrongPercentage = attemptedQuestion.Count(c => c.IsCorrectAnswer == false) * 100 / currentLevel.DecissionCount;
                            var correctPercentage = attemptedQuestion.Count(c => c.IsCorrectAnswer == true) * 100 / currentLevel.DecissionCount;

                            if (wrongPercentage >= currentLevel.DecissionPercentage)
                            {
                                nextLevel = currentLevel.PreviousLevel;
                            }
                            else if (correctPercentage >= currentLevel.DecissionPercentage)
                            {
                                nextLevel = currentLevel.NextLevel;
                            }
                            else
                            {
                                jumpToNextLevel = false;
                            }
                        }
                        else
                        {
                            jumpToNextLevel = false;
                        }


                        if (jumpToNextLevel)
                        {
                            model.CATConfigurationList.FirstOrDefault(c => c.Index == currentLevel.Index).CurrentLevel = false;

                            model.CATConfigurationList.FirstOrDefault(c => c.DifficultyLevel == nextLevel && c.StartLevel == false).CurrentLevel = true;

                            currentLevel = model.CATConfigurationList.FirstOrDefault(c => c.CurrentLevel == true);
                            model.CATConfigurationList.FirstOrDefault(c => c.Index == currentLevel.Index).CurrentLevelIteration += 1;
                        }
                        else
                        {
                            model.CATConfigurationList.FirstOrDefault(c => c.Index == currentLevel.Index).CurrentLevelIteration += 1;
                        }

                        var pickQuestion = model.CATTestQuestionList.FirstOrDefault(c => c.DifficultyLevel == currentLevel.DifficultyLevel && c.TopicId == objTopic.Key && c.IsPicked == false);

                        model.CATTestQuestionList.FirstOrDefault(c => c.QuestionId == pickQuestion.QuestionId && c.TopicId == pickQuestion.TopicId).IsPicked = true;
                        model.TopicQuestionCountDictionary[objTopic.Key] = objTopic.Value - 1;

                        model.TestQuestion = GetQuestion(pickQuestion.QuestionId);

                        model.CATAttemptedQuestionList.Add(new CATAttemptedQuestionModel()
                        {
                            QuestionId = pickQuestion.QuestionId,
                            Answer = pickQuestion.CorrectAnswers,
                            DifficultyLevel = (int)pickQuestion.DifficultyLevel
                        });

                        model.CurrentCount += 1;
                        model.TestQuestion.CurrentCATCount = model.CurrentCount;
                        model.TestQuestion.HasNextQuestion = (model.CurrentCount < model.TotalQuestion) ? true : false;
                        questionList.Add(model.TestQuestion);
                    }

                }

                HttpContext.Current.Session["CATTestModel"] = model;
            }

            questionList?.ForEach(q => q.CorrectAnswers = string.Empty);

            return questionList;
        }

        public TestAttemptDto GetCATQuestionsForTestAttempt(long testId, long candidateSOSId, long questId, string candidateAnswer, string startTime, string endTime)
        {

            var objTestAttemptViewModel = db.Tests.Where(t => t.TestId == testId).AsEnumerable().Select(s => new TestAttemptDto()
            {
                TestId = s.TestId,
                CandidateSOSId = candidateSOSId,
                TestName = s.Name,
                Duration = s.Duration,
                DurationUnit = "min",
                TestType = Enum.GetName(typeof(TestType), s.TestType),
                ProgramName = s.Program.Name,
                ShowSubjectGrouping = s.ShowSubjectGrouping ?? false,
                ProgramId = s.ProgramId,
                TotalQuestions = s.QuestionCount,
                ShowCorrectAnswer = s.ShowCorrectAnswer,
                ShowDetailResult = s.ShowDetailResult,
                ShowExplanation = s.ShowExplanation,
                ShowHint = s.ShowHint,
                SingleSubjectName = (s.TestSubjects.Count() > 1) ? "" : s.TestSubjects.FirstOrDefault().Subject.Name
            }).FirstOrDefault();

            if (objTestAttemptViewModel != null)
            {

                if (HttpContext.Current.Session["CATTestModel"] == null)
                {
                    PopulateCATTestModel(testId);
                    objTestAttemptViewModel.SubjectNames = GetSubjects(testId);
                    objTestAttemptViewModel.TopicNames = GetTopics(testId);
                }
                else
                {
                    var model = (CATTestModel)HttpContext.Current.Session["CATTestModel"];

                    if (questId == 0 && candidateAnswer == null && model.CATAttemptedQuestionList.Count != 0)
                    {
                        PopulateCATTestModel(testId);
                        objTestAttemptViewModel.SubjectNames = GetSubjects(testId);
                        objTestAttemptViewModel.TopicNames = GetTopics(testId);
                        objTestAttemptViewModel.TestQuestionsList = new List<TestQuestionDto>();
                    }
                    else
                    {
                        objTestAttemptViewModel.TestQuestionsList = GetNextCATQuestion(questId, candidateAnswer, startTime, endTime);
                    }

                }
            }

            return objTestAttemptViewModel;
        }

        public CandidateTestResultViewModel SaveCandidateCATTest(long? candidateSOSId, long testId, AttemptedQuestion attempted, string startTime, string endTime)
        {
            var userId = GetLoggedInUserId();

            CandidateTestResultViewModel objCandidateTestResult = new CandidateTestResultViewModel();
            List<CandidateTestDetail> lstTestDetail = new List<CandidateTestDetail>();

            if (IsTestResultAvailable(candidateSOSId, testId))
            {
                objCandidateTestResult = CandidateTestResult(testId, candidateSOSId);
            }
            else
            {


                if (HttpContext.Current.Session["CATTestModel"] != null)
                {
                    var catModel = (CATTestModel)HttpContext.Current.Session["CATTestModel"];

                    var lastQuestion = catModel.CATAttemptedQuestionList.FirstOrDefault(c => c.QuestionId == attempted.QuestionId && c.IsProcessed == false);

                    if (lastQuestion != null)
                    {
                        string answer = (attempted.CandidateAnswer == null) ? "" : string.Join(",", attempted.CandidateAnswer.OrderBy(x => x)).ToUpper();
                        lastQuestion.CandidateAnswer = answer;
                        lastQuestion.StartTime = attempted.StartTime;
                        lastQuestion.EndTime = attempted.EndTime;
                        lastQuestion.IsProcessed = true;
                    }

                    //var candidateSchemeOfStudyId = db.CandidateSchemeOfStudies.Where(s => s.UserId == userId && s.Status == (int)EntityStatus.Active).FirstOrDefault().SOSId;

                    if (catModel.CATAttemptedQuestionList.Count() == 0)
                    {
                        throw new TestDetailDataEmptyException();
                    }

                    var model = new CandidateTest
                    {
                        TestId = catModel.TestId,
                        UserId = userId,
                        CandidateSchemeOfStudyId = candidateSOSId,
                        CreatedDate = DateTime.Now,

                        StartTime = Convert.ToDateTime(startTime).ToUniversalTime()
                    };

                    //model.EndTime = model.CreatedDate; // storing end time which is equal to created date //
                    model.EndTime = CalculateActualTestEndTime(model.StartTime ?? DateTime.Now, testId, Convert.ToDateTime(endTime).ToUniversalTime());

                    using (var dbContextTransaction = db.Database.BeginTransaction())
                    {

                        db.CandidateTests.Add(model);
                        db.SaveChanges();

                        lstTestDetail.AddRange(catModel.CATAttemptedQuestionList.Select(test => new CandidateTestDetail
                        {
                            CandidateTestId = model.CandidateTestId,
                            QuestionId = test.QuestionId,
                            StartTime = string.IsNullOrEmpty(test.StartTime) ? (DateTime?)null : Convert.ToDateTime(test.StartTime).ToUniversalTime(),
                            EndTime = string.IsNullOrEmpty(test.EndTime) ? (DateTime?)null : Convert.ToDateTime(test.EndTime).ToUniversalTime(),
                            Answer = test.CandidateAnswer
                        }));

                        db.BulkInsert(lstTestDetail, 5000);
                        // save CandidateSchemeOfStudySubject  TotalTestAttempted properties as  subject wise of 
                        db.SaveChanges();

                        if (candidateSOSId > 0)
                        {
                            db.CandidateTestScore_Update(model.CandidateTestId);
                        }

                        dbContextTransaction.Commit();

                        objCandidateTestResult = CandidateTestResult(catModel.TestId, candidateSOSId);

                        // save CandidateSchemeOfStudySubject  TotalTestAttempted subject wise 
                        if (candidateSOSId > 0)
                        {
                            UpdateCandidateSOSSubjectTotalTestAttempted(candidateSOSId, testId);
                        }
                    }
                }


                HttpContext.Current.Session.Clear();
                HttpContext.Current.Session.Abandon();
            }
            return objCandidateTestResult;
        }

        public TestQuestionDto GetQuestion(long questionId)
        {
            var question = db.Questions.FirstOrDefault(c => c.QuestionId == questionId);
            var TestQuestion = new TestQuestionDto()
            {
                AnswerType = (AnswerType)question.AnswerType,
                Body = question.QuestionBody,
                CorrectAnswers = question.CorrectAnswer,
                DifficultyLevel = question.DifficultyLevel,
                Explanation = question.Explanation ?? "",
                Hint = question.Hint ?? "",
                OptionA = question.OptionA ?? "",
                OptionB = question.OptionB ?? "",
                OptionC = question.OptionC ?? "",
                OptionD = question.OptionD ?? "",
                OptionE = question.OptionE ?? "",
                OptionCount = (int)question.OptionCount,
                QuestionId = question.QuestionId,
                QuestionType = (TestQuestionType)question.QuestionType
            };
            return TestQuestion;
        }

        #endregion

        public List<QuestionPaperTemplateModel> GetQuestionPaperTemplate()
        {
            var lstTemplate = db.QuestionPaperTemplates.Select(c => new QuestionPaperTemplateModel()
            {
                TemplateId = c.TemplateId,
                Name = c.Name,
                TemplateType = c.TemplateType,
                Description = c.Description,
                Thumbnail = c.Thumbnail
            }).ToList();

            return lstTemplate;
        }

        public List<long> GetTestIdsWithAllVariations(long testId)
        {
            var testIds = db.Tests.Where(t => t.ParentTestId == testId && t.QuestionSet == (int)Enumeration.QuestionSet.Different).Select(d => d.TestId).ToList();
            testIds.Add(testId);

            return testIds;
        }

        public RevisionTestLogViewModel GetTestRevisionLog(long testRevisionLogId, RevisionTestLogViewModel viewModel = null)
        {

            viewModel = viewModel ?? new RevisionTestLogViewModel();

            if (testRevisionLogId > 0)
            {
                var model = db.RevisionTestLogs.FirstOrDefault(s => s.RevisionTestLogId == testRevisionLogId);
                if (model != null)
                {
                    Transform.FromObjectToObject(model, viewModel);
                }
            }
            else
            {
                viewModel.CreatedDate = DateTime.Now;
                viewModel.ToDate = DateTime.Now;
                viewModel.CreatedBy = (int)GetLoggedInUserId();
            }

            return viewModel;
        }

        public void SaveTestRevisionLog(RevisionTestLogViewModel viewModel)
        {

            var userId = GetLoggedInUserId();
            var programSubjects = db.ProgramSubjects.Where(c => c.ProgramId == viewModel.ProgramId).ToList();
            if (programSubjects.Any(c => c.MaxQuestionCount == 0 || c.MinQuestionCount == 0))
            {
                throw new SubjectQuestionCountLimitsNotSetException();
            }

            Task.Run(() =>
            {
                try
                {
                    db.Database.CommandTimeout = 3600;
                    var query = db.Candidate_GenerateRevisionTest(long.Parse(tenantId.ToString()), viewModel.InstituteId, viewModel.SosStartDate, viewModel.TestType, viewModel.ToDate, userId).FirstOrDefault();
                }
                catch (System.Exception ex)
                {
                    logger.Error(ex);
                }
            });
        }

        public DataSourceResult GetRevisionTestLogList(DataSourceRequest request)
        {
            var userId = GetLoggedInUserId();
            Hashtable filter = new Hashtable();
            Common.CommonFunction.PopulateFiltersInHashTable(request.Filters, filter);

            string sortBy = string.Empty;
            if (request.Sorts != null && request.Sorts.Any())
            {
                sortBy = request.Sorts[0].Member + " " + request.Sorts[0].SortDirection;
            }

            ObjectParameter totalRecordParam = new ObjectParameter("TotalRecords", System.Data.DbType.Int16);

            long? instituteId = filter["InstituteId"].GetValueOrNull<long>();
            long? programId = filter["ProgramId"].GetValueOrNull<long>();

            var queryresult = db.RevisionTestLogList_Get(instituteId, programId, userId, request.Page, request.PageSize, sortBy, totalRecordParam).ToList();

            DataSourceResult dsr = new DataSourceResult();
            List<ReviseTestLogListViewModel> RevisionTestList = new List<ReviseTestLogListViewModel>();
            foreach (var revisiontest in queryresult)
            {
                ReviseTestLogListViewModel model = new ReviseTestLogListViewModel();
                model.RowNumber = (long)revisiontest.RowNumber;
                model.RevisionTestLogId = revisiontest.RevisionTestLogId;
                model.Program = revisiontest.Program;
                model.SOS = revisiontest.SOS;
                model.TestType = revisiontest.TestType;
                model.ToDate = String.Format("{0:D}", revisiontest.ToDate);
                model.CreatedDate = String.Format("{0:D}", revisiontest.CreatedDate);
                model.UserName = revisiontest.UserName.GetUserNameWithoutTenant();
                model.RevisionTestLogDetailUrl = CryptographyUtility.GetEncryptedQueryString(new { revisiontestlogid = revisiontest.RevisionTestLogId }); ;
                model.Institute = revisiontest.InstituteName;

                RevisionTestList.Add(model);
            }

            dsr.Data = RevisionTestList;
            dsr.Total = (int)totalRecordParam.Value;

            return dsr;
        }

        public DataSourceResult GetRevisionTestLogDetailList(DataSourceRequest request, long revisiontestlogid)
        {
            Hashtable fltr = new Hashtable();
            Common.CommonFunction.PopulateFiltersInHashTable(request.Filters, fltr);

            string sortBy = string.Empty;
            if (request.Sorts != null && request.Sorts.Any())
            {
                sortBy = request.Sorts[0].Member + " " + request.Sorts[0].SortDirection;
            }

            ObjectParameter totalRecordParam = new ObjectParameter("TotalRecords", System.Data.DbType.Int16);
            var username = fltr.ContainsKey("Username") ? fltr["Username"].ToString()?.Trim() : "";

            var queryresult = db.RevisionTestLogDetailList_Get(username, revisiontestlogid, request.Page, request.PageSize, sortBy, totalRecordParam).ToList();

            DataSourceResult dsr = new DataSourceResult();
            List<RevisionTestLogDetailListViewModel> RevisionTestDetailList = new List<RevisionTestLogDetailListViewModel>();
            foreach (var revisiontest in queryresult)
            {
                RevisionTestLogDetailListViewModel model = new RevisionTestLogDetailListViewModel();

                model.RowNumber = (long)revisiontest.RowNumber;
                model.RevisionTestLogDetailId = revisiontest.RevisionTestLogDetailId;
                model.UserId = revisiontest.UserId;
                model.UserName = revisiontest.UserName.GetUserNameWithoutTenant();
                model.TestId = revisiontest.TestId;
                model.TestName = revisiontest.TestName;

                RevisionTestDetailList.Add(model);
            }

            dsr.Data = RevisionTestDetailList;
            dsr.Total = (int)totalRecordParam.Value;

            return dsr;
        }

        public void DeleteRevisionTestLog(long revisionlogid)
        {
            db.RevisionTestLog_Delete(revisionlogid);
        }
    }
}