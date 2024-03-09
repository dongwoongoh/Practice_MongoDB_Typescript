import { Member } from '@/domain/entities/member/member';
import { MemberUpdate } from '@/domain/services/member/member.update';

export interface MemberRepositoryInterface {
    readonly insert: (email: string, password: string) => Promise<Member>;
    readonly findOneById: (id: string) => Promise<Member>;
    readonly update: (id: string, data: MemberUpdate) => Promise<Member>;
    readonly deleteSoftById: <K>(id: string) => Promise<K>;
}
