const dishwasher = require('../../../assets/Appliances/dishwasher.png');
const cooking = require('../../../assets/Appliances/Cooking.png');
const dryer = require('../../../assets/Appliances/Dryer.png');
const washer = require('../../../assets/Appliances/Washer.png');
const refrigerator = require('../../../assets/Appliances/Refrigerator.png');
const envelope = require('../../../assets/Building/Envelope.png');
const exteriorDoors = require('../../../assets/Building/Exterior_doors.png');
const garage = require('../../../assets/Building/Garage.png');
const insulation = require('../../../assets/Building/Insulation.png');
const roof = require('../../../assets/Building/Roof.png');
const windows = require('../../../assets/Building/Windows.png');
const electricalMeter = require('../../../assets/Electricity/Electrical_meter.png');
const electricalPanel = require('../../../assets/Electricity/Electrical_panel.png');
const lights = require('../../../assets/Electricity/Lights.png');
const solarPanel = require('../../../assets/Electricity/Solar_panel.png');
const switchesAndSocketOutlet = require('../../../assets/Electricity/Switches_and_outlet.png');
const decking = require('../../../assets/Exterior/Deck.png');
const landscape = require('../../../assets/Exterior/Landscape.png');
const swimmingPool = require('../../../assets/Exterior/Swimming_pool.png');
const airConditioning = require('../../../assets/HVAC/AC.png');
const airExchanger = require('../../../assets/HVAC/Air_exchanger.png');
const airExtractor = require('../../../assets/HVAC/Air_extractor.png');
const centralSystem = require('../../../assets/HVAC/Central_system.png');
const firePlace = require('../../../assets/HVAC/Fireplace.png');
const oilOrGasTank = require('../../../assets/HVAC/Oil_or_gas_tank.png');
const waterRadiator = require('../../../assets/HVAC/Water_radiator.png');
const humidifier = require('../../../assets/HVAC/Humidifier.png');
const cabinet = require('../../../assets/Interior/Cabinet.png');
const doors = require('../../../assets/Interior/Doors.png');
const floor = require('../../../assets/Interior/Floor.png');
const walls = require('../../../assets/Interior/Walls.png');
const foundation = require('../../../assets/Structure/Foundation.png');
const framework = require('../../../assets/Structure/Framework.png');
const stairs = require('../../../assets/Structure/Stairs.png');
const groundwaterSystem = require('../../../assets/Utilities/Groundwater_system.png');
const hotWaterTank = require('../../../assets/Utilities/Hot_water_tank.png');
const municipalSewage = require('../../../assets/Utilities/Municipal_sewage.png');
const municipalWaterFeed = require('../../../assets/Utilities/Municipal_water.png');
const plumbing = require('../../../assets/Utilities/Plumbing.png');
const septicSystem = require('../../../assets/Utilities/Septic_system.png');
const wellWater = require('../../../assets/Utilities/Well_water.png');

export const SectorKind = {
    'COOKING' : {
        'kind': 'COOKING',
        'display': 'Cooking',
        'image': cooking
    },
    'DRYER' : {
        'kind': 'DRYER',
        'display': 'Dryer',
        'image': dryer
    },
    'DISHWASHER' : {
        'kind': 'DISHWASHER',
        'display': 'Dishwasher',
        'image': dishwasher
    },
    'REFRIGERATOR' : {
        'kind': 'REFRIGERATOR',
        'display': 'Refrigerator',
        'image': refrigerator
    },
    'WASHER' : {
        'kind': 'WASHER',
        'display': 'Washer',
        'image': washer
    },
    'ENVELOPE' : {
        'kind': 'ENVELOPE',
        'display': 'Envelope',
        'image': envelope
    },
    'EXTERIOR_DOORS': {
        'kind': 'EXTERIOR_DOORS',
        'display': 'Exterior doors',
        'image': exteriorDoors
    },
    'GARAGE' : {
        'kind': 'GARAGE',
        'display': 'Garage',
        'image': garage
    },
    'INSULATION' : {
        'kind': 'INSULATION',
        'display': 'Insulation',
        'image': insulation
    },
    'ROOF' : {
        'kind': 'ROOF',
        'display': 'Roof',
        'image': roof
    },
    'WINDOWS' : {
        'kind': 'WINDOWS',
        'display': 'Windows',
        'image': windows
    },
    'ELECTRICAL_METER' : {
        'kind': 'ELECTRICAL_METER',
        'display': 'Electrical meter',
        'image': electricalMeter
    },
    'ELECTRICAL_PANEL' : {
        'kind': 'ELECTRICAL_PANEL',
        'display': 'Electrical panel',
        'image': electricalPanel
    },
    'LIGHTS' : {
        'kind': 'LIGHTS',
        'display': 'Lights',
        'image': lights
    },
    'SOLAR_PANEL' : {
        'kind': 'SOLAR_PANEL',
        'display': 'Solar Panel',
        'image': solarPanel
    },
    'SWITCHES_AND_SOCKET_OUTLET' : {
        'kind': 'SWITCHES_AND_SOCKET_OUTLET',
        'display': 'Switches and socket outlet',
        'image': switchesAndSocketOutlet
    },
    'DECKING' : {
        'kind': 'DECKING',
        'display': 'Decking',
        'image': decking
    },
    'LANDSCAPE' : {
        'kind': 'LANDSCAPE',
        'display': 'Landscape',
        'image': landscape
    },
    'SWIMMING_POOL' : {
        'kind': 'SWIMMING_POOL',
        'display': 'Swimming pool',
        'image': swimmingPool
    },
    'AIR_CONDITIONING' : {
        'kind': 'AIR_CONDITIONING',
        'display': 'Air conditioning',
        'image': airConditioning
    },
    'AIR_EXCHANGER' : {
        'kind': 'AIR_EXCHANGER',
        'display': 'Air exchanger',
        'image': airExchanger
    },
    'AIR_EXTRACTOR' : {
        'kind': 'AIR_EXTRACTOR',
        'display': 'Air extractor',
        'image': airExtractor
    },
    'CENTRAL_SYSTEM' : {
        'kind': 'CENTRAL_SYSTEM',
        'display': 'Central system',
        'image': centralSystem
    },
    'FIREPLACE' : {
        'kind': 'FIREPLACE',
        'display': 'Fireplace',
        'image': firePlace
    },
    'OIL_OR_GAS_TANK' : {
        'kind': 'OIL_OR_GAS_TANK',
        'display': 'Oil or gas tank',
        'image': oilOrGasTank
    },
    'WATER_RADIATOR' : {
        'kind': 'WATER_RADIATOR',
        'display': 'Water radiator',
        'image': waterRadiator
    },
    'HUMIDIFIER' : {
        'kind': 'HUMIDIFIER',
        'display': 'Humidifier',
        'image': humidifier
    },
    'CABINET' : {
        'kind': 'CABINET',
        'display': 'Cabinet',
        'image': cabinet
    },
    'DOORS' : {
        'kind': 'DOORS',
        'display': 'Doors',
        'image': doors
    },
    'FLOOR' : {
        'kind': 'FLOOR',
        'display': 'Floor',
        'image': floor
    },
    'WALLS' : {
        'kind': 'WALLS',
        'display': 'Walls',
        'image': walls
    },
    'FOUNDATION' : {
        'kind': 'FOUNDATION',
        'display': 'Foundation',
        'image': foundation
    },
    'FRAMEWORK' : {
        'kind': 'FRAMEWORK',
        'display': 'FRAMEWORK',
        'image': framework
    },
    'STAIRS' : {
        'kind': 'STAIRS',
        'display': 'Stairs',
        'image': stairs
    },
    'GROUNDWATER_SYSTEM' : {
        'kind': 'GROUNDWATER_SYSTEM',
        'display': 'Groundwater system',
        'image': groundwaterSystem
    },
    'HOT_WATER_TANK' : {
        'kind': 'HOT_WATER_TANK',
        'display': 'Hot water tank',
        'image': hotWaterTank
    },
    'MUNICIPAL_SEWAGE' : {
        'kind': 'MUNICIPAL_SEWAGE',
        'display': 'Municipal sewage',
        'image': municipalSewage
    },
    'MUNICIPAL_WATER_FEED' : {
        'kind': 'MUNICIPAL_WATER_FEED',
        'display': 'Municipal water feed',
        'image': municipalWaterFeed
    },
    'PLUMBING' : {
        'kind': 'PLUMBING',
        'display': 'Plumbing',
        'image': plumbing
    },
    'SEPTIC_SYSTEM': {
        'kind': 'SEPTIC_SYSTEM',
        'display': 'Septic system',
        'image': septicSystem
    },
    'WELL_WATER' : {
        'kind': 'WELL_WATER',
        'display': 'Well water',
        'image': wellWater
    },
};
