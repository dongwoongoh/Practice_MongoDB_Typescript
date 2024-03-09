import { Injectable, Scope } from '@nestjs/common';
import { MemberRepositoryInterface } from '@/domain/repositories/member/member.repository.interface';
import { Member } from '@/domain/entities/member/member';
import { PrismaService } from '@/infrastructure/services/prisma.service';
import { MemberUpdate } from '@/domain/services/member/member.update';

@Injectable({ scope: Scope.DEFAULT })
export class MemberRepository implements MemberRepositoryInterface {
    constructor(private readonly prisma: PrismaService) {}
    public async deleteSoftById<K>(id: string): Promise<K> {
        return Promise.resolve(undefined);
    }

    public async findOneById(id: string): Promise<Member> {
        const member = await this.prisma.members.findUnique({ where: { id } });
        if (!member) throw new Error(id);
        return new Member(
            member.id,
            member.email,
            member.password,
            member.cash,
            member.created_at,
            member.updated_at,
            member.deleted_at,
        );
    }

    public async insert(email: string, password: string): Promise<Member> {
        const check_email = await this.prisma.members.findUnique({
            where: { email },
        });
        if (check_email) throw new Error(email);
        try {
            const member = await this.prisma.$transaction(
                async (tx) =>
                    await tx.members.create({ data: { email, password } }),
            );
            return new Member(
                member.id,
                member.email,
                member.password,
                member.cash,
                member.created_at,
                member.updated_at,
                member.deleted_at,
            );
        } catch (e) {
            if (e instanceof Error) throw new Error(e.message);
        }
    }

    public async update(id: string, data: MemberUpdate): Promise<Member> {
        const find = await this.prisma.members.findUnique({
            where: { id },
        });
        if (!find) throw new Error(id);
        try {
            const member = await this.prisma.$transaction(
                async (tx) => await tx.members.update({ where: { id }, data }),
            );
            return new Member(
                member.id,
                member.email,
                member.password,
                member.cash,
                member.created_at,
                member.updated_at,
                member.deleted_at,
            );
        } catch (e) {
            if (e instanceof Error) throw new Error(e.message);
        }
    }
}
