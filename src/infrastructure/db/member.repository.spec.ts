import { PrismaService } from '@/infrastructure/services/prisma.service';
import { MemberRepository } from '@/infrastructure/db/member.repository';

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
        it('success', async () => {});
        it('should failed because 422 email', async () => {});
    });
});
