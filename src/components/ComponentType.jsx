
// Define reactor components types with their properties
export const componentTypes = {
    PIPE: {
        type: 'PIPE',
        label: 'Pipe',
        icon: '⟹',
        category: 'flow',
        ports: {
            inputs: [{ id: 'in', label: 'In' }],
            outputs: [{ id: 'out', label: 'Out' }]
        },
        defaultData: {
            diameter: 0.1, // in meters
            length: 1.0,   // in meters
            roughness: 0.0015 // roughness coefficient
        },
        properties: [
            { id: 'diameter', label: 'Diameter (m)', type: 'number', min: 0.01, max: 1.0, step: 0.01 },
            { id: 'length', label: 'Length (m)', type: 'number', min: 0.1, max: 100.0, step: 0.1 },
            { id: 'roughness', label: 'Roughness', type: 'number', min: 0.0001, max: 0.05, step: 0.0001 }
        ]
    },
    PUMP: {
        type: 'PUMP',
        label: 'Pump',
        icon: '⚙️',
        category: 'flow',
        ports: {
            inputs: [{ id: 'in', label: 'In' }],
            outputs: [{ id: 'out', label: 'Out' }]
        },
        defaultData: {
            flowRate: 10.0, // in kg/s
            head: 100.0,    // in meters
            efficiency: 0.8 // efficiency ratio
        },
        properties: [
            { id: 'flowRate', label: 'Flow Rate (kg/s)', type: 'number', min: 0.1, max: 1000.0, step: 0.1 },
            { id: 'head', label: 'Head (m)', type: 'number', min: 1.0, max: 1000.0, step: 1.0 },
            { id: 'efficiency', label: 'Efficiency', type: 'number', min: 0.1, max: 1.0, step: 0.01 }
        ]
    },
    VALVE: {
        type: 'VALVE',
        label: 'Valve',
        icon: '🔸',
        category: 'flow',
        ports: {
            inputs: [{ id: 'in', label: 'In' }],
            outputs: [{ id: 'out', label: 'Out' }]
        },
        defaultData: {
            type: 'gate',
            diameter: 0.1,  // in meters
            position: 1.0,  // 0 = closed, 1 = open
            cvValue: 100.0  // flow coefficient
        },
        properties: [
            { id: 'type', label: 'Valve Type', type: 'select', options: ['gate', 'globe', 'check', 'butterfly'] },
            { id: 'diameter', label: 'Diameter (m)', type: 'number', min: 0.01, max: 1.0, step: 0.01 },
            { id: 'position', label: 'Position', type: 'number', min: 0.0, max: 1.0, step: 0.01 },
            { id: 'cvValue', label: 'CV Value', type: 'number', min: 1.0, max: 1000.0, step: 1.0 }
        ]
    },
    REACTOR_CORE: {
        type: 'REACTOR_CORE',
        label: 'Reactor Core',
        icon: '⚛️',
        category: 'source',
        ports: {
            inputs: [{ id: 'coolant_in', label: 'Coolant In' }],
            outputs: [{ id: 'coolant_out', label: 'Coolant Out' }]
        },
        defaultData: {
            thermalPower: 3000.0, // in MW
            coreHeight: 4.0,      // in meters
            coreDiameter: 3.0,    // in meters
            fuelType: 'UO2',
            enrichment: 4.5       // percentage
        },
        properties: [
            { id: 'thermalPower', label: 'Thermal Power (MW)', type: 'number', min: 1.0, max: 5000.0, step: 1.0 },
            { id: 'coreHeight', label: 'Core Height (m)', type: 'number', min: 1.0, max: 10.0, step: 0.1 },
            { id: 'coreDiameter', label: 'Core Diameter (m)', type: 'number', min: 1.0, max: 10.0, step: 0.1 },
            { id: 'fuelType', label: 'Fuel Type', type: 'select', options: ['UO2', 'MOX', 'TRISO', 'Metallic'] },
            { id: 'enrichment', label: 'Enrichment (%)', type: 'number', min: 0.7, max: 20.0, step: 0.1 }
        ]
    },
    HEAT_EXCHANGER: {
        type: 'HEAT_EXCHANGER',
        label: 'Heat Exchanger',
        icon: '🔄',
        category: 'thermal',
        ports: {
            inputs: [
                { id: 'primary_in', label: 'Primary In' },
                { id: 'secondary_in', label: 'Secondary In' }
            ],
            outputs: [
                { id: 'primary_out', label: 'Primary Out' },
                { id: 'secondary_out', label: 'Secondary Out' }
            ]
        },
        defaultData: {
            type: 'shell-and-tube',
            thermalCapacity: 500.0,  // in MW
            primaryFlowRate: 1000.0, // in kg/s
            secondaryFlowRate: 800.0, // in kg/s
            effectiveArea: 5000.0     // in m²
        },
        properties: [
            { id: 'type', label: 'HX Type', type: 'select', options: ['shell-and-tube', 'plate', 'spiral', 'printed-circuit'] },
            { id: 'thermalCapacity', label: 'Thermal Capacity (MW)', type: 'number', min: 1.0, max: 2000.0, step: 1.0 },
            { id: 'primaryFlowRate', label: 'Primary Flow (kg/s)', type: 'number', min: 1.0, max: 10000.0, step: 1.0 },
            { id: 'secondaryFlowRate', label: 'Secondary Flow (kg/s)', type: 'number', min: 1.0, max: 10000.0, step: 1.0 },
            { id: 'effectiveArea', label: 'Effective Area (m²)', type: 'number', min: 10.0, max: 50000.0, step: 10.0 }
        ]
    },
    PRESSURIZER: {
        type: 'PRESSURIZER',
        label: 'Pressurizer',
        icon: '🔺',
        category: 'control',
        ports: {
            inputs: [{ id: 'in', label: 'In' }],
            outputs: [{ id: 'out', label: 'Out' }]
        },
        defaultData: {
            volume: 40.0,        // in m³
            pressure: 15.5,      // in MPa
            temperature: 345.0,  // in °C
            waterLevel: 50.0     // percentage
        },
        properties: [
            { id: 'volume', label: 'Volume (m³)', type: 'number', min: 5.0, max: 100.0, step: 1.0 },
            { id: 'pressure', label: 'Pressure (MPa)', type: 'number', min: 1.0, max: 20.0, step: 0.1 },
            { id: 'temperature', label: 'Temperature (°C)', type: 'number', min: 100.0, max: 400.0, step: 1.0 },
            { id: 'waterLevel', label: 'Water Level (%)', type: 'number', min: 0.0, max: 100.0, step: 1.0 }
        ]
    },
    CONTAINMENT: {
        type: 'CONTAINMENT',
        label: 'Containment',
        icon: '🏗️',
        category: 'structure',
        ports: {
            inputs: [{ id: 'in', label: 'In' }],
            outputs: []
        },
        defaultData: {
            type: 'PWR-Dry',
            volume: 50000.0,     // in m³
            designPressure: 0.4, // in MPa
            wallThickness: 1.2   // in meters
        },
        properties: [
            { id: 'type', label: 'Containment Type', type: 'select', options: ['PWR-Dry', 'BWR-Wet', 'PHWR', 'HTGR'] },
            { id: 'volume', label: 'Volume (m³)', type: 'number', min: 10000.0, max: 100000.0, step: 1000.0 },
            { id: 'designPressure', label: 'Design Pressure (MPa)', type: 'number', min: 0.1, max: 1.0, step: 0.01 },
            { id: 'wallThickness', label: 'Wall Thickness (m)', type: 'number', min: 0.5, max: 3.0, step: 0.1 }
        ]
    }
};

// Group components by category
export const componentCategories = {
    flow: 'Flow Components',
    source: 'Sources',
    thermal: 'Thermal Components',
    control: 'Control Components',
    structure: 'Structural Components'
};
