import { Member } from '@/domain/entities/member/member';

export interface MemberUseCaseInterface {
    readonly signUp: (email: string, password: string) => Promise<Member>;
}
