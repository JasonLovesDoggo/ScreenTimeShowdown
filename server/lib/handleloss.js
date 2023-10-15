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
            const message = generate(user.username, {}, day, 1, 200);
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
                    title: `${user.username} lost the challenge`,
                    timestamp: `${Date.now()}`,
                    content: message,
                    groupid: group.id,
                }
            }))
        });
        await prisma.$transaction(transactionlist);
    } catch (err) {
        console.log(err);
    }
}