import React from 'react';
import { usePlantContext } from '../context/PlantContext';
import { AlertTriangle, Info } from 'lucide-react';

const AlertBanner = () => {
  const { plants } = usePlantContext();

  const MOISTURE_THRESHOLD = 35;
  const LIGHT_THRESHOLD = 50;

  const alerts = [];

  plants.forEach((plant) => {
    if (plant.moisture < MOISTURE_THRESHOLD) {
      alerts.push({
        id: `${plant.id}-moisture`,
        severity: 'critical',
        text: `Alert: ${plant.name} water tank is running critically low.`,
      });
    }
    if (plant.light < LIGHT_THRESHOLD) {
      alerts.push({
        id: `${plant.id}-light`,
        severity: 'warning',
        text: `Warning: ${plant.name} is experiencing severe lack of sunlight.`,
      });
    }
  });

  if (alerts.length === 0) return null;

  // Determine highest severity: if any is critical, style as critical (rose-500), otherwise warning (amber-500)
  const hasCritical = alerts.some((alert) => alert.severity === 'critical');
  
  const containerStyles = hasCritical
    ? 'bg-rose-500/10 border-rose-500/20 text-rose-300'
    : 'bg-amber-500/10 border-amber-500/20 text-amber-300';

  return (
    <div className={`backdrop-blur-xl border p-5 rounded-3xl mb-8 relative overflow-hidden transition-all duration-300 ${containerStyles}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[pulse_3s_infinite] pointer-events-none"></div>
      <div className="relative z-10 flex flex-col gap-4">
        <h4 className="text-xs font-mono uppercase tracking-widest font-semibold opacity-75">
          SYSTEM TELEMETRY ALERTS // {alerts.length} ANOMALIES DETECTED
        </h4>
        <div className="flex flex-col gap-3">
          {alerts.map((alert) => {
            const Icon = alert.severity === 'critical' ? AlertTriangle : Info;
            const iconColor = alert.severity === 'critical' ? 'text-rose-400' : 'text-amber-400';
            return (
              <div key={alert.id} className="flex items-start gap-3">
                <Icon className={`w-5 h-5 shrink-0 ${iconColor} mt-0.5`} />
                <span className="text-sm font-mono leading-relaxed">{alert.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AlertBanner;
