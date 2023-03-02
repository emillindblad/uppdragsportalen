import bcrypt from "bcrypt";
import { prisma } from "../src/server/db";

async function main() {
    await prisma.uppdrag.deleteMany({})
    await prisma.user.deleteMany({})


    const samplePassword = await bcrypt.hash("1234",10)

    const mkUser = await prisma.user.create({
        data: {
            name: 'Dadi Andrason',
            email: 'pr@mk.chs.chalmers.se',
            password: samplePassword,
            nollk: 'MK',
            year: 2023,
            accepted: true
        },
    })

    const nollkitUser = await prisma.user.create({
        data: {
            name: 'Emil Lindblad',
            email: 'uppdrag.nollkit@chalmers.it',
            password: samplePassword,
            nollk: 'NollKIT',
            year: 2023,
            accepted: true
        },
    })

    // const nollkitUser = await prisma.user.findUnique({
    //     where: {
    //         email: 'uppdrag.nollkit@chalmers.it'
    //     }
    // })

    const f0kUser = await prisma.user.create({
        data: {
            name: 'Fantomen',
            email: 'fantomen@f.se',
            password: samplePassword,
            nollk: 'FNollK',
            year: 2023,
            accepted: true
        },
    })

    const d0kUser = await prisma.user.create({
        data: {
            name: 'Hacke Hackspett',
            email: 'hacke@d.se',
            password: samplePassword,
            nollk: 'DNollK',
            year: 2023,
            accepted: true
        },
    })

    const e0kUser = await prisma.user.create({
        data: {
            name: 'Kalle Anka',
            email: 'mail@chalmers.elektro',
            password: samplePassword,
            nollk: 'EØK',
            year: 2023,
            accepted: false
        },
    })

    const gosUser = await prisma.user.create({
        data: {
            name: 'Foo Bar',
            email: 'lkajsd@asd.so',
            password: samplePassword,
            nollk: 'GØS',
            year: 2023,
            accepted: false
        },
    })

    

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            author: {
                connect: {
                    id: nollkitUser.id
            }},
            nollk: 'NollKIT',
            title: 'Ännu ett uppdrag',
            desc: 'Nollan gör något roligt',
            place: 'Campus',
            time: 'Under MV3',
            participants: 4,
            motivation: 'Mycket bra',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            author: {
                connect: {
                    id: nollkitUser.id
            }},
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            title: 'BrITney Spears',
            desc: 'Nollan ska göra en parido på Britney spears musikvideo Oops I did it again.',
            place: 'Campus',
            time: 'Under Mottagningen',
            participants: 4,
            motivation: 'Banger uppdrag',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'DNollK',
            author: {
                connect: {
                    id: d0kUser.id
            }},
            title: 'Pranka IT Nollan',
            desc: 'Data gör något dumt som vanligt',
            place: 'Hubben',
            time: 'Kan ske när som helst lmao',
            participants: 69,
            motivation: 'Yööööö',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'FNollK',
            author: {
                connect: {
                    id: f0kUser.id
            }},
            title: 'Hemligt uppdrag',
            desc: 'Ja man vet inte riktigt vad som håller på med där borta på F, därför är detta uppdrag very secret :O',
            place: 'Lindholmen',
            time: 'Okänt',
            participants: 5,
            motivation: 'Very secret, hjälp, what.',
            private: true
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            author: {
                connect: {
                    id: nollkitUser.id
            }},
            title: 'Hängigt uppdrag',
            desc: 'Sven hittar säkert på något som blir rent av nekat',
            place: 'Din mamma',
            time: '12:01',
            participants: 2,
            motivation: 'Hej PR!',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2023,
            nollk: 'NollKIT',
            author: {
                connect: {
                    id: nollkitUser.id
            }},
            title: 'Komma på dessa fake uppdrag',
            desc: 'Att seeda en databas innebär att man slänger in en massa fakedata så man kan göra olika queries samt se hur datan kommer att se ut i ens wap. Och jag valde att skriva dessa för hand istället för att typ hitta något package som gjorde det åt mig, aja så kan de gå.',
            place: 'Satt hemma i soffan',
            time: '22:13:30 | 2023-01-31',
            participants: 1,
            motivation: 'Fick bra flow på beskrivningen',
            private: false
        },
    })

    await prisma.uppdrag.create({
        data: {
            year: 2022,
            nollk: 'NollKIT',
            author: {
                connect: {
                    id: nollkitUser.id
            }},
            title: 'Gammalt uppdrag',
            desc: 'Lorem ipsum',
            place: 'Japp',
            time: '123456789',
            participants: 100,
            motivation: 'dab',
            private: false
        },
    })



}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
