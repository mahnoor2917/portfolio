"use client";

import { StatusBadge, timeAgo } from "./utils";

function StatCard({ label, value, hint, accent, onClick }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      onClick={onClick}
      className={`text-left bg-white rounded-2xl p-5 shadow-sm border border-gray-100 ${
        onClick ? "hover:shadow-md transition-shadow" : ""
      }`}
    >
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`font-display text-3xl font-bold mt-1 ${accent ? "text-accent" : "text-navy"}`}>{value}</p>
      {hint && <p className="text-xs text-gray-400 mt-1">{hint}</p>}
    </Tag>
  );
}

function ViewsChart({ series }) {
  const days = series.slice(-14);
  const max = Math.max(1, ...days.map((d) => d.views));
  return (
    <div>
      <div className="h-44 flex items-end gap-1.5">
        {days.map((d) => (
          <div key={d.date} className="flex-1 h-full flex flex-col justify-end items-center group" title={`${d.date}: ${d.views} views`}>
            <span className="text-[10px] text-gray-400 opacity-0 group-hover:opacity-100 mb-1">{d.views}</span>
            <div
              className="w-full rounded-t-md bg-accent/80 group-hover:bg-accent transition-colors"
              style={{ height: `${Math.max(2, (d.views / max) * 100)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="flex gap-1.5 mt-2">
        {days.map((d) => (
          <span key={d.date} className="flex-1 text-center text-[10px] text-gray-400">
            {d.date.slice(8)}
          </span>
        ))}
      </div>
    </div>
  );
}

const PIPELINE = [
  ["new", "New"],
  ["contacted", "Contacted"],
  ["onboarded", "Onboarded"],
  ["closed", "Closed"],
];

export default function Overview({ stats, onOpen, onRefresh }) {
  if (!stats) return <p className="text-gray-500">Loading your dashboard...</p>;

  const deviceTotal = stats.devices.reduce((s, d) => s + d.count, 0) || 1;
  const topMax = Math.max(1, ...stats.topPages.map((p) => p.count));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy">Overview</h1>
          <p className="text-sm text-gray-500">What&apos;s happening on your website.</p>
        </div>
        <button onClick={onRefresh} className="text-sm font-medium text-navy border border-gray-200 bg-white px-4 py-2 rounded-full hover:border-accent hover:text-accent transition-colors">
          ↻ Refresh
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="New messages"
          value={stats.messages.new}
          hint={`${stats.messages.total} total`}
          accent={stats.messages.new > 0}
          onClick={() => onOpen("messages")}
        />
        <StatCard
          label="New distributor inquiries"
          value={stats.inquiries.new}
          hint={`${stats.inquiries.total} total`}
          accent={stats.inquiries.new > 0}
          onClick={() => onOpen("inquiries")}
        />
        <StatCard label="Page views today" value={stats.views.today} hint={`${stats.views.last7} in the last 7 days`} />
        <StatCard label="Visitors (30 days)" value={stats.views.visitors30} hint={`${stats.views.last30} page views`} />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-display font-semibold text-navy mb-4">Page views — last 14 days</h2>
          <ViewsChart series={stats.series} />
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-display font-semibold text-navy mb-4">Inquiry pipeline</h2>
          <div className="space-y-3">
            {PIPELINE.map(([key, label]) => (
              <div key={key} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{label}</span>
                <span className="font-display font-bold text-navy">{stats.inquiries[key] || 0}</span>
              </div>
            ))}
          </div>
          <button onClick={() => onOpen("inquiries")} className="mt-5 text-sm font-medium text-accent hover:underline">
            Open inquiries →
          </button>
        </section>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-display font-semibold text-navy mb-4">Most visited pages (30 days)</h2>
          {stats.topPages.length === 0 ? (
            <p className="text-sm text-gray-400">No visits recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.topPages.map((p) => (
                <div key={p.path}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-700 truncate mr-2">{p.path === "/" ? "Home" : p.path}</span>
                    <span className="text-gray-500">{p.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-gray-100">
                    <div className="h-full rounded-full bg-navy" style={{ width: `${(p.count / topMax) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-display font-semibold text-navy mb-4">Devices (30 days)</h2>
          {stats.devices.length === 0 ? (
            <p className="text-sm text-gray-400">No visits recorded yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.devices
                .slice()
                .sort((a, b) => b.count - a.count)
                .map((d) => (
                  <div key={d.device}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700 capitalize">{d.device}</span>
                      <span className="text-gray-500">{Math.round((d.count / deviceTotal) * 100)}%</span>
                    </div>
                    <div className="h-1.5 rounded-full bg-gray-100">
                      <div className="h-full rounded-full bg-accent" style={{ width: `${(d.count / deviceTotal) * 100}%` }} />
                    </div>
                  </div>
                ))}
            </div>
          )}
        </section>

        <section className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="font-display font-semibold text-navy mb-4">Recent activity</h2>
          {stats.recent.length === 0 ? (
            <p className="text-sm text-gray-400">Nothing yet. New messages and inquiries will show up here.</p>
          ) : (
            <ul className="space-y-3">
              {stats.recent.map((item) => (
                <li key={`${item.type}-${item.id}`}>
                  <button onClick={() => onOpen(item.type)} className="w-full text-left flex items-start gap-3 hover:bg-gray-50 rounded-lg p-1 -m-1">
                    <span className="mt-0.5 text-lg">{item.type === "messages" ? "✉" : "☎"}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-medium text-navy truncate">{item.title}</span>
                      <span className="block text-xs text-gray-500 truncate">{item.sub}</span>
                      <span className="block text-[11px] text-gray-400 mt-0.5">{timeAgo(item.createdAt)}</span>
                    </span>
                    <StatusBadge status={item.status} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
