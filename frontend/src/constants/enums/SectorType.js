import { SectorKind } from './SectorKind';

const building = require('../../../assets/Building.png');
const electrcity = require('../../../assets/Electrical.png');
const structure = require('../../../assets/Structure.png');
const exterior = require('../../../assets/Exterior.png');
const utility = require('../../../assets/Utilities.png');
const hvac = require('../../../assets/HVAC.png');
const interiorFinish = require('../../../assets/Interior.png');
const appliances = require('../../../assets/Appliance.png');

export const SectorType = {
    'BUILDING' : {
        'type': 'BUILDING',
        'display': 'Building',
        'image': building,
        'kinds': [SectorKind.ENVELOPE, SectorKind.GARAGE, SectorKind.INSULATION, SectorKind.ROOF,
            SectorKind.WINDOWS, SectorKind.EXTERIOR_DOORS
        ]
    },
    'ELECTRICITY' : {
        'type': 'ELECTRICITY',
        'display': 'Electricity',
        'image': electrcity,
        'kinds': [SectorKind.ELECTRICAL_METER, SectorKind.ELECTRICAL_PANEL, SectorKind.LIGHTS,
            SectorKind.SOLAR_PANEL, SectorKind.SWITCHES_AND_SOCKET_OUTLET
        ]
    },
    'STRUCTURE' : {
        'type': 'STRUCTURE',
        'display': 'Structure',
        'image': structure,
        'kinds': [SectorKind.FOUNDATION, SectorKind.STAIRS]
    },
    'EXTERIOR' : {
        'type': 'EXTERIOR',
        'display': 'Exterior',
        'image': exterior,
        'kinds': [SectorKind.DECKING, SectorKind.LANDSCAPE, SectorKind.SWIMMING_POOL]
    },
    'UTILITY' : {
        'type': 'UTILITY',
        'display': 'Utility',
        'image': utility,
        'kinds': [SectorKind.GROUNDWATER_SYSTEM, SectorKind.HOT_WATER_TANK, SectorKind.MUNICIPAL_SEWAGE,
            SectorKind.MUNICIPAL_WATER_FEED, SectorKind.PLUMBING, SectorKind.SEPTIC_SYSTEM,
            SectorKind.WELL_WATER
        ]
    },
    'HVAC' : {
        'type': 'HVAC',
        'display': 'HVAC',
        'image': hvac,
        'kinds': [SectorKind.AIR_CONDITIONING,  SectorKind.AIR_EXCHANGER, SectorKind.AIR_EXTRACTOR,
            SectorKind.CENTRAL_SYSTEM, SectorKind.FIREPLACE, SectorKind.OIL_OR_GAS_TANK,
            SectorKind.WATER_RADIATOR, SectorKind.HUMIDIFIER
        ]
    },
    'INTERIOR_FINISH' : {
        'type': 'INTERIOR_FINISH',
        'display': 'Interior finish',
        'image': interiorFinish,
        'kinds': [SectorKind.CABINET, SectorKind.FLOOR, SectorKind.DOORS, SectorKind.WALLS]
    },
    'APPLIANCES' : {
        'type': 'APPLIANCES',
        'display': 'Appliances',
        'image': appliances,
        'kinds': [SectorKind.DISHWASHER, SectorKind.REFRIGERATOR, SectorKind.COOKING, SectorKind.WASHER,
            SectorKind.DRYER]
    },
};
