import { ProjectDetail } from '../types';

export const projectsData: ProjectDetail[] = [
  {
    slug: 'qemu-emulation',
    name: 'ESP32 Firmware Emulation',
    tagline: 'QEMU-based environment for testing vehicle firmware with simulated peripherals and fault conditions.',
    tags: ['QEMU', 'ESP32', 'C/C++'],
    role: 'Firmware & Emulation Developer',
    status: 'Active Development',
    summary30s: 'Developed a host-side emulation framework allowing embedded vehicle firmware to be compiled, executed, and tested in QEMU with mocked hardware peripherals before flashing physical hardware.',
    problem: 'Vehicle firmware normally depends on physical sensors and controllers, making it difficult to test faults early.',
    approach: 'Build a QEMU-compatible ESP32 firmware workflow and mock peripheral layer so firmware can receive simulated inputs without full vehicle hardware.',
    diagram: {
      description: 'End-to-end emulation dataflow from the compiled firmware running in QEMU down through simulated peripheral abstractions.',
      stages: [
        'ESP32 Firmware',
        'QEMU (Xtensa Target)',
        'Mocked BMS / Inverter / SX1262 LoRa / Pedal Sensor'
      ],
      nodes: [
        { id: 'fw', label: 'ESP32 Firmware', sublabel: 'FreeRTOS / C/C++ application logic', type: 'firmware' },
        { id: 'qemu', label: 'QEMU Environment', sublabel: 'qemu-system-xtensa core emulation', type: 'emulator' },
        { id: 'mock-pedal', label: 'Mocked Pedal Sensor', sublabel: 'Dual ADC plausibility & throttle mapping', type: 'peripheral' },
        { id: 'mock-bms', label: 'Mocked BMS', sublabel: 'CAN voltage & temp telemetry state (In Progress)', type: 'peripheral' },
        { id: 'mock-inv', label: 'Mocked Inverter', sublabel: 'Motor RPM & fault status register (In Progress)', type: 'peripheral' },
        { id: 'mock-lora', label: 'SX1262 LoRa Mock', sublabel: 'SPI telemetry transport mock (In Progress)', type: 'peripheral' },
      ],
      flows: [
        { from: 'fw', to: 'qemu', protocol: 'Elf binary / Cross-compiled' },
        { from: 'qemu', to: 'mock-pedal', protocol: 'Driver-visible mock interface' },
        { from: 'qemu', to: 'mock-bms', protocol: 'Virtual CAN bus layer' },
        { from: 'qemu', to: 'mock-inv', protocol: 'Simulated feedback loops' },
        { from: 'qemu', to: 'mock-lora', protocol: 'Virtual SPI register model' },
      ]
    },
    myContribution: [
      'Added QEMU build support to the firmware project via modular CMake targets.',
      'Mocked pedal-sensor functionality to validate sensor plausibility checks, deadbands, and error conditions without physical potentiometers.',
      'Researched and planned architecture for upcoming BMS, inverter, and SX1262 LoRa emulation modules.',
      'Designed a driver abstraction boundary allowing the identical business logic to link against physical drivers or virtual mocks.'
    ],
    technicalDetails: [
      {
        title: 'Toolchain & Build Integration',
        items: [
          'Target: ESP32 (Xtensa dual-core architecture) cross-compiled with ESP-IDF toolchain.',
          'Build System: CMake configuration supporting both target flashing and host QEMU test targets.',
          'Language: C and C++ with strict compiler warnings and zero-dynamic-memory allocation in critical paths.'
        ]
      },
      {
        title: 'Mocked Peripherals & Driver Interfaces',
        items: [
          'Pedal Sensor Mock: Simulates dual analog voltage curves with configurable offset, drift, and out-of-range sensor faults.',
          'Driver Abstraction: Firmware drivers consume abstract interfaces, enabling transparent injection of synthetic sensor data at run time.',
          'Planned Peripherals: Virtual CAN bus endpoints for BMS and motor inverter state machines; SPI register-level emulation for Semtech SX1262 LoRa transceiver.'
        ]
      },
      {
        title: 'Fault Injection & Test Scenarios',
        items: [
          'Simulated open-circuit and short-circuit conditions on throttle pedal inputs.',
          'Plausibility check test: Verifying firmware transitions into safe limp/cutoff mode when dual pedal signals diverge by >10%.',
          'Automated execution of test sequences inside QEMU without physical test benches or hardware lockups.'
        ]
      }
    ],
    currentProgress: {
      statusNote: 'QEMU build workflow operational. Pedal-sensor mock integrated and undergoing test validation.',
      hasTerminalOutput: true,
      terminalSnippet: {
        command: 'idf.py build && qemu-system-xtensa -nographic -machine esp32 -drive file=build/firmware.bin,if=mtd,format=raw',
        output: [
          '[1/3] Building C object main/drivers/pedal_mock.o',
          '[2/3] Linking CXX executable firmware.elf',
          '[3/3] Generating binary image build/firmware.bin',
          'Executing: qemu-system-xtensa -nographic -machine esp32 -drive file=build/firmware.bin,if=mtd,format=raw',
          '--- Booting ESP-IDF v5.1-dev in QEMU Xtensa target ---',
          '[SYSTEM] Hardware abstraction layer initialized (MODE: QEMU_EMULATION)',
          '[PEDAL_MOCK] Initialized dual ADC channels (ADC1_CH0=0.82V, ADC1_CH3=1.64V)',
          '[PEDAL_MOCK] Injecting throttle ramp: 0% -> 45% -> 100%',
          '[THROTTLE] Plausibility test: PASS (Delta < 2.5%)',
          '[FAULT_INJECT] Simulating ADC1_CH3 open-circuit disconnect (0.00V)...',
          '[THROTTLE_WARN] Sensor deviation detected: CH0=1.20V, CH3=0.00V (>10% mismatch)',
          '[SAFE_STATE] Plausibility fault triggered -> Disabling inverter torque request',
          '[STATUS] Test suite completed: 14 passed, 0 failed.'
        ]
      },
      milestones: [
        { name: 'CMake QEMU build target', status: 'Completed', notes: 'Enables single-command build and launch into qemu-system-xtensa.' },
        { name: 'Pedal-sensor emulation & fault injection', status: 'Completed', notes: 'Dual-channel mock with out-of-range and discrepancy checks.' },
        { name: 'BMS telemetry CAN mock', status: 'In Progress', notes: 'Modeling cell voltage distribution and over-temp flags.' },
        { name: 'Inverter feedback mock', status: 'Planned', notes: 'Command/response loop for motor torque & RPM feedback.' },
        { name: 'SX1262 LoRa mock', status: 'Planned', notes: 'Virtual SPI registers for packet transmission simulation.' }
      ]
    },
    nextSteps: [
      'Expand and validate the pedal-sensor mock across boundary conditions.',
      'Model driver-visible behavior for the BMS, inverter, and SX1262 LoRa module.',
      'Add normal and fault test scenarios into continuous test scripts.'
    ],
    whatILearned: [
      'Firmware emulation accelerates firmware verification cycles by orders of magnitude compared to flashing physical boards.',
      'Mocking hardware at the driver-visible interface preserves identical production logic while decoupling firmware development from vehicle hardware availability.',
      'Simulating edge-case hardware faults (sensor disconnects, stuck bits, bus timeouts) is substantially safer and more reproducible in software than inducing physical faults on high-voltage test setups.'
    ]
  },
  {
    slug: 'robotic-arm',
    name: 'Robotic Arm Research',
    tagline: 'Research involving ROS 2, MoveIt, RViz, and simulated-to-real robot motion.',
    tags: ['ROS 2', 'MoveIt', 'RViz'],
    role: 'Robotics Research Student',
    status: 'In Progress',
    summary30s: 'Investigating motion planning pipelines using ROS 2 and MoveIt to plan collision-free trajectories in RViz simulation, laying the groundwork for predictable simulated-to-real motion execution.',
    problem: 'Translating planned manipulator trajectories from kinematic simulation models into predictable, deterministic physical motions without collisions or kinematic singularities.',
    approach: 'Build a modular ROS 2 workspace integrating MoveIt motion planning frameworks and RViz simulation visualizers to evaluate trajectory smoothness and validate control pipelines prior to physical actuation.',
    diagram: {
      description: 'Robotic motion planning and validation architecture connecting user goals through MoveIt planners to real-time controller interfaces.',
      stages: [
        'Goal Pose / Trajectory Request',
        'MoveIt (Kinematics & Collision Checking)',
        'RViz 3D Simulation & Visualization',
        'ROS 2 Controller Manager / Hardware Interface (In Progress)'
      ],
      nodes: [
        { id: 'goal', label: 'Goal Pose / Trajectory Request', sublabel: 'Cartesian or joint goal commands', type: 'network' },
        { id: 'moveit', label: 'MoveIt Motion Planner', sublabel: 'OMPL / KDL kinematics & collision detection', type: 'firmware' },
        { id: 'rviz', label: 'RViz Simulation', sublabel: 'Trajectory visualization & joint state validation', type: 'emulator' },
        { id: 'controllers', label: 'ROS 2 Controllers', sublabel: 'Joint trajectory controller (In Progress)', type: 'hardware' },
        { id: 'arm', label: 'Robot Arm Hardware', sublabel: 'Physical actuators & encoder feedback (In Progress)', type: 'hardware' },
      ],
      flows: [
        { from: 'goal', to: 'moveit', protocol: 'ROS 2 Action / Service' },
        { from: 'moveit', to: 'rviz', protocol: '/move_group/display_planned_path' },
        { from: 'rviz', to: 'controllers', protocol: 'FollowJointTrajectory Action' },
        { from: 'controllers', to: 'arm', protocol: 'Hardware Interface / Bus (In Progress)' },
      ]
    },
    myContribution: [
      'Configured ROS 2 workspace and package dependencies for multi-joint manipulator simulation.',
      'Integrated MoveIt motion planning configurations (OMPL planners) and customized planning scene parameters.',
      'Analyzed trajectory execution and joint limit constraints within the RViz 3D simulation environment.',
      'Investigated simulated-to-real gap considerations including trajectory timing, latency, and actuator response.'
    ],
    technicalDetails: [
      {
        title: 'Robotics Frameworks & Middleware',
        items: [
          'ROS 2 (Robot Operating System 2): Node-based communication graph, action servers, and transform management (TF2).',
          'MoveIt: Inverse kinematics (IK) solvers, collision avoidance, and trajectory path generation.',
          'RViz: Interactive visualization of robot URDF models, planned paths, and joint coordinate frames.'
        ]
      },
      {
        title: 'Motion Planning & Trajectory Control',
        items: [
          'Cartesian path generation and collision checking against static planning scene objects.',
          'Joint trajectory filtering to respect velocity and acceleration limits across all joints.',
          'Simulated-to-real bridge evaluation (In Progress: hardware interface integration).'
        ]
      }
    ],
    currentProgress: {
      statusNote: 'Simulation and trajectory planning pipeline established in ROS 2 and MoveIt. Physical hardware validation in progress.',
      hasTerminalOutput: true,
      terminalSnippet: {
        command: 'ros2 launch robot_moveit_config demo.launch.py',
        output: [
          '[INFO] [launch]: Starting ROS 2 MoveIt motion planning pipeline...',
          '[INFO] [robot_state_publisher]: Loaded robot URDF description',
          '[INFO] [move_group]: Loading robot model and kinematic solvers (KDLKinematicsPlugin)...',
          '[INFO] [move_group]: Planning scene monitor active, monitoring TF2 transforms',
          '[INFO] [rviz2]: RViz visualization window initialized',
          '[INFO] [move_group]: Ready to take MoveGroup action requests',
          '[INFO] [motion_planner]: Planning path for goal pose [x=0.35, y=0.12, z=0.48]...',
          '[INFO] [ompl]: Solution found in 0.018 seconds (Waypoints: 24)',
          '[INFO] [trajectory_execution]: Simulated path execution verified in RViz.'
        ]
      },
      milestones: [
        { name: 'URDF model & joint limits definition', status: 'Completed', notes: 'Configured kinematic chains and limits.' },
        { name: 'MoveIt motion planning setup', status: 'Completed', notes: 'Configured planning groups and collision bounds.' },
        { name: 'RViz visualization & trajectory simulation', status: 'Completed', notes: 'Visual path validation and collision checking.' },
        { name: 'ROS 2 control hardware interface', status: 'In Progress', notes: 'Mapping joint commands to physical actuator drivers.' },
        { name: 'Physical robot motion validation', status: 'Planned', notes: 'Evaluating trajectory accuracy on physical hardware.' }
      ]
    },
    whatILearned: [
      'Gained deep understanding of coordinate frames (TF2) and kinematic chain representations in robotics.',
      'Learned how MoveIt structures motion planning as a multi-stage pipeline: IK solving, collision checking, and time parameterization.',
      'Identified critical discrepancies between idealized simulation models and physical hardware actuation (latency, backlash, and inertia).'
    ]
  },
  {
    slug: 'imu-firmware',
    name: 'Interrupt-Driven IMU Firmware',
    tagline: 'Embedded firmware that uses interrupts and static memory allocation to efficiently read and process IMU sensor data.',
    tags: ['C/C++', 'I2C', 'Interrupts'],
    role: 'Embedded Firmware Developer',
    status: 'In Progress',
    summary30s: 'Engineered non-blocking embedded C/C++ firmware utilizing hardware data-ready interrupts and static ring buffers to eliminate CPU polling and prevent memory fragmentation.',
    problem: 'Polling high-rate inertial sensors wastes microcontroller CPU cycles and risks jitter or missed sample deadlines during time-critical embedded operations.',
    approach: 'Build interrupt-driven firmware in C/C++ using hardware data-ready (DRDY) interrupts and static memory buffers to minimize latency, eliminate heap fragmentation, and service I2C sensor reads efficiently.',
    diagram: {
      description: 'Data acquisition pipeline from hardware sensor interrupt trigger through non-blocking buffer to main loop processing.',
      stages: [
        'IMU Hardware (DRDY Pin)',
        'Hardware Interrupt (ISR)',
        'Static Ring Buffer (Zero Heap)',
        'Main Telemetry & Processing Loop'
      ],
      nodes: [
        { id: 'imu', label: 'IMU Sensor Hardware', sublabel: '6-DOF accelerometer / gyro with DRDY line', type: 'hardware' },
        { id: 'isr', label: 'Hardware Interrupt (ISR)', sublabel: 'Low-latency edge-triggered handler', type: 'firmware' },
        { id: 'buf', label: 'Static Ring Buffer', sublabel: 'Fixed-size circular buffer in SRAM (No malloc)', type: 'firmware' },
        { id: 'i2c', label: 'I2C Non-Blocking Driver', sublabel: 'DMA / hardware peripheral transfer', type: 'peripheral' },
        { id: 'main', label: 'Main Telemetry Loop', sublabel: 'Sensor fusion / filtering / dispatch', type: 'firmware' },
      ],
      flows: [
        { from: 'imu', to: 'isr', protocol: 'Hardware GPIO Edge Trigger' },
        { from: 'isr', to: 'i2c', protocol: 'Trigger non-blocking transfer' },
        { from: 'i2c', to: 'buf', protocol: 'Atomic write to ring buffer' },
        { from: 'buf', to: 'main', protocol: 'Decoupled consumer read' },
      ]
    },
    myContribution: [
      'Designed and implemented interrupt service routine (ISR) architecture triggered by the IMU data-ready hardware pin.',
      'Structured static circular buffers to store accelerometer and gyroscope readings without heap allocation.',
      'Implemented atomic pointer management to guarantee thread-safe read/write operations between ISR and background tasks.',
      'Configured I2C peripheral registers and clock timing for reliable multi-byte burst reading.'
    ],
    technicalDetails: [
      {
        title: 'Firmware Architecture & Memory Management',
        items: [
          'Language: C/C++ structured for bare-metal / RTOS environments.',
          'Zero Dynamic Memory: All buffers, state structs, and queues allocated statically at compile time to eliminate fragmentation and heap allocation nondeterminism.',
          'Interrupt Design: Ultra-lean ISR execution keeping interrupt lockout times to microsecond bounds.'
        ]
      },
      {
        title: 'I2C Communication & Timing',
        items: [
          'Protocol: I2C fast mode with auto-incrementing register burst reads.',
          'Data Synchronization: Hardware DRDY interrupt signals new sensor data availability, preventing polling overhead.',
          'Concurrency: Lock-free single-producer single-consumer circular buffer design.'
        ]
      }
    ],
    currentProgress: {
      statusNote: 'Core interrupt handling, static buffer architecture, and register configuration implemented. Timing profiling and sensor fusion integration in progress.',
      hasTerminalOutput: true,
      terminalSnippet: {
        command: 'make test_imu_firmware && ./build/imu_runner',
        output: [
          '[INIT] Initializing I2C bus at 400kHz fast mode...',
          '[INIT] Configuring IMU registers: ODR=200Hz, Scale=±4g, ±500dps',
          '[INIT] Attaching DRDY interrupt to GPIO pin (FALLING_EDGE)...',
          '[INIT] Static ring buffer allocated: 64 frames (1024 bytes SRAM)',
          '[SYSTEM] Interrupt subsystem enabled. Servicing sensor events...',
          '[ISR] Sample #001 received -> Ax: 0.02g, Ay: -0.01g, Az: 0.99g | Gz: 0.1dps',
          '[ISR] Sample #002 received -> Ax: 0.03g, Ay: -0.02g, Az: 0.98g | Gz: 0.2dps',
          '[PERF] ISR duration: 1.8 microseconds (budget: < 5.0 microseconds)',
          '[BUFFER] Head: 2, Tail: 0, Overruns: 0',
          '[STATUS] Firmware running stably without sample drops.'
        ]
      },
      milestones: [
        { name: 'Hardware DRDY interrupt configuration', status: 'Completed', notes: 'Reliable edge detection without false triggers.' },
        { name: 'Static circular buffer implementation', status: 'Completed', notes: 'Zero-heap safe memory architecture.' },
        { name: 'Non-blocking I2C burst read driver', status: 'Completed', notes: 'Reading 12 bytes of acceleration and gyro data in single transaction.' },
        { name: 'Execution timing validation & jitter analysis', status: 'In Progress', notes: 'Measuring latency and worst-case interrupt latency.' },
        { name: 'Sensor calibration & fusion filters', status: 'Planned', notes: 'Complimentary or Madgwick orientation filter integration.' }
      ]
    },
    whatILearned: [
      'Discovered how critical static memory allocation is for embedded predictability, completely avoiding runtime memory leaks and fragmentation.',
      'Learned the principle of keeping ISRs minimal: acknowledge the hardware, push raw data into a safe buffer, and defer heavier computation to the main loop.',
      'Gained hands-on experience in atomic operations and race condition prevention when sharing buffers between hardware interrupts and background tasks.'
    ]
  },
  {
    slug: 'flex-pcb',
    name: 'Battery Temperature Flex PCB',
    tagline: 'A compact flex-PCB temperature-sensing project for battery monitoring and vehicle-system integration.',
    tags: ['Altium Designer', 'Sensors', 'PCB Design'],
    role: 'Hardware / PCB Designer',
    status: 'In Progress',
    summary30s: 'Designed a low-profile flexible circuit in Altium Designer to distribute temperature sensors across tightly packaged battery cells for vehicle thermal management and battery monitoring systems.',
    problem: 'Monitoring cell temperatures within tightly packaged battery modules requires low-profile, mechanically compliant sensor interconnects that can endure vibration and tight bend radii without adding excess mass.',
    approach: 'A compact flex-PCB temperature-sensing project for battery monitoring and vehicle-system integration, designed in Altium Designer to conform around cylindrical/prismatic cell walls with minimal mechanical stress.',
    diagram: {
      description: 'Flex PCB packaging and signal integration between high-density battery cells and vehicle monitoring systems.',
      stages: [
        'Battery Cell Array (Heat Generation)',
        'Surface-Mounted Thermal Sensors',
        'Flex PCB Substrate (Polyimide)',
        'Vehicle Battery Management System (BMS) Interface'
      ],
      nodes: [
        { id: 'cells', label: 'Battery Cell Array', sublabel: 'Cell pack monitoring points', type: 'hardware' },
        { id: 'sensors', label: 'Temperature Sensors', sublabel: 'Low-profile NTC / digital sensors', type: 'hardware' },
        { id: 'flex', label: 'Flex PCB Substrate', sublabel: 'Polyimide base + copper foil + coverlay', type: 'hardware' },
        { id: 'connector', label: 'Low-Profile Connector', sublabel: 'Strain-relieved wire-to-board header', type: 'peripheral' },
        { id: 'bms', label: 'Vehicle BMS Controller', sublabel: 'Thermal shutdown & telemetry monitoring', type: 'firmware' },
      ],
      flows: [
        { from: 'cells', to: 'sensors', protocol: 'Thermal conduction via interface material' },
        { from: 'sensors', to: 'flex', protocol: 'SMD pads with tear-drop trace transitions' },
        { from: 'flex', to: 'connector', protocol: 'Stiffened flex tail termination' },
        { from: 'connector', to: 'bms', protocol: 'Analog / Digital sensor bus to BMS' },
      ]
    },
    myContribution: [
      'Designed schematic and flexible PCB layout in Altium Designer.',
      'Established bend zones and designated stiffener regions for connector terminations.',
      'Routed sensor signal traces with curved corners and tear-drops to mitigate mechanical stress concentrations.',
      'Researched thermal interface materials and sensor placement for accurate cell surface contact.'
    ],
    technicalDetails: [
      {
        title: 'CAD & Layer Stackup',
        items: [
          'CAD Suite: Altium Designer with flex-rigid stackup manager.',
          'Substrate: Flexible polyimide (PI) with rolled annealed (RA) copper for superior fatigue life under repetitive deflection.',
          'Stiffeners: FR4 stiffener tabs applied underneath connector pads for mechanical mounting rigidity.'
        ]
      },
      {
        title: 'Design Rules & Mechanical Compliance',
        items: [
          'Trace Geometry: Radiused 90-degree trace transitions (no sharp angles) and teardrops at all pad entries to eliminate stress risers.',
          'Clearances: Extended copper-to-edge spacing adhering to flex fabrication guidelines.',
          'Integration: Low-profile profile tailored to fit between cell retainers without pinching.'
        ]
      }
    ],
    currentProgress: {
      statusNote: 'Schematic capture and initial flex board layout completed in Altium Designer. Fabrication review and thermal bench testing marked as In Progress.',
      hasTerminalOutput: false,
      milestones: [
        { name: 'Schematic capture & sensor selection', status: 'Completed', notes: 'Defined sensor circuit and filtering capacitors.' },
        { name: 'Flex PCB mechanical outline & stackup', status: 'Completed', notes: 'Defined polyimide thickness and bend radius specifications.' },
        { name: 'Trace routing & teardrop stress relief', status: 'Completed', notes: 'Curved trace geometry across flex zones.' },
        { name: 'DRC & fabrication design review', status: 'In Progress', notes: 'Validating against flex PCB manufacturer DFM guidelines.' },
        { name: 'Physical prototype testing in battery module', status: 'Planned', notes: 'Thermal chamber verification and bend endurance testing.' }
      ]
    },
    whatILearned: [
      'Understood the physical differences between standard rigid FR4 design and flexible polyimide electronics.',
      'Learned the critical importance of mechanical stress management in copper traces: avoiding vias in bend zones, using teardrops, and utilizing radiused traces.',
      'Explored how sensor packaging and thermal interface resistance directly affect temperature measurement response times in automotive battery packs.'
    ]
  }
];

export function getProjectBySlug(slug: string): ProjectDetail | undefined {
  return projectsData.find((p) => p.slug === slug);
}
