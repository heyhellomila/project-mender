import 'mocha';
import { equal } from 'assert';
import { LicenseStatusRepository } from '../repositories/LicenseStatusRepository';
import { anyString, instance, mock, verify, when } from 'ts-mockito';
import { LicenseStatusService } from '../services/LicenseStatusService';
import { LicenseStatus } from '../entities/LicenseStatus';
import { LicenseStatus as LicenseStatusEnum } from '../enums/LicenseStatus';
import { LicenseStatusDataProvider } from './data_providers/LicenseStatusDataProvider';
import { ResourceNotFoundError } from '../errors/ResourceNotFoundError';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;

describe('Business Type Service Test', () => {

    let licenseStatusRepositoryMock : LicenseStatusRepository;
    let licenseStatusRepository : LicenseStatusRepository;
    let licenseStatusService : LicenseStatusService;
    const licenseStatus : LicenseStatus = LicenseStatusDataProvider
        .getLicenseStatus(1, LicenseStatusEnum.ACTIVE);

    beforeEach(() => {
        licenseStatusRepositoryMock = mock(LicenseStatusRepository);
        licenseStatusRepository = instance(licenseStatusRepositoryMock);
        licenseStatusService = new LicenseStatusService(licenseStatusRepository);
    });

    it('getLicenseStatus with valid string and expect license status', async () => {
        when(licenseStatusRepositoryMock.getLicenseStatus(anyString()))
            .thenResolve(licenseStatus);
        const fetchedLicenseStatus : LicenseStatus =
            await licenseStatusService.getLicenseStatus(licenseStatus.status);

        verify(licenseStatusRepositoryMock.getLicenseStatus(licenseStatus.status))
            .called();

        equal(fetchedLicenseStatus, licenseStatus);
    });

    it('getLicenseStatus with invalid string expect ResourceNotFoundError', async () => {
        when(licenseStatusRepositoryMock.getLicenseStatus(anyString()))
            .thenResolve(null);
        await expect(licenseStatusService.getLicenseStatus(licenseStatus.status)).to.be
            .rejectedWith(ResourceNotFoundError);
        verify(licenseStatusRepositoryMock.getLicenseStatus(licenseStatus.status)).called();
    });
});
