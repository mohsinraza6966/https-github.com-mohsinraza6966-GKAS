using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using GKAS.Models;
using Microsoft.AspNet.Identity;
using Repository;

namespace GKAS.Controllers
{
    //[Authorize(Roles = "superadmin")]
    public class TestController : Controller
    {
        private GKASEntities db = new GKASEntities();

        // GET: Test
        public long GetLoggedInUserId()
        {
            var id = User.Identity.GetUserId();
            Int64.TryParse(id, out long userId);
            return userId;
        }
        public ActionResult Attempt(long testId , string viewResult = "")
        {
            var userId = GetLoggedInUserId();
            // Candidate is not allowed to take attempt test again.

            bool isTestAttempted = db.CandidateTests.Any(ct => ct.TestId == testId && ct.UserId == userId);


            if ((viewResult == ResultType.Result || viewResult == ResultType.Detail) || !isTestAttempted)
            {


                ViewBag.SOSId = 0;
                ViewBag.CandidateSOSId = 0;
                ViewBag.TestId = testId;
                ViewBag.ShowResult = isTestAttempted ? "result" : "";
                ViewBag.UserId = userId;
                ViewBag.TestType = 1;//CAT
                ViewBag.TestCategory = 1;//OnlineTest
                ViewBag.ShowExplanation = false;
                ViewBag.ShowHint = false;
                ViewBag.ShowDetailResult = true;
                ViewBag.ShowCorrectAnswer = true;
                ViewBag.IsFLP = false;


            }
            return View();
        }
        public ActionResult Index()
        {
            var id = Int64.Parse(User.Identity.GetUserId());
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }

            var model = db.Tests.ToList().Select(t => new TestViewModel
            {
                Duration = t.Duration,
                IsAttempted = t.CandidateTests.Any(c => c.UserId == id),
                Name = t.Name,
                QuestionCount = t.QuestionCount,
                TestId = t.TestId,
                Status = t.Status,
                Subject = t.Subject.Name,
                SubjectId = t.SubjectId

            }).ToList();



            return View(model);
        }

        // GET: Test/Details/5
        [Authorize(Roles = "superadmin")]
        public ActionResult Details(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Test test = db.Tests.Find(id);
            if (test == null)
            {
                return HttpNotFound();
            }
            return View(test);
        }

        // GET: Test/Create
        [Authorize(Roles = "superadmin")]
        public ActionResult Create()
        {
            ViewBag.SubjectId = new SelectList(db.Subjects, "SubjectId", "Name");
            return View();
        }

        // POST: Test/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [Authorize(Roles = "superadmin")]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "TestId,Name,SubjectId,QuestionCount,Duration,Status,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate")] Test test)
        {
            if (ModelState.IsValid)
            {
                db.Tests.Add(test);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.SubjectId = new SelectList(db.Subjects, "SubjectId", "Name", test.SubjectId);
            return View(test);
        }

        // GET: Test/Edit/5
        [Authorize(Roles = "superadmin")]
        public ActionResult Edit(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Test test = db.Tests.Find(id);
            if (test == null)
            {
                return HttpNotFound();
            }
            ViewBag.SubjectId = new SelectList(db.Subjects, "SubjectId", "Name", test.SubjectId);
            return View(test);
        }

        // POST: Test/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for 
        // more details see https://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        [Authorize(Roles = "superadmin")]
        public ActionResult Edit([Bind(Include = "TestId,Name,SubjectId,QuestionCount,Duration,Status,CreatedBy,CreatedDate,ModifiedBy,ModifiedDate")] Test test)
        {
            if (ModelState.IsValid)
            {
                db.Entry(test).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            ViewBag.SubjectId = new SelectList(db.Subjects, "SubjectId", "Name", test.SubjectId);
            return View(test);
        }

        // GET: Test/Delete/5
        [Authorize(Roles = "superadmin")]
        public ActionResult Delete(long? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Test test = db.Tests.Find(id);
            if (test == null)
            {
                return HttpNotFound();
            }
            return View(test);
        }

        // POST: Test/Delete/5
        [Authorize(Roles = "superadmin")]
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(long id)
        {
            Test test = db.Tests.Find(id);
            db.Tests.Remove(test);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        public struct ResultType
        {
            public const string Result = "result";
            public const string Detail = "detail";
        }
    }
}
