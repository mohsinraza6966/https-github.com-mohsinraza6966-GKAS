using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Results;
using GKAS.BusinessLogic;
using GKAS.Models;
using Microsoft.AspNet.Identity;
using Repository;

namespace GKAS.Controllers.api
{
    public class CandidateTestServiceController : ApiController
    {
        private GKASEntities db = new GKASEntities();

        // GET: api/CandidateTestService
        //public IQueryable<Test> GetTests()
        //{
        //    return db.Tests;
        //}

        //// GET: api/CandidateTestService/5
        //[ResponseType(typeof(Test))]
        //public IHttpActionResult GetTest(long id)
        //{
        //    Test test = db.Tests.Find(id);
        //    if (test == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(test);
        //}

        //// PUT: api/CandidateTestService/5
        //[ResponseType(typeof(void))]
        //public IHttpActionResult PutTest(long id, Test test)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != test.TestId)
        //    {
        //        return BadRequest();
        //    }

        //    db.Entry(test).State = EntityState.Modified;

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TestExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return StatusCode(HttpStatusCode.NoContent);
        //}

        //// POST: api/CandidateTestService
        //[ResponseType(typeof(Test))]
        //public IHttpActionResult PostTest(Test test)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    db.Tests.Add(test);

        //    try
        //    {
        //        db.SaveChanges();
        //    }
        //    catch (DbUpdateException)
        //    {
        //        if (TestExists(test.TestId))
        //        {
        //            return Conflict();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return CreatedAtRoute("DefaultApi", new { id = test.TestId }, test);
        //}

        //// DELETE: api/CandidateTestService/5
        //[ResponseType(typeof(Test))]
        //public IHttpActionResult DeleteTest(long id)
        //{
        //    Test test = db.Tests.Find(id);
        //    if (test == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Tests.Remove(test);
        //    db.SaveChanges();

        //    return Ok(test);
        //}

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TestExists(long id)
        {
            return db.Tests.Count(e => e.TestId == id) > 0;
        }

        public long GetLoggedInUserId()
        {
            var id = User.Identity.GetUserId();
            Int64.TryParse(id, out long userId);
            return userId;
        }
        /// <summary>
        /// Use this api to get candidate test result and subject listing and topic listing from where test was made.
        /// </summary>
        [HttpGet]
        
        public IHttpActionResult GetTestResult([FromUri] CandidateTestResultRequestDto model)
        {
           
            try
            {
                CandidateTestResultViewModel testResultViewModel = new CandidateTestResultViewModel();

                using (TestBusinessLogic objTestBusinessLogic = new TestBusinessLogic())
                {
                    testResultViewModel = objTestBusinessLogic.CandidateTestResult(model.TestId, GetLoggedInUserId());
                }

                return Ok(testResultViewModel);
            }
            catch (System.Exception ex)
            {
                var message = "An error has occured while saving student test";

                return ThrowInternalServerError(message);
            }
        }

        /// <summary>
        /// Use this api to get test result details with question listing and candidate answers.
        /// </summary>
        [HttpGet]
        //[ValidateModel]
        [ResponseType(typeof(TestAttemptDto))]
       // [ResponseCodes(HttpStatusCode.OK, HttpStatusCode.Unauthorized, HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetTestResultDetail([FromUri] CandidateTestResultRequestDto model)
        {
            try
            {
                var a = GetLoggedInUserId();
                TestAttemptDto testAttemptDto = new TestAttemptDto();

                using (TestBusinessLogic objTestBusinessLogic = new TestBusinessLogic())
                {
                    testAttemptDto = objTestBusinessLogic.GetCandidateTestResultDetails(model.TestId, a);  //  bool isAPIRequest = true for API request
                }

                return Ok(testAttemptDto);
            }
           
            catch (System.Exception ex)
            {
                var message = " An error ocured while executing ";

                return ThrowInternalServerError(message);
            }
        }

        /// <summary>
        /// Use this api to get attempt the test by candidate and return the question listing incase of CBT and single question incase of CAT test.
        /// </summary>
        [HttpGet]
        //[ValidateModel]
        //[ResponseType(typeof(TestAttemptDto))]
       // [ResponseCodes(HttpStatusCode.OK, HttpStatusCode.Unauthorized, HttpStatusCode.InternalServerError)]
        public IHttpActionResult GetTestAttempt([FromUri] CandidateTestQuestionRequestDto model)
        {
            try
            {
                
                TestAttemptDto objTestAttemptViewModel = new TestAttemptDto();

               
                    using (TestBusinessLogic objTestBusinessLogic = new TestBusinessLogic())
                    {
                       
                            objTestAttemptViewModel = objTestBusinessLogic.GetCATQuestionsForTestAttempt(model.TestId, GetLoggedInUserId(), model.QuestionId, model.CandidateAnswer, model.StartTime, model.EndTime);

                    }


                return Ok(objTestAttemptViewModel);
            }
            catch (System.Exception ex)
            {
                var message = "An error ocured while saving";

                return ThrowInternalServerError(message);
            }
        }

        /// <summary>
        /// Use this api to post/save questions answer list/answer to the server and get test result detail.
        /// </summary>
        [HttpPost]
        //[ValidateModel]
        //[ResponseType(typeof(CandidateTestResultViewModel))]
        //[ResponseCodes(HttpStatusCode.OK, HttpStatusCode.Unauthorized, HttpStatusCode.InternalServerError)]
        public IHttpActionResult SaveTest(CandidateTestAttemptDto objCandidateTestAttemptViewModel)
        {
            CandidateTestResultViewModel objCandidateTestResult = new CandidateTestResultViewModel();
            try
            {
              

              
                using (TestBusinessLogic objTestBusinessLogic = new TestBusinessLogic())
                {
                   
                        objCandidateTestResult = objTestBusinessLogic.SaveCandidateCATTest(GetLoggedInUserId(), objCandidateTestAttemptViewModel.TestId, objCandidateTestAttemptViewModel.AttemptedQuestionList.FirstOrDefault(), objCandidateTestAttemptViewModel.StartTime, objCandidateTestAttemptViewModel.EndTime);
                    
                }

                return Ok(objCandidateTestResult);
            }
          
            catch (System.Exception ex)
            {
                return ThrowInternalServerError("An error has occurred while saving test please try again.");
                
            }

           
           
        }
        public ResponseMessageResult ThrowInternalServerError(string message)
        {
            return ResponseMessage(Request.CreateErrorResponse(HttpStatusCode.InternalServerError, message));
        }

    }
}