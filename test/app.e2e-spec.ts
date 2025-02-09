// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import * as request from 'supertest';
// import { AppModule } from '@/app.module';
// import { PrismaService } from '@/infrastructure/prisma/prisma.service';
// import { MemberJoinDto } from '@/presentation/dtos/member/member.join.dto';
// import { Member } from '@/domain/entities/member';
//
// describe('AppController (e2e)', () => {
//     let app: INestApplication;
//     let prismaService: PrismaService;
//     let member: Member;
//     beforeEach(async () => {
//         const moduleFixture: TestingModule = await Test.createTestingModule({
//             imports: [AppModule],
//         }).compile();
//         app = moduleFixture.createNestApplication();
//         prismaService = app.get<PrismaService>(PrismaService);
//         await app.init();
//     });
//     const gMember: MemberJoinDto = {
//         email: 'mad@gmail.com',
//         password: '12345678!!',
//         isAdmin: true,
//     };
//     afterAll(async () => {
//         const tables = ['members'];
//         for (const table of tables) {
//             await prismaService.$executeRawUnsafe(`DELETE FROM ${table};`);
//         }
//     });
//     describe('POST /members', () => {
//         const resource = '/members';
//         it('201', async () => {
//             const response = await request(app.getHttpServer())
//                 .post(resource)
//                 .send(gMember)
//                 .expect(201);
//             const { id, email } = response.body;
//             member = new Member(id, gMember.email, gMember.isAdmin);
//             expect(member.data.email).toEqual(email);
//         });
//         it('409', async () => {
//             await request(app.getHttpServer())
//                 .post(resource)
//                 .send(gMember)
//                 .expect(409);
//         });
//     });
//     describe('POST /auth', () => {
//         const resource = '/auth';
//         it('201', async () => {
//             const response = await request(app.getHttpServer())
//                 .post(resource)
//                 .send(gMember)
//                 .expect(201);
//             const body = response.body;
//             member = new Member(body.id, body.email, body.isAdmin);
//             const cookies = response.headers['set-cookie'];
//             expect(body.id).toStrictEqual(member.data.id);
//             expect(cookies).toBeDefined();
//             expect(cookies[0]).toContain('token=');
//             expect(cookies[0]).toContain('HttpOnly');
//         });
//         it('422', async () => {
//             const sillyPassword = '123456qwe!!!';
//             const response = await request(app.getHttpServer())
//                 .post(resource)
//                 .send({ ...gMember, password: sillyPassword })
//                 .expect(422);
//             expect(response.body).toStrictEqual({
//                 statusCode: 422,
//                 message: 'password',
//                 error: 'Unprocessable Entity',
//             });
//         });
//         it('404', async () => {
//             const sillyEmail = '123456qwedz@gmail.com';
//             const response = await request(app.getHttpServer())
//                 .post(resource)
//                 .send({ ...gMember, email: sillyEmail })
//                 .expect(404);
//             expect(response.body).toStrictEqual({
//                 statusCode: 404,
//                 message: 'email',
//                 error: 'Not Found',
//             });
//         });
//     });
// });
