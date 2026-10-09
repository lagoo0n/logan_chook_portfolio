import { ArrowRight, Cpu, Layers, HardDrive, Share2, Activity } from 'lucide-react';
import { ProjectDetail } from '../types';

interface SystemDiagramProps {
  project: ProjectDetail;
}

export default function SystemDiagram({ project }: SystemDiagramProps) {
  const { diagram, slug } = project;

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0d121c] p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-slate-800/80 pb-4 mb-6">
        <div>
          <h3 className="text-base font-semibold text-slate-100 flex items-center gap-2">
            <Layers className="h-4 w-4 text-blue-400" />
            System Architecture & Signal Flow
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {diagram.description}
          </p>
        </div>
        <div className="text-xs font-mono text-slate-400">
          Stage Count: {diagram.stages.length}
        </div>
      </div>

      {/* Primary Linear Pipeline Strip */}
      <div className="mb-8 overflow-x-auto pb-2">
        <div className="flex items-center gap-2 min-w-max">
          {diagram.stages.map((stage, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-200">
                <span className="font-mono text-[10px] text-blue-400">0{index + 1}</span>
                <span>{stage}</span>
              </div>
              {index < diagram.stages.length - 1 && (
                <ArrowRight className="h-4 w-4 text-slate-600 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Technical Block Diagram */}
      {slug === 'qemu-emulation' ? (
        <div className="space-y-6">
          {/* Top Level: Firmware & Emulator */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg border border-blue-500/30 bg-blue-950/20 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="h-3.5 w-3.5" />
                  Target Software
                </span>
                <span className="text-[11px] font-mono text-blue-300">ESP32 Firmware</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-100">Vehicle Application Firmware</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                FreeRTOS tasks running throttle state machine, plausibility checks, and fault recovery. Cross-compiled with Xtensa GCC toolchain.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                Interface: Driver abstraction headers (C/C++)
              </div>
            </div>

            <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  Host Execution
                </span>
                <span className="text-[11px] font-mono text-cyan-300">qemu-system-xtensa</span>
              </div>
              <h4 className="text-sm font-semibold text-slate-100">QEMU Virtual Hardware Core</h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Executes the compiled ELF/binary. Emulates Xtensa dual-core instruction set, timers, interrupts, and simulated memory mapping.
              </p>
              <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-mono text-slate-400">
                Mode: Host runner (-nographic / automated test harness)
              </div>
            </div>
          </div>

          {/* Signal flow indicator */}
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 px-3 py-1 rounded bg-slate-900/80 border border-slate-800">
              <span className="text-blue-400">↓</span>
              <span>Driver-Visible Mock Peripherals Layer</span>
              <span className="text-blue-400">↓</span>
            </div>
          </div>

          {/* Bottom Level: Mocked Peripherals Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="rounded-lg border border-emerald-500/30 bg-emerald-950/15 p-3.5">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-emerald-400">Implemented</span>
                <span className="text-[10px] font-mono text-slate-400">ADC 2-CH</span>
              </div>
              <h5 className="text-xs font-semibold text-slate-100">Pedal Sensor Mock</h5>
              <p className="text-[11px] text-slate-300 mt-1">
                Generates dual voltage curves, offset drift, and short/open circuit faults to test sensor plausibility.
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3.5 opacity-85">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-amber-400">In Progress</span>
                <span className="text-[10px] font-mono text-slate-400">CAN Bus</span>
              </div>
              <h5 className="text-xs font-semibold text-slate-200">Mocked BMS</h5>
              <p className="text-[11px] text-slate-400 mt-1">
                Emulates battery cell voltages, pack temperature distribution, and high-voltage contactor state messages.
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3.5 opacity-85">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-amber-400">Planned</span>
                <span className="text-[10px] font-mono text-slate-400">CAN / Feedback</span>
              </div>
              <h5 className="text-xs font-semibold text-slate-200">Mocked Inverter</h5>
              <p className="text-[11px] text-slate-400 mt-1">
                Models motor RPM, inverter temperature, and torque response for vehicle state transitions.
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-900/40 p-3.5 opacity-85">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[11px] font-mono text-amber-400">Planned</span>
                <span className="text-[10px] font-mono text-slate-400">SPI Regs</span>
              </div>
              <h5 className="text-xs font-semibold text-slate-200">SX1262 LoRa Mock</h5>
              <p className="text-[11px] text-slate-400 mt-1">
                Simulates Semtech SX1262 register interface and packet payload buffer for wireless telemetry.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Generalized Styled Block Diagram for other projects */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {diagram.nodes.map((node, idx) => (
            <div 
              key={node.id} 
              className="rounded-lg border border-slate-800 bg-slate-900/60 p-4 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider">
                    Node 0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400 capitalize">
                    {node.type}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-100">{node.label}</h4>
                {node.sublabel && (
                  <p className="text-[11px] text-slate-400 mt-1 leading-normal">
                    {node.sublabel}
                  </p>
                )}
              </div>
              {idx < diagram.nodes.length - 1 && diagram.flows[idx] && (
                <div className="mt-3 pt-2.5 border-t border-slate-800/80 text-[10px] font-mono text-slate-400 flex items-center gap-1">
                  <span>→</span>
                  <span className="truncate">{diagram.flows[idx].protocol}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
