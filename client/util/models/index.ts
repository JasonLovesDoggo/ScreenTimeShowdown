export type User = {
    id: string;
    username: string;
    money: number;
    admin: boolean;
    registertime: number;
    transactions: Array<Transaction>;
    groups: Array<Group>;
}

export type Insta = {
    id: string;
    lastonline: string; //date of last online
    user: User;
    userid: string;
}

export type Transaction = {
    id: string;
    amount: number;
    status: string; // this will be "authorizing" "waiting..." "pending approval" "completed" "failed" 
    udfs: string;
    paybiltid: string;
    user: User;
    userid: string;
}

export type Group = {
    id: string;
    name: string;
    users: Array<User>;
    surviving: string;
    startdate: string;
    enddate: string;
    interval: number;
    bet: number;
    pot: number;
    logs: Array<GroupLog>;
}

export type GroupLog = {
    id: string;
    title: string;
    number: number;
    timestamp: string;
    content: string;
    groupid: string;
    group: Group;
};

export type RegisterInputs = {
    username: string;
    password: string;
}
