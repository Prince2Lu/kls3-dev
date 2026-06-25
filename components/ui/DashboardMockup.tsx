'use client'

import { TrendingUp, CheckCircle, Clock } from 'lucide-react'

export default function DashboardMockup() {
  return (
    <div className="bg-white rounded-lg border border-[rgba(30,45,74,0.12)] p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-[#1E2D4A] font-semibold text-lg mb-1" style={{ fontFamily: 'var(--font-body), sans-serif' }}>
          Pilotage du cabinet
        </h3>
        <p className="text-[#4B5563] text-sm">Vue d'ensemble — Mois en cours</p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {/* KPI 1 - CA */}
        <div className="bg-[#ECEAE5] rounded-lg p-4 border border-[rgba(30,45,74,0.08)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#4B5563] text-xs font-medium uppercase tracking-wide">CA</span>
            <TrendingUp className="w-4 h-4 text-[#C9A84C]" />
          </div>
          <p className="text-[#1E2D4A] text-2xl font-semibold" style={{ fontFamily: 'var(--font-body), sans-serif' }}>
            128 450 €
          </p>
          <p className="text-[#C9A84C] text-xs mt-1">+12% vs N-1</p>
        </div>

        {/* KPI 2 - Taux réalisation */}
        <div className="bg-[#ECEAE5] rounded-lg p-4 border border-[rgba(30,45,74,0.08)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#4B5563] text-xs font-medium uppercase tracking-wide">Réalisation</span>
            <CheckCircle className="w-4 h-4 text-[#C9A84C]" />
          </div>
          <p className="text-[#1E2D4A] text-2xl font-semibold" style={{ fontFamily: 'var(--font-body), sans-serif' }}>
            87%
          </p>
          <p className="text-[#4B5563] text-xs mt-1">Objectif atteint</p>
        </div>

        {/* KPI 3 - Temps gagné */}
        <div className="bg-[#ECEAE5] rounded-lg p-4 border border-[rgba(30,45,74,0.08)]">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[#4B5563] text-xs font-medium uppercase tracking-wide">Temps gagné</span>
            <Clock className="w-4 h-4 text-[#C9A84C]" />
          </div>
          <p className="text-[#1E2D4A] text-2xl font-semibold" style={{ fontFamily: 'var(--font-body), sans-serif' }}>
            42h
          </p>
          <p className="text-[#4B5563] text-xs mt-1">Ce mois-ci</p>
        </div>
      </div>

      {/* Mini Chart */}
      <div className="mb-6">
        <h4 className="text-[#1E2D4A] text-sm font-medium mb-3" style={{ fontFamily: 'var(--font-body), sans-serif' }}>
          Activité mensuelle
        </h4>
        <div className="flex items-end gap-2 h-24">
          {[45, 62, 58, 71, 68, 79, 85, 74, 82, 88, 76, 90].map((height, i) => (
            <div
              key={i}
              className="flex-1 bg-[#C9A84C] rounded-t opacity-70 hover:opacity-100 transition-opacity"
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      {/* Automated Tasks */}
      <div>
        <h4 className="text-[#1E2D4A] text-sm font-medium mb-3" style={{ fontFamily: 'var(--font-body), sans-serif' }}>
          Tâches automatisées
        </h4>
        <div className="space-y-2">
          {[
            { label: 'Relances clients', status: 'En cours' },
            { label: 'Collecte pièces', status: 'Planifié' },
            { label: 'Onboarding client', status: 'Terminé' },
          ].map((task, i) => (
            <div key={i} className="flex items-center justify-between py-2 px-3 bg-[#ECEAE5] rounded border border-[rgba(30,45,74,0.08)]">
              <span className="text-[#1E2D4A] text-sm">{task.label}</span>
              <span className={`text-xs px-2 py-1 rounded ${
                task.status === 'Terminé' ? 'bg-[#C9A84C] text-[#1E2D4A]' : 'bg-white text-[#4B5563]'
              }`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
