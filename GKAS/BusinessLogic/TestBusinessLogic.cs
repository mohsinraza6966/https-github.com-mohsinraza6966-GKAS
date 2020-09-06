using EntityFramework.BulkInsert.Extensions;
using GKAS.Models;
using Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace GKAS.BusinessLogic
{

    public class TestBusinessLogic : IDisposable
    {
        private GKASEntities db = new GKASEntities();

        public void Dispose()
        {
            db.Dispose();
        }

        public CandidateTestResultViewModel CandidateTestResult(long testId, long? userId)
        {


            var testInformation = db.CandidateTests.Where(st => st.TestId == testId && st.UserId == userId).Select(s => new CandidateTestResultViewModel()
            {
                TestName = s.Test.Name,
                TestDate = DateTime.Now,
                ProgramName = "",
                TotalQuestions = s.Test.QuestionCount,
                Duration = s.Test.Duration,
                IsFLP = false,
                ShowHint = false,
                ShowExplanation = false,
                ShowCorrectAnswer = true,
                ShowDetailResult = true,
                AverageTestTime = s.EndTime.Value.Second - s.StartTime.Value.Second
            }).FirstOrDefault();


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
                //Subjects = new List<SubjectsResult>(),
                Subjects = db.CandidateTestResult_Get(testId, userId).Select(r => new SubjectsResult()
                {
                    SubjectName = r.SubjectName,
                    Score = r.Score ?? 0,
                    Percentage = r.Percentage ?? 0,
                    CorrectQuestions = r.CorrectQuestions ?? 0,
                    WrongQuestions = r.WrongQuestions ?? 0,
                    NotAttempted = r.NotAttempted ?? 0,
                    TotalMarks = r.TotalMarks ?? 0,
                    Color = r.Color,
                    Icon = ""
                }).ToList(),
                Topics = new List<TopicsResult>()
                //Topics = new List<TopicsResult>() : db.CandidateTestTopicsResult_Get(testId, candidateSOSId, GetLoggedInUserId()).Select(r => new TopicsResult()
                //{
                //    TopicName = r.TopicName,
                //    NotAttempted = r.NotAttempted ?? 0,
                //    WrongQuestions = r.WrongQuestions ?? 0,
                //    CorrectQuestions = r.CorrectQuestions ?? 0,
                //    Score = r.Score ?? 0,
                //    Percentage = r.Percentage ?? 0,
                //    TotalMarks = r.TotalMarks ?? 0,
                //    TotalQuestions = (r.CorrectQuestions ?? 0) + (r.WrongQuestions ?? 0) + (r.NotAttempted ?? 0)
                //}).ToList()
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

        public TestAttemptDto GetCandidateTestResultDetails(long testId, long userId)
        {
            var objTestAttemptViewModel = db.Tests.Where(t => t.TestId == testId).AsEnumerable().Select(s => new TestAttemptDto()
            {
                TestId = s.TestId,
                CandidateSOSId = 0,
                TestName = s.Name,
                Duration = s.Duration,
                ShowExplanation = false,
                ShowDetailResult = true,
                ShowHint = false,
                ShowCorrectAnswer = true,
                DurationUnit = "min",
                TestType = "CAT",
                ProgramName = "",
                ShowSubjectGrouping = false,
                ProgramId = 0,
                SingleSubjectName = s.Subject.Name
            }).FirstOrDefault();


            if (objTestAttemptViewModel != null)
            {
                objTestAttemptViewModel.TestQuestionsList = GetTestQuestionsListForResultDetail(testId, userId);
                objTestAttemptViewModel.TotalQuestions = objTestAttemptViewModel.TestQuestionsList.Count;
                objTestAttemptViewModel.SubjectNames = GetSubjects(testId);
                objTestAttemptViewModel.TopicNames = GetTopics(testId); 
            }

            return objTestAttemptViewModel;
        }

        public List<TestQuestionDto> GetTestQuestionsListForResultDetail(long testId, long? userId)
        {

            var lstQuestions = db.CandidateTestResultDetail_Get(testId, userId).ToList().Select(c => new TestQuestionDto()
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
            //return new List<TestQuestionDto>();
        }

        public TestAttemptDto GetCATQuestionsForTestAttempt(long testId, long userId, long questId, string candidateAnswer, string startTime, string endTime)
        {

            var objTestAttemptViewModel = db.Tests.Where(t => t.TestId == testId).AsEnumerable().Select(s => new TestAttemptDto()
            {
                TestId = s.TestId,
                CandidateSOSId = 0,
                TestName = s.Name,
                Duration = s.Duration,
                DurationUnit = "min",
                TestType = "CAT",
                ProgramName = "",
                ShowSubjectGrouping = false,
                ProgramId = 0,
                TotalQuestions = s.QuestionCount,
                ShowCorrectAnswer = true,
                ShowDetailResult = true,
                ShowExplanation = false,
                ShowHint = false,
                SingleSubjectName = s.Subject.Name
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

        public TestQuestionDto GetQuestion(long questionId)
        {
            var question = db.Questions.FirstOrDefault(c => c.QuestionId == questionId);
            var TestQuestion = new TestQuestionDto()
            {
                AnswerType = AnswerType.Single,
                Body = question.Body,
                CorrectAnswers = question.Answer,
                DifficultyLevel = question.DifficultyLevel,
                Explanation = question.Description ?? "",
                Hint = question.Hint ?? "",
                OptionA = question.OptionA ?? "",
                OptionB = question.OptionB ?? "",
                OptionC = question.OptionC ?? "",
                OptionD = question.OptionD ?? "",
                OptionE = question.OptionE ?? "",
                OptionCount = 4,
                QuestionId = question.QuestionId,
                QuestionType = TestQuestionType.Simple
            };
            return TestQuestion;
        }
        public void PopulateCATTestModel(long testId)
        {

            var model = new CATTestModel();
            model.CATTestQuestionList = GetCATQuestionsList(testId);
            model.CATConfigurationList = GetCATConfigurationDetails(testId);
            model.TopicQuestionCountDictionary = PopulateTopicDictionary(testId);

            model.TotalQuestion = db.Tests.FirstOrDefault(c => c.TestId == testId).QuestionCount;

            model.TestId = testId;

            System.Web.HttpContext.Current.Session["CATTestModel"] = model;
        }
        private Dictionary<long, int> PopulateTopicDictionary(long testId)
        {
            var testTopics = db.Tests.Where(c => c.TestId == testId);

            Dictionary<long, int> obj = new Dictionary<long, int>();

            foreach (var topic in testTopics)
            {
                obj.Add(topic.SubjectId, topic.QuestionCount);
            }

            return obj;
        }
        public List<CATConfigurationModel> GetCATConfigurationDetails(long testId)
        {
            //var testConfigId = db.Tests.Where(c => c.TestId == testId).FirstOrDefault().TestConfigId;

            var catConfiglist = db.CATConfigurationDetail_Get(1).Select(c => new CATConfigurationModel()
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
                AnswerType = AnswerType.Single,
                DifficultyLevel = c.DifficultyLevel,
                TopicId = c.TopicId,
                IsPicked = false
            }).ToList();

            return lstQuestions;
            
        }

        public CandidateTestResultViewModel SaveCandidateCATTest(long? userId, long testId, AttemptedQuestion attempted, string startTime, string endTime)
        {


            CandidateTestResultViewModel objCandidateTestResult = new CandidateTestResultViewModel();
            List<CandidateTestDetail> lstTestDetail = new List<CandidateTestDetail>();

            if (db.CandidateTests.Any(c => c.TestId == testId && c.UserId == userId))
            {
                objCandidateTestResult = CandidateTestResult(testId, userId);
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


                    var model = new CandidateTest
                    {
                        TestId = catModel.TestId,
                        UserId = userId ?? 0,
                        //CreatedDate = DateTime.Now,
                        EndTime = Convert.ToDateTime(endTime).ToUniversalTime(),
                        StartTime = Convert.ToDateTime(startTime).ToUniversalTime()
                    };

                    //model.EndTime = model.CreatedDate; // storing end time which is equal to created date //


                    using (var dbContextTransaction = db.Database.BeginTransaction())
                    {

                        db.CandidateTests.Add(model);
                        db.SaveChanges();
                        //db.SaveChanges();

                        //lstTestDetail.AddRange(catModel.CATAttemptedQuestionList.Select(test => new CandidateTestDetail
                        //{
                        //    CandidateTestId = model.CandidateTestId,
                        //    QuestionId = test.QuestionId,
                        //    StartTime = string.IsNullOrEmpty(test.StartTime) ? (DateTime?)null : Convert.ToDateTime(test.StartTime).ToUniversalTime(),
                        //    EndTime = string.IsNullOrEmpty(test.EndTime) ? (DateTime?)null : Convert.ToDateTime(test.EndTime).ToUniversalTime(),
                        //    Answer = test.CandidateAnswer
                        //}));

                        //db.BulkInsert(lstTestDetail, 5000);
                        // save CandidateSchemeOfStudySubject  TotalTestAttempted properties as  subject wise of 

                        foreach (var question in catModel.CATAttemptedQuestionList)
                        {
                            model.CandidateTestDetails.Add(new CandidateTestDetail
                            {
                                CandidateTestId = model.CandidateTestId,
                                QuestionId = question.QuestionId,
                                StartTime = string.IsNullOrEmpty(question.StartTime) ? (DateTime?)null : Convert.ToDateTime(question.StartTime).ToUniversalTime(),
                                EndTime = string.IsNullOrEmpty(question.EndTime) ? (DateTime?)null : Convert.ToDateTime(question.EndTime).ToUniversalTime(),
                                Answer = question.CandidateAnswer
                            });
                        }
                        db.SaveChanges();


                        dbContextTransaction.Commit();

                        objCandidateTestResult = CandidateTestResult(catModel.TestId, userId);

                        // save CandidateSchemeOfStudySubject  TotalTestAttempted subject wise 

                    }
                }


                HttpContext.Current.Session.Clear();
                HttpContext.Current.Session.Abandon();
            }
            return objCandidateTestResult;
        }
        public string GetSubjects(long testId)
        {
            var subject = db.Tests.FirstOrDefault(c => c.TestId == testId);
            return subject.Name;
        }

        public string GetTopics(long testId)
        {
            var topics = string.Empty;
            return topics;
        }
    }

}