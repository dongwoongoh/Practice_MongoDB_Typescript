import { MemberRepositoryInterface } from '@/domain/repositories/member/member.repository.interface';
import { Member } from '@/domain/entities/member/member';

describe('member repository interface', () => {
    let mock_repository: MemberRepositoryInterface;
    const mock_member = new Member(
        'mock_uuid',
        'mock_email@gmail.com',
        'mock_password',
        0,
        new Date(),
        new Date(),
        null,
    );
    beforeEach(() => {
        mock_repository = {
            insert: jest
                .fn()
                .mockImplementation(async (email: string, password: string) => {
                    if (mock_member.email === email)
                        throw new Error('422_email');
                    return new Member(
                        'new_uuid',
                        email,
                        password,
                        0,
                        new Date(),
                        new Date(),
                        null,
                    );
                }),
            findOneById: jest.fn().mockImplementation(async (id: string) => {
                if (mock_member.id !== id) throw new Error('404_id');
                return mock_member;
            }),
            update: jest
                .fn()
                .mockImplementation(
                    async (id: string, data: Partial<Member>) => {
                        if (mock_member.id !== id) throw new Error('404_id');
                        return new Member(
                            id,
                            data.email || mock_member.email,
                            data.password || mock_member.password,
                            data.cash || mock_member.cash,
                            new Date(),
                            new Date(),
                            null,
                        );
                    },
                ),
            deleteSoftById: jest.fn().mockImplementation(async (id: string) => {
                if (mock_member.id !== id) throw new Error('404_id');
                return { code: 201 };
            }),
        };
    });
    describe('insert', () => {
        it('success', async () => {
            const member = await mock_repository.insert(
                'mad@gmail.com',
                'mad123',
            );
            expect(member).toBeInstanceOf(Member);
            expect(member.id).toStrictEqual('new_uuid');
        });
        it('failed', async () => {
            await expect(async () => {
                await mock_repository.insert(mock_member.email, 'password');
            }).rejects.toThrowError(new Error('422_email'));
        });
    });

    describe('findOneById', () => {
        it('success', async () => {
            const member = await mock_repository.findOneById(mock_member.id);
            expect(member.id).toStrictEqual(mock_member.id);
        });
        it('failed', async () => {
            await expect(async () => {
                await mock_repository.findOneById('no_uuid');
            }).rejects.toThrowError(new Error('404_id'));
        });
    });

    describe('update', () => {
        describe('success', () => {
            type UpdateFields = Pick<Member, 'email' | 'password' | 'cash'>;
            type Update = Partial<UpdateFields>;
            it('should update all fields', async () => {
                const data: Update = {
                    email: 'changed_email@gmail.com',
                    password: 'changed_password',
                    cash: 1000,
                };
                const member = await mock_repository.update<UpdateFields>(
                    mock_member.id,
                    data,
                );
                expect(mock_member.id).toStrictEqual(member.id);
                expect(member.email).toStrictEqual(data.email);
                expect(member.password).toStrictEqual(data.password);
                expect(member.cash).toStrictEqual(data.cash);
            });
            it('should update email', async () => {
                const data: Update = { email: 'changed_email_only@gmailc.om' };
                const member = await mock_repository.update<UpdateFields>(
                    mock_member.id,
                    data,
                );
                expect(member.email).toStrictEqual(data.email);
                expect(member.password).toStrictEqual(mock_member.password);
                expect(member.cash).toStrictEqual(mock_member.cash);
            });
            it('should update password', async () => {});
            it('should update cash', async () => {});
        });
        it('failed', async () => {});
    });

    describe('deleteSoftById', () => {
        it('success', async () => {});
        it('failed', async () => {});
    });
});
