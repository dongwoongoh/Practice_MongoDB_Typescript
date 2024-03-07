import { PrismaService } from '@/infrastructure/services/prisma.service';
import { MemberRepository } from '@/infrastructure/db/member.repository';
import { Member } from '@/domain/entities/member/member';

jest.mock('@/infrastructure/services/prisma.service', () => ({
    PrismaService: jest.fn().mockImplementation(() => ({
        members: {
            findUnique: jest.fn(),
            create: jest.fn(),
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
    describe('insert', () => {
        const id = 'mock_uuid';
        const email = 'mock@gmail.com';
        const password = 'mock_password';
        const cash = 0;
        const created_at = new Date();
        const updated_at = new Date();
        const deleted_at = null;
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
        it('should failed because 422 email', async () => {});
    });
});
