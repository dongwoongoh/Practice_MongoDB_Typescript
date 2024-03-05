import { Member } from '@/domain/entities/member/member';

describe('member', () => {
    let entity: Member;
    const {
        _id,
        _email,
        _password,
        _cash,
        _createdAt,
        _updatedAt,
        _deletedAt,
    } = {
        _id: 'mock_uuid',
        _email: 'mock@gmail.com',
        _password: 'bla_bla_123',
        _cash: 0,
        _createdAt: new Date(),
        _updatedAt: new Date(),
        _deletedAt: null,
    };
    beforeEach(() => {
        entity = new Member(
            _id,
            _email,
            _password,
            _cash,
            _createdAt,
            _updatedAt,
            _deletedAt,
        );
    });
    it('should generated entity', () => {
        expect(entity.id).toStrictEqual(_id);
        expect(entity.email).toStrictEqual(_email);
        expect(entity.deletedAt).toBeNull();
    });
});
