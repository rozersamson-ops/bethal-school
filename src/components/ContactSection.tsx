import React, { useState } from "react";
import { Phone, Mail, Globe, MapPin, Clock, Send, CheckCircle, AlertCircle, Compass } from "lucide-react";

export const ContactSection: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMsg("Please provide a valid email.");
      return;
    }
    if (!message.trim()) {
      setErrorMsg("Message content cannot be blank.");
      return;
    }

    // Construct pre-filled WhatsApp link
    const whatsappNumber = "919865865425";
    const enquiryText = `Hello Bethel School of Music! I would like to make an enquiry:\n\n` +
                        `*Name:* ${name}\n` +
                        `*Email:* ${email}\n` +
                        `*Subject:* ${subject || "General Admission / Class Inquiry"}\n` +
                        `*Message Details:* ${message}`;
    
    const encodedText = encodeURIComponent(enquiryText);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

    // Redirect user to WhatsApp
    window.location.href = whatsappUrl;

    setIsSent(true);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  return (
    <div className="space-y-16">
      {/* 1. Page Header */}
      <div className="text-center space-y-3">
        <p className="font-serif text-gold-500 text-xs font-bold uppercase tracking-[0.3em]">
          Get In Touch
        </p>
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-100 uppercase tracking-wide">
          Contact Us
        </h1>
        <div className="w-20 h-[2px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto"></div>
        <p className="text-slate-400 text-xs md:text-sm max-w-xl mx-auto leading-relaxed">
          Have queries about syllabus plans, age requirements, or scheduling slots? Reach out to our Ooty administration center.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
        {/* Left: Contact Coordinates & Ooty Map */}
        <div className="lg:col-span-5 space-y-6 text-left">
          <div className="bg-slate-900/30 border border-slate-850 p-6 rounded-xl space-y-6">
            <h3 className="font-serif text-gold-400 font-bold text-sm tracking-wider uppercase border-b border-slate-850 pb-2">
              Our Coordinates
            </h3>

            <div className="space-y-4">
              {/* Address */}
              <div className="flex gap-3 items-start text-xs text-slate-300">
                <MapPin className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif text-slate-100 font-bold mb-0.5">Campus Address</p>
                  <p className="font-light">Bethel Music School</p>
                  <p className="font-light">Next to Punjab National Bank,</p>
                  <p className="font-light">Green Fields, Ooty,</p>
                  <p className="font-light">The Nilgiris, Tamil Nadu, India.</p>
                </div>
              </div>

              {/* Call */}
              <div className="flex gap-3 items-start text-xs text-slate-300">
                <Phone className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif text-slate-100 font-bold mb-0.5">Helpline Contacts</p>
                  <p className="font-mono text-gold-400 font-semibold text-sm">9865865425</p>
                  <p className="font-mono text-gold-400 font-semibold text-sm">8015196369</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-start text-xs text-slate-300">
                <Mail className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif text-slate-100 font-bold mb-0.5">General Email</p>
                  <p className="font-light select-all">shoolofmusicbethel@gmail.com</p>
                </div>
              </div>

              {/* Web */}
              <div className="flex gap-3 items-start text-xs text-slate-300">
                <Globe className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif text-slate-100 font-bold mb-0.5">Official Portal</p>
                  <p className="font-light text-slate-400">www.bethelschoolofmusic.com</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex gap-3 items-start text-xs text-slate-300">
                <Clock className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-serif text-slate-100 font-bold mb-0.5">Office Hours</p>
                  <p className="font-light">Monday &mdash; Saturday: 09:00 AM to 07:00 PM</p>
                  <p className="font-light">Sunday: Closed (Main Campus)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Schematized Ooty CSS map */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden p-4 text-center space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-400 font-bold px-1 uppercase tracking-wider">
              <span className="flex items-center gap-1"><Compass className="w-4 h-4 text-gold-500" /> Nilgiris Map</span>
              <span className="text-[10px] text-gold-500">Ooty Campus</span>
            </div>

            {/* Simulated Vector Map */}
            <div className="relative aspect-[16/9] w-full bg-slate-900 border border-slate-850 rounded-lg overflow-hidden flex items-center justify-center">
              {/* Mountains representation background */}
              <div className="absolute inset-x-0 bottom-0 h-16 bg-slate-950 opacity-40 rounded-t-3xl"></div>
              
              {/* Roads / Paths */}
              <div className="absolute top-1/2 inset-x-0 h-[3px] bg-slate-800 transform -rotate-6"></div>
              <div className="absolute left-2/3 inset-y-0 w-[3px] bg-slate-800 transform rotate-12"></div>
              
              {/* Labels */}
              <div className="absolute top-4 left-6 text-[9px] text-slate-500 font-mono">Botanical Gardens &rarr;</div>
              <div className="absolute bottom-4 left-10 text-[9px] text-slate-500 font-mono">&larr; Ooty Lake</div>
              
              {/* PNB Node */}
              <div className="absolute top-[48%] left-[45%] bg-slate-950 border border-slate-800 px-2 py-1 rounded text-[9px] text-slate-400 font-semibold">
                🏦 Punjab National Bank
              </div>

              {/* Connecting line */}
              <div className="absolute top-[52%] left-[62%] w-6 h-[1px] bg-dashed border-t border-gold-500/50"></div>

              {/* Bethel Pin */}
              <div className="absolute top-[38%] left-[68%] flex flex-col items-center">
                {/* Ping rings */}
                <span className="absolute inline-flex h-6 w-6 rounded-full bg-gold-500/20 animate-ping"></span>
                <span className="relative z-10 w-3 h-3 rounded-full bg-gold-500 border-2 border-slate-950"></span>
                
                <div className="relative bg-gradient-to-r from-gold-600 to-gold-500 text-slate-950 font-bold text-[8px] px-2 py-0.5 rounded shadow mt-1 uppercase tracking-wider">
                  🎵 Bethel Music School
                </div>
              </div>
            </div>
            
            <p className="text-[10px] text-slate-500 italic">
              Located off the main highway, next to Punjab National Bank, Green Fields, Ooty.
            </p>
          </div>
        </div>

        {/* Right: Message Form */}
        <div className="lg:col-span-7">
          {isSent ? (
            <div className="bg-emerald-950/15 border border-emerald-500/25 p-8 rounded-none text-center space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-slate-100 font-bold text-xl">Redirecting to WhatsApp!</h3>
                <p className="text-xs text-slate-400">
                  Opening WhatsApp secure chat with +91 98658 65425...
                </p>
              </div>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you for your enquiry. Your details have been pre-filled. Please tap "Send" inside WhatsApp to instantly correspond with our Ooty admissions desk.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setIsSent(false)}
                  className="text-xs text-gold-400 hover:text-gold-300 font-bold uppercase border-b border-gold-400/30 hover:border-gold-300"
                >
                  Write Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSendMessage} className="bg-slate-905 border border-slate-850 p-6 md:p-8 rounded-none text-left space-y-6 shadow-md relative">
              {/* WhatsApp Helper Strip */}
              <div className="absolute top-0 right-0 transform translate-y-[-100%] bg-emerald-500 text-slate-950 text-[9px] font-mono font-bold px-3 py-1 uppercase tracking-wider">
                Direct WhatsApp Hotline
              </div>

              <div className="flex items-center gap-3 border-b border-slate-850 pb-4">
                <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.59 2.046 14.12 1.012 11.5 1.01c-5.442 0-9.87 4.372-9.874 9.802-.001 1.758.484 3.473 1.406 4.981L2.008 21.93l6.236-1.636z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-100 text-lg uppercase tracking-wide">WhatsApp Enquiry</h3>
                  <p className="text-[10px] text-slate-400 font-light mt-0.5">Your message will open directly in the WhatsApp application.</p>
                </div>
              </div>

              {errorMsg && (
                <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-none text-rose-500 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Robert Frost"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder-slate-650"
                  />
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g., mail@example.com"
                    className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder-slate-650"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Fee structure, batch schedules..."
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder-slate-650"
                />
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Message Details *</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your questions or feedback here..."
                  rows={5}
                  className="w-full px-3.5 py-2.5 text-xs bg-slate-950 border border-slate-850 rounded-none text-slate-200 focus:outline-none focus:ring-1 focus:ring-gold-500 focus:border-gold-500 placeholder-slate-650 resize-none leading-relaxed"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 hover:text-slate-100 font-bold text-xs tracking-widest uppercase transition-all duration-300 rounded-none flex items-center justify-center gap-1.5 shadow-md cursor-pointer border border-emerald-500 hover:border-emerald-600"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.717-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.59 2.046 14.12 1.012 11.5 1.01c-5.442 0-9.87 4.372-9.874 9.802-.001 1.758.484 3.473 1.406 4.981L2.008 21.93l6.236-1.636z" />
                </svg>
                Launch WhatsApp Chat
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
