import { prisma } from "../src/server/db"

async function main() {
    await prisma.uppdrag.deleteMany({})

    await prisma.uppdrag.create({
        data: {
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
            nollk: 'DNollK',
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
            nollk: 'FNollK',
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
            nollk: 'NollKIT',
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
            nollk: 'NollKIT',
            title: 'Komma på dessa fake uppdrag',
            desc: 'Att seeda en databas innebär att man slänger in en massa fakedata så man kan göra olika queries samt se hur datan kommer att se ut i ens wap. Och jag valde att skriva dessa för hand istället för att typ hitta något package som gjorde det åt mig, aja så kan de gå.',
            place: 'Satt hemma i soffan',
            time: '22:13:30 | 2023-01-31',
            participants: 1,
            motivation: 'Fick bra flow på beskrivningen',
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
