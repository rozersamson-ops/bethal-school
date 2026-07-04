import React, { useState, useEffect } from "react";
import { COURSES } from "../data";
import { Course } from "../types";
import { InstrumentIconRenderer } from "./InstrumentIcons";
import { CourseComparisonTable } from "./CourseComparisonTable";
import { CheckCircle2, Clock, Calendar, HelpCircle, ArrowRight, Award, ChevronDown, ChevronUp } from "lucide-react";

interface CoursesSectionProps {
  selectedCourseId: string | null;
  onSelectCourse: (courseId: string | null) => void;
  onApplyCourse: (courseId: string) => void;
}

export const CoursesSection: React.FC<CoursesSectionProps> = ({
  selectedCourseId,
  onSelectCourse,
  onApplyCourse
}) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  useEffect(() => {
    if (selectedCourseId) {
      setExpandedId(selectedCourseId);
      // Scroll to the selected course card
      const element = document.getElementById(`course-card-${selectedCourseId}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [selectedCourseId]);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
      onSelectCourse(null);
    } else {
      setExpandedId(id);
      onSelectCourse(id);
    }
  };

  return (
    <div className="space-y-12">
      {/* Page Header */}
      <div className="text-center space-y-3">
        <p className="font-serif text-gold-500 text-xs font-bold uppercase tracking-[0.3em]">
          Class Schedules & Syllabi
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-100 uppercase tracking-wide">
          Our Musical Courses
        </h1>
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto"></div>
        <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          From basic musical literacy to advanced international diplomas, find the perfect instrument path aligned with Trinity College London & ABRSM curriculums.
        </p>
      </div>

      {/* Courses Accordion / Grid */}
      <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
        {COURSES.map((course) => {
          const isExpanded = expandedId === course.id;
          
          return (
            <div
              id={`course-card-${course.id}`}
              key={course.id}
              className={`bg-slate-905 border rounded-none overflow-hidden transition-all duration-300 ${
                isExpanded
                  ? "border-gold-500 shadow-md bg-slate-905"
                  : "border-slate-850 hover:border-slate-700 hover:bg-slate-950"
              }`}
            >
              {/* Header Bar (Click to Expand) */}
              <div
                onClick={() => toggleExpand(course.id)}
                className="p-5 md:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-center gap-4 text-left">
                  <div className={`p-3 rounded-none border transition-colors duration-300 ${
                    isExpanded ? "bg-slate-950 text-gold-500 border-gold-500" : "bg-slate-950 text-slate-400 border-slate-850"
                  }`}>
                    <InstrumentIconRenderer iconName={course.iconName} className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-lg text-slate-100 group-hover:text-white transition">
                      {course.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 max-w-md hidden md:block">
                      {course.tagline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline-block text-[10px] bg-slate-950 px-2.5 py-1 rounded-none text-slate-400 border border-slate-850 font-semibold uppercase tracking-wider">
                    {course.difficulty}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gold-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Expandable Details Section */}
              {isExpanded && (
                <div className="border-t border-slate-850/60 bg-slate-950/40 px-6 py-6 space-y-6 text-left">
                  {/* Detailed Description */}
                  <div className="space-y-2">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Course Curriculum Description
                    </h4>
                    <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
                      {course.longDescription}
                    </p>
                  </div>

                  {/* Program Metadata Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-b border-slate-850 py-4">
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                      <div>
                        <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Course Duration
                        </h5>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {course.duration}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                      <div>
                        <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Weekly Schedule
                        </h5>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {course.schedule}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Award className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                      <div>
                        <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          Exam Boards Preparations
                        </h5>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {course.exams.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Learning Outcomes */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                      Primary Learning Outcomes
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {course.outcomes.map((outcome, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                          <CheckCircle2 className="w-4 h-4 text-gold-500 mt-0.5 shrink-0" />
                          <span>{outcome}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Apply CTA Block */}
                  <div className="pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-slate-850/60">
                    <div className="text-xs text-slate-400">
                      Need guidance regarding admissions or exam registrations?
                    </div>
                    <button
                      onClick={() => onApplyCourse(course.id)}
                      className="px-5 py-2.5 rounded-none bg-slate-100 hover:bg-slate-950 hover:text-slate-100 border border-slate-100 hover:border-slate-850 text-slate-950 font-bold text-xs transition-all duration-300 uppercase flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      Inquire About {course.name}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Course Comparison Table Component */}
      <div className="py-6 border-t border-slate-850">
        <CourseComparisonTable />
      </div>

      {/* Extra Curriculum Callout */}
      <div className="p-6 md:p-8 bg-slate-905 border border-slate-850 rounded-none text-left max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
        <div className="space-y-2">
          <h4 className="font-serif font-bold text-slate-100 text-base uppercase tracking-wide">Complementary Music Theory Guidance</h4>
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
            We strongly encourage candidates taking instrumental grades 5 and above to enroll in our <strong>Music Theory Co-Curriculum</strong>. Graded theory passes are pre-requisite milestones for advanced global performance and teaching credentials.
          </p>
        </div>
        <button
          onClick={() => toggleExpand("music-theory")}
          className="text-xs text-slate-100 hover:text-slate-950 hover:bg-slate-100 font-bold border border-slate-850 hover:border-slate-100 px-4 py-2.5 rounded-none transition whitespace-nowrap cursor-pointer"
        >
          View Theory Syllabus
        </button>
      </div>
    </div>
  );
};
