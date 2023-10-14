const { PrismaClient } = require('@prisma/client');
const { generate } = require('./generate');
const prisma = new PrismaClient();

module.exports.handleloss = async (uid) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: uid
            },
            include: {
                groups: true
            }
        });
        let transactionlist = [];
        user.groups.forEach(async group => {
            const list = group.surviving;
            const users = list.split(',');
            if (users.length <= 2) {
                const updatedlist = group.surviving.replace((uid + ','), '');
                const winnerid = updatedlist.replace(',', '');
                const winner = await prisma.user.findUnique({
                    where: {
                        id: winnerid
                    }
                })
                await prisma.user.update({
                    where: {
                        id: winnerid
                    },
                    data: {
                        money: {
                            increment: group.pot
                        }
                    }
                })
                await prisma.group.update({
                    where: {
                        id: group.id
                    },
                    data: {
                        pot: 0,
                        startdate: '0',
                        enddate: '0'
                    }
                })
                return await generate(winner.name, winnerid, day, 4, )
                // Set start and end date to 0
                // Call AI generation function
                // 
            } else {
                const updatedlist = group.surviving.replace((uid + ','), '');
                transactionlist.push(prisma.group.update({
                    where: {
                        id: group.id
                    },
                    data: {
                        surviving: updatedlist
                    }
                }));
            }
        });
        await prisma.$transaction(transactionlist);
    } catch (err) {
        console.log(err);
    }

}