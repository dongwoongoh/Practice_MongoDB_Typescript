import { PrismaService } from '@/infrastructure/services/prisma.service';
import { MemberRepository } from '@/infrastructure/db/member.repository';
import { Member } from '@/domain/entities/member/member';
import { MemberUpdate } from '@/domain/services/member/member.update';

jest.mock('@/infrastructure/services/prisma.service', () => ({
    PrismaService: jest.fn().mockImplementation(() => ({
        members: {
            findUnique: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
        $transaction: jest.fn(),
    })),
}));

describe('member repository', () => {
    let repository: MemberRepository;
    let mockPrismaService: jest.Mocked<PrismaService>;
    beforeEach(() => {
        mockPrismaService = new PrismaService() as jest.Mocked<PrismaService>;
        repository = new MemberRepository(mockPrismaService);
    });
    const id = 'mock_uuid';
    const email = 'mock@gmail.com';
    const password = 'mock_password';
    const cash = 0;
    const created_at = new Date();
    const updated_at = new Date();
    const deleted_at = null;
    describe('insert', () => {
        it('success', async () => {
            const transaction = jest
                .mocked(mockPrismaService.$transaction)
                .mockImplementation(async (transactionCallback) =>
                    transactionCallback(mockPrismaService),
                );
            const create = jest
                .mocked(mockPrismaService.members.create)
                .mockResolvedValueOnce({
                    id,
                    email,
                    cash,
                    password,
                    created_at,
                    updated_at,
                    deleted_at,
                });
            const result = await repository.insert(email, password);
            const member = new Member(
                id,
                email,
                password,
                cash,
                created_at,
                updated_at,
                deleted_at,
            );
            expect(result).toMatchObject(member);
            expect(transaction).toHaveBeenCalled();
            expect(transaction).toBeCalledTimes(1);
            expect(create).toHaveBeenCalled();
            expect(create).toBeCalledTimes(1);
        });
        it('should failed because 422 email', async () => {
            const error = new Error(email);
            jest.mocked(
                mockPrismaService.members.findUnique,
            ).mockResolvedValueOnce({
                id,
                email,
                cash,
                password,
                created_at,
                updated_at,
                deleted_at,
            });
            jest.mocked(mockPrismaService.members.create).mockRejectedValueOnce(
                error,
            );
            await expect(async () => {
                await repository.insert(email, password);
            }).rejects.toThrowError(new Error(email));
        });
    });

    describe('findById', () => {
        it('success', async () => {
            const findUnique = jest
                .mocked(mockPrismaService.members.findUnique)
                .mockResolvedValueOnce({
                    id,
                    email,
                    password,
                    cash,
                    created_at,
                    updated_at,
                    deleted_at,
                });
            const member = await repository.findOneById(id);
            expect(member.id).toStrictEqual(id);
            expect(findUnique).toHaveBeenCalledTimes(1);
        });
        it('failed', async () => {
            const error = new Error(id);
            jest.mocked(
                mockPrismaService.members.findUnique,
            ).mockRejectedValueOnce(error);
            await expect(async () => {
                await repository.findOneById(id);
            }).rejects.toThrowError(new Error(id));
        });
    });

    describe('update', () => {
        describe('success', () => {
            it('should updated all fields', async () => {
                const data: MemberUpdate = {
                    email: 'update_email@gmail.com',
                    password: 'update_password',
                    cash: 77,
                };
                jest.mocked(mockPrismaService.$transaction).mockImplementation(
                    async (transactionCallback) =>
                        transactionCallback(mockPrismaService),
                );
                jest.mocked(
                    mockPrismaService.members.findUnique,
                ).mockResolvedValueOnce({
                    id,
                    email,
                    password,
                    cash,
                    created_at,
                    updated_at,
                    deleted_at,
                });
                jest.mocked(
                    mockPrismaService.members.update,
                ).mockResolvedValueOnce({
                    id,
                    email: data.email || email,
                    password: data.password || password,
                    cash: data.cash || cash,
                    created_at,
                    updated_at: new Date(),
                    deleted_at: null,
                });
                const member = await repository.update(id, data);
                expect(member.id).toStrictEqual(id);
                expect(member.email).toStrictEqual(data.email);
                expect(member.id === id).toBeTruthy();
                expect(member.email !== email).toBeTruthy();
                expect(member.password !== password).toBeTruthy();
                expect(member.cash !== cash).toBeTruthy();
            });
            it('should updated only email', async () => {
                const data: MemberUpdate = {
                    email: 'update_email@gmail.com',
                };
                jest.mocked(mockPrismaService.$transaction).mockImplementation(
                    async (transactionCallback) =>
                        transactionCallback(mockPrismaService),
                );
                jest.mocked(
                    mockPrismaService.members.findUnique,
                ).mockResolvedValueOnce({
                    id,
                    email,
                    password,
                    cash,
                    created_at,
                    updated_at,
                    deleted_at,
                });
                jest.mocked(
                    mockPrismaService.members.update,
                ).mockResolvedValueOnce({
                    id,
                    email: data.email || email,
                    password: data.password || password,
                    cash: data.cash || cash,
                    created_at,
                    updated_at: new Date(),
                    deleted_at: null,
                });
                const member = await repository.update(id, data);
                expect(member.id).toStrictEqual(id);
                expect(member.email).toStrictEqual(data.email);
                expect(member.id === id).toBeTruthy();
                expect(member.email !== email).toBeTruthy();
                expect(member.password === password).toBeTruthy();
                expect(member.cash === cash).toBeTruthy();
            });
            it('should updated only password', async () => {
                const data: MemberUpdate = {
                    password: 'update_password',
                };
                jest.mocked(mockPrismaService.$transaction).mockImplementation(
                    async (transactionCallback) =>
                        transactionCallback(mockPrismaService),
                );
                jest.mocked(
                    mockPrismaService.members.findUnique,
                ).mockResolvedValueOnce({
                    id,
                    email,
                    password,
                    cash,
                    created_at,
                    updated_at,
                    deleted_at,
                });
                jest.mocked(
                    mockPrismaService.members.update,
                ).mockResolvedValueOnce({
                    id,
                    email: data.email || email,
                    password: data.password || password,
                    cash: data.cash || cash,
                    created_at,
                    updated_at: new Date(),
                    deleted_at: null,
                });
                const member = await repository.update(id, data);
                expect(member.id).toStrictEqual(id);
                expect(member.password).toStrictEqual(data.password);
                expect(member.id === id).toBeTruthy();
                expect(member.email === email).toBeTruthy();
                expect(member.password !== password).toBeTruthy();
                expect(member.cash === cash).toBeTruthy();
            });
        });
        it('failed', async () => {
            const error = new Error(id);
            jest.mocked(
                mockPrismaService.members.findUnique,
            ).mockRejectedValueOnce(error);
            const data: MemberUpdate = {
                email: 'update_email@gmail.com',
                password: 'update_password',
                cash: 77,
            };
            await expect(async () => {
                await repository.update(id, data);
            }).rejects.toThrowError(new Error(id));
        });
    });
});
