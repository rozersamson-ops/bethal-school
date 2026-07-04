import React, { useState, useEffect } from "react";
import { COURSES } from "../data";
import { Inquiry } from "../types";
import { StaffDashboard } from "./StaffDashboard";
import { CheckCircle2, AlertCircle, FileText, Send, HelpCircle, Laptop, Settings, ChevronRight, Award } from "lucide-react";

interface AdmissionsSectionProps {
  preselectedCourseId: string | null;
}

export const AdmissionsSection: React.FC<AdmissionsSectionProps> = ({ preselectedCourseId }) => {
  // Form State
  const [studentName, setStudentName] = useState("");
  const [parentName, setParentName] = useState("");
  const [studentAge, setStudentAge] = useState("");
  const [courseId, setCourseId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("Beginner");
  const [notes, setNotes] = useState("");

  // UI States
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showStaffPanel, setShowStaffPanel] = useState(false);

  // Set pre-selected course if passed from outside
  useEffect(() => {
    if (preselectedCourseId) {
      setCourseId(preselectedCourseId);
    } else {
      setCourseId(COURSES[0].id);
    }
  }, [preselectedCourseId]);

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Simple Validations
    if (!studentName.trim()) {
      setErrorMsg("Candidate name is required.");
      return;
    }
    if (!studentAge || isNaN(Number(studentAge)) || Number(studentAge) <= 0) {
      setErrorMsg("Please specify a valid candidate age.");
      return;
    }
    if (!phone.trim() || phone.length < 10) {
      setErrorMsg("Please provide a valid 10-digit contact number.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }

    const selectedCourse = COURSES.find((c) => c.id === courseId);
    const courseName = selectedCourse ? selectedCourse.name : "General Music Inquiry";

    // Build Inquiry Object
    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      studentName,
      parentName: parentName.trim() || undefined,
      studentAge: Number(studentAge),
      courseId,
      courseName,
      phone,
      email,
      experience,
      notes: notes.trim() || undefined,
      dateSubmitted: new Date().toISOString(),
      status: "new"
    };

    // Save to LocalStorage Database
    try {
      const saved = localStorage.getItem("bethel_music_inquiries");
      const currentInquiries: Inquiry[] = saved ? JSON.parse(saved) : [];
      currentInquiries.unshift(newInquiry); // Add newest first
      localStorage.setItem("bethel_music_inquiries", JSON.stringify(currentInquiries));
      
      // WhatsApp redirect details
      const whatsappNumber = "919865865425";
      const messageText = `Hello Bethel School of Music! I would like to submit an admission registration:\n\n` +
                          `*Candidate:* ${studentName} (Age: ${studentAge})\n` +
                          `*Parent Name:* ${parentName || "N/A"}\n` +
                          `*Program Of Interest:* ${courseName}\n` +
                          `*Experience Level:* ${experience}\n` +
                          `*Phone:* ${phone}\n` +
                          `*Email:* ${email}\n` +
                          `*Goals / Notes:* ${notes || "None"}`;
      
      const encodedText = encodeURIComponent(messageText);
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;
      
      window.location.href = whatsappUrl;

      // Success feedback
      setIsSubmitted(true);
      
      // Reset form fields
      setStudentName("");
      setParentName("");
      setStudentAge("");
      setPhone("");
      setEmail("");
      setExperience("Beginner");
      setNotes("");
    } catch (err) {
      console.error("Database save failed", err);
      setErrorMsg("A storage error occurred. Please try again.");
    }
  };

  return (
    <div className="space-y-16">
      {/* 1. Page Header */}
      <div className="text-center space-y-3">
        <p className="font-serif text-gold-500 text-xs font-bold uppercase tracking-[0.3em]">
          Join Bethel Academy
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-100 uppercase tracking-wide">
          Admissions Inquiry 2026
        </h1>
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto"></div>
        <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          Unlock your natural musical talent! Register an admission inquiry below. Our registrar team will reach out within 24 working hours.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        {/* Left Column: Admission details / criteria */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="p-6 bg-slate-900/20 border border-slate-850 rounded-xl space-y-4">
            <h3 className="font-serif text-gold-400 font-bold text-sm tracking-wider uppercase">Admissions Guidelines</h3>
            <ul className="space-y-3 text-xs text-slate-300">
              <li className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0"></span>
                <span><strong>Age bracket:</strong> We admit candidates of all age groups (minimum age: 5 years for piano/keyboard, 7 for guitar/violin).</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0"></span>
                <span><strong>No Prior background:</strong> No audition is requested for absolute beginners. We construct your music foundations from scratch.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0"></span>
                <span><strong>Evaluations:</strong> Experienced playmakers looking for graded Trinity or ABRSM entrance will undergo a brief mechanical evaluation.</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 mt-1.5 shrink-0"></span>
                <span><strong>Affordable Sessions:</strong> Clean, budget-safe fee schedules with complete exam-track syllabus books provided.</span>
              </li>
            </ul>
          </div>

          <div className="p-6 bg-slate-950 border border-slate-800 rounded-xl text-center space-y-3">
            <h4 className="font-serif text-slate-200 font-bold text-sm tracking-wide">Trinity & ABRSM Partner</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              We guide students step-by-step through standard UK exam board grades (1 to 8). Theory exams are also proctored in Ooty.
            </p>
            <div className="flex justify-center gap-4 text-[10px] text-slate-500 uppercase tracking-widest pt-2">
              <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded">TRINITY PREP</span>
              <span className="bg-slate-900 border border-slate-800 px-2 py-1 rounded">ABRSM PREP</span>
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Form */}
        <div className="lg:col-span-7">
          {isSubmitted ? (
            <div className="bg-emerald-950/15 border border-emerald-500/25 p-8 rounded-none text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-slate-100 font-bold text-xl">Redirecting to WhatsApp!</h3>
                <p className="text-xs text-slate-400">
                  Opening WhatsApp secure chat with Prof. Samson Rozer (+91 98658 65425)...
                </p>
              </div>
              <p className="text-xs text-slate-300 bg-slate-950 p-4 rounded-none border border-slate-900 leading-relaxed max-w-md mx-auto">
                Thank you for registering. Your candidate details have been successfully pre-filled into our local demo CRM index and constructed into your WhatsApp message. Please tap <strong>"Send"</strong> in WhatsApp to verify your orientation session scheduling!
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-gold-400 hover:text-gold-300 font-bold tracking-wider uppercase border-b border-gold-400/30 hover:border-gold-300"
                >
                  Submit Another Inquiry
                </button>
              </div>
            </div>
          ) : (
          <form onSubmit={handleSubmitInquiry} className="bg-slate-905 border border-slate-850 p-6 md:p-8 rounded-none text-left space-y-6 shadow-md relative">
            {/* WhatsApp Helper Strip */}
            <div className="absolute top-0 right-0 transform translate-y-[-100%] bg-emerald-500 text-slate-950 text-[9px] font-mono font-bold px-3 py-1 uppercase tracking-wider">
              Direct Admissions Desk
            </div>

            <div className="flex items-center gap-3 border-b border-slate-850 pb-4">
              <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.59 2.046 14.12 1.012 11.5 1.01c-5.442 0-9.87 4.372-9.874 9.802-.001 1.758.484 3.473 1.406 4.981L2.008 21.93l6.236-1.636z" />
                </svg>
              </div>
              <div>
                <h3 className="font-serif font-bold text-slate-100 text-lg uppercase tracking-wide">Admissions Registration</h3>
                <p className="text-[10px] text-slate-400 font-light mt-0.5">Your registration profile will launch straight inside WhatsApp.</p>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-none text-rose-500 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Student name */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Candidate Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="e.g., Jane Doe"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder-slate-600"
                />
              </div>

              {/* Parent's name (for minors) */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Parent/Guardian Name <span className="text-slate-500">(For Minors)</span>
                </label>
                <input
                  type="text"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  placeholder="e.g., Robert Doe"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder-slate-600"
                />
              </div>

              {/* Candidate Age */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Candidate Age <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  value={studentAge}
                  onChange={(e) => setStudentAge(e.target.value)}
                  placeholder="e.g., 12"
                  min="1"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder-slate-600 font-mono"
                />
              </div>

              {/* Program Selected */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Select Program Of Interest <span className="text-red-500">*</span>
                </label>
                <select
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-300 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                >
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                  <option value="general">General Music Inquiry</option>
                </select>
              </div>

              {/* Phone */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder-slate-600 font-mono"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g., student@email.com"
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder-slate-600"
                />
              </div>
            </div>

            {/* Background Music experience */}
            <div className="space-y-2 text-left">
              <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Prior Instrumental Playing Experience
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { val: "Beginner", label: "Absolute Beginner" },
                  { val: "Under 1 year", label: "< 1 Year" },
                  { val: "1-3 years", label: "1 to 3 Years" },
                  { val: "3+ years", label: "3+ Years" }
                ].map((item) => (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setExperience(item.val)}
                    className={`px-3 py-2.5 text-[10px] font-bold rounded-none border transition ${
                      experience === item.val
                        ? "bg-slate-100 border-slate-100 text-slate-950"
                        : "bg-slate-950 border-slate-850 text-slate-400 hover:bg-slate-800"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Goals / Messages */}
            <div className="space-y-1.5">
              <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                Describe Musical Goals or Questions
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Tell us about the candidate's goals, schedules preferences, or prior teachers..."
                rows={4}
                className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder-slate-600 resize-none leading-relaxed"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 hover:text-slate-100 font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-none flex items-center justify-center gap-1.5 shadow-md cursor-pointer border border-emerald-500 hover:border-emerald-600"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.59 2.046 14.12 1.012 11.5 1.01c-5.442 0-9.87 4.372-9.874 9.802-.001 1.758.484 3.473 1.406 4.981L2.008 21.93l6.236-1.636z" />
              </svg>
              Launch WhatsApp Registration
            </button>
          </form>
          )}
        </div>
      </div>

      {/* 3. Developer / Admissions Staff Portal Link */}
      <section className="pt-10 border-t border-slate-850/60 max-w-4xl mx-auto space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-slate-950 rounded-xl border border-slate-800/80">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2 bg-slate-800 text-slate-400 rounded-lg border border-slate-700">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-serif text-slate-200 font-bold text-sm flex items-center gap-2">
                Bethel Admissions CRM Panel
                <span className="text-[9px] bg-gold-500/10 text-gold-400 px-1.5 py-0.2 rounded border border-gold-500/20 uppercase font-bold tracking-wider">Demo Desk</span>
              </h4>
              <p className="text-[11px] text-slate-500">
                Staff panel to manage registrations, export to CSV, search candidates, and update statuses.
              </p>
            </div>
          </div>
          <button
            onClick={() => setShowStaffPanel(!showStaffPanel)}
            className="text-xs text-gold-400 hover:text-gold-300 font-bold tracking-wider uppercase border border-gold-500/20 hover:border-gold-500/40 px-4 py-2 rounded-lg transition shrink-0"
          >
            {showStaffPanel ? "Hide Registrar Desk" : "Open Registrar Desk"}
          </button>
        </div>

        {showStaffPanel && (
          <div className="pt-2">
            <StaffDashboard />
          </div>
        )}
      </section>
    </div>
  );
};
