import { Injectable, Scope } from '@nestjs/common';
import { MemberRepositoryInterface } from '@/domain/repositories/member/member.repository.interface';
import { Member } from '@/domain/entities/member/member';
import { PrismaService } from '@/infrastructure/services/prisma.service';

@Injectable({ scope: Scope.DEFAULT })
export class MemberRepository implements MemberRepositoryInterface {
    constructor(private readonly prisma: PrismaService) {}
    public deleteSoftById<K>(id: string): Promise<K> {
        return Promise.resolve(undefined);
    }

    public findOneById(id: string): Promise<Member> {
        return Promise.resolve(undefined);
    }

    public insert(email: string, password: string): Promise<Member> {
        return Promise.resolve(undefined);
    }

    public update<T>(id: string, data: Partial<T>): Promise<Member> {
        return Promise.resolve(undefined);
    }
}
