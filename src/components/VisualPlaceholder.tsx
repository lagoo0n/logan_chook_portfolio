import { Layers, HardDrive, Cpu, Radio, Sparkles } from 'lucide-react';

interface VisualPlaceholderProps {
  type: 'flex-pcb' | 'robotics' | 'imu';
  title: string;
  description: string;
}

export default function VisualPlaceholder({ type, title, description }: VisualPlaceholderProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-[#090d14] p-6 lg:p-8">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3 mb-6">
        <div className="flex items-center gap-2">
          {type === 'flex-pcb' && <Layers className="h-4 w-4 text-blue-400" />}
          {type === 'robotics' && <Cpu className="h-4 w-4 text-blue-400" />}
          {type === 'imu' && <Radio className="h-4 w-4 text-blue-400" />}
          <h4 className="text-xs font-mono uppercase tracking-wider text-slate-300">
            {title}
          </h4>
        </div>
        <span className="text-[11px] font-mono text-amber-400">
          In Progress / Artifact Placeholder
        </span>
      </div>

      {type === 'flex-pcb' && (
        <div className="relative rounded-lg border border-slate-800/80 bg-[#0b101c] p-6 overflow-hidden">
          {/* Subtle PCB Trace Graphic */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="rounded border border-amber-500/20 bg-amber-950/10 p-3">
              <span className="text-[10px] font-mono text-amber-400 uppercase">Substrate</span>
              <p className="text-xs font-medium text-slate-200 mt-1">Polyimide Flex Core</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Rolled Annealed Copper Foil</p>
            </div>
            <div className="rounded border border-blue-500/20 bg-blue-950/10 p-3">
              <span className="text-[10px] font-mono text-blue-400 uppercase">Sensor Array</span>
              <p className="text-xs font-medium text-slate-200 mt-1">Multi-Point NTC Nodes</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Adhesive cell surface thermal mount</p>
            </div>
            <div className="rounded border border-slate-700 bg-slate-900/40 p-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Termination</span>
              <p className="text-xs font-medium text-slate-200 mt-1">FR4 Stiffened Tail</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Strain relief for vehicle harness</p>
            </div>
          </div>

          <div className="border border-dashed border-slate-800 rounded-lg p-6 text-center bg-slate-900/30">
            <Layers className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-300">Altium 3D Flex Fold & Gerber Preview</p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
              CAD render placeholder depicting physical bend radius conformance and sensor positioning around battery cells.
            </p>
            <div className="mt-3 text-[10px] font-mono text-slate-400">
              Pending: Physical fabrication prototype photo & thermal chamber run
            </div>
          </div>
        </div>
      )}

      {type === 'robotics' && (
        <div className="relative rounded-lg border border-slate-800/80 bg-[#0b101c] p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="rounded border border-blue-500/20 bg-blue-950/10 p-3">
              <span className="text-[10px] font-mono text-blue-400 uppercase">Visualization</span>
              <p className="text-xs font-medium text-slate-200 mt-1">RViz 3D Viewport</p>
              <p className="text-[11px] text-slate-400 mt-0.5">TF2 coordinates & interactive markers</p>
            </div>
            <div className="rounded border border-purple-500/20 bg-purple-950/10 p-3">
              <span className="text-[10px] font-mono text-purple-400 uppercase">Planner</span>
              <p className="text-xs font-medium text-slate-200 mt-1">MoveIt OMPL Pipeline</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Collision-free joint trajectory path</p>
            </div>
            <div className="rounded border border-slate-700 bg-slate-900/40 p-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Actuation</span>
              <p className="text-xs font-medium text-slate-200 mt-1">Hardware Interface</p>
              <p className="text-[11px] text-slate-400 mt-0.5">In Progress (Sim-to-real bridge)</p>
            </div>
          </div>

          <div className="border border-dashed border-slate-800 rounded-lg p-6 text-center bg-slate-900/30">
            <Cpu className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-300">RViz Motion Trajectory Visualization</p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
              Graphic placeholder showing manipulator kinematic arm model solving inverse kinematics toward 6-DOF target pose.
            </p>
            <div className="mt-3 text-[10px] font-mono text-slate-400">
              Pending: High-frame-rate screen capture of collision-free trajectory execution
            </div>
          </div>
        </div>
      )}

      {type === 'imu' && (
        <div className="relative rounded-lg border border-slate-800/80 bg-[#0b101c] p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="rounded border border-emerald-500/20 bg-emerald-950/10 p-3">
              <span className="text-[10px] font-mono text-emerald-400 uppercase">Trigger</span>
              <p className="text-xs font-medium text-slate-200 mt-1">Hardware GPIO ISR</p>
              <p className="text-[11px] text-slate-400 mt-0.5">&lt; 2μs service time</p>
            </div>
            <div className="rounded border border-blue-500/20 bg-blue-950/10 p-3">
              <span className="text-[10px] font-mono text-blue-400 uppercase">Buffer</span>
              <p className="text-xs font-medium text-slate-200 mt-1">Static Ring Buffer</p>
              <p className="text-[11px] text-slate-400 mt-0.5">SRAM ring with zero malloc</p>
            </div>
            <div className="rounded border border-slate-700 bg-slate-900/40 p-3">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Protocol</span>
              <p className="text-xs font-medium text-slate-200 mt-1">I2C Fast Mode (400kHz)</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Non-blocking register burst</p>
            </div>
          </div>

          <div className="border border-dashed border-slate-800 rounded-lg p-6 text-center bg-slate-900/30">
            <Radio className="h-8 w-8 text-slate-400 mx-auto mb-2" />
            <p className="text-xs font-medium text-slate-300">Oscilloscope / Logic Analyzer Timing Trace</p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto">
              Hardware capture placeholder verifying DRDY interrupt pulse to I2C clock line latency under high sampling rates.
            </p>
            <div className="mt-3 text-[10px] font-mono text-slate-400">
              Pending: Digital logic analyzer capture of interrupt-to-bus timing
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-slate-400 mt-4 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
