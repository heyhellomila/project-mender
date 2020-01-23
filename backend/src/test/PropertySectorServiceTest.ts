import 'mocha';
import { equal } from 'assert';
import { PropertySectorRepository } from '../repositories/PropertySectorRepository';
import { anyNumber, anyOfClass, anyString, anything, deepEqual, instance, mock, verify, when } from 'ts-mockito';
import { PropertySectorService } from '../services/PropertySectorService';
import { PropertySector } from '../entities/PropertySector';
import { PropertySectorDataProvider } from './data_providers/PropertySectorDataProvider';
import { SectorService } from '../services/SectorService';
import { PropertyService } from '../services/PropertyService';
import { Property } from '../entities/Property';
import { PropertyDataProvider } from './data_providers/PropertyDataProvider';
import { Sector } from '../entities/Sector';
import { SectorDataProvider } from './data_providers/SectorDataProvider';
import { SectorType } from '../enums/SectorType';
import { SectorKind } from '../enums/SectorKind';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';
import { ResourceExistsError } from '../errors/ResourceExistsError';
import { ActivityStatus } from '../enums/ActivityStatus';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Property Sector Service Test', () => {

    let propertySectorRepositoryMock : PropertySectorRepository;
    let propertySectorRepository : PropertySectorRepository;
    let sectorServiceMock : SectorService;
    let sectorService : SectorService;
    let propertyServiceMock : PropertyService;
    let propertyService : PropertyService;
    let propertySectorService : PropertySectorService;
    const property : Property = PropertyDataProvider.getProperty(1);
    const dryerSector : Sector = SectorDataProvider.getSector(
        1, SectorType.APPLIANCES, SectorKind.DRYER);
    const lightsSector : Sector = SectorDataProvider.getSector(
        2, SectorType.ELECTRICITY, SectorKind.LIGHTS);
    const propertySectors : PropertySector[] = [PropertySectorDataProvider.getPropertySector(
        1, property, dryerSector, ActivityStatus.ACTIVE),
        PropertySectorDataProvider.getPropertySector(
            2, property, lightsSector, ActivityStatus.ACTIVE)];

    beforeEach(() => {
        propertySectorRepositoryMock = mock(PropertySectorRepository);
        propertySectorRepository = instance(propertySectorRepositoryMock);
        sectorServiceMock = mock(SectorService);
        sectorService = instance(sectorServiceMock);
        propertyServiceMock = mock(PropertyService);
        propertyService = instance(propertyServiceMock);
        propertySectorService = new PropertySectorService(
            propertySectorRepository, sectorService, propertyService);
    });

    it(('getSectorsByPropertyId successfully'), async () => {
        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(property);
        when(propertySectorRepositoryMock.getSectorsByProperty(anyOfClass(Property)))
            .thenResolve(propertySectors);

        const fetchedPropertySectors : PropertySector[] = await propertySectorService
            .getSectorsByPropertyId(property.id);

        verify(propertyServiceMock.getPropertyById(property.id)).called();
        verify(propertySectorRepositoryMock.getSectorsByProperty(property)).called();
        equal(fetchedPropertySectors, propertySectors);
    });

    it(('createPropertySectors successfully'), async () => {
        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(anyString())).thenResolve(dryerSector)
            .thenResolve(lightsSector);
        when(propertySectorRepositoryMock.getPropertySectorsByPropertyAndSectors(
            anyOfClass(Property), anyOfClass(Array))).thenResolve([]);
        when(propertySectorRepositoryMock.save(anyOfClass(Array)))
            .thenResolve(propertySectors);

        const newPropertySectors : PropertySector[] = await propertySectorService
            .createPropertySectors(property.id, propertySectors);

        verify(propertyServiceMock.getPropertyById(property.id)).called();
        verify(sectorServiceMock.getSectorByKind(dryerSector.kind)).called();
        verify(sectorServiceMock.getSectorByKind(lightsSector.kind)).called();
        verify(propertySectorRepositoryMock.getPropertySectorsByPropertyAndSectors(
            property, deepEqual(propertySectors.map(ps => ps.sector)))).called();
        verify(propertySectorRepositoryMock.save(propertySectors)).called();
        equal(newPropertySectors, propertySectors);
    });

    it(
        ('createPropertySectors property does not exist and expect ResourceNotFoundError'),
        async () => {
            when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(null);
            await expect(propertySectorService.createPropertySectors(property.id, propertySectors))
                .to.be.rejectedWith(ResourceNotFoundError);
            verify(propertySectorRepositoryMock.getPropertySectorsByPropertyAndSectors(
                anything(), anything())).never();
            verify(propertySectorRepositoryMock.save(anything())).never();
        },
    );

    it(
        ('createPropertySectors property sector exists expect ResourceExistsError'),
        async () => {
            when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(property);
            when(sectorServiceMock.getSectorByKind(anyString())).thenResolve(dryerSector)
                .thenResolve(lightsSector);
            when(propertySectorRepositoryMock.getPropertySectorsByPropertyAndSectors(
                anyOfClass(Property), anyOfClass(Array))).thenResolve(propertySectors);

            await expect(propertySectorService.createPropertySectors(property.id, propertySectors))
                .to.be.rejectedWith(ResourceExistsError);

            verify(propertySectorRepositoryMock.save(anything())).never();
        },
    );

    it(('update successfully'), async() => {
        const propertySectorsToUpdate : PropertySector[] = [
            PropertySectorDataProvider.getPropertySector(
                1, property, dryerSector, ActivityStatus.INACTIVE),
            PropertySectorDataProvider.getPropertySector(
                2, property, lightsSector, ActivityStatus.INACTIVE)];

        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(anyString())).thenResolve(dryerSector)
            .thenResolve(lightsSector);
        when(propertySectorRepositoryMock.getPropertySectorsByPropertyAndSectors(
            anyOfClass(Property), anyOfClass(Array))).thenResolve(propertySectors);
        when(propertySectorRepositoryMock.update(anyOfClass(Array)))
            .thenResolve(propertySectorsToUpdate);

        const updatedPropertySectors : PropertySector[] = await propertySectorService
            .update(property.id, propertySectorsToUpdate);

        verify(propertyServiceMock.getPropertyById(property.id)).called();
        verify(sectorServiceMock.getSectorByKind(lightsSector.kind)).called();
        verify(sectorServiceMock.getSectorByKind(dryerSector.kind)).called();
        verify(propertySectorRepositoryMock.getPropertySectorsByPropertyAndSectors(
            property, deepEqual(propertySectorsToUpdate.map(ups => ups.sector)))).called();
        verify(propertySectorRepositoryMock.update(deepEqual(propertySectorsToUpdate))).called();
        equal(updatedPropertySectors, propertySectorsToUpdate);
    });

    it(('update property does not exist'), async() => {
        const propertySectorsToUpdate : PropertySector[] = [
            PropertySectorDataProvider.getPropertySector(
                1, property, dryerSector, ActivityStatus.INACTIVE),
            PropertySectorDataProvider.getPropertySector(
                2, property, lightsSector, ActivityStatus.INACTIVE)];

        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(null);

        await expect(propertySectorService.update(property.id, propertySectorsToUpdate))
            .to.be.rejectedWith(ResourceNotFoundError);
        verify(propertySectorRepositoryMock.update(anything())).never();
    });

    it(('update property sector(s) to be updated does not exist'), async() => {
        const propertySectorsToUpdate : PropertySector[] = [
            PropertySectorDataProvider.getPropertySector(
                1, property, dryerSector, ActivityStatus.INACTIVE),
            PropertySectorDataProvider.getPropertySector(
                2, property, lightsSector, ActivityStatus.INACTIVE)];

        when(propertyServiceMock.getPropertyById(anyNumber())).thenResolve(property);
        when(sectorServiceMock.getSectorByKind(anyString())).thenResolve(dryerSector)
            .thenResolve(lightsSector);
        when(propertySectorRepositoryMock.getPropertySectorsByPropertyAndSectors(
            anyOfClass(Property), anyOfClass(Array))).thenResolve([]);

        await expect(propertySectorService.update(property.id, propertySectorsToUpdate))
            .to.be.rejectedWith(ResourceNotFoundError);
        verify(propertySectorRepositoryMock.update(anything())).never();
    });
});
