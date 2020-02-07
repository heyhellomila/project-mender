import 'mocha';
import { equal } from 'assert';
import { LicenseTypeRepository } from '../repositories/LicenseTypeRepository';
import { anyString, instance, mock, verify, when } from 'ts-mockito';
import { LicenseTypeService } from '../services/LicenseTypeService';
import { LicenseType } from '../entities/LicenseType';
import { LicenseType as LicenseTypeEnum } from '../enums/LicenseType';
import { LicenseTypeDataProvider } from './data_providers/LicenseTypeDataProvider';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Business Type Service Test', () => {

    let licenseTypeRepositoryMock : LicenseTypeRepository;
    let licenseTypeRepository : LicenseTypeRepository;
    let licenseTypeService : LicenseTypeService;
    const licenseType : LicenseType = LicenseTypeDataProvider
        .getLicenseType(1, LicenseTypeEnum.RBQ);

    beforeEach(() => {
        licenseTypeRepositoryMock = mock(LicenseTypeRepository);
        licenseTypeRepository = instance(licenseTypeRepositoryMock);
        licenseTypeService = new LicenseTypeService(licenseTypeRepository);
    });

    it('getLicenseType with valid string and expect license type', async () => {
        when(licenseTypeRepositoryMock.getLicenseType(anyString()))
            .thenResolve(licenseType);
        const fetchedLicenseType : LicenseType =
            await licenseTypeService.getLicenseType(licenseType.type);

        verify(licenseTypeRepositoryMock.getLicenseType(licenseType.type))
            .called();

        equal(fetchedLicenseType, licenseType);
    });

    it('getLicenseType with invalid string expect ResourceNotFoundError', async () => {
        when(licenseTypeRepositoryMock.getLicenseType(anyString()))
            .thenResolve(null);
        await expect(licenseTypeService.getLicenseType(licenseType.type)).to.be
            .rejectedWith(ResourceNotFoundError);
        verify(licenseTypeRepositoryMock.getLicenseType(licenseType.type)).called();
    });
});
