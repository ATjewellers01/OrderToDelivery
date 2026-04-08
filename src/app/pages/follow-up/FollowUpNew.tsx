import React, { useState } from "react";
import { TodayDashboard } from "./TodayDashboard";
import { TotalDashboard } from "./TotalDashboard";
import { HistoryDashboard } from "./HistoryDashboard";

type TabType = "today" | "total" | "history";

export const FollowUpNew: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("today");

  return (
    <div className="min-h-screen bg-transparent p-0 sm:px-2 lg:px-4">
      {/* ── Tab Navigation ──────────────────────────────────── */}
      <div className="max-w-7xl mx-auto mb-4 mt-2">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-2 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex gap-1.5 bg-gray-100/50 p-1 rounded-2xl w-full sm:w-auto overflow-hidden">
            <button
              onClick={() => setActiveTab("today")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all ${
                activeTab === "today"
                  ? "bg-white text-amber-800 shadow-sm ring-1 ring-black/5"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              TODAY
            </button>
            <button
              onClick={() => setActiveTab("total")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all ${
                activeTab === "total"
                  ? "bg-white text-amber-800 shadow-sm ring-1 ring-black/5"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              TOTAL
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-[10px] sm:text-xs font-black transition-all ${
                activeTab === "history"
                  ? "bg-white text-amber-800 shadow-sm ring-1 ring-black/5"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-200/50"
              }`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              HISTORY
            </button>
          </div>
          
          <div className="hidden sm:flex items-center gap-3 pr-2">
            <div className="h-8 w-px bg-gray-100" />
            <h1 className="text-sm font-black text-amber-900 uppercase tracking-widest">Follow Up Portal</h1>
          </div>
        </div>
      </div>

      {/* ── Tab Content ─────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="rounded-3xl min-h-[600px]">
          {activeTab === "today" && <TodayDashboard />}
          {activeTab === "total" && <TotalDashboard />}
          {activeTab === "history" && <HistoryDashboard />}
        </div>
      </div>
    </div>
  );
};
