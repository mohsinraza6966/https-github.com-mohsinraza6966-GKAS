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
}