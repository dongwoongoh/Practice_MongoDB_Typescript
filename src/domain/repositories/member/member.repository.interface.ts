import { Member } from '@/domain/entities/member/member';

export interface MemberRepositoryInterface {
    readonly insert: (email: string, password: string) => Promise<Member>;
    readonly findOneById: (id: string) => Promise<Member>;
    readonly update: <T>(id: string, data: Partial<T>) => Promise<Member>;
    readonly deleteSoftById: <K>(id: string) => Promise<K>;
}
