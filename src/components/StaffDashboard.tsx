import React, { useState, useEffect } from "react";
import { Inquiry } from "../types";
import { COURSES } from "../data";
import { Search, Filter, Mail, Phone, Calendar, CheckCircle2, RefreshCw, Trash2, Download, Award, UserPlus } from "lucide-react";

interface StaffDashboardProps {
  onClose?: () => void;
}

export const StaffDashboard: React.FC<StaffDashboardProps> = ({ onClose }) => {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [courseFilter, setCourseFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  // Load inquiries from localStorage
  const loadInquiries = () => {
    const saved = localStorage.getItem("bethel_music_inquiries");
    if (saved) {
      try {
        setInquiries(JSON.parse(saved));
      } catch (e) {
        console.error("Error parsing inquiries", e);
      }
    } else {
      // Seed initial inquiries if empty
      const initialSeed: Inquiry[] = [
        {
          id: "inq-1",
          studentName: "Aadhya Sharma",
          parentName: "Amit Sharma",
          studentAge: 9,
          courseId: "keyboard-piano",
          courseName: "Keyboard & Piano",
          phone: "9845012345",
          email: "amit.sharma@example.com",
          experience: "Beginner",
          notes: "Aadhya has a deep interest in keyboard and piano. We have a digital keyboard at home and want a structured classical program for Trinity exams.",
          dateSubmitted: "2026-07-01T10:30:00.000Z",
          status: "new"
        },
        {
          id: "inq-2",
          studentName: "Arun Krishnan",
          parentName: "Dr. K. Krishnan",
          studentAge: 14,
          courseId: "guitar",
          courseName: "Guitar",
          phone: "8015196369",
          email: "krish.doc@example.com",
          experience: "1-3 years",
          notes: "Arun has been learning acoustic guitar online for some time. We want physical coaching in Ooty for Trinity Rock & Pop intermediate grade exams.",
          dateSubmitted: "2026-07-02T14:15:00.000Z",
          status: "contacted"
        },
        {
          id: "inq-3",
          studentName: "Tanya Joseph",
          parentName: "Joseph Andrews",
          studentAge: 16,
          courseId: "vocal",
          courseName: "Vocal Training",
          phone: "9865865425",
          email: "tanya.singer@example.com",
          experience: "3+ years",
          notes: "Singing in church choirs. Looking to refine classical technique, breathing exercises, and ear training.",
          dateSubmitted: "2026-07-03T09:00:00.000Z",
          status: "enrolled"
        }
      ];
      localStorage.setItem("bethel_music_inquiries", JSON.stringify(initialSeed));
      setInquiries(initialSeed);
    }
  };

  useEffect(() => {
    loadInquiries();
  }, []);

  // Update inquiry status
  const handleUpdateStatus = (id: string, newStatus: Inquiry["status"]) => {
    const updated = inquiries.map((inq) => {
      if (inq.id === id) {
        return { ...inq, status: newStatus };
      }
      return inq;
    });
    setInquiries(updated);
    localStorage.setItem("bethel_music_inquiries", JSON.stringify(updated));
    if (selectedInquiry?.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  // Delete inquiry
  const handleDeleteInquiry = (id: string) => {
    if (window.confirm("Are you sure you want to permanently delete this inquiry?")) {
      const updated = inquiries.filter((inq) => inq.id !== id);
      setInquiries(updated);
      localStorage.setItem("bethel_music_inquiries", JSON.stringify(updated));
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ["ID", "Student Name", "Parent Name", "Age", "Course", "Phone", "Email", "Prior Experience", "Date Submitted", "Status", "Notes"];
    const rows = inquiries.map((inq) => [
      inq.id,
      inq.studentName,
      inq.parentName || "N/A",
      inq.studentAge.toString(),
      inq.courseName,
      inq.phone,
      inq.email,
      inq.experience,
      new Date(inq.dateSubmitted).toLocaleDateString(),
      inq.status,
      `"${(inq.notes || "").replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `Bethel_Music_School_Inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Search Logic
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (inq.parentName && inq.parentName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      inq.phone.includes(searchTerm) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCourse = courseFilter === "all" || inq.courseId === courseFilter;
    const matchesStatus = statusFilter === "all" || inq.status === statusFilter;

    return matchesSearch && matchesCourse && matchesStatus;
  });

  const getStatusColor = (status: Inquiry["status"]) => {
    switch (status) {
      case "new":
        return "bg-rose-500/10 text-rose-500 border border-rose-500/20";
      case "contacted":
        return "bg-amber-500/10 text-amber-500 border border-amber-500/20";
      case "enrolled":
        return "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20";
      case "closed":
        return "bg-slate-500/10 text-slate-400 border border-slate-500/20";
    }
  };

  return (
    <div className="bg-slate-905 border border-slate-850 rounded-none overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="bg-slate-950 px-6 py-4 border-b border-slate-850 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-905 text-gold-500 rounded-none border border-slate-850">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-serif text-lg font-bold text-slate-100 uppercase tracking-wider">
              Registrar Desk
            </h2>
            <p className="font-sans text-xs text-slate-400">
              Manage student admissions inquiries and course registrations
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-slate-905 hover:bg-slate-850 text-slate-200 hover:text-white rounded-none border border-slate-850 transition"
          >
            <Download className="w-3.5 h-3.5" />
            Export CSV
          </button>
          <button
            onClick={loadInquiries}
            className="p-1.5 bg-slate-905 hover:bg-slate-850 text-slate-300 rounded-none border border-slate-850 transition"
            title="Refresh database"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-slate-850 min-h-[500px]">
        {/* Left 2 Columns: Search, Filters & Inquiries List */}
        <div className="lg:col-span-2 flex flex-col h-full max-h-[650px]">
          {/* Controls */}
          <div className="p-4 bg-slate-950/25 border-b border-slate-850 grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative md:col-span-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search candidates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder-slate-500"
              />
            </div>

            <div className="flex gap-2 md:col-span-2">
              <div className="flex-1 relative">
                <Filter className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
                <select
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="w-full pl-8 pr-2 py-2 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-300 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                >
                  <option value="all">All Courses</option>
                  {COURSES.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1 relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-300 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="new">New / Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="enrolled">Enrolled</option>
                  <option value="closed">Closed / Postponed</option>
                </select>
              </div>
            </div>
          </div>

          {/* List Area */}
          <div className="overflow-y-auto flex-1 max-h-[500px]">
            {filteredInquiries.length === 0 ? (
              <div className="py-16 text-center text-slate-500 flex flex-col items-center justify-center gap-2">
                <UserPlus className="w-10 h-10 text-slate-600 stroke-[1.5]" />
                <p className="text-sm">No student inquiries match these filters.</p>
                <p className="text-xs text-slate-600">New submissions from the Admissions page will automatically appear here.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-850/60">
                {filteredInquiries.map((inq) => (
                  <div
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-4 hover:bg-slate-850/35 transition cursor-pointer flex flex-wrap justify-between items-start gap-3 ${
                      selectedInquiry?.id === inq.id ? "bg-slate-850/50 border-l-2 border-gold-500" : ""
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-bold text-slate-100 text-sm">
                          {inq.studentName}
                        </span>
                        <span className="text-[10px] bg-slate-950 px-1.5 py-0.5 rounded-none border border-slate-850 text-slate-400">
                          Age {inq.studentAge}
                        </span>
                      </div>
                      <p className="text-xs text-gold-500 font-medium uppercase tracking-wider text-[10px]">
                        {inq.courseName}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-500" />
                          {inq.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-slate-500" />
                          {inq.email}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2 text-right">
                      <span className={`text-[9px] px-2 py-0.5 rounded-none font-bold uppercase tracking-wider ${getStatusColor(inq.status)}`}>
                        {inq.status}
                      </span>
                      <span className="text-[10px] text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {new Date(inq.dateSubmitted).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-3 bg-slate-950 border-t border-slate-850 text-[11px] text-slate-500 flex justify-between items-center">
            <span>Showing {filteredInquiries.length} of {inquiries.length} inquiries</span>
            <span>Database Location: Browser LocalStorage</span>
          </div>
        </div>

        {/* Right Column: Detailed View */}
        <div className="p-6 bg-slate-950/10 max-h-[650px] overflow-y-auto">
          {selectedInquiry ? (
            <div className="space-y-6">
              {/* Header card */}
              <div className="space-y-2 border-b border-slate-850 pb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-serif text-lg font-bold text-slate-100">
                      {selectedInquiry.studentName}
                    </h3>
                    {selectedInquiry.parentName && (
                      <p className="text-xs text-slate-450">
                        Parent: <span className="text-slate-300 font-medium">{selectedInquiry.parentName}</span>
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleDeleteInquiry(selectedInquiry.id)}
                    className="p-1.5 bg-slate-950 text-slate-400 hover:text-rose-500 border border-slate-850 hover:border-rose-500/20 rounded-none transition cursor-pointer"
                    title="Delete inquiry"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
                
                <span className={`inline-block text-[10px] px-2 py-0.5 rounded-none border font-bold uppercase tracking-widest ${getStatusColor(selectedInquiry.status)}`}>
                  {selectedInquiry.status}
                </span>
              </div>

              {/* Status workflow buttons */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-slate-550 uppercase tracking-wider">
                  Update Candidate Workflow
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleUpdateStatus(selectedInquiry.id, "contacted")}
                    className={`px-3 py-1.5 text-[10px] rounded-none border transition flex items-center justify-center gap-1 font-bold uppercase tracking-wider cursor-pointer ${
                      selectedInquiry.status === "contacted"
                        ? "bg-amber-600 text-white border-amber-600"
                        : "bg-slate-950 text-slate-350 border-slate-850 hover:bg-slate-800"
                    }`}
                  >
                    Mark Contacted
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedInquiry.id, "enrolled")}
                    className={`px-3 py-1.5 text-[10px] rounded-none border transition flex items-center justify-center gap-1 font-bold uppercase tracking-wider cursor-pointer ${
                      selectedInquiry.status === "enrolled"
                        ? "bg-emerald-650 text-white border-emerald-650"
                        : "bg-slate-950 text-slate-350 border-slate-850 hover:bg-slate-800"
                    }`}
                  >
                    <CheckCircle2 className="w-3 h-3" />
                    Enrolled
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedInquiry.id, "new")}
                    className={`px-3 py-1.5 text-[10px] rounded-none border transition flex items-center justify-center gap-1 font-bold uppercase tracking-wider cursor-pointer ${
                      selectedInquiry.status === "new"
                        ? "bg-rose-600 text-white border-rose-600"
                        : "bg-slate-950 text-slate-350 border-slate-850 hover:bg-slate-800"
                    }`}
                  >
                    Revert to New
                  </button>
                  <button
                    onClick={() => handleUpdateStatus(selectedInquiry.id, "closed")}
                    className={`px-3 py-1.5 text-[10px] rounded-none border transition flex items-center justify-center gap-1 font-bold uppercase tracking-wider cursor-pointer ${
                      selectedInquiry.status === "closed"
                        ? "bg-slate-700 text-slate-100 border-slate-700"
                        : "bg-slate-950 text-slate-350 border-slate-850 hover:bg-slate-800"
                    }`}
                  >
                    Close Case
                  </button>
                </div>
              </div>

              {/* Inquiry details */}
              <div className="space-y-4 text-xs bg-slate-950/50 p-4 border border-slate-850 rounded-none">
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Requested Program</p>
                  <p className="font-serif text-gold-500 font-bold uppercase tracking-wide">{selectedInquiry.courseName}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Student Age</p>
                    <p className="text-slate-300 font-medium">{selectedInquiry.studentAge} Years old</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Prior Experience</p>
                    <p className="text-slate-300 font-medium">{selectedInquiry.experience}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Contact Email</p>
                  <a href={`mailto:${selectedInquiry.email}`} className="text-slate-350 hover:text-gold-500 underline transition break-all">
                    {selectedInquiry.email}
                  </a>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Contact Number</p>
                  <a href={`tel:${selectedInquiry.phone}`} className="text-slate-350 hover:text-gold-500 underline transition font-mono">
                    {selectedInquiry.phone}
                  </a>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Submission Date</p>
                  <p className="text-slate-350 font-mono">{new Date(selectedInquiry.dateSubmitted).toLocaleString()}</p>
                </div>
              </div>

              {/* Cover Letter / Notes */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Candidate message / Notes</h4>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-none border border-slate-850 italic">
                  &ldquo;{selectedInquiry.notes || "No notes provided."}&rdquo;
                </p>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 py-20 space-y-2">
              <div className="w-12 h-12 rounded-none bg-slate-950 border border-slate-850 flex items-center justify-center text-slate-400">
                <Search className="w-5 h-5" />
              </div>
              <p className="text-sm">Select an inquiry from the list to view comprehensive details and progress the admission workflow.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
