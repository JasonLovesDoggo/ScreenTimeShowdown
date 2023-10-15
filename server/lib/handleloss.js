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
        user.groups.forEach(group => {
            const updatedlist = group.surviving.replace((uid + ','), '');
            const logid = nanoid(16);
            day = Date.now() - parseInt(group.startdate);
            let title = "";
            let message = "";
            if (updatedlist.split(',').length === 1) {
                message = generate(user.username, {}, day, 4, 200);
                title = `${user.username} has won the challenge`;
                transactionlist.push(prisma.user.update({
                    where: {
                        id: user.id
                    },
                    data: {
                        money: {
                            increment: group.pot
                        }
                    }
                }));
                transactionlist.push(prisma.group.update({
                    where: {
                        id: group.id
                    },
                    data: {
                        pot: 0,
                        startdate: '0',
                        enddate: '0'
                    }
                }))
            } else {
                message = generate(user.username, {}, day, 1, 200);
                title = `${user.username} has lost the challenge`;
            }
            transactionlist.push(prisma.group.update({
                where: {
                    id: group.id
                },
                data: {
                    surviving: updatedlist
                }
            }));
            transactionlist.push(prisma.groupLog.create({
                data: {
                    id: logid,
                    title: title,
                    timestamp: `${Date.now()}`,
                    content: message,
                    groupid: group.id,
                }
            }));
        });
        await prisma.$transaction(transactionlist);
    } catch (err) {
        console.log(err);
    }
}