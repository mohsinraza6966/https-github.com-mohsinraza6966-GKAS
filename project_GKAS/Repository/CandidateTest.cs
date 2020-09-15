//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace Repository
{
    using System;
    using System.Collections.Generic;
    
    public partial class CandidateTest
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public CandidateTest()
        {
            this.CandidateTestDetails = new HashSet<CandidateTestDetail>();
        }
    
        public long CandidateTestId { get; set; }
        public long UserId { get; set; }
        public long TestId { get; set; }
        public Nullable<System.DateTime> StartTime { get; set; }
        public Nullable<System.DateTime> EndTime { get; set; }
        public Nullable<int> TotalScore { get; set; }
        public Nullable<decimal> ObtainScore { get; set; }
        public Nullable<int> TotalCorrect { get; set; }
        public Nullable<int> TotalIncorrect { get; set; }
        public Nullable<int> TotalUnattempted { get; set; }
        public Nullable<int> TotalQuestion { get; set; }
        public Nullable<int> AverageQuestionTime { get; set; }
    
        public virtual AspNetUser AspNetUser { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<CandidateTestDetail> CandidateTestDetails { get; set; }
        public virtual Test Test { get; set; }
    }
}
