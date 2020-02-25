import 'mocha';
import { equal } from 'assert';
import { anyString, instance, mock, verify, when } from 'ts-mockito';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { SectorRepository } from '../repositories/SectorTypeRepository';
import { SectorService } from '../services/SectorService';
import { Sector } from '../entities/Sector';
import { SectorDataProvider } from './data_providers/SectorDataProvider';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Sector Service Test', () => {
    let sectorService : SectorService;
    let sectorRepositoryMock : SectorRepository;
    let sectorRepository : SectorRepository;
    const sector : Sector = SectorDataProvider.getSector(1, 'BUILDING', 'ROOF');

    beforeEach(() => {
        sectorRepositoryMock = mock(SectorRepository);
        sectorRepository = instance(sectorRepositoryMock);
        sectorService = new SectorService(sectorRepository);
    });

    it(('sector retrieved with valid string success scenario'), async() => {
        when(sectorRepositoryMock.getSectorByKind(anyString())).thenResolve(sector);
        const fetchedSector : Sector = await sectorService.getSectorByKind(sector.kind);

        verify(sectorRepositoryMock.getSectorByKind(sector.kind)).called();
        equal(fetchedSector, sector);
    });

    it(('sector retrieved with invalid string expect ResourceNotFoundError'), async() => {
        when(sectorRepositoryMock.getSectorByKind(anyString())).thenResolve(null);
        await expect(sectorService.getSectorByKind(sector.kind)).to.be
            .rejectedWith(ResourceNotFoundError);
        verify(sectorRepositoryMock.getSectorByKind(sector.kind)).called();
    });
});
