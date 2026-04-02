import React, { useEffect, useState } from 'react';
import { Calendar, Clock, Globe, Award, MapPin, Zap } from 'lucide-react';

export default function ThankYou() {
  const [appointment, setAppointment] = useState<{
    hasData: boolean;
    formattedDate: string;
    googleCalUrl: string;
    appleCalUrl: string;
  }>({
    hasData: false,
    formattedDate: 'Your scheduled session',
    googleCalUrl: '#',
    appleCalUrl: '#'
  });

  useEffect(() => {
    // Fire the Meta Pixel Schedule event on component mount
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Schedule');
    }

    // Parse URL parameters from GoHighLevel (e.g., ?start=2026-04-15T14:00:00Z)
    const params = new URLSearchParams(window.location.search);
    const startParam = params.get('start');

    if (startParam) {
      try {
        const startDate = new Date(startParam);
        // Assuming a 30 minute call
        const endDate = new Date(startDate.getTime() + 30 * 60000);

        // Format for display: "Thursday, April 15 at 2:00 PM"
        const formatted = startDate.toLocaleString('en-US', {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
        });

        // Format for Google Calendar (YYYYMMDDTHHMMSSZ)
        const formatForCal = (d: Date) => d.toISOString().replace(/-|:|\.\d+/g, '');
        const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=Growth+Lab+Media+Strategy+Call&dates=${formatForCal(startDate)}/${formatForCal(endDate)}&details=Strategy+Call+with+Growth+Lab+Media.+Check+your+email+for+the+meeting+link.`;

        // Format for Apple Calendar (.ics data URI)
        const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${formatForCal(startDate)}\nDTEND:${formatForCal(endDate)}\nSUMMARY:Growth Lab Media Strategy Call\nDESCRIPTION:Strategy Call with Growth Lab Media. Check your email for the meeting link.\nEND:VEVENT\nEND:VCALENDAR`;
        const appleCalUrl = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;

        setAppointment({
          hasData: true,
          formattedDate: formatted,
          googleCalUrl: gCalUrl,
          appleCalUrl: appleCalUrl
        });
      } catch (e) {
        console.error("Could not parse date from URL", e);
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white font-sans overflow-hidden relative animate-bg-fade">
      {/* Phase 1: Background Orb */}
      <div 
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#7c3aed] rounded-full blur-[120px] opacity-0 animate-orb-bloom pointer-events-none" 
        style={{ animationDelay: '0ms' }} 
      />

      <div className="max-w-5xl mx-auto px-6 py-8 relative z-10">
        {/* Phase 2: Header */}
        <header 
          className="flex justify-between items-center opacity-0 animate-slide-down" 
          style={{ animationDelay: '200ms' }}
        >
          <div className="font-bold text-xl tracking-tight">
            <span className="text-white">GROWTH LAB </span>
            <span className="text-[#7c3aed]">MEDIA</span>
          </div>
          <a href="/" className="text-[#6b7280] hover:text-white transition-colors text-sm flex items-center gap-2">
            &larr; Back to site
          </a>
        </header>

        <main className="mt-20 flex flex-col items-center text-center">
          {/* Phase 3: Confirmation Badge */}
          <div 
            className="opacity-0 animate-pop-in inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 text-[#22c55e] text-sm font-medium tracking-wide mb-8" 
            style={{ animationDelay: '400ms' }}
          >
            <div className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
            YOUR SPOT IS CONFIRMED
          </div>

          {/* Phase 4: Checkmark */}
          <div className="relative mb-10">
            <svg className="w-24 h-24 text-[#22c55e]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
              <circle 
                cx="50" cy="50" r="45" 
                className="animate-draw-circle" 
                style={{ animationDelay: '600ms' }} 
              />
              <path 
                d="M30 50 L45 65 L70 35" 
                className="animate-draw-check" 
                style={{ animationDelay: '1000ms' }} 
              />
            </svg>
            <div 
              className="absolute inset-0 rounded-full bg-[#22c55e] opacity-0 animate-sonar pointer-events-none" 
              style={{ animationDelay: '1200ms' }} 
            />
          </div>

          {/* Phase 5: Headline */}
          <h1 
            className="text-5xl md:text-6xl font-bold tracking-tight mb-4 opacity-0 animate-slide-up" 
            style={{ animationDelay: '900ms' }}
          >
            You're Booked.
          </h1>
          <h2 
            className="text-2xl md:text-3xl text-gray-300 font-medium mb-6 opacity-0 animate-slide-up" 
            style={{ animationDelay: '1050ms' }}
          >
            Let's Build Your Growth Engine.
          </h2>

          {/* Phase 6: Subtext */}
          <p 
            className="text-[#6b7280] text-lg max-w-xl mx-auto mb-16 opacity-0 animate-fade-in" 
            style={{ animationDelay: '1200ms' }}
          >
            Check your email for a calendar invite. We'll see you on the call — 30 minutes, no fluff.
          </p>

          {/* Phase 7: Timeline Steps */}
          <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8 relative mb-20">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-6 left-[16%] right-[16%] h-[2px] bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent z-0" />
            
            {[
              { num: 1, title: "Check Your Email", desc: "Confirmation + calendar invite on the way", delay: 1500 },
              { num: 2, title: "Prep Takes 2 Minutes", desc: "Know your #1 marketing challenge going in", delay: 1650 },
              { num: 3, title: "We Map Your System", desc: "30-min audit. Real strategy. No pressure.", delay: 1800 }
            ].map((step, i) => (
              <div 
                key={i} 
                className="relative z-10 flex flex-col items-center text-center opacity-0 animate-slide-up" 
                style={{ animationDelay: `${step.delay}ms` }}
              >
                <div className="w-12 h-12 rounded-full bg-[#0a0a0a] border-2 border-[#7c3aed] flex items-center justify-center text-[#7c3aed] font-bold text-xl mb-4 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                  {step.num}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-[#6b7280] text-sm">{step.desc}</p>
              </div>
            ))}
          </div>

          {/* Phase 8: Reminder Card */}
          <div 
            className="w-full max-w-2xl bg-[#111111] border border-gray-800 rounded-2xl p-8 mb-16 opacity-0 animate-slide-up relative overflow-hidden group" 
            style={{ animationDelay: '2000ms' }}
          >
            {/* Pulse Border Effect on Entry */}
            <div 
              className="absolute inset-0 border-2 border-[#7c3aed] rounded-2xl opacity-0 animate-pulse-border pointer-events-none" 
              style={{ animationDelay: '2000ms' }} 
            />
            
            <h3 className="text-xl font-semibold text-white mb-6 text-left">Your Call Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-left">
              <div className="flex items-center gap-3 text-gray-300">
                <Clock className="w-5 h-5 text-[#7c3aed]" />
                <span>30 Minutes</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Calendar className="w-5 h-5 text-[#7c3aed]" />
                <span>{appointment.formattedDate}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Globe className="w-5 h-5 text-[#7c3aed]" />
                <span>America/New_York (EDT)</span>
              </div>
            </div>
            
            <p className="text-[#6b7280] text-left mb-8">
              We'll audit what's working, what's not, and map out a system to get you more qualified leads.
            </p>
            
            {/* Only show calendar buttons if we successfully parsed a date from GHL */}
            {appointment.hasData && (
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href={appointment.googleCalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#7c3aed] hover:bg-[#6d28d9] text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Add to Google Calendar
                </a>
                <a 
                  href={appointment.appleCalUrl}
                  download="growth-lab-media-call.ics"
                  className="flex-1 bg-transparent border border-gray-700 hover:border-gray-500 text-white py-3 px-6 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Add to Apple Calendar
                </a>
              </div>
            )}
          </div>

          {/* Phase 9: Testimonial */}
          <div 
            className="max-w-2xl mx-auto opacity-0 animate-fade-in mb-24" 
            style={{ animationDelay: '2300ms' }}
          >
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#22c55e]/10 text-[#22c55e] text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                $30K in 2 Weeks
              </div>
            </div>
            <blockquote className="text-xl md:text-2xl text-gray-300 italic font-medium mb-6 leading-relaxed">
              "15 qualified prospects in 2 weeks. Closed a $30K deal from the first batch."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 font-bold">
                JS
              </div>
              <div className="text-left">
                <div className="text-white font-semibold">Jaime Sanchez</div>
                <div className="text-[#6b7280] text-sm">Vanguard AV | Hackensack, NJ</div>
              </div>
            </div>
          </div>

        </main>

        {/* Phase 10: Footer */}
        <footer 
          className="border-t border-gray-800 pt-8 pb-12 flex flex-col md:flex-row items-center justify-center gap-8 opacity-0 animate-fade-in" 
          style={{ animationDelay: '2600ms' }}
        >
          <div className="flex items-center gap-2 text-[#6b7280] text-sm">
            <MapPin className="w-4 h-4" />
            <span>NYC Based</span>
          </div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-gray-800" />
          <div className="flex items-center gap-2 text-[#6b7280] text-sm">
            <Award className="w-4 h-4" />
            <span>Certified</span>
          </div>
          <div className="hidden md:block w-1 h-1 rounded-full bg-gray-800" />
          <div className="flex items-center gap-2 text-[#6b7280] text-sm">
            <Zap className="w-4 h-4" />
            <span>90-Day System</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
