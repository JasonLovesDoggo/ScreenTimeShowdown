const { PrismaClient } = require('@prisma/client');
const { generate } = require('./generate');
const prisma = new PrismaClient();
const { nanoid } = require('nanoid');

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
        for (let i = 0; i < user.groups.length; i++) {
            const updatedlist = user.groups[i].surviving.replace((uid + ','), '');
            const logid = nanoid(16);
            let day = (Date.now() - parseInt(user.groups[i].startdate)) / (1000 * 60 * 60 * 24);
            console.log(day);
            if (updatedlist.split(',').length === 2) {
                const winnerlogid = nanoid(16);
                const winnerid = updatedlist.replace(',', '');
                const winner = await prisma.user.findUnique({
                    where: {
                        id: winnerid
                    }
                });
                const message = await generate(winner.username, {}, day, 4, 200);
                transactionlist.push(prisma.user.update({
                    where: {
                        id: winner.id
                    },
                    data: {
                        money: {
                            increment: user.groups[i].pot
                        }
                    }
                }));
                transactionlist.push(prisma.group.update({
                    where: {
                        id: user.groups[i].id
                    },
                    data: {
                        pot: 0,
                        startdate: '0',
                        enddate: '0'
                    }
                }));
                transactionlist.push(prisma.groupLog.create({
                    data: {
                        id: winnerlogid,
                        title: `${winner.username} has won the challenge`,
                        timestamp: `${Date.now()}`,
                        content: message,
                        groupid: user.groups[i].id,
                    }
                }));
            }
            const message = await generate(user.username, {}, day, 1, 200);
            transactionlist.push(prisma.group.update({
                where: {
                    id: user.groups[i].id
                },
                data: {
                    surviving: updatedlist
                }
            }));
            transactionlist.push(prisma.groupLog.create({
                data: {
                    id: logid,
                    title: `${user.username} has lost the challenge`,
                    timestamp: `${Date.now()}`,
                    content: message,
                    groupid: user.groups[i].id,
                }
            }));
        }
        await prisma.$transaction(transactionlist);
    } catch (err) {
        console.log(err);
    }
}